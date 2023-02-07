const { Tasks } = require('../../database/models')

const getAllTasks = async () => {
  return await Tasks.findAll()
}
const getTask = async (id) => {
  return await Tasks.findOne({ where: { id } })
}

const postTask = async (title) => {
  await Tasks.create({ title })
}

const editTask = async (id, title) => {
  await Tasks.update({ title }, {
    where: {
      id
    }
  })
  return await Tasks.findOne({ where: { id } })
}

const completeTask = async (id) => {
  await Tasks.update({ isCompleted: true }, {
    where: {
      id
    }
  })
  return await Tasks.findOne({ where: { id } })
}

const deleteCompletedTasks = async () => {
  await Tasks.destroy({
    where: { isCompleted: true }
  })
}

const deleteTask = async (id) => {
  const task = await Tasks.findOne({ where: { id } })
  await Tasks.destroy({
    where: { id }
  })
  return task
}

module.exports = { getAllTasks, getTask, postTask, editTask, completeTask, deleteCompletedTasks, deleteTask }
