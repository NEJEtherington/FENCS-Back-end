const express = require("express");
const expressGraphQl = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} = require("graphql");
const BigInt = require("graphql-bigint");
const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/fencs");
const app = express();

console.log(db.one);

const CategoryType = new GraphQLObjectType({
  name: "Categories",
  description: "This represents the category of an image file",
  fields: () => ({
    topic_id: { type: GraphQLID },
    slug: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) }
  })
});

const ImageType = new GraphQLObjectType({
  name: "Images",
  description: "This represents an image",
  fields: () => ({
    image_id: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    display_name: { type: GraphQLNonNull(GraphQLString) },
    posted_by: { type: GraphQLNonNull(GraphQLString) },
    date_uploaded: { type: BigInt },
    price: { type: GraphQLInt },
    thumbnail_url: { type: GraphQLNonNull(GraphQLString) },
    obj_image_url: { type: GraphQLNonNull(GraphQLString) },
    format: { type: GraphQLString },
    likes: { type: GraphQLInt },
    category: { type: GraphQLString }
  })
});

const UserType = new GraphQLObjectType({
  name: "Users",
  description: "This represents an user",
  fields: () => ({
    user_id: { type: GraphQLID },
    username: { type: GraphQLNonNull(GraphQLString) },
    forename: { type: GraphQLNonNull(GraphQLString) },
    email_address: { type: GraphQLNonNull(GraphQLString) },
    date_joined: { type: BigInt },
    location: { type: GraphQLNonNull(GraphQLString) },
    owns_printer: { type: GraphQLBoolean },
    designer_tag: { type: GraphQLBoolean },
    avatar: { type: GraphQLString },
    rating: { type: GraphQLInt }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    category: {
      type: CategoryType,
      description: "A single category",
      args: {
        slug: { type: GraphQLString }
      },
      resolve(obj, args) {
        return db.one("SELECT * FROM categories WHERE slug = $1", [args.slug]);
      }
    },
    image: {
      type: ImageType,
      description: "A single image",
      args: {
        image_id: { type: GraphQLID }
      },
      resolve(obj, args) {
        return db.one("SELECT * FROM images WHERE image_id = $1", [
          args.image_id
        ]);
      }
    },
    user: {
      type: UserType,
      description: "A single user",
      args: {
        username: { type: GraphQLString }
      },
      resolve(obj, args) {
        return db.one("SELECT * FROM users WHERE username = $1", [
          args.username
        ]);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      description: "List of all categories",
      resolve(obj, args) {
        return db.many("SELECT * FROM categories");
      }
    },
    images: {
      type: new GraphQLList(ImageType),
      description: "List of all images",
      resolve(obj, args) {
        return db.many("SELECT * FROM images");
      }
    },
    users: {
      type: new GraphQLList(UserType),
      description: "List of all users",
      resolve(obj, args) {
        return db.many("SELECT * FROM users");
      }
    }
  })
});

// const RootMutationType = new GraphQLObjectType({
//   name: "Mutation",
//   description: "root mutation",
//   fields: () => ({
//     addUser: {
//       type: UserType,
//       description: "Add a user",
//       args: {
//         username: { type: GraphQLNonNull(GraphQLString) },
//         forename: { type: GraphQLNonNull(GraphQLString) },
//         email_address: { type: GraphQLNonNull(GraphQLString) },
//         date_joined: { type: GraphQLDate },
//         location: { type: GraphQLNonNull(GraphQLString) },
//         owns_printer: { type: GraphQLBoolean },
//         designer_tag: { type: GraphQLBoolean },
//         avatar: { type: GraphQLString },
//         rating: { type: GraphQLInt },
//         images: {
//           type: images,
//           resolve: user => {
//             return images.find(image => image.posted_by === user.username);
//           }
//         }
//       },
//       resolve: (parent, args) => {
//         const user = {
//           name: args.username,
//           forename: args.forename,
//           email_address: args.email_address

//         };
//         books.push(book);
//         return book;
//       }
//     }
//   })
// });

const schema = new GraphQLSchema({
  query: RootQueryType
  // mutation: RootMutationType
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
