const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User has many Post
User.hasMany(Post, {
  foreignKey: "user_id",
});

// User has many Comment
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// Post has many Comment
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
