const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')

router.post('/users', async (req, res) => {
    //console.log(req.body)  //grap incoming data
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await   user.generateAuthToken()
        //now line after will only run when above line does not return
        res.status(201).send({user, token})
    }catch(e) {
    res.status(400).send(e)
    }

    

})



router.post('/users/login', async (req, res) => {
    try{
             const user = await User.findByCredentials(req.body.email, req.body.password)
             const token = await user.generateAuthToken()
             res.send({user, token})
    }catch (e){
              res.status(400).send()
    }
})


router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e) {
res.status(500).send()
    }
})


router.get('/users/logoutAll', auth, async(req, res) => {
try{
req.user.tokens = []
console.log(req.user)
await req.user.save()
res.send()
}catch(e){
    res.status(500).send()
}
})


router.get('/users/me',auth ,async (req, res) => {
    //https://mongoosejs.com/docs/queries.html
   res.send(req.user)

})

//hello instagram jokers                    

router.patch('/users/me', auth,  async (req, res) => {
       const updates = Object.keys(req.body)
       const allowedUpdates = ['name', 'email', 'password', 'age']
       const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates))

       if(!isValidOperation){
           res.status(400).send({error : 'Invalid Opertaion!'})
       }

    try {

        //const user = await User.findById(req.user._id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

    
res.send(req.user)

    }catch(e) {
      res.status(409).send(e)
    }
})


router.delete('/users/me',auth,async (req, res) => {

try{
    await req.user.remove()
    sendCancelEmail(req.user.email, req.user.name)
    res.send(req.user)
}catch(e) {
    res.status(400).send(e)
}
})


const upload = multer({
   
    limits:{
        fileSize: 1000000 //1MB
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please Upload either jpg, jpeg, png'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatars', auth, upload.single('avatar'), async(req, res) => {
    //req.user.avatars = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatars = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=> {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatars', auth, async (req, res) => {
    req.user.avatars = undefined
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next)=> {
    res.status(500).send({error:'Cannot Authenticate :('})
})


router.get('/users/:id/avatars', async(req, res) => {
    try{
const user = await User.findById(req.params.id)

if(!user || !user.avatars){
    throw new Error()
}
res.set('Content-type', 'image/png')
res.send(user.avatars)
    }catch(e){
        res.status(404).send()
    }
})



module.exports = router