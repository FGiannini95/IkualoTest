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
    console.log("hellou");
  }

  oneUser = (req, res) => {
    console.log("hellou user");
  }

}

module.exports = new usersControllers;