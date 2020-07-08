const Scheduler2 = require("./index")

const sch = async () => {
  const s = new Scheduler2({
    project_id: "nicejob-282309",
    queue_id: "my-queue",
    location: "us-central1",
  })

  const request = {
    //method: "POST",
    //url: "http://www.google.com",
  }

  const date = new Date("2020-07-08T18:00:00")

  let task_id: string

  //const val = await s.schedule({ date, request })

  const id = "4893028880281473627"

  await s.delete(id)

  //console.log(val)
}

sch()
