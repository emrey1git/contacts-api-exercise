import mongoose from "mongoose";

const contactSchema =  new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type:String,required: true},
    address: {type: String},
    company: {type: String},
    notes: {type: String},
    isFavorite: {type:Boolean, default: false},
},{ timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;