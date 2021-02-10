const db = require('../db/mysql')
const bcrypt = require('bcrypt');
const randomstring=require("randomstring")
const jwt = require('jsonwebtoken');
const utils = require('../utils/utils')
const { updateUserValidator,authValidator } = require('../validators/auth')


const deleteUser = async(req,res) => {
    const {id} = req.params
    try{
       
        await db.deleteUserById(id)
        res.send()

    }catch(e){
        if (e.message === 'unknown-id') {
            res.status(404).send()

        } else {
            res.status(500).send()
        }
    }
}

const updateUser = async (req,res) => {
    const {
        nombre,
        apellidos,
        provincia,
        ciudad,
        telf,
        descripcion
    } = req.body
    const {id} = req.params
    try{
        await updateUserValidator.validateAsync(req.body)
        await db.updateUser(nombre,apellidos,provincia,ciudad,telf,descripcion,id)
    }catch(e){
        let statusCode = 400;
    
        if (e.message === 'database-error') {
            statusCode = 500
        }

        res.status(statusCode).send(e.message)
        return
    }
    res.send()
}


const updateUserPassword = async (req, res) => {
    // Comprobar sintaxis de los parámetros (vieja password (1234) y la nueva password (123456))
    const {id} = req.params
    const {newPassword} = req.body
    try{
    // Ciframos la nueva password
    const passwordBcrypt = await bcrypt.hash(newPassword, 10);
    // Comprobar que la vieja es correcta
    // Actualizar vieja password con la nueva cifrada
    await db.updateUserPassword(passwordBcrypt,id)

    }catch(e){
        console.log(e)
        res.status(402).send(e.message)
    }
    res.send()
    
}

const recoverPassword = async (req, res) => {
    // Comprobar la sintaxis de los parámetros de entrada (email) - omitible, 
    // ya que en BBDD solo habrá emails correctos, validados en el register, así
    // que si lo que nos pasan no es un email, no lo encontrará en la bbdd y
    // lanzaremos un error en el siguiente paso
    const {email} =req.body

    // Comprobar si el usuario existe en la BBDD
    // bd.getUser(....)
     try{

        await db.getUser(email)
        const passwordUpdateCode = randomstring.generate(40);
        await db.recoverPasswordQ(passwordUpdateCode,email)
        utils.sendRecoverPassword(email,passwordUpdateCode)


    }catch(e) {
        res.statatus(403).send(e.message)
    }

    res.send()
    // Generar un código de actualización de password
    // Almacenar código de actualización en la BBDD junto a un timestamp
    // ojo! Necesario actualizar schema de la BD 
    // Enviamos por email el passwordUpdateCode
    
}

const resetPassword = async (req, res) => {
    try {
        await passwordValidator.validateAsync(req.body)

        const { code } = req.params
        const { password } = req.body

        const passwordBcrypt = await bcrypt.hash(password, 10)

        await db.resetPassword(passwordBcrypt, code)

        await db.checkUpdateCode(code)

        res.send('Su contraseña se ha actualizado')
    } catch (e) {
        res.status(403).send('Usuario no validado')
    }
    res.send()
}


module.exports = {
    deleteUser,
    recoverPassword,
    resetPassword,
    updateUser,
    updateUserPassword
}