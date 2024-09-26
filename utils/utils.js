// Funciones de utilidad

export function getLastId(array){



    // reduce nuestro array al id más alto
    const lastId = array.reduce( (max, obj) => (obj.id > max ? obj.id : max) , 0 );

    // const id = array.map( obj => obj.id);
    // const lastId = Math.max(...ids);

    // array.map( item => {
        // obtener el id de item
        // preguntar si el id es mayor > a lastId
    // })



    return lastId;
}

export const getBoolean = (value) => {

    const trueValues = ["true", true, 1, "1", "yes", "on", "enable", "enabled"];

    if (typeof value === 'boolean') { return value; }
    if (typeof value === 'string') {  value = value.toLocaleLowerCase().trim(); }

    if (trueValues.includes(value)) { return true; } 
    else                            { return false };

};