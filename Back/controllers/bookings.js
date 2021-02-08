const jwt = require('jsonwebtoken');
const db = require('../db/mysql')


const booking = async (req,res) => {
    const {id} =req.params
    const {authorization} = req.headers
    const {fecha_entrada,fecha_salida} = req.body
    const id_piso = id
    try{
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const id_usuario= await db.getUser(decodedToken.email)
        console.log(id_usuario)
        await db.createbooking(
            id_piso,
            id_usuario.id,
            fecha_entrada,
            fecha_salida
        )
    }catch(e){
        console.log(e)
        res.status(402).send
    }
    res.send()
}

const deletebooking = async(req,res) => {
    const {id} = req.params
    try{
        console.log(`entra con el ${id}`)
        const booking = await db.getbooking(id)
        console.log(booking)
        if(!booking.length) {
            res.status(404).send('no existe esta reserva')
            return
        }
        await db.deletebooking(id)
        res.send()
    }catch(e) {
        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }


    res.send()
}

const getListOfBooking = async(req,res) => {
    const {authorization} = req.headers
    try {
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const id_usuario= await db.getUser(decodedToken.email)
        let bookings = await db.getListOfBooking(id_usuario.id)
        res.send(bookings)
    }catch(e) {
        console.log(e)
        res.status(500).send();
    }
}

const getBooking = async (req,res) => {
    const {id} = req.params
    try{
        console.log(id)
        const bookin = await db.getbooking(id)
        if(!bookin) {
            res.status(404).send()
        }else {
            res.send(bookin)
        }
    }catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const scoreBooking = async (req,res) => {
    const {score} = req.body
    try{
        const bookinId = parseInt(req.params.id)

        const {authorization} = req.headers;
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const {id} = await db.getUser(decodedToken.email)

        const {id_usuario,owner_id} = await db.getHomeOwner(bookinId)

        if(id === id_usuario) {
            await db.scoreHome(score,bookinId)
        }
        if(id === owner_id) {
            await db.scoreUser(score,bookinId)
        }
        res.send()
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
}

module.exports = {
    booking,
    deletebooking,
    getBooking,
    getListOfBooking,
    scoreBooking
}