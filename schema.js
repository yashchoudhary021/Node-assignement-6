let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posted_at: {
        type: Date,
        default: Date.now
    },
    posted_by: {
        type : String,
    }
})

module.exports = mongoose.model("Blogs", userSchema)