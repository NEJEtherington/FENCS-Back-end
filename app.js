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
const cn = {
  host: "localhost",
  port: 5432,
  database: "fencs"
  // user: "charles",
  // password: "belgium7"
};
const db = pgp(cn);
const app = express();

const CategoryType = new GraphQLObjectType({
  name: "Categories",
  description: "This represents the category of an image file",
  fields: () => ({
    topic_id: { type: GraphQLInt },
    slug: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) }
  })
});

const ImageType = new GraphQLObjectType({
  name: "Images",
  description: "This represents an image",
  fields: () => ({
    image_id: { type: GraphQLInt },
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
    user_id: { type: GraphQLInt },
    username: { type: GraphQLNonNull(GraphQLString) },
    fullname: { type: GraphQLNonNull(GraphQLString) },
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

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "root mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      description: "Add a user",
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        fullname: { type: GraphQLNonNull(GraphQLString) },
        email_address: { type: GraphQLNonNull(GraphQLString) },
        date_joined: { type: BigInt },
        location: { type: GraphQLNonNull(GraphQLString) },
        owns_printer: { type: GraphQLBoolean },
        designer_tag: { type: GraphQLBoolean },
        avatar: { type: GraphQLString },
        rating: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return db
          .one(
            "INSERT INTO users(username, fullname, email_address, date_joined, location, owns_printer, designer_tag, avatar, rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
              args.username,
              args.fullname,
              args.email_address,
              args.date_joined,
              args.location,
              args.owns_printer,
              args.designer_tag,
              args.avatar,
              args.rating
            ]
          )
          .then(data => {
            return data;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    addCategory: {
      type: CategoryType,
      description: "Add a category",
      args: {
        slug: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return db
          .one(
            "INSERT INTO categories(slug, description) VALUES($1, $2) RETURNING *",
            [args.slug, args.description]
          )
          .then(data => {
            return data;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    addImage: {
      type: ImageType,
      description: "Add an image",
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        display_name: { type: GraphQLNonNull(GraphQLString) },
        posted_by: { type: GraphQLNonNull(GraphQLString) },
        date_uploaded: { type: BigInt },
        price: { type: GraphQLInt },
        thumbnail_url: { type: GraphQLNonNull(GraphQLString) },
        obj_image_url: { type: GraphQLNonNull(GraphQLString) },
        format: { type: GraphQLString },
        category: { type: GraphQLString }
      },
      resolve(parent, args) {
        return db
          .one(
            "INSERT INTO images(title, description, display_name, posted_by, date_uploaded, price, thumbnail_url, obj_image_url, format, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [
              args.title,
              args.description,
              args.display_name,
              args.posted_by,
              args.date_uploaded,
              args.price,
              args.thumbnail_url,
              args.obj_image_url,
              args.format,
              args.category
            ]
          )
          .then(data => {
            return data;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    deleteCategory: {
      type: CategoryType,
      description: "Delete a category",
      args: {
        slug: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return db
          .one("DELETE FROM categories WHERE slug = $1 RETURNING *", [
            args.slug
          ])
          .then(res => {
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    deleteUser: {
      type: UserType,
      description: "Delete a user",
      args: {
        username: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return db
          .result("DELETE FROM users WHERE username = $1 RETURNING *", [
            args.username
          ])
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    deleteImage: {
      type: ImageType,
      description: "Delete an image",
      args: {
        image_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return db
          .one("DELETE FROM images WHERE image_id = $1 RETURNING *", [
            args.image_id
          ])
          .then(res => {
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    updateUser: {
      type: UserType,
      description: "Update a user",
      args: {
        newValue: { type: GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return db
          .one(
            "UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *",
            [args.newValue, args.user_id]
          )
          .then(res => {
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    updateImage: {
      type: ImageType,
      description: "Update an image",
      args: {
        newValue: { type: GraphQLNonNull(GraphQLString) },
        image_id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return db
          .one("UPDATE images SET title = $1 WHERE image_id = $2 RETURNING *", [
            args.newValue,
            args.image_id
          ])
          .then(res => {
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    },
    updateCategory: {
      type: CategoryType,
      description: "Update a category",
      args: {
        newValue: { type: GraphQLNonNull(GraphQLString) },
        topic_id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return db
          .one(
            "UPDATE categories SET slug = $1 WHERE topic_id = $2 RETURNING *",
            [args.newValue, args.topic_id]
          )
          .then(res => {
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error);
          });
      }
    },
    updateUser: {
      type: UserType,
      description: "Update a user",
      args: {
        valueToUpdate: { type: GraphQLString },
        newValue: { type: GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        return db
          .one("UPDATE users SET $1:name = $2 WHERE user_id = $3 RETURNING *", [
            args.valueToUpdate,
            args.newValue,
            args.user_id
          ])
          .then(res => {
            return res;
          })
          .catch(error => {
            console.log("ERROR:", error); // print error;
          });
      }
    }
  })
});

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
