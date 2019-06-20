const EasyGraphQLTester = require("easygraphql-tester");

const { schema } = require("./app");

describe("Test queries and mutations", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(schema);
  });

  after(() => {
    process.exit();
  });

  describe("queries on images path", () => {
    it("returns false if passed an invalid query on images", () => {
      const invalidQuery = `
        {images {
          image_id
          date_uploaded
          price
          invalidField
        }}
      `;
      // First arg: false, there is no invalidField on the schema.
      tester.test(false, invalidQuery);
    });

    it("should return true if passed a valid query on images", () => {
      const validQuery = `
        {
          images {
            posted_by
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the delete mutation is valid", () => {
      const mutation = `
        mutation {
          deleteImage(image_id: 1) {
            description
          }
        }
      `;
      tester.test(true, mutation);
    });

    it("Should pass if the update mutation is valid", () => {
      const mutation = `
        mutation {
          updateImage(valueToChange: "description", newValue: "testing", image_id: 1) {
            description
            image_id
          }
        }
      `;
      tester.test(true, mutation);
    });

    it("Should not pass if one value on the mutation input is invalid", () => {
      const mutation = `
        mutation {
          updateImage(valueToChange: 3, newValue: "test", image_id: "description") {
            posted_by
            image_id
          }
        }
      `;
      tester.test(false, mutation);
    });
  });
  describe("queries on users path", () => {
    it("returns false if passed an invalid query on users", () => {
      const invalidQuery = `
        {
          users {
            currentusername
        }
      }
      `;
      // First arg: false, there is no invalidField on the schema.
      tester.test(false, invalidQuery);
    });

    it("should return true if passed a valid query on users", () => {
      const validQuery = `
        {
          users {
            username
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the delete mutation is valid", () => {
      const mutation = `
        mutation {
          deleteUser(username: "lizzyk") {
            user_id
          }
        }
      `;
      tester.test(true, mutation);
    });

    it("Should pass if the update mutation is valid", () => {
      const mutation = `
        mutation {
          updateUser(valueToUpdate: "username", newValue: "mitch", user_id: 1) {
            username
            user_id
          }
        }
      `;
      tester.test(true, mutation);
    });

    it("Should not pass if one value on the mutation input is invalid", () => {
      const mutation = `
        mutation {
          updateUser(valueToUpdate: 3, newValue: "test", user_id: "username") {
            username
            user_id
          }
        }
      `;
      tester.test(false, mutation);
    });
  });
  describe("queries on categories path", () => {
    it("returns false if passed an invalid query on categories", () => {
      const invalidQuery = `
        {
          categories {
            snail
        }
      }
      `;
      // First arg: false, there is no invalidField on the schema.
      tester.test(false, invalidQuery);
    });

    it("should return true if passed a valid query on categories", () => {
      const validQuery = `
        {
          categories {
            slug
          }
        }
      `;
      tester.test(true, validQuery);
    });

    it("Should pass if the delete mutation is valid", () => {
      const mutation = `
        mutation {
          deleteCategory(slug: "shapes") {
            slug
            description
            topic_id
          }
        }
      `;
      tester.test(true, mutation);
    });

    it("Should pass if the update mutation is valid", () => {
      const mutation = `
        mutation {
          updateCategory(valueToUpdate: "slug", newValue: "mitch", topic_id: 1) {
            slug
            description
            topic_id
          }
        }
      `;
      tester.test(true, mutation);
    });

    it("Should not pass if one value on the mutation input is invalid", () => {
      const mutation = `
        mutation {
          updateImage(valueToUpdate: 3, newValue: "test", topic_id: "username") {
            slug
            description
            topic_id
          }
        }
      `;
      tester.test(false, mutation);
    });
  });
});
