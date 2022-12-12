const express = require("express")
var router = express.Router()
const mongoose = require("mongoose")
const Student = require('../models/student.model');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get('/', ensureAuthenticated,  (req, res) => {
    res.render("addOrEdit", {
        viewTitle: 'Insert  Student Record',
        student:Student
    });
});

router.post('/', (req, res) =>{
    if(req.body._id == '') {
        insertRecord(req, res)
    }else{
        updateRecord(req, res)
    };
});

function insertRecord(req, res) {
    var student = new Student()
    student.fullname = req.body.fullname;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city; 
    student.save((err, doc) => {
        if(!err) {
            res.redirect("student/list")
        } else {
            console.log("Error during insert:" + err)
        };
    });
};

function updateRecord(req, res) {
    Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},(err, doc) =>{
        if(!err){
            res.redirect("student/list")
        } else {
            console.log("Error during update:" + err)
        };
    });
};

router.get("/list", ensureAuthenticated, (req, res) => {
    Student.find((err, docs) => {
        if(!err) {
            res.render('list', {
                list:docs, msg:""
            })
        } else {
            console.log("Error in retrieval:" + err)
        }
    });
});
router.get("/:id", ensureAuthenticated,(req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("addOredit",{
                viewTitle: 'Update Student Record',
                student: doc
            });
            console.log(doc);
        }
    });
});
router.get("/delete/:id", ensureAuthenticated, (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {

            res.render("list",{list:doc,msg:"Deleted"})
        } else {
            console.log("Error in deletion" + err)
        }
    });
});


module.exports = router;