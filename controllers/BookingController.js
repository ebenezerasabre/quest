const BookingModel = require('../models/BookingModel');

/**
 * TODO FIND
 */

// find all bookings
exports.findAllBookings = (req, res) => {
    BookingModel.find()
    .then((books) => {
        if(books){
            console.log(books);
            return res.status(200).send(books);
        }
        return res.status(400).send({message: "Bookings not found"});
    })
    .catch((err) => {
        return res.status(500)
        .send({meesage: err.meesage || "Error occuree"});
    })
};

// find one booking
exports.findBookingById = (req, res) => {
    BookingModel.findById(req.params.id)
    .then((book) => {
        if(book){
            console.log(book);
            return res.status(200).send(book);
        }
        return res.status(404)
        .send({message: "Booking not found " + req.params.id});
    })
    .catch((err) => {
        return res.status(500)
        .send({message: "Error finding booking with id " + req.params.id});
    });
};

// show bookings by carType
// Driver only see bookings of his car type
exports.findBookingByCarType = (req, res) => {
    BookingModel.find({carType : req.body.carType})
    .then((books) => {
        return res.status(200).send(books);
    })
    .catch((err) => {
        return res.status(500)
        .send({message: "Error finding booking with carType " + req.body.carType});
    });
    
};


/**
 * TODO COUNT
 */

// counting all bookings
exports.countBookings = (req, res) => {
    BookingModel
    .find()
    .countDocuments()
    .then((total) => {
        if(total){
            console.log(total);
            return res.status(200).send({message: total});
        } 
        return res.status(404)
        .send({message: "Error counting bookings"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: "Error counting bookings"});
    });
}


/**
 * TODO CREATE
 */

// let date_ob = new Date();

// create a booking record
exports.createBook = (req, res) => {
    if(!req.body.customerId){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const book = new BookingModel({
        customerId: req.body.customerId,
        rideType: req.body.rideType,
        date: req.body.date, // date to be picked
        time: req.body.time,    // time to be picked
        pickUp: req.body.pickUp,
        dropOff: req.body.dropOff,
        bookUpdate: "Pending",
        driverId: "",
        driverName: "",
    });
    book.save().then((data) => {
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

 // update book record
exports.updateBooking = (req, res) => {
    // validate
    if(!req.body.customerId){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    BookingModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((book) => {
        if(book){
            return res.status(200).send(book);
        }
        return res.status(200).send(book)
        .send({message: "No booking found"})
    })
    .catch((err) => {
        return res.status(500)
        .send({message: "Could not upddate: " + err.message});
    });
};


 /**
 * TODO DELETE
 */

 // delete an about record
exports.deleteBooking = (req, res) => {
    BookingModel.findByIdAndDelete(req.params.id)
    .then((book) => {
        if(book){
            return res.status(200).send({message: "Deleted successfully"});
        }
        return res.status(404).send({message: "Booking not found"});
    })
    .catch((err) => {
        return res.status(404).send({message: "Couldn't delete booking record"});
    });
};

// delete all booking records
exports.deleteAllBooks = (req, res) => {
    BookingModel.find()
    .deleteMany()
    .then(() => {
        return res.status(200).send({message: "Deleted all booking records"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.meesage});
    })
};
























