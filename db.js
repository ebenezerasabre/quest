const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EwquestDb', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
(err) => {
    if(!err){
        console.log('Successfully established connnections with MongoDB');
    } else {
        console.log('Failed to establish connection with MongoDB');
    }
});

module.exports = mongoose;
