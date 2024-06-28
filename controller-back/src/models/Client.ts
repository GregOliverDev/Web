import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    registration:{
        required: true,
        type: String,
    },
    email:{
        required: true,
        type: String,
    },
    password:{
        required: true,
        type: String,
    },
    type:{
        required: true,
        type: String,
    },
    themeSelect:{
        type: Number,
    }

})

export const ClientModel = mongoose.model("Client", clientSchema)