import db from "../conection/mongo.js"

const Schema = db.Schema;

const todoSchema = new Schema(
    {
        // todo +=> complete schema
    },
    {
        timestamps: true
    }    
);

const TodoSchema = db.model("todo", todoSchema);

export default TodoSchema;
