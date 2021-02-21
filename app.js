const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const UserModel = require('./models/UserModel');
const HistoryModel = require('./models/HistoyModel');

// const HistoryController = require('./controllers/HistoryController');
// const RideRequestController = require('./controllers/RideRequestController');
const RideRequestModel = require('./models/RideRequestModel');
const { loadavg } = require('os');



http.listen(3000, ()=>{ console.log('ewquest node server running'); });

var AllDrivers = [];


/**
 * MiddleWares
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/**
 * ROUTES
 */
app.get('/', (req, res) => { res.status(200).send('Done');});
app.get('/two', (req, res) => {res.status(200).send('Done second');});
app.get('/file', (req,res)=>{ res.sendFile(__dirname + '/static/index.html');});
app.get('/try', (req,res)=>{ res.sendFile(__dirname + '/static/try.html');});
// app.get('/func', (req, res) => { res.status(200).send(showDrivers());});

app.use("/about", require('./routes/AboutRoutes'));
// User routes
app.use("/user", require('./routes/UserRoutes'));
// Driver routes
app.use("/driver", require('./routes/DriverRoutes'));
// Help routes
app.use("/help", require('./routes/HelpRoutes'));
// History routes
app.use("/history", require('./routes/HistoryRoutes'));
// Review routes
app.use("/review", require('./routes/ReviewRoutes'));
// Support routes
app.use("/support", require('./routes/SupportRoutes'));
// rideRequest routes
app.use("/ride", require('./routes/RideRequestRoutes'));


/** 
 * Users online at the moment 
 */
var usersOnline = [];

/** 
 * Drivers online at the moment
 */
var driversOnline = [];

/**
 * socketIds may change with network flactuatioons
 * identify users with ids
 */

 var updatedSockets = [];

/** 
 * List of pending ride requests
 * If request is accepted remove from list
 */
var requestQueue = [];

/**
 * Accepted ride requests
 */
var acceptedRides = []; 

/**
 * When a ride is completed
 */
var completedRides = [];

/**
 * Drivers who don't want to receive requests at the moment
 * and drivers who have pending request are added to this list
 * If drivers are free or offline, remove them from list
 */
var busyDrivers = []; 



/**
 * SOCKETS
 */

//socket.broadcast.emit will send the event to every single 
//user connected to the server except the user
//io.emit will send the event to all users including the the sender 

io.on('connection', (socket) => {
    var obj = [];
    console.log('User first connection to socket');

    io.to(socket.id).emit('socketId', socket.id);

    // findUsers();

// starts


function findUsers(){
    UserModel.find()
    .then((users) => {
       if(users){
           io.to(socket.id).emit('findUser', JSON.stringify(users));
           console.log(users);
       }
       return {message: "Users not found"};
    })
    .catch((err) => {
        return {message: err.message};
    });

    
}


    // socket.on('insideHistory', (str) => {
    //     console.log("Recieving insideHistory str : " + str);
    //     // HistoryController.insideCreateHistory(str);
    // });


// ends



    socket.on('disconnect', () => {
        userOffline(socket.id);
        console.log('Socket id disconnected ' + socket.id);
    });

    socket.on('join', (userName) => {
        console.log("user joined " + userName);
        io.emit('userJoined', userName);
    });

    socket.on('android', (brand) => {
        console.log("Android brand is " + brand);
        io.emit('androidHere', brand);
    });

 
  
    // when driver or user cancels request
    socket.on('cancel', (requestDetails) => {
        var reqDetails = JSON.parse(requestDetails);
        removeRequestFromQueue(reqDetails.userId);
        // userAndDriverUpdate(reqDetails, 'cancel');
        // RideRequestController.updateRideRequestInside(reqDetails);
        updateHistory(reqDetails, 'cancel');
    });

    function userAndDriverUpdate(reqDetails, status) {
        console.log('user socket ' + updatedSockets[reqDetails.userId]);
        console.log('driver socket ' + updatedSockets[reqDetails.userId]);
        io.to(updatedSockets[reqDetails.userId]).emit(status, JSON.stringify(reqDetails));
        io.to(updatedSockets[reqDetails.driverId]).emit(status, JSON.stringify(reqDetails));

        //*** whrite h */
    }

    function removeRequestFromQueue(userId) {
        requestQueue.filter(function(queue) {
            if(userId === queue.userId){
                return;
            } else { return queue; }
        });
    }


    /** For new requests and rejected requests */
    socket.on('request', (requestDetails) => {
          /**
          * convert json string to javascript object
          * Update reqDetails as driver accepts or rejects request
          */
        
        var reqDetails = JSON.parse(requestDetails);

        // drivers closer to user during time of ride request
        var proximityDrivers = sortedProximityDrivers(reqDetails);
        reqDetails = addProximityDriver(proximityDrivers, reqDetails);
        addRequestToQueue(reqDetails);

        // // driver can't receive new request if he has a pending request
        // sendRequestToClosestDriver(reqDetails);

        //    // creating rideRequest 
        // RideRequestController.createRideRequestsInside(reqDetails);

        createHistory(reqDetails);
    });


    // when driver accepts users request
    socket.on('accept', (requestDetails) => {
        var reqDetails = JSON.parse(requestDetails);
        // removeRequestFromQueue(reqDetails.userId);
        // userAndDriverUpdate(reqDetails, 'accept');

        // updating rideRequest repository
        // RideRequestController.updateRideRequestInside(reqDetails);
        updateHistory(reqDetails, 'accept');
    });


    // starts ride when driver picks up user
    socket.on('start', (requestDetails) => {
        var reqDetails = JSON.parse(requestDetails);
        removeRequestFromQueue(reqDetails.userId);
        removeFromBusyDrivers(reqDetails.dSocketId);
        // userAndDriverUpdate(reqDetails, 'start');
        // RideRequestController.updateRideRequestInside(reqDetails);
        updateHistory(reqDetails, 'start');
    });
    
    socket.on('finish', (requestDetails) => {
        var reqDetails = JSON.parse(requestDetails);
        // userAndDriverUpdate(reqDetails, 'finish');
        // RideRequestController.updateRideRequestInside(reqDetails);
        updateHistory(reqDetails, 'finish');

    });



    function sendRequestToClosestDriver(requestDetails){
        io.to(updatedSockets[requestDetails.proximityDriver]).emit("targetDriver", JSON.stringify(requestDetails));
        addToBusyDrivers(updatedSockets[requestDetails.proximityDriver]);
    }

    /**
     * Drivers yet to accept ride requests are automatically added to busy drivers
     * This is to prevent one driver from getting more than one request at a time
     * @param  driverSocketId 
     */

    function addToBusyDrivers(driverSocketId){
        if(!busyDrivers.includes(driverSocketId)){
            busyDrivers.push(driverSocketId);
        }
    }

    function removeFromBusyDrivers(driverSocketId){
        if(busyDrivers.includes(driverSocketId)){
            busyDrivers = busyDrivers.filter(function(id){
                if(id === driverSocketId){ return; }
                else { return id; }
            });
        }
    }

    function addRequestToQueue(requestDetails){
        // update old requests
       requestQueue.filter(function(queue){
           if(requestDetails.userId === queue.userId){
               return requestDetails;
           } else { return queue; }
       });
       // add new requests
       requestQueue.push(requestDetails); 
    }

    function addProximityDriver(proximityDrivers, requestDetail){
        if(proximityDrivers.length > 0){
            var zeroIndex = 0;
            // requestDetail.proximityDriver = proximityDrivers[zeroIndex].socketId;
            requestDetail.proximityDriver = proximityDrivers[zeroIndex].driverId;
        }
        return requestDetail;
    }

    function sortedProximityDrivers(reqDetails){

    var drivers = [];
    var rejects = [];

    rejects = reqDetails.driverReject.split(',');
    for(var x=0;x<rejects.length;x++){
        removeFromBusyDrivers(rejects[x]);
    }

    drivers = driversOnline.filter(function(obj){
    /**
    * Driver selection criteria
    * Same city and rideType, not busy, has not rejected request
    */
    if(reqDetails.city === obj.city && 
        !busyDrivers.includes(obj.socketId) && 
        reqDetails.rideType === obj.rideType && 
        !rejects.includes(updatedSockets[obj.driverId])
        ){
        // driver proximity to user
        var proximity = distanceBtwn(reqDetails.lat, obj.lat, reqDetails.lng, obj.lng);

        obj.proximity = proximity.toString(); 
        return obj;
    }
        else { return; }
    });
    console.log('The drivers');
    for(var c=0;c<drivers.length;c++){
        console.log(drivers[c]);
    }
    console.log('Drivers online length ' + driversOnline.length);


    return drivers.sort((a, b) => a.proximity - b.proximity);
     
   }

    function showBusyDrivers(){
        console.log('Showiiiingngngn');
        for(var y=0;y<busyDrivers.length;y++){
            var position = y + 1;
            console.log(busyDrivers[y]);
        }
    }

    socket.on('busyDriver', (driverId) => {
        if(!busyDrivers.includes(updatedSockets[driverId])){
            console.log('Receving busy drive socketId ' + updatedSockets[driverId]);
            addToBusyDrivers(updatedSockets[driverId]);
            showBusyDrivers();
        }
    });

 
    socket.on('freeDriver', (driverId) => {
        if(busyDrivers.includes(updatedSockets[driverId])){
            console.log('freeing driver with id ' + driverId);
            removeFromBusyDrivers(updatedSockets[driverId]);
            showBusyDrivers();
        }
    });

    // in android client, userOnline is emitted when coordinates
    // are availible in moveCamera method
    socket.on('userOnline', (userOnlineDetails) => {
            var obj = JSON.parse(userOnlineDetails);
            // console.log('Online called userType: ' + obj.userType);
            updatedSockets[obj.userId] = obj.socketId;
            var user = {
                userId: obj.userId,
                userType: obj.userType,
                socketId: updatedSockets[obj.userId]
            }
            addUserOnline(user);
            notifyUserOnline(user.userId); 
            console.log('user online length ' + usersOnline.length);
    });

    // in android client, userOnline is emitted when coordinates
    // are availible in moveCamera method
    socket.on('driverOnline', (driverOnlineDetails) => {
        var obj = JSON.parse(driverOnlineDetails);
        updatedSockets[obj.driverId] = obj.socketId;
        var driver = {
            driverId: obj.driverId,
            userType: obj.userType,
            socketId: updatedSockets[obj.driverId],
            city: obj.city,
            lat: obj.lat,
            lng: obj.lng,
            rideType: obj.rideType
        };
        addDriverOnline(driver);
        notifyDriverOnline(driver.driverId);
    });

    // if user comes online
    function addUserOnline(user){
        for(var y=0;y<usersOnline.length;y++){
            if(usersOnline[y].userId === user.userId){ 
                usersOnline[y] = user;
                return; 
            }
        }
        usersOnline.push(user);
        console.log("Adding user");
        for(var u=0;u<usersOnline.length;u++){
            console.log(usersOnline[u]);
        }
    }

    function addDriverOnline(driver){
        for(var y=0;y<driversOnline.length;y++){
            if(driversOnline[y].driverId === driver.driverId){
                driversOnline[y] = driver;
                return;
            } 
        }
        driversOnline.push(driver);
        console.log("Adding driver");
        for(var u=0;u<driversOnline.length;u++){
            console.log(driversOnline[u]);
        }
    }



    function notifyUserOnline(userId){
        usersOnline.filter(function(userOnline){
            if(userOnline.userId === userId){
                io.to(updatedSockets[userOnline.userId]).emit("userOnline", JSON.stringify(userOnline));
                console.log('User online : ' + JSON.stringify(userOnline));
            }
            return userOnline;
        });
    }

    function notifyDriverOnline(driverId){
        driversOnline.filter(function(driverOnline){
            if(driverOnline.driverId === driverId){
                io.to(updatedSockets[driverOnline.driverId]).emit("driverOnline", JSON.stringify(driverOnline));
                console.log( 'Driver online : ' + JSON.stringify(driverOnline));
            }
            return driverOnline;
        });
    }

    // if user get's disconnected
    function userOffline(socketId){
        /**
     * Remove user from online
     */
        usersOnline = usersOnline.filter(function(obj){
            if(obj.socketId === socketId){
                updatedSockets[obj.userId] = '';
                    return;
                } 
            
            else { return obj; }
        });
        console.log("user length " + usersOnline.length);
    
        /** Remove driver from online */
        driversOnline = driversOnline.filter(function(obj){
            if(obj.socketId === socketId){ 
                updatedSockets[obj.userId] = '';
                return; 
            }
            else { return obj; }
        });

        /** If driver is part of busy drivers remove him */
        busyDrivers = busyDrivers.filter(function(id){
            if(id === socketId){ return; }
            else { return id; }
        });
        console.log('Driver length ' + driversOnline.length);
    
    }

    function distanceBtwn(lat1, lat2, lng1, lng2){
        // dinstance btwn user and drivers
        // convert degrees to radians
        lat1 = toRadians(lat1);
        lat2 = toRadians(lat2);
        lng1 = toRadians(lng1);
        lng2 = toRadians(lng2);

        // Haversine formula
        var dLat = lat2 - lat1;
        var dLng = lng2 - lng1;

        var a = Math.pow(Math.sin(dLat / 2), 2) 
        + Math.cos(lat1) * Math.cos(lat2) 
        * Math.pow(Math.sin(dLng / 2), 2);

        var c = 2 * Math.asin(Math.sqrt(a));

        // Radius of earth 3956 miles or 6371 km
        var r = 6371;
        // result in km
        return c * r;
    }

    function toRadians(degress){
        var pi = Math.PI;
        return degress * (pi/180);
    }

    function createHistory(body){
        if(!body.userId){
            console.log("Required field can't be empty");
            return;
        }
        // create
        const RideRequest = new RideRequestModel({
    
            userName: body.userName,
            userId: body.userId,
            userType: body.userType,
            phoneNumber: body.phoneNumber,
            socketId: body.socketId,
            entryPoint: body.entryPoint,
    
            exitPoint: body.exitPoint,
            lat: body.lat,
            lng: body.lng,
            city: body.city,
            rideType: body.rideType,
    
            proximityDriver: body.proximityDriver,
            driverId: body.driverId,
            dSocketId: body.dSocketId,
            dLat: body.dLat,
            dLng: body.dLng,
    
            dArrivalTime: body.dArrivalTime,
            dName: body.dName,
            dRideDescription: body.dRideDescription,
            dRideNumber: body.dRideNumber,
            dFinishedRides: body.dFinishedRides,
    
            driverReject: body.driverReject,
            rideState: body.rideState,
            fee: body.fee
    
        });
    
        // save
        RideRequest.save()
        .then((ride) => {
            if(ride) {
                console.log(ride);
                sendRequestToClosestDriver(ride);
            }
            return;
        }).catch((err) => {
            console.log(err.message);
            return;
        });
    }

    function updateHistory(body, status){
        RideRequestModel.findByIdAndUpdate(body._id, body, {new: true})
        .then((ride) => {
            if(ride){
                console.log('Updating ride');
                console.log(ride);
               userAndDriverUpdate(ride, status);
            }
            return;
        })
        .catch((err) => {
            console.log(err.message);
            return;
        });
    }

    

});

// If you ever really learn something
// It usally means that you have to recognise that you were wrong
// in some important way
