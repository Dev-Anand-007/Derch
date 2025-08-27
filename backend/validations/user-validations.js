const joi=require('joi');

const userValidation={
    registerUser: joi.object({
        fullname: joi.string()
        .min(3)
        .max(50)
        .trim()
        .required()
        .messages({
            'string.min':'Full name must be at least 3 characters long',
            'string.max':'Full name cannot exceed 50 characters',
            'any.required':'Full name is required',
            'string.empty':'Full name cannot be empty'
        }),

        email: joi.string()
        .email()
        .required()
        .messages({
            'string.email':'Please provide a valid email address',
            'any.required':'Email is required',
        }),

        password:joi.string()
        .min(3)
        .required()
        .messages({
            'string.min':'Password length must be 3 characters long',
            'any.required':'Password is required'
        }),

        contact: joi.number()
        .integer()
        .min(1000000000) // 10-digit minimum
        .max(99999999999999) // 14-digit maximum
        .optional()
        .messages({
            'number.min':'Contact number must be atleast 10 digit',
            'number.max':'Contact number cannot exceed 14 digits',
            'number.base':'Contact must be valid number'
        }),

        picture: joi.string()
        .uri()
        .optional()
        .messages({
            'string.uri.':'Pictures must be a valid URL'
        })

    })
}

module.exports=userValidation;