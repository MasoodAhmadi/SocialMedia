const Joi = require('joi');

const user_schema = Joi.object({
  id: Joi.number(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(2)
    .max(255)
    .required(),
  password: Joi.string().min(2).max(128).required(),
});
module.exports = {
  user_schema,
};
