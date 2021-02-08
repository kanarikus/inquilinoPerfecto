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

const sameBookin = async (req,res,next) => {
    try {
        const bookinId = parseInt(req.params.id)
        const {authorization} = req.headers;
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const {id} = await db.getUser(decodedToken.email)
        const {id_usuario} = await db.getHomeOwner(id,bookinId)
        console.log(id_usuario)
        // if(id_usuario !== id || ) {
        //     return
        // }
    }catch(e) {
        console.log(e)
        res.status(406).send()
    }
    next()
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isSameUser,
    sameBookin
}