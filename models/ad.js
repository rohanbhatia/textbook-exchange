var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide

var adSchema = new mongoose.Schema(
    {
        ad_id: {
            type: Number, required: true, unique: true
        },
        title: {
            type: String, required: true
        },
        author: {
            type: String, required: true
        },
        description: {
            type: String, required: true
        },
        posted_date: {
            type: Date, required: true, default: Date.now
        },
        bid: {
            type: Number, required: true
        },
        isbn: {
            type: String, required: true
        },
        course_code: {
            type: String, required: true
        }
    },
    {
        collection: 'ads'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
var con2 = mongoose.createConnection('mongodb://localhost/adsdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = con2.model('Ad', adSchema);
