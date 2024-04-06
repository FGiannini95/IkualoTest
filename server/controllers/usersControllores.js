const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerValidator = require("../utils/registerValidator");
require("dotenv").config();

class usersControllers {
  createUser = (req, res) => {
    const { name, lastname, email, password } = req.body;
    //validación
    const validation = registerValidator(req.body);
    if (validation) {
      //encriptamiento
      let saltRounds = 8;
      bcrypt.genSalt(saltRounds, function (err, saltRounds) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            console.log(err);
          } else {
            let sql = `INSERT INTO user
            (name, lastname, email, password)
            VALUES
            ('${name}', '${lastname}', '${email}', '${hash}')`;

            connection.query(sql, (error, result) => {
              error
                ? res.status(500).json({ error })
                : res
                    .status(200)
                    .json({ message: "Usuario creado correctamente" });
            });
          }
        });
      });
    } else {
      res.status(404).json({ message: "Ha habido algun problema" });
    }
  };

  login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * 
        FROM user 
        WHERE email = '${email}'
        AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) return res.status(500).json(error);
      //no encuentro el usuario en la bbdd
      if (!result || result.length == 0) {
        res.status(401).json({ message: "El correo no existe" });
      } else {
        //encuentro el usuario
        const user = result[0];
        //comparación de las contraseñas
        const hash = user.password;
        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(500).json(error);
          if (response == true) {
            const token = jwt.sign(
              {
                user: {
                  id: user.id,
                },
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            );
            res.status(200).json({ token, user });
          } else {
            res.status(401).json({ message: "Contraseña incorrecta" });
          }
        });
      }
    });
  };

  oneUser = (req, res) => {
    const id = req.params.id;
    let sql = `SELECT * 
      FROM user 
      WHERE id = ${id} and is_deleted = 0`;

    connection.query(sql, (error, result) => {
      error ? res.status(500).json({ error }) : res.status(200).json(result);
    });
  };

  recoverPassword = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT *
      FROM user
      WHERE email = '${email}'`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      if (result.length === 0) {
        res.status(500).json({ message: "Usuario no encontrado" });
        return;
      }
      const user = result[0];
      let saltRounds = 8;
      bcrypt.genSalt(saltRounds, function (err, saltRounds) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) {
            console.log(err);
          } else {
            let sql2 = `UPDATE user SET password = '${hash}' WHERE id = '${user.id}'`;
            connection.query(sql2, (error2, result2) => {
              error
                ? res.status(500).json({ error2 })
                : res.status(200).json(result2);
            });
          }
        });
      });
    });
  };
}

module.exports = new usersControllers();
