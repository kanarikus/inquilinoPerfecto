require('dotenv').config()
const cors = require('cors')
const fsPromises = require('fs').promises
const uuid = require('uuid');
const fileUpload=require("express-fileupload")
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const {
        isAuthenticated,
        isAdmin,
        isSameUser,
        sameBookin,
        homeOwner
}=require('./middlewares/auth')

const{
    acceptBooking,
    booking,
    deletebooking,
    homeBookings,
    getBooking,
    getListOfBooking,
    scoreBooking,
    declineBooking
}=require('./controllers/bookings')

const {
    createHome,
    deleteHome,
    getHome,
    getlistOfHomes,
    updateHome,
    userHomes,
    SaveHomeImage,
    searchHomes
} = require('./controllers/homes')

const{
    register,
    login,
    validate,
    getUserById
} = require('./controllers/authenticator')

const{
    deleteUser,
    updateUser,
    updateUserPassword,
    recoverPassword,
    resetPassword
} = require('./controllers/users');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());
app.use('/imagen',express.static(__dirname+'/images'));
app.use(cors())

const DEFAULT_PORT = 3333

const currentPort = process.env.PORT || DEFAULT_PORT

app.post('/usuario',register)
app.post('/login',login)

app.get('/usuario/:id',isAuthenticated,isSameUser,getUserById)
app.delete('/usuario/:id',isAuthenticated,isSameUser,deleteUser)
app.put('/usuario/:id',isAuthenticated,isSameUser,updateUser)
app.get('/usuario/validar/:code',validate)
app.put('/usuario/:id/password',isAuthenticated,isSameUser,updateUserPassword)
app.post('/usuario/recover-password',recoverPassword)
app.put('/usuario/password/reset/:code',resetPassword)
app.get('/usuario/vivienda/:id',isAuthenticated,isSameUser,userHomes)

app.get('/vivienda/imagen/:uuid', getImage = async(req,res) => {
const { uuid } = req.params
    const path = `${__dirname}/images/${uuid}.jpg`
    try {
        await fsPromises.stat(path)
        res.sendFile(path)
    } catch(e) {
        console.log('El fichero no existe')
        res.status(404).send()
    }
})

app.get('/vivienda/busqueda',searchHomes)
app.post('/vivienda/imagen/:id',SaveHomeImage)
app.post('/vivienda',isAuthenticated,createHome)
app.get('/vivienda',getlistOfHomes)
app.get('/vivienda/:id',getHome)
app.delete('/vivienda/:id',isSameUser,homeOwner,deleteHome)
app.put('/vivienda/:id',isAuthenticated,homeOwner,updateHome)

app.post('/vivienda/reserva/:id',booking)
app.delete('/reserva/:id',deletebooking)
app.get('/reserva',isAuthenticated,isSameUser,getListOfBooking)
app.get('/reserva/:id',sameBookin,getBooking)
app.get('/vivienda/reserva/:id',homeBookings)
app.put('/reserva/:id',isAuthenticated,sameBookin,scoreBooking)
app.put('/reserva/acept/:id',isAuthenticated,sameBookin,acceptBooking)
app.put('/reserva/decline/:id',isAuthenticated,sameBookin ,declineBooking)


console.log(`Running on port ${currentPort}`)
app.listen(currentPort)