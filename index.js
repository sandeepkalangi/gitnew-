const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Users = require('./models/user');

const userRoutes = require('./routes/useroutes');

mongoose.connect('mongodb://sandeep:Sandeep1234@ds259742.mlab.com:59742/testnodejs', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', function () {
    console.log("Database is connected");
});



const app = express();



app.use(bodyParser.json());
app.use(cors());

app.use('/api/users/', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('App is running!', PORT);
});

// app.post('/addusers', function (req, res) {
//     const { username, Firstname, Lastname } = req.body;
//     const user = new Users({ username, Firstname, Lastname });
//     user.save(function (err, user) {
//         if (err) {
//             return res.status(422).send({ 'message': 'Could not Add user' });
//         }

//         return res.send(user);
//     });
// });

// app.get('/getusers', function (req, res) {

//     Users.find(function (err, user) {
//         if (err) {
//             return res.status(422).send({ 'message': 'Could not Find user' });
//         }

//         return res.json({ 'status': true, user });
//     });
// });
// app.get('/getuserbyid/:id', function (req, res) {

//     Users.findById(req.params.id, function (err, user) {
//         if (err) {
//             return res.status(422).send({ 'message': 'Could not Find user' });
//         }

//         return res.json({ 'status': true, user });
//     });
// });

// app.put('/updateusers', function (req, res) {

//     Users.findOneAndUpdate({ username: req.body.username }, req.body, { new: true }, function (err, user) {
//         if (err) {
//             return res.status(422).send({ 'message': 'Could not Find user' });
//         }
//         return res.send(user);
//     });
// });

// app.delete('/deleteuser/:id', function (req, res) {

//     Users.deleteOne({ _id: req.params.id }, { new: true }, function (err, user) {
//         if (err) {
//             return res.status(422).send({ 'message': 'Could not Find user' });
//         }

//         return res.send({ "message": "User Deleted" });
//     });
// });