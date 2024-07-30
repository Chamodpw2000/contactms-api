import express from "express";
import { ContactModel } from "../models/Contact.js";

const createContact = async (req, res) => {
    const { name, email, phone, address } = req.body;

    console.log(req.body)

    try {

        const { email, phone, name, address } = req.body;


        const userExist2 = await ContactModel.findOne({ phone, posted_by: req.user._id });

        const userExist = await ContactModel.findOne({ email,  posted_by: req.user._id });

       

        if (userExist && phone !=="") {
            return res.status(400).json({
                errors: [{ msg: "You allready have a Contact with this email " }],
            });
        }



        if (userExist2 && email !=="") {
            return res.status(400).json({
                errors: [{ msg: "You allready have a Contact with this Phone Number " }],
            });
        }








        








        const newContact = new ContactModel({
            name,
            email,
            phone,
            address,
            postedBy: req.user._id
        });

        const result = await newContact.save();
        return res.status(201).json({ success: true, ...result._doc });
    } catch (err) {
        return res.status(500).json(err.message)
    }

};




const getContact = async (req, res) => {

    try {
        const contacts = await ContactModel.find({ postedBy: req.user._id })
        return res.status(200).json({ success: true, contacts })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

}

const getContactbyid = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(401).json({ error: "No Id specified" })
    }

    try {
        const contacts = await ContactModel.findOne({ _id: id })
        return res.status(200).json({ success: true, ...contacts._doc })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

}


const updateContact = async (req, res) => {
    const { id } = req.params;
    const conta = await ContactModel.findOne({ _id: id })



    if (!id) {
        return res.status(401).json({ error: "No Id specified" })
    }

    try {

        const { email, phone, name, address } = req.body;





        if (conta.email === email && conta.name === name && conta.phone === phone && conta.address === address) {
            const result = await ContactModel.findOneAndUpdate({ _id: conta._id }, { ...req.body }, { new: true })






            return res.status(200).json({ success: false, ...result._doc })


        }








        const userExist2 = await ContactModel.findOne({ phone, posted_by: req.user._id  });

        const userExist = await ContactModel.findOne({ email,  posted_by: req.user._id  });

       

        if (userExist && email !== conta.email && email!=="") {
            return res.status(400).json({
                errors: [{ msg: "You allready have a Contact with this email " }],
            });
        }



        if (userExist2  && phone !== conta.phone && phone!=="") {
            return res.status(400).json({
                errors: [{ msg: "You allready have a Contact with this Phone Number " }],
            });
        }

        const result = await ContactModel.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })


        return res.status(200).json({ success: true, ...result._doc })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

}


const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(401).json({ error: "No Id specified" })
    }

    try {
        const contact = await ContactModel.findOne({ _id: id })

        if (!contact) {
            return res.status(401).json({ error: "No Contact Found" })
        }

        const deleteRecord = await ContactModel.findByIdAndDelete({ _id: id })
        const contacts = await ContactModel.find({ postedBy: req.user._id })


        return res.status(200).json({ success: true, contacts })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

}



export { createContact, getContact, getContactbyid, updateContact, deleteContact }

