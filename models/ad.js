var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

var adSchema = new Schema(
    {
        adId: {
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
        posteddate: {
            type: Date, required: true, default: Date.now
        },
        bid: {
            type: Number, required: true
        },
        isbn: {
            type: String, required: true
        },
        course: {
            type: String, required: true
        }
    },
    {
        collection: 'ads'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/adsdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('Ad', adSchema);
