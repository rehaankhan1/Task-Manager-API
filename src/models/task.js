const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    description: {
        type:String ,
        trim: true,
        required: true
    },completed: {
        type: Boolean,
        default:false
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'user'
    }
}, {
    //second argument
    timestamps: true
})
 
TaskSchema.pre('save', async function(next){
   const task = this

   next()
})

const  task = mongoose.model('Task', TaskSchema)

module.exports = task