const QUIZ = require('../model/quizschema');
const mongoose = require('mongoose');
const QuizCategory = require("../model/category");

exports.CREATE = async function (req, res, next) {

    try {

        const { title, description, questions , category } = req.body;
        const find = await QUIZ.findOne({ title, description });

        if (find) throw new Error("Quiz Is Already Exict");

        const formattedQuestions = questions.map((question) => ({
            ...question,
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for each question
        }));

        let quiz = await QUIZ.create({
            title,
            description,
            category,
            questions: formattedQuestions,
        })


        res.status(201).json({
            status: "SUCCESS",
            message: "QUIZ CREATE SUCCESSFUL",
            Quize: quiz
        })

    } catch (error) {

        res.status(404).json({
            status: "FAIL",
            message: "QUIZ CREATE FAIL",
            error: error.message,
        })
    }
}


exports.Addquestion = async function (req, res, next) {

    try {

        const QUIZid = req.params.id;
        const find = await QUIZ.findById(QUIZid);
        const { question, options, answer } = req.body;

        const alreadyquestion = find.questions.find((q) => q.question === question || q.options === options)
        if (alreadyquestion) {
            throw new Error("Question name and option already Exict in Quiz");
        }

        if (!question || !options || !answer) {
            throw new Error("Question, options, and answer are all required");
        }

        const newQuestion = {
            _id: new mongoose.Types.ObjectId(),
            question,
            options,
            answer,
        };

        const data = find.questions.push(newQuestion);

        await find.save();

        res.status(201).json({
            status: "SUCCESS",
            message: "QUESTON ADD SUCCESSFUL",
            Question: newQuestion
        })

    } catch (error) {

        res.status(404).json({
            status: "FAIL",
            message: "QUIZ CREATE FAIL",
            error: error.message,
        })
    }
}

exports.READ = async function (req, res, next) {

    try {

        let READDATA = await QUIZ.find().populate('category')

        res.status(201).json({
            status: "SUCCESS",
            message: "QUIZ CREATE SUCCESSFUL",
            AllQuize: READDATA,
        })

    } catch (error) {

        res.status(404).json({
            status: "FAIL",
            message: "QUIZ CREATE FAIL",
            error: error.message,
        })
    }
}

exports.DELETEQUESTION = async function (req, res, next) {

    try {
        const Quizid = req.params.id;
        const questionid = req.body.id;

        if (!questionid) throw new Error("PLease Enter a QuestionID");

        const delteddata = await QUIZ.findOne(
            { 'questions._id': questionid }, // Match the question ID
            { 'questions.$': 1 } // Use $ to return only the matched array element
        );

        if (!delteddata) throw new Error("Question ID was not found");

        await QUIZ.findByIdAndUpdate(
            Quizid,
            { $pull: { questions: { _id: questionid } } }, // Remove the question from the array
            { new: true } // Returns the updated document
        );

        res.status(201).json({
            status: "SUCCESS",
            message: "QUIZ QUESTION DELETED SUCCESSFUL",
            DeltedQuestions: delteddata,
        })

    } catch (error) {

        res.status(404).json({
            status: "FAIL",
            message: "QUIZ DELETE FAIL",
            error: error.message,
        })
    }
}

exports.DELETEQUIZ = async function (req, res, next) {

    try {
        const Quizid = req.params.id;

        const deltequiz = await QUIZ.findByIdAndDelete(Quizid)
        if (!deltequiz) throw new Error("QUIZ ID was not found");

        res.status(201).json({
            status: "SUCCESS",
            message: "QUIZ  DELETED SUCCESSFUL",
            DELTEDQUIZ: deltequiz,
        })

    } catch (error) {

        res.status(404).json({
            status: "FAIL",
            message: "QUIZ DELETE FAIL",
            error: error.message,
        })
    }
}



exports.UPDATEQUIZ = async function (req, res, next) {
    try {

        const Quizid = req.params.id;
        const { title, description, questions } = req.body;
        const alreadydata = await QUIZ.findOne({ title, description })

        if (alreadydata) throw new Error("All Data is Already Exist");


        if (!title) throw new Error("Title is Required");
        if (!description) throw new Error("description is Required");
        if (!questions) throw new Error("questions is Required");

        const updatedQuestions = []

        for (const { id, question, options, answer } of questions) {

            if (!id) {
                throw new Error(`Question ID Requrired`);
            }

            if (![question, options, answer].every(field => field)) {
                throw new Error("All fields ('question', 'options', and 'answer') are required for each question.");
            }

            // Update each question
            const updatedQuiz = await QUIZ.findOneAndUpdate(
                { 'questions._id': id },
                {
                    $set: {
                        'questions.$.question': question,
                        'questions.$.options': options,
                        'questions.$.answer': answer,
                    }
                },
                { new: true } // Return the updated document
            );

            updatedQuestions.push({ id, question, options, answer })
        }

        const finalUpdatedQuiz = await QUIZ.findByIdAndUpdate(
            Quizid,
            {
                title,
                description,
            },
            { new: true } // Return the updated document
        );


        res.status(200).json({
            status: "SUCCESS",
            message: "QUIZ UPDATED SUCCESSFULLY",
            UpdateDeatils: {
                title: finalUpdatedQuiz.title,
                description: finalUpdatedQuiz.description,
                question: updatedQuestions,
            },
        });


    } catch (error) {
        res.status(400).json({
            status: "FAIL",
            message: "QUIZ UPDATE FAILED",
            error: error.message,
        });
    }
}




exports.PLAYQUIZ = async function (req, res, next) {

    try {

        const PLAYQUIZ = await QUIZ.findById(req.params.id);
        if (!PLAYQUIZ) throw new Error("QUIZ ID IS NOT EXICT");

        if (PLAYQUIZ.questions.length === 0) throw new Error("No question Avaliable");

        const suffelquestion = PLAYQUIZ.questions.sort(() => Math.random() - 0.5);

        res.status(201).json({
            status: "SUCCESS",
            message: "QUIZ  PLAY SUCCESSFUL",
            Data: suffelquestion
        })

    } catch (error) {

        res.status(404).json({
            status: "FAIL",
            message: "QUIZ PLAY FAIL",
            error: error.message,
        })
    }
}
//     try {
//         const quizId = req.params.id;
//         const { answer, id } = req.body; // Assumes answers are sent in the request body as an array

//         if (!id) throw new Error("Please Enter User question id");
//         if (!answer) throw new Error("Please Enter User Answer");

//         const quiz = await QUIZ.findById(quizId);
//         if (!quiz) throw new Error("Quiz ID does not exist");

//         if (quiz.questions.length === 0) {
//             throw new Error("No questions available in this quiz");
//         }

//         const totalQuestions = quiz.questions.length;

//         const findquestion = quiz.questions.find((q) => q._id.toString() === id);
//         if (!findquestion) throw new Error("Question ID is not define in QUiz");

//         const alreadyAnswered = temp.some((item) => item.id === id);

//         if (findquestion.answer.toLowerCase() === answer.toLowerCase()) {
//             if (alreadyAnswered) {
//                 throw new Error("Please change to a different Question ID and Answer");
//             }
//             score++;
//         }
//         else if (score > 0) {
//             score--;
//         }

//         temp.push({ id });

//         res.status(201).json({
//             status: "SUCCESS",
//             message: "Quiz submitted successfully",
//             data: {
//                 score: score,
//                 totalQuestions: totalQuestions,
//             },
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: "FAIL",
//             message: "Quiz submission failed",
//             error: error.message,
//         });
//     }
// };

exports.SUBMITQUIZ = async function (req, res, next) {
    try {
        let score = 0;

        const quizId = req.params.id;
        const { answers } = req.body;

        let quiz = await QUIZ.findById(quizId);
        if (!quiz) throw new Error("Quiz ID does not exist");

        let totalQuestions = quiz.questions.length;
        if (!totalQuestions) throw new Error("Questions are not avaiable");

        for (const element of answers) {
            const { id, answer } = element;

            if (!id) throw new Error("PLease Enter a Id of question");
            if (!answer) throw new Error("Please Enter a Answer");

            const question = quiz.questions.find((val) => val.id === id);
            if (!question) {
                throw new Error("Question Id is Invalid");
            }

            if (question.answer === answer) {
                score++;
            }
        }

        res.status(201).json({
            status: "SUCCESS",
            message: "Quiz submitted successfully",
            data: {
                score: score,
                totalQuestions: totalQuestions,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "FAIL",
            message: "Quiz submission failed",
            error: error.message,
        });
    }
};
