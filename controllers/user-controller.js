var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/create', (req, res) => {
    const userObj = {
      firstName:req.body.user.firstName,
      lastName: req.body.user.lastName,
      email:req.body.user.email,
      passwordHash: bcrypt.hashSync(req.body.user.password, 10)
    }
    
    User.create(userObj)
      .then(user => {
        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.status(200).json({
          user: user,
          message: 'created',
          sessionToken: token
        })
      })
      .catch(err => {
        res.status(500).json({error: err})
        console.log(err); 
      })
})
  
router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.user.email
      }
    })
      .then( user => {
        if (user){
          bcrypt.compare(req.body.user.password, user.passwordHash, (err, matches) => {
            if (matches) {
              var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
              res.status(200).json({
                user: user,
                message: 'successfully authenticated',
                sessionToken: token
              })
            } else {
              res.status(500).send({error: 'failed to authenticate'});
            }
          })
        } else{
          res.status(500).send('UN or PW is incorrect (or both)');
        }
      }
      )
      .catch(err => res.status(500).json({err: err}))
})

module.exports = router;