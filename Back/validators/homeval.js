const Joi = require('joi');

const homeValidator = Joi.object({
    direccion:Joi.string()
            .min(5)
            .required()
            .error(
                new Error('La dirección debe contener al menos 5 caracteres')
            ),
    provincia:Joi.string()
                .required()
                .min(3)
                .error(
                    new Error('No existe esa provincia')
                ),
    ciudad:Joi.string()
                .min(3)
                .required()
                .error(
                    new Error('nombre de ciudad inválido')
                ),
    precio:Joi.number()
                .required()
                .error(
                    new Error('el precio debe ser un valor numérico')
                ),
    m2:Joi.number()
                .required()
                .error(
                    new Error ('los m2 deben tener formato numérico')
                ),
    habitaciones:Joi.number()
                    .required()
                    .min(1)
                    .error(
                        new Error('las habitaciones son en formato numérico')
                    ),
    baños:Joi.number()
                .required()
                .integer()
                .error(
                    new Error('los baños deben estar en formato numérico')
                ),
    garaje:Joi.string().valid('si','no'),
    ascensor:Joi.string().valid('si','no'),
    jardin:Joi.string().valid('si','no'),
    balcon:Joi.string().valid('si','no'),
    descripcion:Joi.string()
                    .max(500)
                    .error(
                        new Error('la descripción no puede exceder los 500 caracteres')
                    ),
})

module.exports={
    homeValidator
}