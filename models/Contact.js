import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
    },  
    phone: {
        type: String,
 

    },
    address: {
        type: String,
 

    },

    postedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"

    }


    }
)

const ContactModel = mongoose.model('contact', ContactSchema)
export{ContactModel}