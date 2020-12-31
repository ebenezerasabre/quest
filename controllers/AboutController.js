const AboutModel = require('../models/AboutModel');


/**
 * TODO FIND
 */

 // find all abouts
 exports.findAllAbouts = (req, res) => {
     AboutModel.find()
     .then((abouts) => {
         if(abouts){
            console.log(abouts);
            return res.status(200).send(abouts);
         }
         return res.status(404).send({message: "Abouts not found"});
     })
     .catch((err) => {
         return res.status(500)
         .send({message: err.message || "Error occured"});
     });
 };


// find one abouut
exports.findAboutById = (req, res) => {
    AboutModel.findById(req.params.id)
    .then((about) => {
        if(about){
            console.log(about);
            return res.status(200).send(about);
        } 
        return res.status(404)
        .send({ message: "About not found" + req.params.id});
    })
    .catch((err) => {
        return res.status(500)
        .send({message: "Error finding about with id " + req.params.id});
    });
};



 /**
 * TODO COUNT
 */

 // count About messages
 exports.coutAbout = (req, res) => {
     AboutModel
     .find()
     .countDocuments()
     .then((total) => {
         if(total){
             console.log(total);
             return res.status(200).send({message: total});
         } 
         return res.status(404)
         .send({message: "Error counting abouts"});
     })
     .catch((err) => {
        return res.status(500)
        .send({message: "Error counting abouts"});
     });
 };



 /**
 * TODO CREATE
 */

 // create an about record
 exports.createAbout = (req, res) => {
     console.log(req.body);
    //  return res.status(200).send(req.body);
     if(!req.body.title || !req.body.msg){
         return res.status(400)
         .send({message: "Required field can't be empty"});
     }
     // create
     const About = new AboutModel({
         title: req.body.title,
         msg: req.body.msg,
     });
     // save to database
     About.save().then((data) => {
         return res.status(200).send(data);
     })
     .catch((err) => {
         return res.status(500)
         .send({message: err.message});
     });

 };



 /**
 * TODO UPDATE
 */

 // update about record
 exports.updateAbout = (req, res) => {
     // validate
     if(!req.body.title){
         return res.status(400)
         .send({message: "Required field can't be empty"});
     }
     AboutModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
     .then((about) => {
         if(about) {
             return res.status(200).send(about);
         }
         return res.status(404)
         .send({message: "No about found"});
     })
     .catch((err) => {
        return res.status(500)
        .send({message: "Could not update about : " + err.message});
 
     });
 };



 /**
 * TODO DELETE
 */

 // delete an about record
exports.deleteAbout = (req, res) => {
    AboutModel.findByIdAndRemove(req.params.id)
    .then((about) => {
        if(about) {
            return res.status(200).send({message: "Deleted successfully"});
        }
        return res.status(404).send({message: "About not found"});
    })
    .catch((err) => {
        return res.status(404).send({message: "Could not delete about"});
    });
};

 // delete all about records
 exports.deleteAllAbouts = (req, res) => {
     AboutModel.find()
     .deleteMany()
     .then(() => {
        return res.status(200).send({message: "Deleted all about records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
 };