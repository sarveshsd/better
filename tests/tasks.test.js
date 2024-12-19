const request = require("supertest");
const app = require("../app");

describe("Task API Endpoints", () => {
  let createdTaskId;

  test("GET /tasks - should return an empty array", async () => {
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body.tasks).toEqual([]);
  });

  test("POST /tasks - should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title", "Test Task");
    createdTaskId = response.body.id;
  });

  test("PUT /tasks/:id - should update an existing task", async () => {
    const response = await request(app)
      .put(`/tasks/${createdTaskId}`)
      .send({ title: "Updated Task" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Task");
  });

  test("DELETE /tasks/:id - should delete a task", async () => {
    const response = await request(app).delete(`/tasks/${createdTaskId}`);
    expect(response.statusCode).toBe(204);
  });

  test("GET /tasks - should return an empty array after deletion", async () => {
    const response = await request(app).get("/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body.tasks).toEqual([]);
  });
});

