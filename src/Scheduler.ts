import { SchedulerInitObj } from "./interfaces"

class Scheduler {
  project_id: string
  queue_id: string

  constructor(data: SchedulerInitObj) {
    const { project_id, queue_id } = data

    this.project_id = project_id
    this.queue_id = queue_id
  }

  showId() {
    console.log("Project Id: ", this.project_id)
  }
}

export default Scheduler
