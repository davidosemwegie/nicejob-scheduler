import { CloudTasksClient } from "@google-cloud/tasks"
import { ScheduleObj } from "./interfaces"

const schedule = (data: ScheduleObj) => {

    const {date} = data 

    const client = new CloudTasksClient()
    
    const project = 

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue)
}
