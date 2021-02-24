const jwt = require('jsonwebtoken');
const db = require('../db/mysql')


const isAuthenticated = async(req,res,next) => {
    const {authorization} = req.headers;

    try{
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const user = await db.getUser(decodedToken.email)

        if(!user) {
            throw new Error()
        }
        req.auth = decodedToken
    } catch (e) {
        res.status(401).send()
        return
    }

    next();

}

const isAdmin = (req, res, next) => {
    const {authorization} = req.headers;
    const decodedToken = jwt.verify(authorization,process.env.SECRET)
    req.auth = decodedToken
    
    if (!req.auth || !req.auth.isAdmin) {
        res.status(403).send()
        return
    }

    next();
}

const isSameUser = async (req, res, next) => {
    const {authorization} = req.headers;
    const decodedToken = jwt.verify(authorization,process.env.SECRET)
    const {id} = await db.getUser(decodedToken.email)
    req.auth = decodedToken
   console.log(id,req.auth.id)
    if (id ===req.auth.id || req.auth.isAdmin){
        next()
    } else {
        res.status(403).send()
        return
    }

}

const homeOwner = async(req,res,next) => {
    const {authorization} = req.headers;
    const decodedToken = jwt.verify(authorization,process.env.SECRET)
    const {id} = await db.getUser(decodedToken.email)
    const id_piso = parseInt(req.params.id)
    const owner =await db.getHomeOwner(id_piso)
    const owner_id = owner[0].owner_id
    console.log(id_piso,owner_id)
    if(id !== owner_id) {
        res.status(403).send()
    } else {
        next()
    }
}

const sameBookin = async (req,res,next) => {
    //este middelware iguala el id del logueado
    //con el id del que hizo la reserva
    try {
        const bookinId = parseInt(req.params.id)
        
        const {authorization} = req.headers;
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const {id} = await db.getUser(decodedToken.email)
        const userid = await db.getBookingHomeOwner(bookinId)
        const id_usuario = userid.id_usuario
        const owner_id = userid.owner_id
        console.log(id_usuario,id)
        if(id_usuario === id || id ===owner_id) {
            next()
        }else{
            res.status(403).send()
        }
    }catch(e) {
        console.log(e)
        res.status(406).send()
    }
}

module.exports = {
    homeOwner,
    isAuthenticated,
    isAdmin,
    isSameUser,
    sameBookin
}