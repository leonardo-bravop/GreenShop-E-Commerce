const Role = require("../models/Role");
const User = require("../models/User");

exports.getAll = (req, res, next) => {
  const { id } = req.params;

  if (id === "2" || id === "3") {
    User.findAll()
      .then((users) => res.send(users))
      .catch((error) => {
        next(error);
      });
  } else {
    res.sendStatus(401);
  }
};

exports.register = (req, res, next) => {
  const { name, lastname, email, password } = req.body;
  const roleId = 1;
  User.create({
    name,
    lastname,
    email,
    password,
    roleId,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      next(error);
    });
};

exports.logout = (req, res, next) => {
  req.logOut();
  res.sendStatus(200);
};

exports.update = (req, res, next) => {
  const { id } = req.params;
  User.update(req.body, {
    where: {
      id,
    },
    returning: true,
    plain: true,
  })
    .then((result) => {
      const user = result[1];
      res.status(201).json({
        user,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.me = (req, res, next) => {
  if (!req.user) return res.sendStatus(401);
  res.send(req.user);
};

exports.login = (req, res, next) => {
  res.send(req.user);
};

//Admin
exports.adminPromote = (req, res, next) => {
  const { id } = req.body;
  User.update(
    { roleId: 2 },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};

exports.suprAdmin = (req, res, next) => {
  const { id } = req.body;
  User.update(
    { roleId: 1 },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  )
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
};

exports.allAdmin = (req, res, next) => {
  const { id } = req.params;
  User.findAll({ where: { roleId: 4 } })
    .then((admins) => {
      res.send(admins);
    })
    .catch((error) => {
      next(error);
    });
};

exports.createRole = (req, res, next) => {
  Role.create(req.body)
    .then((newRole) => {
      res.send(newRole);
    })
    .catch((error) => {
      next(error);
    });
};
