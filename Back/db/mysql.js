
//const moment = require('moment') 
const { getConnection } = require("./db");
const {dateToDB} = require('../utils/moment')

const performQuery = async (query, params) => {
    let connection;
    console.log(query,params)

    try {
        connection = await getConnection();

        const [result] = await connection.query(query, params)

        return result;
    } catch (e) {
        console.log(e)
        throw new Error('database-error')
    } finally {
        if (connection) {
            connection.release()
        }
    }
}


const register = async(email, password, ciudad,validationCode) => {
    const query = `insert into usuario (email, password, ciudad,validationCode) values (?,?,?,?)`
    const params = [email, password, ciudad,validationCode]

    await performQuery(query, params)
}

const updateUserPassword = async(password,id)=> {
    const query=`update usuario set password=? where id=?`
    const params=[password,id]
    await performQuery(query,params)
}

const getUser = async(email) => {
    const query = `select * from usuario where email = ?`
    const params = [email]

    const [result] = await performQuery(query, params)
    return result
}

const deleteUserById = async(id)=>{
    const query = `delete from usuario where id=?`
    const params = [id]

    await performQuery(query,params)
}

const createHome = async(fecha_publicacion,direccion,provincia,ciudad,precio,m2,habitaciones,baños,id_usuario) => {
    const query = `INSERT INTO piso(fecha_publicacion,direccion,provincia,ciudad,precio,m2,habitaciones,baños,id_usuario)
    VALUES(UTC_TIMESTAMP,?,?,?,?,?,?,?,?)`
    const params = [direccion,provincia,ciudad,precio,m2,habitaciones,baños,id_usuario]

    await performQuery(query,params)
}

const search = async(direccion,provincia,ciudad,precio1,precio2,fecha_entrada,fecha_salida,m2,habitaciones,baños,garaje,ascensor,balcon,jardin,direction,order) => {
    let queryVar = "select * from piso left outer join reserva on reserva.id_piso = piso.id"
    const params=[]
    const orderDirection = (direction && direction.toLowerCase())==="asc"?"ASC":"DESC"
    let orderBY
    switch (order) {
        case "precio":
            orderBY="precio"
            break;
        case "fecha_publicacion":
            orderBY="fecha_publicacion"
            break;
        default:
            orderBY="fecha_publicacion"
            break;
    }
    const conditions=[]
    if(direccion||provincia||ciudad||precio1||precio2||(fecha_entrada && fecha_salida)||m2||habitaciones||baños|garaje||ascensor||balcon||jardin) {
        if(direccion){
            conditions.push(`direccion LIKE ?`)
            params.push(`${direccion}`)
        }
        if(provincia){
            conditions.push(`provincia LIKE ?`)
            params.push(`${provincia}`)
        }
        if(ciudad){
            conditions.push(`ciudad LIKE ?`)
            params.push(`${ciudad}`)
        }
        if(precio1||precio2){
            if(!precio1) {
                conditions.push(`precio <= ?`)
                params.push(`${precio2}`)
            }
            if(!precio2) {
                conditions.push(`precio >= ?`)
                params.push(`${precio1}`)
            }
            if(precio1&&precio2) {
                conditions.push(`precio BETWEEN ? and ?`)
                params.push(`${precio1}`,`${precio2}`) 
            }
            
        }
        if (fecha_entrada && fecha_salida) {
            const checkIn = dateToDB(fecha_entrada)
            const checkOut = dateToDB(fecha_salida)
            conditions.push(`(fecha_entrada not between ? and ?
            and fecha_salida not between ? and ? and not(fecha_entrada<? and fecha_salida>?)
            or (id_reserva is null))`)
            params.push(
                `${checkIn}`,
                `${checkOut}`,
                `${checkIn}`,
                `${checkOut}`,
                `${checkIn}`,
                `${checkOut}`
                );
        }
        if(m2) {
            conditions.push(`m2>=?`)
            params.push(`${m2}`)
        }
        if(habitaciones) {
            conditions.push(`habitaciones >= ?`)
            params.push(`${habitaciones}`)
        }if(baños) {
            conditions.push(`baños>=?`)
            params.push(`${baños}`)
        }
        if(garaje){
            conditions.push(`garaje=?`)
            params.push(`${garaje}`)
        }
        if(ascensor){
            conditions.push(`ascensor=?`)
            params.push(`${ascensor}`)
        }
        if(balcon){
            conditions.push(`balcon=?`)
            params.push(`${ascensor}`)
        }
        if(jardin) {
            conditions.push(`jardin=?`)
            params.push(`${jardin}`)
        }
    }
    query=`${queryVar} WHERE ${conditions.join(` AND `)} ORDER BY ${orderBY} ${orderDirection}`
    console.log(query,params)
    const [...result] = await performQuery(query,params)
    return result
}

const listHomes = async() => {
    const query = `select * from piso`
    const  [...result] = await performQuery(query)
    return result
}


const getHome = async(id) => {
    const query = `select * from piso where id=?`
    const params = [id]
    const result = await performQuery(query,params)

    return result
}


const saveHomeImageQ = async(fileID,id)=>{
    const query= `insert into imagen (imagen,id_piso) values(?,?)`
    const params= [fileID,id]
    await performQuery(query,params)
}


const deleteHome = async(id) => {
    const query = `delete from piso where id=?`
    const params = [id]
    await performQuery(query,params)
}

const updateHomeQ = async (direccion,provincia,ciudad,precio,m2,habitaciones,baños,id_usuario,id) => {
    //let eventDate = moment.unix(timestamp)

    const query = `
    UPDATE piso SET fecha_modificacion = UTC_TIMESTAMP,
    direccion = ?,
    provincia = ?,
    ciudad = ?,
    precio = ?,
    m2 = ?,
    habitaciones =?,
    baños=?,
    id_usuario=?
    where id = ?`

    const params = [direccion,provincia,ciudad,precio,m2,habitaciones,baños,id_usuario,id]
    await performQuery(query, params)
}

const updateUser= async(nombre,apellidos,provincia,ciudad,telf,descripcion,id) =>{
    const query = `
    update usuario set nombre =?,
    apellidos=?,
    provincia=?,
    ciudad=?,
    telf=?,
    descripcion=?
    where id=?
    `
    const params=[nombre,apellidos,provincia,ciudad,telf,descripcion,id]
    await performQuery(query,params)
}


const checkValidationCode = async (code) => {

    const query = `select * from usuario where validationCode = ?`
    const params = [code]

    const [result] = await performQuery(query, params)

    if (result) {
        const query = `update usuario set estado = 'Activo', validationCode = ''`
        await performQuery(query, [])
    } else {
        throw new Error('validation-error')
    }

}

const recoverPasswordQ = async(validationCode,email) => {
    const query =`update usuario set validationCode=? where email=? `
    const params = [validationCode,email]
    await performQuery(query,params)
}

const resetPassword = async(password,validationCode) => {
    const query = `update usuario set password=? where validationCode=?`
    const params = [password,validationCode]
}

const createbooking = async (id_piso,id_usuario,fecha_entrada,fecha_salida) => {
    const query = `insert into reserva (id_piso,id_usuario,precio) 
        values (?,?,(select precio from piso where id=?))`
    const params = [id_piso,id_usuario,id_piso]
    await performQuery(query,params)
}

const getbooking = async (id) => {
    const query = 'select * from reserva where id_reserva=?'
    const params = [id]
    const result = await performQuery(query,params)
    return result
}

const deletebooking = async(id) => {
    const query= `delete from reserva where id_reserva=?`
    const params = [id]
    await performQuery(query,params)
}

const getListOfBooking = async(id) => {
    const query = `select * from reserva where id_usuario=?`
    const params = [id]
    const [...result] = await performQuery(query,params)
    return result
}

const getHomeOwner = async(bookinId) => {
    const query = `select r.id_reserva "id_reserva",
    r.id_usuario "id_usuario",
    p.id_usuario "owner_id"
    from reserva r join piso p on p.id = r.id_piso where r.id_reserva=? group by id_reserva;`
    const params = [bookinId]
    let [result] = await performQuery(query,params)
    return result
}

const scoreHome = async (score,bookinId) => {
    const query = `update reserva set score_piso=? where id_reserva=?`
    const params = [score,bookinId]
    let result = await performQuery(query,params)
    return result
}

const scoreUser = async(score,bookinId) => {
    const query = `updatereserva set score_usuario=? where id_reserva=?`
    const params = [score,bookinId]
    let result = await performQuery(query,params)
    return result
}

const checkUpdateCode = async (code) => {
    const query = `select * from usuario where validationCode = ?`
    const params = [code]

    const [result] = await performQuery(query, params)

    if (result) {
        const query = `update usuario set estado = 'activo', validationCode = '' where validationCode = ?`
        await performQuery(query, [code])
    } else {
        throw new Error('validation-error')
    }
}

module.exports = {
    checkUpdateCode,
    checkValidationCode,
    createbooking,
    createHome,
    deletebooking,
    deleteHome,
    deleteUserById,
    getbooking,
    getHomeOwner,
    getListOfBooking,
    getHome,
    getUser,
    listHomes,
    updateHomeQ,
    updateUser,
    updateUserPassword,
    register,
    recoverPasswordQ,
    resetPassword,
    scoreHome,
    scoreUser,
    saveHomeImageQ,
    search
}