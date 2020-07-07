export interface SchedulerInitObj {
  project_id: string
  queue_id: string
  location: string
}

export interface ScheduleObj {
  date: Date
  request: RequestObj
}

export interface RequestObj {
  url: string
  method: "POST"
  headers?: any
  body?: any
}

export enum Methods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

//  | "POST"
//   | "HTTP_METHOD_UNSPECIFIED"
//   | "GET"
//   | "HEAD"
//   | "PUT"
//   | "DELETE"
//   | "PATCH"
//   | "OPTIONS"
