const UserModel = require('../models/UserModel');


/**
 * TODO FIND
 */
// find all users
exports.findAllUsers = (req, res) => {
    UserModel.find()
    .then((users) => {
        if(users) {
            console.log(users);
            return res.status(200).send(users);
        }
        return res.status(404).send({message: "Users not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};

// find one user
exports.findUserById = (req, res) => {
    UserModel.findById(req.params.id)
    .then((user) => {
        if(user){
            return res.status(200).send(user);
        }
        return res.status(404).send({message: "User not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};


exports.signInUser = (req, res) => {
    UserModel.find( { phoneNumber: {$eq: req.params.id} })
    .then((user) => {
        if(user){
            return res.status(200).send(user);
        }
        return res.status(404).send({message: "User not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};


 /**
 * TODO COUNT
 */
// count users
exports.countUsers = (req, res) => {
    UserModel.find()
    .countDocuments()
     .then((total) => {
         if(total){
             console.log(total);
             return res.status(200).send({message: total});
         } 
         return res.status(404)
         .send({message: "Couldn't count users"});
     })
     .catch((err) => {
        return res.status(500)
        .send({message: "Error counting users"});
     });
};



 /**
 * TODO CREATE
 */

// create user record
exports.createUser = (req, res) => {
    if(!req.body.phoneNumber || !req.body.password){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const User = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        email: req.body.email,
        userType: req.body.userType,
        finishedRides: "0",
        rating: "3",
        isActive: "true",
    });
    //save
    User.save().then((user) => {
        if(user){
            return res.status(200).send(user);
        }
        return res.status(404).send({message: "Could not create user"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};


 /**
 * TODO UPDATE
 */

 // update user record
 exports.updateUser = (req, res) => {
     if(!req.params.id){
         return res.status(400).send({message: "Required field can't be empty"});
     }
     UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
     .then((user) => {
        if(user) {
            return res.status(200).send(user);
        }
        return res.status(404)
        .send({message: "No user found"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: "Could not update user : " + err.message});

    });
 };



 /**
 * TODO DELETE
 */

 // delete a user record
 exports.deleteUser = (req, res) => {
    //  console.log("the id " + req.params.id);
     UserModel.findByIdAndRemove(req.params.id)
     .then((user) => {
        if(user) {
            return res.status(200).send({message: "Deleted successfully"});
        }
        return res.status(404).send({message: "User not found"});
    })
    .catch((err) => {
        return res.status(404).send({message: err.message});
    });

 };

 //delete all user records
 exports.deleteAllUsers = (req, res) => {
     UserModel.find().remove().then(() => {
        return res.status(200).send({message: "Deleted all user records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
 };
