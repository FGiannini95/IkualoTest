const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class usersControllers {

  createUser = (req, res) => {
    const {name, lastname, email, password} = req.body;
    //validación
    //enciptamiento
    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function(err, saltRounds){
      bcrypt.hash(password, saltRounds, function(err, hash){
        if(err){
          console.log(err);
        }else{
          let sql = 
            `INSERT INTO user
            (name, lastname, email, password)
            VALUES
            ('${name}', '${lastname}', '${email}', '${password}')`

            connection.query(sql, (error, result)=>{
              console.log(error);
              error
                ? res.status(500).json({error})
                : res.status(200).json({ message: 'Usuario creado correctamente' })
            })
        }
      })
    })
  }

  login = (req, res) => {
    const {email, password} = req.body;

    let sql = 
      `SELECT * 
        FROM user 
        WHERE email = '${email}'`

    connection.query(sql, (error, result) => {
      if(error) return res.status(500).json(error);
      //no encuentro el usuario en la bbdd
      if(!result || result.length == 0){
        res.status(401).json({ message: 'El correo no existe' })
      } else if (result[0].is_deleted == 1){
        res.status(401).json({ message: 'Usuario bloqueado'})
      } else {
        //encuentro el usuario
        const user = result[0];
        //comparación de las contraseñas
        const hash = user.password;

        bcrypt.compare(password, hash, (error, response) => {
          if(error) return res.status(500).json(error);
          if(response == true){
            const token = jwt.sign(
              {
                user: {
                  id: user.id,
                }
              },
              process.env.SECRET, {expiresIn: "1d"}
            )
            res.status(200).json({token, user});
          } else {
            res.status(401).json("Contraseña incorecta");
          }
        })
      }
    })
  }

  oneUser = (req, res) => {
    const id = req.params.id;
    let sql = 
    `SELECT * 
      FROM user 
      WHERE id = ${id} and is_deleted = 0`

      connection.query(sql, (error, result) => {
        error
          ? res.status(500).json({error})
          : res.status(200).json(result)
      })
  }

}

module.exports = new usersControllers;