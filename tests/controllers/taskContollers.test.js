const taskController = require('../../src/controllers/taskControllers')
const taskService = require('../../src/services/taskServices')

describe('get all task controller', () => {
  it('should return an array of objects', async () => {
    jest.spyOn(taskService, 'getAllTasks').mockResolvedValue([{
      id: 1
    }])

    const mockReq = {}
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    await taskController.getAllTasks(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toBeCalledWith([{ id: 1 }])
  })
})

describe('get a single task controller', () => {
  it('should return null', async () => {
    jest.spyOn(taskService, 'getTask').mockResolvedValue(null)

    const mockReq = {
      params: { id: 3 }
    }
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await taskController.getTask(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(404)
    expect(mockRes.json).toBeCalledWith({ message: 'Task not found' })
  })

  it('should return a task object', async () => {
    jest.spyOn(taskService, 'getTask').mockResolvedValue({ id: 3, title: 'finish assignment' })

    const mockReq = {
      params: { id: 3 }
    }
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    await taskController.getTask(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.json).toBeCalledWith({ id: 3, title: 'finish assignment' })
  })
})

describe('post a task', () => {
  it('should create a task', async () => {
    jest.spyOn(taskService, 'postTask').mockResolvedValue('new task added successfully!')

    const mockReq = {
      body: {
        title: 'finish assignment'
      }
    }
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    await taskController.postTask(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(201)
    expect(mockRes.send).toBeCalledWith('new task added successfully!')
  })
})

// describe('edit a single task', () => {
//   it('should return a null')
// })
