const DriverModel = require('../models/DriverModel');


/**
 * TOOD FIND 
 */
// find all drivers
exports.findAllDrivers = (req, res) => {
    DriverModel.find()
    .then((drivers) => {
        if(drivers){
            console.log(drivers);
            return res.status(200).send(drivers);
        }
        return res.status(404).send({message: "Drivers not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

// find driver by id
exports.findDriverById = (req, res) => {
    DriverModel.findById(req.params.id)
    .then((driver) => {
        if(driver){
            console.log(driver);
            return res.status(200).send(driver);
        }
        return res.status(404).send({message: "Driver not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });

};


 /**
 * TOOD COUNT
 */
// count all drivers
exports.countDrivers = (req, res) => {
    DriverModel.find()
    .countDocuments()
    .then((total) => {
        if(total){
            console.log(total);
            return res.status(200).send({message: total});
        } 
        return res.status(404)
        .send({message: "Couldn't count drivers"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: err.message});
    });
};

 /**
 * TOOD CREATE
 */
// create driver record
exports.createDriver = (req, res) => {
    if(!req.body.phoneNumber ||
         !req.body.password || 
         !req.body.carDescription || 
         !req.body.carNumber
    ){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    //create
    const Driver = new DriverModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        email: req.body.email,
        userType: "driver",
        finishedRides: "0",
        rating: "3",
        isActive: "true",
        carDescription: req.body.carDescription,
        carNumber: req.body.carNumber,
        profit: "0.0",
    });
    //save
    Driver.save().then((driver) => {
        if(driver){
                return res.status(200).send(driver);
            }
            return res.status(404).send({message: "Could not create driver"});
        })
        .catch((err) => {
            return res.status(500).send({message: err.message});
        });

}

 /**
 * TODO UPDATE DRIVER
 */
// update driver record
exports.updateDriver = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({message: "Required field can't be empty"});
    }
    DriverModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((driver) => {
        if(driver) {
            return res.status(200).send(driver);
        }
        return res.status(404)
        .send({message: "No driver found"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: "Could not update driver : " + err.message});

    });
};


 /**
 * TOOD DELETE
 */

// delete drivre record
exports.deleteDriver = (req, res) => {
    DriverModel.findByIdAndRemove(req.params.id)
    .then((driver) => {
        if(driver) {
            return res.status(200).send({message: "Deleted successfully"});
        }
        return res.status(404).send({message: "Driver not found"});
    })
    .catch((err) => {
        return res.status(404).send({message: err.message});
    });
};

// delete all driver records
exports.deleteAllDrivers = (req, res) => {
    DriverModel.find()
    .deleteMany()
    .then(() => {
        return res.status(200).send({message: "Deleted all driver records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
};

