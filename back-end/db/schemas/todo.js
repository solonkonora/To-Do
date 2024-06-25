import db from "../conection/mongo.js"

const Schema = db.Schema;

const todoSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        todo: "string",
        required: true,
    },
    {
        timestamps: true
    }
);

const TodoSchema = db.model("todo", todoSchema);

export default TodoSchema;
