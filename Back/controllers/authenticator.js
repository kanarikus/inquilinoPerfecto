const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");

const db = require('../db/mysql')
const utils = require('../utils/utils')

const { authValidator } = require('../validators/auth')

const register = async (req, res) => {

    try {
        await authValidator.validateAsync(req.body)

        const { email, password,ciudad } = req.body

        const user = await db.getUser(email)


        if (user) {
            res.status(403).send()
            return
        }
        const passwordBcrypt = await bcrypt.hash(password, 10);

        const validationCode = randomstring.generate(40);

        await db.register(email, passwordBcrypt, ciudad,validationCode)
        
        utils.sendConfirmationMail(email,`http://${process.env.FRONT_DOMAIN}/validate/${validationCode}`)
    } catch (e) {
        console.log(e)
        res.status(400).send()
        return
    }
    
    res.send()
}

const validate = async (req, res) => {
    const {code} = req.params

    try {
        db.checkValidationCode(code)
        res.send('validado correctamente')
    } catch(e) {
        res.status(401).send('Usuario no validado')
} 
}  


const login = async (req, res) => {
    // validar username y password:
    //    - comprobar que están en BBDD y coinciden
    const {email, password} = req.body
    const user = await db.getUser(email)
    const mail = user.email
    const id = user.id
    const nombre = user.nombre
    const image = user.image

    if (!user) {
        res.status(401).send()
        return
    }

    const passwordIsvalid = await bcrypt.compare(password, user.password);

    if (!passwordIsvalid) {
        res.status(401).send()
        return
    }

    const tokenPayload = {
        isAdmin: user.role === 'admin',
        role: user.role,
        email: user.email,
        id:user.id,
    }

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
        expiresIn: '1d'
    });

    res.json({
        token,
        mail,
        id,
        nombre,
        image
    })
}

const getUserById = async(req,res) => {
    const {id} = req.params
    const user = await db.getUserId(id)
    console.log(user)
    if(!user) {
        res.status(402).send()
    }
    res.send(user)
}

module.exports = {
    login,
    register,
    validate,
    getUserById
}