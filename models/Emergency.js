const mongoose = require('mongoose')


const emergencySchema = new mongoose.Schema({
    work_category:{
        type: String,
        required: true
    },
    message:{
        type:Object,
        required:true
    }
}, {timestamps: true})
// reverse relationship
// Category.relationship({ path: 'posts', ref: 'Post', refPath: 'categories' });
// refPath=> categories are define in Post Schema ther he is a objectId
//   posts: { type: mongoose.Schema.Types.Relationship, ref: 'Post', refPath: 'categories' }
//  define in schema and search with Cateory.populate('posts')

const Emergency = mongoose.model("Emergency" , emergencySchema)

module.exports = Emergency