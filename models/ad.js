var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide

var adSchema = new mongoose.Schema(
    {
        ad_id: {
            type: Number, required: true, unique: true
        },
        book_title: {
            type: String, required: true
        },
        author: {
            type: String, default: ""
        },
        desc: {
            type: String, default: ""
        },
        posted_date: {
            type: Date, default: Date.now
        },
        bid: {
            type: Number, required: true
        },
        bid_owner: {
            type: String, default: ""
        },
        isbn: {
            type: String, default: ""
        },
        course_code: {
            type: String, default: ""
        },
        owner_email: {
            type: String, required: true
        },
        comment_ids: {
            type: [Number], default: []
        }
    },
    {
        collection: 'ads'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.Promise = global.Promise;
var con2 = mongoose.createConnection('mongodb://localhost/adsdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = con2.model('Ad', adSchema);
