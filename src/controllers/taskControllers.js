const { HTTPError } = require('../utils/error')
const taskServices = require('../services/taskServices')

// get all the tasks
const getAllTasks = async (req, res) => {
  try {
    const data = await taskServices.getAllTasks()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ err: 'Something went wrong' })
  }
}

// get a single task based on id
const getTask = async (req, res) => {
  try {
    const task = await taskServices.getTask(Number(req.params.id))
    if (!task) {
      throw new HTTPError('Task not found', 404)
    }
    res.status(200).json(task)
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

// post a task
const postTask = async (req, res) => {
  try {
    await taskServices.postTask(req.body.title)
    return res.status(201).json({ message: 'new task added successfully!' })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

// edit single task based on id
const editTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id)
    const { title } = req.body
    const task = await taskServices.editTask(taskId, title)
    if (!task) {
      throw new HTTPError('Task not found', 404)
    }
    return res.status(200).send(task)
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

// set the given task to completed
const completeTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id)
    const task = await taskServices.completeTask(taskId)
    if (!task) {
      throw new HTTPError('Task not found', 404)
    }
    return res.status(200).json({ message: 'Task marked as completed' })
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

// delete all the tasks set to completed
const deleteCompletedTasks = async (req, res) => {
  try {
    await taskServices.deleteCompletedTasks()
    return res.status(200).json({ message: 'Completed tasks are deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

// delete a single task based on id
const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id)
    const task = await taskServices.deleteTask(taskId)
    if (!task) {
      throw new HTTPError('Task not found', 404)
    }
    return res.status(200).json(task)
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
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
