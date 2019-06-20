const { CategoryType, ImageType, UserType } = require("./schema");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require("graphql");
const { db } = require("./db");

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
    },
    imagesByCatagory: {
      type: new GraphQLList(ImageType),
      description: "List of all Images with a catagory",
      args: { category: { type: GraphQLString } },
      resolve(obj, args) {
        return db
          .many("SELECT * FROM images WHERE category = $1", [args.category])
          .then(data => {
            return data;
          })
          .catch(err => console.log(err));
      }
    },
    imagesByUser: {
      type: new GraphQLList(ImageType),
      description: "List of all images by user",
      args: { username: { type: GraphQLString } },
      resolve(obj, args) {
        return db
          .many("SELECT * FROM images WHERE posted_by = $1", [args.username])
          .then(data => {
            return data;
          })
          .catch(err => console.log(err));
      }
    }
  })
});
exports.RootQueryType = RootQueryType;
