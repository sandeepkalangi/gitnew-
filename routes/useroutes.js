const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

router.get('/getusers', function (req, res) {
    Users.find()
        .exec(function (err, foundUsers) {

            if (err) {
                return res.status(422).send({ 'message': 'Couldnt get users' });
            }

            return res.json(foundUsers);
        });
});

router.get('/getusersbyFirstname/:Firstname', function (req, res) {

    Users.findOne({ Firstname: req.params.Firstname }, function (err, user) {
        if (err) {
            return res.status(422).send({ 'message': 'Could not Find user' });
        }
        return res.send(user);

    })

})



router.post('/signup', function (req, res) {
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password);
   // const { email, password } = req.body;
    const user = new Users({ email, password });
    user.save(function (err, user) {
        if (err) {
            return res.status(422).send({ 'message': 'Could not Add user' });
        }

        return res.send(user);
    });
});

router.post('/login', (req, res) =>{
    const { email, password } = req.body;
    Users.findOne({ email }, function (err, user) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
  
      if (!user) {
        return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'User does not exist' }] });
      }
    let result = bcrypt.compareSync(password,user.password);
    if(!result){
        res.send('wrong password')
    }
    let token = jwt.sign({email:user.email},'secret',{ expiresIn: '1h' })

    res.send({auth:true,token:token,user:user})
    });
    
});



module.exports = router;