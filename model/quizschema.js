const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DATA = new schema({
    title:{
        type:String,
        require:[true,'title is required '],
        trim:true,
    },
    description:{
        type:String,
        require:[true,'description is required '],
        trim:true,  
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "QuizCategory" },
    questions:[{
        _id: mongoose.Schema.Types.ObjectId,
        question:{
            type:String,
            required:[true,'question is required'],
        },
        options:{
            type:String,
            required:[true,'options is required'],
        },
        answer:{
            type:String,
            required:[true,'answer is required'],
        }
    }],
},{timestamps:true});

let QUIZ = mongoose.model("quiz",DATA)

module.exports = QUIZ;


