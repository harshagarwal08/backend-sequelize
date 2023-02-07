const Joi = require('joi')
const { InvalidInputError } = require('../src/utils/error')

const validateBody = async (req, res, next) => {
  const titleSchema = Joi.object({
    title: Joi.string().required()
  })

  try {
    const { error } = titleSchema.validate(req.body)
    if (error) throw new InvalidInputError(error.message, 404)
    next()
  } catch (err) {
    if (err instanceof InvalidInputError) return res.status(err.code).json({ message: err.message })

    res.status(500).json({ error: 'Something went wrong' })
  }
}
module.exports = { validateBody }
