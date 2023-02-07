const taskControllers = require('../controllers/taskControllers')
const { validateBody } = require('../../middlewares/Validator')

const Router = require('express').Router

const taskRouter = Router()

// GET /tasks
taskRouter.get('/', taskControllers.getAllTasks)

// GET /tasks/1
taskRouter.get('/:id', taskControllers.getTask)

// POST /tasks
taskRouter.post('/', validateBody, taskControllers.postTask)

// PUT /tasks/1
taskRouter.put('/:id', validateBody, taskControllers.editTask)

// PATCH /tasks/1
taskRouter.patch('/:id', taskControllers.completeTask)

// DELETE /tasks
taskRouter.delete('/', taskControllers.deleteCompletedTasks)

// DELETE /tasks/1
taskRouter.delete('/:id', taskControllers.deleteTask)

module.exports = {
  taskRouter
}
