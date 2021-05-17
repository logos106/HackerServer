const mongoose = require("mongoose")

const ModerationLogSchema = new mongoose.Schema({
  moderatorUsername: {
    type: String,
    required: true
  },
  actionType: {
    type: String,
    required: true
  },
  username: String,
  itemId: String,
  itemTitle: String,
  itemBy: String,
  commentId: String,
  commentBy: String,
  created: Number
})

ModerationLogSchema.index({moderatorUsername: 1, actionType: 1})

module.exports = mongoose.model("ModerationLog", ModerationLogSchema)
