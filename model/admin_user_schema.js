const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DATA = new Schema({
    username: {
        type: String,
        required: [true, 'PLease Enter Username'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Admin only, no other roles
        default: 'user',
    },
    quizzesCreated:
    {
        type: Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz schema
    },

},{timestamps:true}
)


const ADMIN_USER = mongoose.model('ADMIN_USER ', DATA);

module.exports = ADMIN_USER;