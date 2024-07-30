import express from 'express';
import { Register,Login, Auth, GetProfile , EditProfile } from '../controller/userController.js';




const router = express.Router()

import {body} from 'express-validator';
import { VerifyUser } from '../middleware/VerifyUser.js';
import { createContact, getContact ,getContactbyid,updateContact,deleteContact} from '../controller/contactController.js';

// User Routes


router.post('/register', Register)

router.post('/register',[
    body("name").trim().notEmpty().withMessage("Name Should Not be Empty"),
    body("email").trim().notEmpty().withMessage("Email Should Not be Empty")
    .isEmail().withMessage("Invalid Email ! ! ! "),
    body("password").trim().notEmpty().withMessage("Password Should Not be Empty")
    .isLength({min:5,max:30}).withMessage("Password Length be 5-30")],Register
)


router.post('/login',[
    
    body("email").trim().notEmpty().withMessage("Email Should Not be Empty")
    .isEmail().withMessage("Invalid Email ! ! ! "),
    body("password").trim().notEmpty().withMessage("Password Should Not be Empty")
    .isLength({min:5,max:30}).withMessage("Password Length be 5-30")],Login
)


router.get("/verify",VerifyUser ,Auth)

router.put('/editprofile',VerifyUser,EditProfile )


// Contacts Routes

router.post('/addcontact',VerifyUser,createContact )


router.get('/contacts',VerifyUser,getContact )
router.get('/getprofile',VerifyUser,GetProfile )

router.get('/contacts/:id',VerifyUser,getContactbyid )

router.put('/updatecontact/:id',VerifyUser,updateContact)
router.delete('/deletecontact/:id',VerifyUser,deleteContact)

export{router as Router}

