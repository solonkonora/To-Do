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

const TodoSchema = db.model("todos", todoSchema);

export default TodoSchema;
