/**
 * Unit tests
 */

const Schedule = require("./index")

const scheduler = new Schedule({
  project_id: "nicejob-282309",
  queue_id: "my-queue",
  location: "us-central1",
})

const date = new Date("2020-07-11T20:00:00")

let task_id: string

//Testing the Scheduler function

describe("Successful Responses", () => {
  it("should return a string of numbers", async () => {
    const request = {
      method: "POST",
      url: "https://www.google.com",
      body: {
        first_name: "David",
        last_name: "David",
      },
    }

    const result = await scheduler.schedule({
      date,
      request,
    })

    task_id = result

    expect(result).toMatch(/([0-9])+/)
  })
  it("should return a string of numbers when no method is defined", async () => {
    const request = {
      url: "https://www.google.com",
      body: {
        first_name: "David",
        last_name: "David",
      },
    }

    const result = await scheduler.schedule({
      date,
      request,
    })

    expect(result).toMatch(/([0-9])+/)
  })
})

test("On Success, task_id should be a string of numbers", async () => {
  const request = {
    method: "POST",
    url: "https://www.google.com",
    body: {
      first_name: "David",
      last_name: "David",
    },
  }

  const result = await scheduler.schedule({
    date,
    request,
  })

  expect(result).toMatch(/([0-9])+/)
})

describe("Bad Request data", () => {
  it("Should return null", async () => {
    const request = {
      method: "POST",
      url: "www.google.com",
      body: {
        first_name: "David",
        last_name: "David",
      },
    }
    const result = await scheduler.schedule({
      date,
      request,
    })

    expect(result).toBeUndefined()
  })

  it(`sets the error message to be "HttpTarget.url must start with 'http://' or 'https://'."`, async () => {
    const request = {
      method: "POST",
      url: "www.google.com",
      body: {
        first_name: "David",
        last_name: "David",
      },
    }
    await scheduler
      .schedule({
        date,
        request,
      })
      .catch((error) => {
        expect(error).toBe(
          "HttpTarget.url must start with 'http://' or 'https://'."
        )
      })
  })
  it(`sets the error message to be "HttpRequest.url is required." when url is missing from body`, async () => {
    const request = {
      method: "POST",
    }
    await scheduler
      .schedule({
        date,
        request,
      })
      .catch((error) => {
        expect(error).toBe("HttpRequest.url is required.")
      })
  })
})

describe("Delete function", () => {
  it("Should return 'Task has been deleted successfully'", async () => {
    const request = {
      method: "POST",
      url: "https://www.google.com",
      body: {
        first_name: "David",
        last_name: "David",
      },
    }

    const result = await scheduler.schedule({
      date,
      request,
    })

    await scheduler.delete(result).then((res) => {
      expect(res).toBe(console.log("Task has been deleted successfully"))
    })
  })
  it("Should return 'Requested entity was not found.' when task_id isn't valid", async () => {
    await scheduler.delete("random string").then((res) => {
      expect(res).toBe(console.log("Requested entity was not found."))
    })
  })
})
