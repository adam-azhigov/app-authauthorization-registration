const User = require("../models/User.model");
const {response} = require("express");
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports.userController = {
    getUsers: async (req,res) => {
        try {
            const users = await User.find();
            res.json(users);
            console.log(users)
        } catch (e){
            res.json(e.message)
        }
    },

    registerUser: async (req,res) => {
        try {
            const {login,fullName,password,dateOfBirth,gender,email } = req.body;
            const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

            const user = await User.create({
                login: login,
                fullName: fullName,
                password: passwordHash,
                dateOfBirth: dateOfBirth,
                gender: gender,
                email: email
            })
            res.json(user)

        } catch (e){
            console.log(e)
            res.status(500).json(e.message)
        }
    },

    editUSer: async (req,res) =>  {
        try{
            const { fullName,email,password } = req.body

            const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

            const user = await User.findByIdAndUpdate( (req.userId),
                {fullName,email,
                password: passwordHash},
                {new: true}
            )
            res.json(user)

        } catch (e){
            console.log(e.message)
            res.json(e.message)
        }
},
    authUser: async (req,res) => {
        const {email, password} = req.body;
        try {
            const canditate  = await User.findOne({email})
                if (!canditate) {
                    return  res.status(404).json({error: "Пользователь не найден"})
            }
            const isValidPass = await bcrypt.compare(password, canditate.password)
                if (!isValidPass) {
                    return res.status(404).json({error: "Неверный логин или пароль"})
                }
            const payload = {
                id: canditate._id
            }
            const token =  jwt.sign(
                payload,
                process.env.SECRET_JWT_KEY, {
                    expiresIn: "24h"
                }
            )
            const { ...userData } = canditate._doc;
             res.json({
                 userData,
                 token
             })
        } catch (e) {
            console.log(e)
            res.status(500).json({error:'Не удалось авторизоваться'})
        }

    },
    getByUserId: async (req,res) => {
       try {
           const user = await User.findById(req.userId)

           if (!user) {
               return res.status(404).json('Пользователь не найден')
           }
           const { ...userData } = user._doc;
           res.json({...userData })

       } catch (e){
            res.json(e.message)
       }
}

}
