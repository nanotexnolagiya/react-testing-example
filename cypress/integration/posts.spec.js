/* eslint-disable */
describe("Tasks", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts").as(
      "fetchPosts"
    );
    cy.visit("/posts");
  });

  it("should fetch posts", () => {
    cy.wait("@fetchPosts").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
});
