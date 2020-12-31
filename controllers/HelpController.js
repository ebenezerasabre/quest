const HelpModel = require('../models/HelpModel');

/**
 * TODO FIND
 */
// find all help
exports.findAllHelps = (req, res) => {
    HelpModel.find()
    .then((helps) => {
        if(helps) {
            console.log(helps);
            return res.status(200).send(helps);
        }
        return res.status(404).send({message: "Helps not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};

// find help by id
exports.findHelpById = (req, res) => {
    HelpModel.findById(req.params.id)
    .then((help) => {
        if(help){
            return res.status(200).send(help);
        }
        return res.status(404).send({message: "Help not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};

 /**
 * TODO COUNT
 */
// count helps
exports.countHelps = (req, res) => {
    HelpModel.find()
    .countDocuments()
    .then((total) => {
        if(total){
            console.log(total);
            return res.status(200).send({message: total});
        } 
        return res.status(404)
        .send({message: "Couldn't count helps"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: "Error counting helps"});
    });
};


 /**
 * TODO CREATE
 */
// create help record
exports.createHelp = (req, res) => {
    if(!req.body.userId || !req.body.msg){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const Help = new HelpModel({
        userId: req.body.userId,
        msg: req.body.msg,
    });
    //save
    Help.save().then((help) => {
        if(help){
            return res.status(200).send(help);
        }
        return res.status(404).send({message: "Could not create help"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
}


 /**
 * TODO UPDATE
 */
// update help record
exports.updateHelp = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({message: "Required field can't be empty"});
    }
    HelpModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((help) => {
       if(help) {
           return res.status(200).send(help);
       }
       return res.status(404)
       .send({message: "No help found"});
   })
   .catch((err) => {
      return res.status(500)
      .send({message: "Could not update help : " + err.message});
   });
};


 /**
 * TODO DELETE
 */
// delete help record
exports.deleteHelp = (req, res) => {
    HelpModel.findByIdAndRemove(req.params.id)
    .then((help) => {
       if(help) {
           return res.status(200).send({message: "Deleted successfully"});
       }
       return res.status(404).send({message: "Help not found"});
   })
   .catch((err) => {
       return res.status(404).send({message: err.message});
   });
};

// delete all help records
exports.deleteAllHelp = (req, res) => {
    HelpModel.find()
    .deleteMany()
    .then(() => {
        return res.status(200).send({message: "Deleted all help records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
 };

