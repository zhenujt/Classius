const Joi = require("joi")

const registerSchema = Joi.object({
    username: Joi.string().min(4).max(30).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(30)
})

const registrationValidation = (data => {
    return registerSchema.validate(data);
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const loginValidation = (data => {
    return loginSchema.validate(data);
})




module.exports = {
    registrationValidation: registrationValidation,
    loginValidation: loginValidation,
}