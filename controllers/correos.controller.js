import {inbox} from '../data/mockData.js';

// import mysqldb from '../data/mysqldb.js';

export const getAllCorreos = async (req, res) => {

    try {    
        const query = 'SELECT * FROM inbox ';
        const [filas] = await mysqldb.query(query);
        console.log(filas);


        res.status(200).json({
            msg:"Lista de correos obtenida con éxito",
            success: "ok",
            data: filas
        })}

        catch (error) {
            next (error);
        }
}

// export default mysqldb