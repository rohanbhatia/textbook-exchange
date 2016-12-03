var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
    	comment_id: {
            type: Number, required: true, unique: true
        },
        ad_id: {
            type: Number, required: true
        },
        poster_email: {
            type: String, required: true
        },
        posted_date: {
            type: Date, default: Date.now
        },
        comment: {
            type: String, required: true
        }
    },
    {
        collection: 'comments'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.Promise = global.Promise;
var con1 = mongoose.createConnection('mongodb://localhost/commentsdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = con1.model('Comment', commentSchema);
