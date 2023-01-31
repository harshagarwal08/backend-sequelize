const taskServices = require('../services/taskServices')

// get all the tasks
const getAllTasks = async (req, res) => {
  const data = await taskServices.getAllTasks()
  res.status(200).send(data)
}

// get a single task based on id
const getTask = async (req, res) => {
  const { id } = req.params
  const task = await taskServices.getTask(id)
  if (!task) {
    return res.status(404).send({ error: 'Task not found' })
  }
  return res.status(200).send(task)
}

// post a task
const postTask = async (req, res) => {
  const { title } = req.body
  await taskServices.postTask(title)
  return res.status(201).send('new task added successfully!')
}

// edit single task based on id
const editTask = async (req, res) => {
  const taskId = Number(req.params.id)
  const { title } = req.body
  const task = await taskServices.editTask(taskId, title)
  if (!task) {
    return res.status(404).send({ error: 'Task not found' })
  }
  return res.status(200).send(task)
}

// set the given task to completed
const completeTask = async (req, res) => {
  const taskId = Number(req.params.id)
  const task = await taskServices.completeTask(taskId)
  if (!task) {
    return res.status(404).send({ error: 'Task not found' })
  }
  return res.status(200).send('task marked as completed')
}

// delete all the tasks set to completed
const deleteCompletedTasks = async (req, res) => {
  await taskServices.deleteCompletedTasks()
  return res.status(200).send('completed tasks are deleted')
}

// delete a single task based on id
const deleteTask = async (req, res) => {
  const taskId = Number(req.params.id)
  const task = await taskServices.deleteTask(taskId)
  if (!task) {
    return res.status(404).send({ error: 'Task not found' })
  }
  return res.status(200).send(task)
}

module.exports = {
  getAllTasks,
  getTask,
  postTask,
  completeTask,
  deleteCompletedTasks,
  editTask,
  deleteTask
}
