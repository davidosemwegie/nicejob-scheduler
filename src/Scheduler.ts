import { SchedulerInitObj, ScheduleObj } from "./interfaces"
import { CloudTasksClient } from "@google-cloud/tasks"
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

    const seconds = date.getTime() / 1000

    const task = {
      httpRequest: {
        httpMethod: request.method || "POST",
        url: request.url,
        body: request.body || null,
      },
      scheduleTime: {
        seconds,
      },
    }
    console.log("Sending task:")
    console.log(task)
    const req = {
      parent: this.parent,
      task,
    }
    const [response] = await client.createTask(req)
    const name = response.name
    const id = name.split("/").pop()

    return await id
  }

  /** delete function */
}

export default Scheduler
