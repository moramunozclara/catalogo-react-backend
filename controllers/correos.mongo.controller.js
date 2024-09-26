// CONTROLLER MongoDB
import { connectDB } from "../data/mongodb.js";
import {User, Email} from "../data/mongodb.js";

connectDB();

export const getEmails = async (req, res, next) => {
    try {
        console.log("correos");
        // find() trae los eementos
        // populate() trae el documento vinculado según mi schema
        //  1er atributo: nombre de la propiedad
        // 2º atributo: campos que deseo obtener (omitiendo password)

        const emails = await Email.find().populate('remitente destinatario', 'username email');
        res.json(emails);
    }

    catch (e) {
        res.status(201).json({message:e.message});
    }


};

export const getEmailsById = async (req, res, next) => {
    try {
        const correoId = req.params.id;

        const email = await Email.findById(correoId).populate('remitente destinatario', 'username email');
        console.log("Obtener email");
        
        
    } catch (e) {
        res.status(201).json({message:e.message});
    }
};

// http://localhost:3000/API/v1/mongo/correos

export const createEmail = async (req, res, next) => {
    // {
    //     "remitente":"", 
    //     "destinatario":"",
    //     "asunto":"",
    //     "contenido":""
    //   }
try {
    const {remitente, destinatario, asunto, contenido} = req.body;

    const newEmail = new Email ({remitente, destinatario, asunto, contenido, isImportant:true});
    
    await newEmail.save();

    res.status(201).json(newEmail);

} catch (e) {
    res.status(500).json({message:e.message});
}
};

export const deleteEmail = async (req, res, next) => {
    try {
        console.log("Borrar email");
        const correoId = req.params.id;
        const deletedEmail = await Email.findByIdAndDelete(correoId);
        if (!deletedEmail) return res.status(404).json({message: "Correo no encontrado"});
        res.status(204).json()
        
    } catch (e) {
        res.status(500).json({message:e.message});
    }
};

export const updateEmail = async (req, res, next) => {
    try {
        console.log("Actalizar email");

        const correoId = req.params.id;
        const updatedEmail = await Email.findByIdAndUpdate(
            correoId,
             {isLeido: true},
             {new: true}
        );
        if (!updatedEmail) return res.status(404).json({message: "Correo no encontrado"});
        res.status(200).json(updatedEmail)
        
    } catch (e) {
        res.status(500).json({message:e.message});
    }
};

//  getEmails, getEmailsById, createEmail, deleteEmail, updateEmail


export const getEmailsByUserId = async (req, res, next) => {
    try {
        const UserId = req.params.userId;

        const email = await Email.findById(UserId).populate('remitente destinatario', 'username email').sort({});
        console.log("Obtener email");
        
        
    } catch (e) {
        res.status(201).json({message:e.message});
    }
};

export const getEmailsBySubject = async (req, res, next) => {
    try {
        const UserId = req.params.userId;

        const email = await Email.findById(UserId).populate('remitente destinatario', 'username email');
        console.log("Obtener email");
        
        
    } catch (e) {
        res.status(201).json({message:e.message});
    }
};