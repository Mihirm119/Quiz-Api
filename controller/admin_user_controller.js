const ADMIN_USER = require('../model/admin_user_schema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');


exports.SECURE = async (req, res, next) => {

    try {

        const Token = req.headers.authorization;
        if (!Token) throw new Error("PLease Enter A Token");

        const isvalidtoken = jwt.verify(Token, "ADMIN");
        const tokenndata = await ADMIN_USER.findById(isvalidtoken.id);

        if (!tokenndata) throw new Error("ADMINTOKEN is not valid");

        req.user = tokenndata._id

        next()

    } catch (error) {
        res.status(404).json(
            {
                status: "FAIL",
                message: error.message,
            });
    }
}



exports.SINGUP = async (req, res) => {

    try {
        const { username, email, password, role } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const normalizedRole = role && role.trim().toLowerCase() == "admin" ? "admin" : "user";


        const New = await ADMIN_USER.create({
            username,
            email,
            password,
            role: role || "user",
        });

        let token = jwt.sign({ id: New._id }, "ADMIN");

        res.status(201).json(
            {
                status: "SUCCESS",
                message: `${normalizedRole} created successfully`,
                DATA: New,
                Token: token,
            });
    } catch (error) {
        res.status(404).json(
            {
                status: "FAIL",
                message: error.message,
            });
    }
}



exports.LOGIN = async (req, res) => {

    try {
        const { email, password } = req.body;

        const CHECK = await ADMIN_USER.findOne({ email: email })
        if (!CHECK) throw new Error("Email Id Is INVALID");

        if (password !== CHECK.password) throw new Error(`${CHECK.role} Password is Wrong`);

        let token = jwt.sign({ id: CHECK._id }, "ADMIN");

        res.status(200).json(
            {
                status: "SUCCESS",
                message: `${CHECK.role} Login successfully`,
                Data: CHECK,
                Token: token,
            });
    } catch (error) {
        res.status(404).json(
            {
                status: "FAIL",
                message: error.message,
            });
    }
}


exports.READ = async (req, res) => {

    try {

        let data = [];
        const userDetails = await ADMIN_USER.find({ _id: req.user })
        const adminDetails = await ADMIN_USER.find()

        if (userDetails.length > 0) {
            const userDetail = userDetails[0]; // Access the first object

            if (userDetail.role === "user") {
                data = userDetails;
            }

            if (userDetail.role === "admin") {
                data = adminDetails;
            }
        }

        res.status(200).json(
            {
                status: "SUCCESS",
                message: `DATA READ SUCCESSFUL`,
                DATA: data
            });
    } catch (error) {
        res.status(404).json(
            {
                status: "FAIL",
                message: error.message,
            });
    }
}



exports.UPDATE = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email) throw new Error("PLease Enter a Email");
        if (!password) throw new Error("PLease Enter a Password");

        const LOGIN = await ADMIN_USER.findOne({ _id: req.user })

        const DATA = await ADMIN_USER.findById(req.params.id)
        if (!DATA) throw new Error("Id is Not Define");

        if (!LOGIN._id.equals(DATA._id)) {
            throw new Error("ID does not match the logged-in user ID");
        }

        const checkdata = await ADMIN_USER.findOne({ email, password })
        if (checkdata) throw new Error("Email and Password is Already Exist");

        const updatedata = await ADMIN_USER.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(
            {
                status: "SUCCESS",
                message: `DATA UPDATE SUCCESSFUL`,
                Update: updatedata,
            });
    } catch (error) {
        res.status(404).json(
            {
                status: "FAIL",
                message: error.message,
            });
    }
}



exports.DELETE = async (req, res) => {

    try {
    
        const LOGIN = await ADMIN_USER.findOne({_id : req.user})
        const DATA = await ADMIN_USER.findById(req.params.id)
        if (!DATA) throw new Error("Id is Not Define");
        
        if (LOGIN.role !== "admin") {
            throw new Error("Only administrators are authorized to delete this data");
        }

        const deletedata = await ADMIN_USER.findByIdAndDelete(req.params.id);

        res.status(200).json(
            {
                status: "SUCCESS",
                message: `DATA DELETE SUCCESSFUL`,
                delete: deletedata,
            });
    } catch (error) {
        res.status(404).json(
            {
                status: "FAIL",
                message: error.message,
            });
    }
}


