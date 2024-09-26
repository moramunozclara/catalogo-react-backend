// Define tus rutas aquí, importar mis exportaciones de mockdata (incluir .js)
import {sections} from '../data/mockData.js';

import {getLastId} from '../utils/utils.js' ;
   
// respuesta genérica para todos mis controllers

const responseAPI = {
    data: [],
    msg: "",
    status: "ok" 
}

   // GET /sections
    export const getSections = (req, res) => {


        try {

            const statusCode = sections.length ? 200 : 204;
            
        } catch (error) {
            
        }
        // STATUS 200 = SUCCESSFUL REQUEST
        res.status(200).json(sections);
    };

    