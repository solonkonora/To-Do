import db from "../conection/mongo.js"

const Schema = db.Schema;

const userSchema = new Schema ({
        username: {
             type: String,
             required: true
        }, 
        password: {
            type:String,
            required:true
        }
    });

const UserSchema = db.model("user", userSchema);

export default UserSchema;