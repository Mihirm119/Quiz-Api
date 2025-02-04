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
            Data: Data
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            error: error.message
        })
    }

}


exports.Read = async function (req, res, next) {

    try {
        const Data = await category.find();

        res.status(201).json({
            status: "Sucsess",
            message: "Category Read SucessFull",
            Data: Data
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            error: error.message
        })
    }

}

exports.Update = async function (req, res, next) {

    try {

        const { name } = req.body;
        if (!name) throw new Error("Please Enter a Name");

        const Update = await category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(201).json({
            status: "Sucsess",
            message: "Category Update SucessFull",
            UpdateData: Update
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            error: error.message
        })
    }
}

exports.Delete = async function (req, res, next) {

    try {

        const Delete = await category.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: "Sucsess",
            message: "Category Update SucessFull",
            Deletedata: Delete
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            error: error.message
        })
    }
}