const jwt = require('jsonwebtoken');
const { result } = require('lodash');
const db = require('../db/mysql')
const utils = require('../utils/utils')


const booking = async (req,res) => {
    const {id} =req.params
    const {authorization} = req.headers
    const {fecha_entrada,fecha_salida} = req.body
    const id_piso = id
    try{
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const id_usuario= await db.getUser(decodedToken.email)
        const prebooking = await db.bookexist(fecha_entrada,fecha_salida,id)
        console.log(prebooking)
        if(prebooking){
            res.status(403).send()
            return
        }
       
        const result = await db.createbooking(
        id_piso,
        parseInt(id_usuario.id),
        fecha_entrada,
        fecha_salida
        )
        const email = await db.getEmailBooking(result.insertId)
        utils.sendBookingMail(email.email,`http://${process.env.FRONT_DOMAIN}/myhome/${id_piso}`)
        res.send({'id':result.insertId})
        
        
    }catch(e){
        console.log(e)
        res.status(402).send
    }
    
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
    console.log(authorization)
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

const homeBookings = async (req,res) => {
    const {id} = req.params
    try{
        const bookings = await db.homeBookings(id)
        if(!bookings) {
            res.send('no hay reservas en este piso')
        }else {
            res.send(bookings)
        }
    }catch(e){
        console.log(e)
        res.status(402).send(e)
    }
}

const scoreBooking = async (req,res) => {
    const {score} = req.body
    try{
        const bookinId = parseInt(req.params.id)
        
        const {authorization} = req.headers;
        const decodedToken = jwt.verify(authorization,process.env.SECRET)
        const {id} = await db.getUser(decodedToken.email)
        console.log(id,bookinId)
        const {id_usuario,owner_id} = await db.getBookingHomeOwner(bookinId)

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

const acceptBooking = async (req,res) => {
    const {id} = req.params
    try{
        await db.acceptBooking(id)
        res.send('Reserva aceptada')
    }catch(e){
        console.log(e)
        res.status(403).send(e)
    }
}

const declineBooking = async(req,res) => {
    const {id} = req.params
    try{
        await db.declineBooking(id)
        res.send('Reserva rechazada')
    }catch(e){
        console.log(e)
        res.status(403).send(e)
    }
}


module.exports = {
    acceptBooking,
    booking,
    declineBooking,
    deletebooking,
    homeBookings,
    getBooking,
    getListOfBooking,
    scoreBooking
}