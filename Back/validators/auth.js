const { object } = require('joi');
const Joi = require('joi');

const authValidator = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .error(
            new Error('email should be a standard email')
        ),

    password: Joi.string()
        .required(),
    ciudad: Joi.string()
        .required()
        .error(
            new Error ('ciudad inválida')
        ),
    

})

const updateUserValidator = Joi.object({
    nombre:Joi.string()
    .min(2)
    .error(
        new Error('nombre de mierda')
    ),
    ciudad:Joi.string()
    .min(3)
    .error(
        new Error('nombre de ciudad incorrecto')
    ),
    provincia:Joi.string()
    .min(3)
    .error(
        new Error('provincia debe contener al menos 3 caracteres')
    ),
    descripcion:Joi.string()
    .min(10)
    .max(600)
    .error(
        new Error('la descripción debe contener entre 10 y 600 caracteres')
    )
})


module.exports = {
    authValidator,
    updateUserValidator
}
