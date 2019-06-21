const { RootMutationType } = require("./rootMutation");

const { RootQueryType } = require("./rootQuery");

const { GraphQLSchema } = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const cors = require("cors");
const EasyGraphQLTester = require("easygraphql-tester");
const app = express();
app.use(cors());

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use(
  "/",
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000, () => {
  console.log("listening for requests on port 4000...");
});

exports.schema = schema;
