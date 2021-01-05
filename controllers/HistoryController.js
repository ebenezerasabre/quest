const HistoyModel = require('../models/HistoyModel');
const HistoryModel = require('../models/HistoyModel');

/**
 * TODO FIND
 */
// find all histories
exports.findAllHistory = (req, res) => {
    HistoryModel.find()
    .then((histories) => {
        if(histories) {
            console.log(histories);
            return res.status(200).send(histories);
        }
        return res.status(404).send({message: "Histories not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};

// find history by id
exports.findHistoryById = (req, res) => {
    HistoryModel.findById(req.params.id)
    .then((history) => {
        if(history){
            return res.status(200).send(history);
        }
        return res.status(404).send({message: "History not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};

// find user history
exports.findUserHistory = (req, res) => {
    HistoryModel.find( { userId: {$eq: req.params.id} } )
    .then((histories) => {
        if(histories){
            return res.status(200).send(histories);
        }
        return res.status(404).send({message: "User History not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

exports.findDriverHistory = (req, res) => {
    HistoryModel.find( { driverId: {$eq: req.params.id} } )
    .then((histories) => {
        if(histories){
            return res.status(200).send(histories);
        }
        return res.status(404).send({message: "Driver history not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
}


 /**
 * TODO COUNT
 */
// count histories
exports.countHistory = (req, res) => {
    HistoryModel.find()
    .countDocuments()
    .then((total) => {
        if(total){
            console.log(total);
            return res.status(200).send({message: total});
        } 
        return res.status(404)
        .send({message: "Couldn't count history"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: err.message});
    });
};

 /**
 * TODO CREATE
 */
// create history record
exports.createHistory = (req, res) => {
    if(!req.body.driverId || !req.body.userId){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const History = new HistoryModel({
        driverId: req.body.driverId,
        driverName: req.body.driverName,
        userId: req.body.userId,
        userName: req.body.userName,
        city: req.body.city,
        entryPoint: req.body.entryPoint,
        exitPoint: req.body.exitPoint,
        status: req.body.status,
        fee: req.body.fee
    });

    History.save().then((history) => {
        if(history){
            return res.status(200).send(history);
        }
        return res.status(404).send({message: "Could not create history"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

 /**
 * TODO UPDATE
 */
// update history record
exports.updateHistory = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({message: "Required field can't be empty"});
    }
    HistoryModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((history) => {
       if(history) {
           return res.status(200).send(history);
       }
       return res.status(404)
       .send({message: "No history found"});
   })
   .catch((err) => {
      return res.status(500)
      .send({message: err.message});

   });
};

 /**
 * TODO DELETE
 */
// delete history record
exports.deleteHistory = (req, res) => {
    HistoryModel.findByIdAndRemove(req.params.id)
    .then((hsitory) => {
       if(hsitory) {
           return res.status(200).send({message: "Deleted successfully"});
       }
       return res.status(404).send({message: "History not found"});
   })
   .catch((err) => {
       return res.status(404).send({message: err.message});
   });

};

// delete all history records
exports.deleteAllHistory = (req, res) => {
    HistoyModel.find()
    .deleteMany()
    .then(() => {
        return res.status(200).send({message: "Deleted all history records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
 };