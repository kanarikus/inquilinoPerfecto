
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

const getUserId = async(id) =>{
    const query = `select * from usuario where id = ?`
    const params = [id]
    const [result] =await performQuery(query,params)
    return result
}

const createHome = async(fecha_publicacion,direccion,provincia,ciudad,precio_piso,m2,habitaciones,baños,id_usuario,garaje,jardin,ascensor,balcon) => {
    const query = `INSERT INTO piso(fecha_publicacion,direccion,provincia,ciudad,precio_piso,m2,habitaciones,baños,id_usuario,garaje,jardin,ascensor,balcon)
    VALUES(UTC_TIMESTAMP,?,?,?,?,?,?,?,?,?,?,?,?)`
    const params = [direccion,provincia,ciudad,precio_piso,m2,habitaciones,baños,id_usuario,garaje,jardin,ascensor,balcon]

    const result =await performQuery(query,params)
    return result
}

const search = async(direccion,provincia,ciudad,precio1,precio2,fecha_entrada,fecha_salida,m2,habitaciones,baños,garaje,ascensor,balcon,jardin,direction,order) => {
    let queryVar = "select p.id,p.direccion,p.habitaciones,p.baños,p.m2,p.precio_piso,p.ciudad from piso p left outer join reserva r on r.id_piso = p.id"
    const params=[]
    const orderDirection = (direction && direction.toLowerCase())==="asc"?"ASC":"DESC"
    let orderBY
    switch (order) {
        case "precio_piso":
            orderBY="precio_piso"
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
            params.push(`%${ciudad}%`)
        }
        if(precio1||precio2){
            if(!precio1) {
                conditions.push(`precio_piso <= ?`)
                params.push(`${precio2}`)
            }
            if(!precio2) {
                conditions.push(`precio_piso >= ?`)
                params.push(`${precio1}`)
            }
            if(precio1&&precio2) {
                conditions.push(`precio_piso BETWEEN ? and ?`)
                params.push(`${precio1}`,`${precio2}`) 
            }
            
        }
        if (fecha_entrada && fecha_salida) {
            const checkIn = dateToDB(fecha_entrada)
            const checkOut = dateToDB(fecha_salida)
            conditions.push(`(fecha_entrada not between ? and ?
            and fecha_salida not between ? and ?
            and not(fecha_entrada<? and fecha_salida>?)
            or (r.id_reserva is null))`)
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
    
    query=`${queryVar} WHERE ${conditions.join(` AND `)} group by p.id ORDER BY ${orderBY} ${orderDirection}`
    console.log(query,params)
    const [...result] = await performQuery(query,params)
    return result
}

const listHomes = async() => {
    const query = `select * from piso`
    const  [result] = await performQuery(query)
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

const saveUserImage = async(fileID,id) => {
    const query = `update usuario set image=? where id=?`
    const params = [fileID,id]
    await performQuery(query,params)
}

const deleteHome = async(id) => {
    const query = `delete from piso where id=?`
    const params = [id]
    await performQuery(query,params)
}

const updateHomeQ = async (direccion,provincia,ciudad,precio_piso,m2,habitaciones,baños,id_usuario,id) => {
    //let eventDate = moment.unix(timestamp)

    const query = `
    UPDATE piso SET fecha_modificacion = UTC_TIMESTAMP,
    direccion = ?,
    provincia = ?,
    ciudad = ?,
    precio_piso = ?,
    m2 = ?,
    habitaciones =?,
    baños=?,
    id_usuario=?
    where id = ?`

    const params = [direccion,provincia,ciudad,precio_piso,m2,habitaciones,baños,id_usuario,id]
    await performQuery(query, params)
}

const updateUser= async(nombre,apellidos,provincia,ciudad,telf,descripcion,id) =>{
    const query = `
    update usuario set
    nombre =?,
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
    try{
        if (result) {
        const query = `update usuario set estado = 'Activo', validationCode = ''`
        await performQuery(query, [])}
    }catch(e){
        console.log(e)
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
    await performQuery(query,params)
}

const createbooking = async (id_piso,id_usuario,fecha_entrada,fecha_salida) => {
    const query = `insert into reserva (id_piso,id_usuario,fecha_entrada,fecha_salida,precio_reserva) 
        values (?,?,?,?,(select precio_piso from piso where id=?))`
    const params = [id_piso,id_usuario,fecha_entrada,fecha_salida,id_piso]
    const result = await performQuery(query,params)
    return result
}

const getbooking = async (id) => {
    const query = `SELECT r.id_reserva, 
    r.precio_reserva,
    r.fecha_entrada,
    r.fecha_salida,
    r.score_piso,
    p.ciudad,
    p.direccion,
    r.score_usuario from reserva r join piso p on r.id_piso=p.id where r.id_reserva = ?`
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
    const query = `select r.id_reserva,
	r.id_usuario,
    p.id,
    p.direccion,
    p.ciudad,
    r.precio_reserva,
    r.fecha_entrada,
    r.fecha_salida
    from reserva r join piso p on r.id_piso = p.id
    where r.id_usuario=? group by r.id_reserva`
    const params = [id]
    const [...result] = await performQuery(query,params)
    return result
}

const acceptBooking = async(id) => {
    const query = `update reserva set estado = 'aceptado' where id_reserva = ?`
    const params = [id]
    await performQuery(query,params)
}

const declineBooking = async(id) => {
    const query = `update reserva set estado= 'declinado' where id_reserva=?`
    const params = [id]
    await performQuery(query,params)
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
    const query = `update reserva set score_usuario=? where id_reserva=?`
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

const myHomes = async(id) => {
    const query = `select * from piso where id_usuario = ?`
    const params = [id]
    const [...result] = await performQuery(query,params)
    return result
}

const homeBookings = async(id) => {
    const query = `SELECT r.id_reserva,
    u.nombre,
	u.email,
    r.fecha_reserva,
    r.fecha_entrada,
    r.fecha_salida,
    r.precio_reserva
    from reserva r join usuario u on r.id_usuario=u.id where r.id_piso = ?`
    const params = [id]
    const result = await performQuery(query,params)
    return result
}

module.exports = {
    acceptBooking,
    checkUpdateCode,
    checkValidationCode,
    createbooking,
    createHome,
    declineBooking,
    deletebooking,
    deleteHome,
    deleteUserById,
    homeBookings,
    getbooking,
    getHomeOwner,
    getListOfBooking,
    getHome,
    getUser,
    getUserId,
    listHomes,
    myHomes,
    updateHomeQ,
    updateUser,
    updateUserPassword,
    register,
    recoverPasswordQ,
    resetPassword,
    scoreHome,
    scoreUser,
    saveHomeImageQ,
    saveUserImage,
    search
}