const User = require("../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

const controllerUser = {
  register: async (req, res) => {
    try {
      const {
        cohortID,
        assignedCohortsID,
        firstName,
        middleName,
        lastName,
        secondSurname,
        documentType,
        documentNumber,
        email,
        password,
        contactNumber,
        role,
        programBootcamp,
        state,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !secondSurname ||
        !documentType ||
        !documentNumber ||
        !email ||
        !password ||
        !contactNumber
      )
        return res
          .status(400)
          .json({ msg: "Todos los campos son requeridos." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Correo electronico invalido." });

      const user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ msg: "Este correo electronico ya existe ." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "La contraseña debe tener al menos 6 caracteres." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        cohortID,
        assignedCohortsID,
        firstName,
        middleName,
        lastName,
        secondSurname,
        documentType,
        documentNumber,
        email,
        passwordHash,
        contactNumber,
        role,
        programBootcamp,
        state,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/api/activation/${activation_token}`;
      sendMail(firstName, email, url, "register");

      res.json({
        msg: "Registro exitoso! para activar tu cuenta, revisa tu correo electronico.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const {
        cohortID,
        assignedCohortsID,
        firstName,
        middleName,
        lastName,
        secondSurname,
        documentType,
        documentNumber,
        email,
        passwordHash,
        contactNumber,
        role,
        programBootcamp,
        state,
      } = user;

      const check = await User.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({ msg: "Este correo electronico ya existe." });

      const newUser = new User({
        cohortID,
        assignedCohortsID,
        firstName,
        middleName,
        lastName,
        secondSurname,
        documentType,
        documentNumber,
        email,
        passwordHash,
        contactNumber,
        role,
        programBootcamp,
        state,
      });

      await newUser.save();
      res.json({ msg: "La cuenta fue activada exitosamente" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body, "ingresologin");
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      const isMatch =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(401).json({
          error: "Usuario o Contraseña incorrectos",
        });
      }

      const refresh_token = createRefreshToken({ id: user._id });

      res.send({
        email: user.email,
        refresh_token,
        msg: "Ingreso exitoso!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.body.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Ahora puede ingresar!!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Ahora puede ingresar!!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "Este correo electronico no esta registrado." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(user.firstName, email, url, "resetPassword");
      res.json({ msg: "verifica tu email para cambiar contraseña." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          passwordHash: passwordHash,
        }
      );

      res.json({ msg: "Contraseña cambiada correctamente!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAdminAllInfo: async (req, res) => {
    try {
      const users = await User.find({ role: 2 }).select("-password");

      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllStudents: async (req, res) => {
    try {
      const users = await User.find(
        { role: 0 },
        { cohortID: req.params._id }
      ).select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.json({ msg: "eliminacion exitosa!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = controllerUser;
