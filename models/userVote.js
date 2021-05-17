const mongoose = require("mongoose")

const UserVoteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  parentItemId: String,
  upvote: {
    type: Boolean,
    required: true
  },
  downvote: {
    type: Boolean,
    required: true
  },
  date: Number
})

UserVoteSchema.index({username: 1, id: 1, parentItemId: 1, type: 1, upvote: 1, downvote: 1})

module.exports = mongoose.model("UserVote", UserVoteSchema)
