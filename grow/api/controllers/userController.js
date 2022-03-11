const User = require('../models/User')


exports.getAll=(req, res) =>{
  User.findAll().then((users) => res.send(users));
}

exports.register = (req,res) =>{
    User.create(req.body).then(user => {
        res.status(201).send(user);
      });    
}
exports.logout= (req,res)=>{
    req.logOut();
  res.sendStatus(200);
}

exports.update=(req,res)=>{
    const { id } = req.params;
    User.update(req.body, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    }).then(result => {
      const user = result[1];
      res.status(201).json({
        user,
      });
    });
}

exports.me = (req,res)=>{
    if (!req.user) return res.sendStatus(401);
    res.send(req.user);
}

exports.login=(req,res)=>{
  res.send(req.user);
}