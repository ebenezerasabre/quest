const ReviewModel = require('../models/ReviewModel');


/**
 * TODO FIND
 */

exports.findAllReviews = (req, res) => {
    ReviewModel.find()
    .then((reviews) => {
        if(reviews) {
            console.log(reviews);
            return res.status(200).send(reviews);
        }
        return res.status(404).send({message: "Reviews not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};


exports.findReviewById = (req, res) => {
    ReviewModel.findById(req.params.id)
    .then((review) => {
        if(review) {
            console.log(review);
            return res.status(200).send(review);
        }
        return res.status(404).send({message: "Review not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message || "Error occured"});
    });
};

exports.findUserReviews = (req, res) => {
    // ReviewModel.findOneAndUpdate()

    ReviewModel.find( { userId: { $eq: req.params.id } })
    .then((reviews) => {
        if(reviews){
            return res.status(200).send(reviews);
        }
        return res.status(404).send({message: "Reviews not found"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    })
};

 /**
 * TODO COUNT
 */

exports.countReviews = (req, res) => {
    ReviewModel.find()
    .countDocuments()
    .then((total) => {
        if(total){
            console.log(total);
            return res.status(200).send({message: total});
        } 
        return res.status(404)
        .send({message: "Couldn't count reviews"});
    })
    .catch((err) => {
       return res.status(500)
       .send({message: "Error counting reviews"});
    });
};


 /**
 * TODO CREATE
 */

exports.createReview = (req, res) => {
    if(!req.body.userId || !req.body.driverId){
        return res.status(400)
        .send({message: "Required field can't be empty"});
    }
    // create
    const Review = new ReviewModel({
        driverId: req.body.driverId,
        userId: req.body.userId,
        msg: req.body.msg,
        stars: req.body.stars
    });
    // save
    Review.save().then((review) => {
        if(review){
            return res.status(200).send(review);
        }
        return res.status(404).send({message: "Could not create review"});
    })
    .catch((err) => {
        return res.status(500).send({message: err.message});
    });
};

 /**
 * TODO UPDATE
 */
// update review record
exports.updateReview = (req, res) => {
    if(!req.params.id){
        return res.status(400).send({message: "Required field can't be empty"});
    }
    ReviewModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((review) => {
       if(review) {
           return res.status(200).send(review);
       }
       return res.status(404)
       .send({message: "No review found"});
   })
   .catch((err) => {
      return res.status(500)
      .send({message: err.message});

   });
};



 /**
 * TODO DELETE
 */
// delete review record
exports.deleteReview = (req, res) => {
    ReviewModel.findByIdAndRemove(req.params.id)
    .then((review) => {
       if(review) {
           return res.status(200).send({message: "Deleted successfully"});
       }
       return res.status(404).send({message: "Review not found"});
   })
   .catch((err) => {
       return res.status(404).send({message: err.message});
   });

};

// delete all review records
exports.deleteAllReviews = (req, res) => {
    ReviewModel.find()
    .deleteMany()
    .then(() => {
        return res.status(200).send({message: "Deleted all review records"});
     })
     .catch((err) => {
        return res.status(500).send({message: err.message});
     });
 };