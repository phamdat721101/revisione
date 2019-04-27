const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../model/user');
// router.get('/login',(req,res) => {
//     res.render('login')
// });
router.post('/register',(req,res) =>{
    const {name,email,password} = req.body;
    let errors = [];
    const newUser = new User({name,email,password});
    newUser.save().then(user => {
        req.flash(
            'success_msg',
            'You are now registered and can log in'
        );
        console.log('Success add user');
    });
});
router.post('/login',(req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email:req.body.email,password:req.body.password}).then(user => {
        console.log(user);
        return res.json(user);
    })
    
});
module.exports = router;