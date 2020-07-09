# nicejob-scheduler

The goal was to create an NPM module to provide a simple interface for scheduling HTTP requests on [Google Cloud Tasks](https://googleapis.dev/nodejs/tasks/latest/index.html).

## Overview

Scheduling message requests and social media shares is a major product feature of NiceJob. On the platform meanwhile we need to schedule token refreshes, time-intensive data calculations, and other miscellaneous actions.

Therefore we need a means of executing an event at a given time. To do that, we use [Google Cloud Tasks](https://googleapis.dev/nodejs/tasks/latest/index.html).

## GCP Cloud Tasks documentation

- [Cloud Tasks homepage]()
- [Cloud Tasks NPM client library](https://googleapis.dev/nodejs/tasks/latest/index.html)

## Installation

```sh
npm i nicejob-scheduler
```

## Module initialization

## Authorization

You have to set an enviroment variable **'GOOGLE_APPLICATION_CREDENTIALS'** that equal to the path of your service account.

```sh
export GOOGLE_APPLICATION_CREDENTIALS="[PATH_TO_YOUR_CREDENTIALS_FILE]"
```

For more information on authorization visit [Getting Started with Authentication]('https://cloud.google.com/docs/authentication/getting-started)

```js
const Scheduler = require("nicejob-scheduler")

const scheduler = new Scheduler({
  project_id,
  queue_id,
})
```

### Constructor options

| Property     | Type   | Required | Description                      |
| ------------ | ------ | -------- | -------------------------------- |
| `project_id` | String | &check;  | Google Cloud Platform project ID |
| `queue_id`   | String | &check;  | Cloud Tasks queue ID             |

## Creating a Task Queue

Task Queues can be created using the [`gcloud` CLI](https://cloud.google.com/sdk/gcloud/reference/tasks/queues/create):

```sh
$ gcloud tasks queues create $QUEUE_ID --project=$PROJECT_ID
```

---

## Methods

- [schedule()](#schedule-date-request-)
- [delete()](#deletetask_id)

---

### schedule({ date, request })

Schedules a new Cloud Task.

```js
const id = await scheduler.schedule({ date, request })
```

#### Parameters

| Parameter         | Type   | Required | Description                                                | Default       |
| ----------------- | ------ | -------- | ---------------------------------------------------------- | ------------- |
| `date`            | Date   |          | Task execution time                                        | _Immediately_ |
| `request`         | Object | &check;  |                                                            |               |
| `request.url`     | String | &check;  | Request URL                                                |               |
| `request.method`  | String | &check;  | Request method                                             | `"POST"`      |
| `request.headers` | Object |          | Request headers                                            | [0]           |
| `request.body`    | Object |          | Request body, if method is `"POST"`, `"PUT"`, or `"PATCH"` |               |

- [0] – The default `Content-Type` header should be `application/json`

#### Returns

An string returning the new Cloud Task ID from the Cloud Tasks client library. These names have the format:

```
projects/$PROJECT_ID/locations/$LOCATION_ID/queues/$QUEUE_ID/tasks/$TASK_ID
```

#### Example usage

```js
/**
 * Schedule an HTTP request
 */
const date = new Date("2020-01-01T12:00:00")
const request = {
  url: "https://api.nicejob.co/v2/process",
  headers: {
    Authorization: "Bearer faketoken",
  },
  body: {
    id: 123,
    metadata: { foo: "bar" },
  },
}

const task_id = await scheduler.schedule({ date, request })
```

---

### delete(task_id)

Removes an existing Cloud Task from its Queue.

```js
await scheduler.delete(task_id)
```

#### Parameters

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `task_id` | String | &check;  | Cloud Task ID |

#### Example usage

```js
/**
 * Unschedule a task
 */
const task_id =
  "projects/MyProject/locations/ThatLocation/queues/ThisTask/tasks/123456789"
await scheduler.delete(id)
```
