// Define tus rutas aquí, importar mis exportaciones de mockdata (incluir .js)
import {hero} from '../data/mockData.js';

import {getLastId} from '../utils/utils.js' ;
   
// respuesta genérica para todos mis controllers

const responseAPI = {
    data: [],
    msg: "",
    status: "ok" 
}

   // GET /hero
    export const getHero = (req, res) => {

        try {

            const statusCode = hero.length ? 200 : 204;
            responseAPI.data=hero;
            res.status(statusCode)

        } catch (error) {
            responseAPI.status="ERROR";
            res.status(404)
            
        }
        // STATUS 200 = SUCCESSFUL REQUEST
        res.json(responseAPI);

    };

    