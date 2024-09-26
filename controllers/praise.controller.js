// Define tus rutas aquí, importar mis exportaciones de mockdata (incluir .js)
import {praise} from '../data/mockData.js';

import {getLastId} from '../utils/utils.js' ;
   
// respuesta genérica para todos mis controllers

const responseAPI = {
    data: [],
    msg: "",
    status: "ok" 
}

   // GET /praise
    export const getPraise = (req, res) => {


        try {

            const statusCode = praise.length ? 200 : 204;
            
        } catch (error) {
            
        }
        // STATUS 200 = SUCCESSFUL REQUEST
        res.status(200).json(praise);
    };

    