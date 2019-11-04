const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')



router.post('/task', auth, async (req, res) => {
    //const task =  new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
       await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


router.get('/task',auth, async (req, res) => {

    const sort = {}
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1:1
    }

    try {
//const task =await Task.find({owner:req.user._id})
console.log(match)
await req.user.populate({
    path:'tasks',
    match,
    options: {
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
    }
}).execPopulate()

res.send(req.user.tasks)
    }catch(e) {
        res.status(500).send()
    }

})


router.get('/task/:id', auth, async (req, res) => {
 const _id = req.params.id

 try {
    //const task = await Task.findById(_id)
    const task = await Task.findOne({_id, owner:req.user._id})
    if(!task){
        return res.status(404).send()
     }
     res.send(task)
 }catch(e) {
    res.status(500).send()
 }

})
/*
...................../´¯¯/)
...................,/¯.../
.................../..../
.............../´¯/'..'/´¯¯`·¸
.........../'/.../..../....../¨¯\
..........('(....´...´... ¯~/'..')
...........\..............'...../
............\....\.........._.·´
.............\..............(
..............\..............\

*/

router.patch('/task/:id',auth ,async (req, res) => {
const updates = Object.keys(req.body)
const isAllowed = ['description', 'completed']
const isValid = updates.every((updates) => isAllowed.includes(updates))

if(!isValid){
    return res.status(400).send({error: 'Invalid Operation'})
}

try{

   // const  task = await Task.findById(req.params.id)
  const task = await Task.findOne({_id:req.params.id, owner:req.user._id})


  if(!task){
    return res.status(404).send()
}

    updates.forEach((update) => task[update] = req.body[update])
    await task.save()

res.send(task)
}catch(e){
    res.status(409).send()
}
 
})


router.delete('/task/:id', auth,async (req, res) => {
     try {
//const DeleteTask = await Task.findByIdAndDelete(req.params.id)
const DeleteTask = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
if(!DeleteTask){
    return res.status(404).send({error: 'Invalid Request!'})
}
res.send(DeleteTask)
     }catch(e) {
        res.status(400).send(e)
     }
})


module.exports = router