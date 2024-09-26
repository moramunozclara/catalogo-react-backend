//  importo aquí mis variables de entorno (importa librería dotenv)
import dotenv from 'dotenv';
import path from 'path';
import mongoose from "mongoose";

export const __dirname = path.resolve();

// path, mongoose, __dirname en config.js


dotenv.config();

// crear variables de configuracion del proyecto
export const PORT = process.env.PORT || 5000;  // Toma el PORT de .env o usa 3000 como default
export const DOMAIN = process.env.DOMAIN || 'http://localhost';  // Toma el DOMAIN de .env o usa localhost
export const JWT_SECRET= process.env.JWT_SECRET  || 'utiliza_una_jwt_segura_que_no_sea_esta';



// Configuración de Mysql
export const mysqlConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "db_tuBaseDeDatos"

}
// configuación MongoDB
export const mongodbUri = process.env.MONGODB_URI;



