const SupportModel = require('../models/SupportModel');



/**
 * TODO FIND
 */
// find all supports
exports.findAllSupports = (req, res) => {
    SupportModel.find()
    .then((supports) => {
        if(supports) {
            console.log(supports);
            return res.status(200).send(supports);
        }
        return res.status(404).send({message: "Supports not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

// find support by id
exports.findSupportById = (req, res) => {
    SupportModel.findById(req.params.id)
    .then((support) => {
        if(support){
            return res.status(200).send(support);
        }
        return res.status(404).send({message: "Support not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

 /**
 * TODO COUNT
 */
// count support records
exports.countSupports = (req, res) => {
    SupportModel.find()
    .countDocuments()
    .then((total) => {
        if(total){
            console.log(total);
            return res.status(200).send({message: total});
        } 
        return res.status(404)
        .send({message: "Couldn't count support"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: "Error counting supports"});
    });
};


 /**
 * TODO CREATE
 */
exports.createSupport = (req, res) => {
    if(!req.body.topic){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const Support = new SupportModel({
        topic: req.body.topic,
        author: req.body.author,
        msg: req.body.msg,
    });
    // save
    Support.save().then((support) => {
        if(support){
            return res.status(200).send(support);
        }
        return res.status(404).send({message: "Could not create support"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

 /**
 * TODO UPDATE
 */
// update support record
exports.updateSupport = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({message: "Required field can't be empty"});
    }
    SupportModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((support) => {
       if(support) {
           return res.status(200).send(support);
       }
       return res.status(404)
       .send({message: "No support found"});
   })
   .catch((err) => {
      return res.status(500)
      .send({message: err.message});
   });
};


 /**
 * TODO DELETE
 */
// delete support record
exports.deleteSupport = (req, res) => {
    SupportModel.findByIdAndRemove(req.params.id)
    .then((support) => {
       if(support) {
           return res.status(200).send({message: "Deleted successfully"});
       }
       return res.status(404).send({message: "Support not found"});
   })
   .catch((err) => {
       return res.status(404).send({message: err.message});
   });

};

// delete all support records
exports.deleteAllSupports = (req, res)=> {
    SupportModel.find().remove().then(() => {
        return res.status(200).send({message: "Deleted all support records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
 };