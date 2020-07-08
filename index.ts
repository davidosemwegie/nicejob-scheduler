import Scheduler from "./src/Scheduler"
import { ScheduleObj, RequestObj } from "./src/interfaces"

const s = new Scheduler({
  project_id: "nicejob-282309",
  queue_id: "my-queue",
  location: "us-central1",
})

const request: RequestObj = {
  method: "POST",
  url: "https://www.google.com",
  body: {
    first_name: "David",
    last_name: "David",
  },
}

const date = new Date("2020-07-07T18:47:00")

const id = await s.schedule({ date, request })

console.log(id)
