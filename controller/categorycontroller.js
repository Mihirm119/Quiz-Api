const category = require("../model/category")

exports.Create = async function (req, res, next) {

    try {
        const { name } = req.body
        const Data = await category.create({
            name,
        });

        res.status(201).json({
            status: "Sucsess",
            message: "Category Creat SucessFull",
            Data:Data
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            error: error.message
        })
    }

}