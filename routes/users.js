var express = require('express');
var router = express.Router();
var User = require('../models/User');


/* GET ALL users */
router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);

    });
});

router.post('/filtranombre', function(req, res, next) {
    var name = req.body.name;
    User.find({name: name}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});
router.post('/filtrasurname', function(req, res, next) {
    var surname = req.body.surname;
    User.find({surname: surname}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});
router.post('/filtrarole', function(req, res, next) {
    var role = req.body.role;
    User.find({role: role}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});
router.get('/alfabetico', function(req, res, next) {
    User.find({},null, {sort: {name: 1}},function (err, users) {
        if (err) return next(err);
        res.json(users);

    });
});
//registrarse
router.post('/register', function(req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
//login
router.post('/detalleusuairo', function(req, res, next) {
    var name = req.body.name;

    User.findOne({name: name}, function(err, user){
        if(err){
            next(err);
        }
        if(!user){
            //return res.status(494).send();
            res.json(user);
        }
        var newuser = new User();
        newuser.name = user.name;
        newuser.surname= user.surname;
        newuser.role=user.role;
        res.json(newuser);
    });

});
router.post('/updateusuario', function(req, res, next) {
    var id = req.body.id;
    var surname = req.body.surname;
    var role = req.body.role;
    var name = req.body.name;
    User.findByIdAndUpdate(id, { $set:{name: name, surname:surname, role:role}},{ new: true }, function(err, user){
        if(err){
            next(err);
        }
        if(user){
            //return res.status(494).send();
            res.json(user);
        }
    });

});
router.post('/bloquear', function(req, res, next) {
    var id = req.body.id;
    var bloqueado = req.body.bloqueado;
    User.findByIdAndUpdate(id, { $set:{bloqueado: bloqueado}},{ new: true }, function(err, user){
        if(err){
            next(err);
        }
        if(user){
            //return res.status(494).send();
            res.json(user);
        }
    });

});
router.post('/login', function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    User.findOne({name: name,password: password, role:"administrador"}, function(err, user){
        if(err){
            next(err);
        }
        if(!user){

            return res.status(494).send();
        }
        return res.status(200).send('estas loegadisimo!');
    });

});
router.get('/removeone/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
router.get('/removeall', function(req, res, next) {
    User.remove(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/login123', function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  User.findOne({name: name,password: password}, function(err, user){
    if(err){
      next(err);
    }
    if(!user){
      return res.status(494).send('no existe este usuario/la constraseña es incorrecta');
    }
    return res.status(200).send('estas loegadisimo!');
  });

});
//proba
router.post('/proba', function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var address = req.body.address;

    var newuser = new User();
    newuser.name = name;
    newuser.password= password;
    newuser.address = address;
    newuser.save(function(err, saveuser){
      if (err){
        next(err);
      }
      res.json(saveuser);
    });

});



module.exports = router;
