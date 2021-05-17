const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  by: {
    type: String,
    required: true
  },
  parentItemId: {
    type: String,
    required: true
  },
  parentItemTitle: {
    type: String,
    required: true
  },
  isParent: {
    type: Boolean,
    required: true
  },
  parentCommentId: String,
  children: [
    {
      type: mongoose.Schema.ObjectId, ref: "Comment"
    }
  ],
  text: String,
  points: {
    type: Number,
    default: 1,
    min: -4
  },
  created: Number,
  dead: {
    type: Boolean,
    default: false
  }
})

function autoPopulateChildrenComments(next) {
  if (this.options.getChildrenComments) {
    let filterObj = {}

    if (!this.options.showDeadComments) filterObj.dead = false

    this.populate({
      path: "children",
      match: filterObj,
      options: {
        getChildrenComments: true,
        showDeadComments: this.options.showDeadComments
      }
    })

    next()
  } else {
    next()
  }
}

CommentSchema.pre("find", autoPopulateChildrenComments)
CommentSchema.pre("findOne", autoPopulateChildrenComments)

CommentSchema.index({id: 1, by: 1, parentItemId: 1, isParent: 1, parentCommentId: 1, points: 1})

module.exports = mongoose.model("Comment", CommentSchema)
