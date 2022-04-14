/* eslint-disable */
describe("Tasks", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/todos").as(
      "fetchTasks"
    );
    cy.visit("/");
  });

  it("should fetch tasks", () => {
    cy.wait("@fetchTasks").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("should add a task", () => {
    const TASK_MESSAGE = "New task";
    cy.intercept("POST", "https://jsonplaceholder.typicode.com/todos").as(
      "addTask"
    );
    cy.get('input[placeholder="New task title"]').type(
      TASK_MESSAGE + "{enter}"
    );
    cy.wait("@addTask").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body).to.be.an("object");
      cy.get(".task-card")
        .first()
        .find(".task-card__title")
        .invoke("text")
        .should("eq", TASK_MESSAGE);
    });
  });

  it("should remove a task", () => {
    cy.intercept("DELETE", "https://jsonplaceholder.typicode.com/todos/*").as(
      "deleteTask"
    );
    cy.get(".task-card")
      .first()
      .find(".task-card__title")
      .invoke("text")
      .then((text) => {
        cy.get(".task-card")
          .first()
          .find('[data-testid="delete-task"]')
          .click();
        cy.wait("@deleteTask").then(({ response }) => {
          expect(response.statusCode).to.eq(200);
          cy.get(".task-card")
            .first()
            .find(".task-card__title")
            .invoke("text")
            .should("not.eq", text);
        });
      });
  });

  it("should complete a task", () => {
    const UNCOMPLETED_TASK = "Quis ut nam facilis et officia qui";
    cy.intercept("PUT", "https://jsonplaceholder.typicode.com/todos/*").as(
      "updateTask"
    );
    cy.get(".task-card")
      .contains(UNCOMPLETED_TASK)
      .find('[data-testid="complete-task"]')
      .click();
    cy.wait("@updateTask").then(() => {
      cy.get(".task-card")
        .contains(UNCOMPLETED_TASK)
        .should("have.css", "text-decoration", "line-through solid rgb(153, 153, 153)")
        .and("have.css", "color", "rgb(153, 153, 153)")
        .and("have.css", "cursor", "not-allowed");
    });
  });
});
