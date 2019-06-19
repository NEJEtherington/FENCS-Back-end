const { RootMutationType } = require("./rootMutation");

const { RootQueryType } = require("./rootQuery");

const {GraphQLSchema} = require("graphql")
const express = require("express");
const expressGraphQl = require("express-graphql");
const app = express();

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
