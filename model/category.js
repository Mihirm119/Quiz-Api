const mongoose = require("mongoose");

const quizCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures category names are unique
        trim: true
    },
},{timestamps:true});

const QuizCategory = mongoose.model("QuizCategory", quizCategorySchema);

module.exports = QuizCategory;
