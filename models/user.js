var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        email: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        first_name: {
            type: String, required: true
        },
        last_name: {
            type: String, required: true
        },
        admin_status: {
            type: Boolean, required: true
        },
        selling_ad_ids: {
            type: [Number], default: []
        },
        session_token: {
            type: String, default: ""
        },
        logged_in: {
            type: Boolean, default: false
        },
        comment_ids: {
            type: [Number], default: []
        }
    },
    {
        collection: 'users'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.Promise = global.Promise;
var con3 = mongoose.createConnection('mongodb://localhost/usersdb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = con3.model('User', userSchema);
