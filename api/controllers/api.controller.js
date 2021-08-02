/** importing dependencies */
import bcrypt from 'bcrypt'

/** importing models */
import {userAccount} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

/** Creating user account */
export const createUser = async (req, res) =>{
   // accepting request data's
   const fullName = req.body.fullName
   const email = req.body.email
   const password = req.body.password
   
   // checking if the user exists
   let isExist = await userAccount.findOne({email})
   if(isExist){
       return res.json({message: 'user email exists! please try another!'})
   }
   const encryptPass = await bcrypt.hash(password, 10)
   const registerUser = new userAccount({
       fullName,
       email,
       password: encryptPass
   })

   // try to register new user
   try{

     await registerUser.save()
     res.sendStatus(201)

   }catch(err){
       res.json({message: err.message})
   }

}

/** reading user account */
export const readUser = async (req, res) =>{
     
     const {email, password} = req.body
     const user = { email: email }

     let isExist = await userAccount.findOne({email})
     if(!isExist) return res.sendStatus(404)
     //
     let isMatch = await bcrypt.compare(password, isExist.password)
     if(isMatch){
        /// generate access token
        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '3m'})

        // setting access token on header
        res.header('Authorization', 'Bearer ' + token)
        //----------
        return res.sendStatus(200)
     }
     else return res.sendStatus(404)
}

/** read user info */
export const readUserInfo = async(req, res) =>{

    const email = req.user.email
    try{
        const user = await userAccount.findOne({email})
        res.json(user)
 
     }catch(err){
       res.json({message: err.message})
     }
}