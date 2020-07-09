//Types
interface SchedulerInitObj {
  project_id: string
  queue_id: string
  location: string
}

interface ScheduleObj {
  date: Date
  request: RequestObj
}

interface RequestObj {
  url: string
  method: "POST"
  headers?: any
  body?: any
}

enum Methods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// const { CloudTasksClient } = require("@google-cloud/tasks")
import { CloudTasksClient } from "@google-cloud/tasks"
import { resolve } from "path"

const client = new CloudTasksClient()

class Scheduler {
  //Initializing the CloudTasksClient

  project_id: string
  queue_id: string
  location: string
  parent: string

  constructor(data: SchedulerInitObj) {
    const { project_id, queue_id, location } = data

    this.project_id = project_id
    this.queue_id = queue_id
    this.location = location

    // Construct the fully qualified queue name.
    this.parent = client.queuePath(
      this.project_id,
      this.location,
      this.queue_id
    )
  }

  /** schedule function */
  async schedule(data: ScheduleObj) {
    const { date, request } = data

    const seconds: number = date.getTime() / 1000

    const task = {
      httpRequest: {
        httpMethod: request.method || "POST",
        url: request.url,
        body: request.body ? request.body : null,
        headers: request.headers
          ? request.headers
          : { contentType: "application/json" },
      },
      scheduleTime: {
        seconds,
      },
    }

    console.log("Sending task:")
    console.log(task)
    const req = {
      parent: this.parent,
      task: task,
    }

    try {
      const [response] = await client.createTask(req)
      const name = response.name
      const task_id = await name.split("/").pop()
      console.log(`Project Name: ${name}`)
      return task_id
    } catch (error) {
      console.log(error.details)
    }
  }

  /** delete function */
  async delete(task_id: string) {
    const name = `${this.parent}/tasks/${task_id}`
    await client
      .deleteTask({ name })
      .then(() => console.log("Task has been deleted successfully"))
      .catch((error) => console.log(error.details))
  }
}

module.exports = Scheduler
