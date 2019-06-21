const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean
} = require("graphql");
const BigInt = require("graphql-bigint");

const CategoryType = new GraphQLObjectType({
  name: "Categories",
  description: "This represents the category of an image file",
  fields: () => ({
    topic_id: { type: GraphQLInt },
    slug: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    img_url: { type: GraphQLNonNull(GraphQLString) }
  })
});
exports.CategoryType = CategoryType;
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
exports.ImageType = ImageType;
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
exports.UserType = UserType;
