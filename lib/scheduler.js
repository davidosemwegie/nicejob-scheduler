"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Methods;
(function (Methods) {
    Methods["POST"] = "POST";
    Methods["GET"] = "GET";
    Methods["PUT"] = "PUT";
    Methods["PATCH"] = "PATCH";
    Methods["DELETE"] = "DELETE";
})(Methods || (Methods = {}));
// const { CloudTasksClient } = require("@google-cloud/tasks")
const tasks_1 = require("@google-cloud/tasks");
const client = new tasks_1.CloudTasksClient();
class Scheduler {
    constructor(data) {
        const { project_id, queue_id, location } = data;
        this.project_id = project_id;
        this.queue_id = queue_id;
        this.location = location;
        // Construct the fully qualified queue name.
        this.parent = client.queuePath(this.project_id, this.location, this.queue_id);
    }
    /** schedule function */
    async schedule(data) {
        const { date, request } = data;
        const seconds = date.getTime() / 1000;
        const task = {
            httpRequest: {
                httpMethod: request.method || "POST",
                url: request.url,
                body: request.body || null,
            },
            scheduleTime: {
                seconds,
            },
        };
        console.log("Sending task:");
        console.log(task);
        const req = {
            parent: this.parent,
            task: task,
        };
        try {
            const [response] = await client.createTask(req);
            const name = response.name;
            const task_id = await name.split("/").pop();
            console.log(`Project Name: ${name}`);
            return task_id;
        }
        catch (error) {
            console.log(error.details);
        }
    }
    /** delete function */
    async delete(task_id) {
        const name = `${this.parent}/tasks/${task_id}`;
        await client
            .deleteTask({ name })
            .then(() => console.log("Task has been deleted successfully"))
            .catch((error) => console.log(error.details));
    }
}
module.exports = Scheduler;
//# sourceMappingURL=scheduler.js.map