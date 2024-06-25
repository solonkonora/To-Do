import db from "../conection/mongo.js"

const Schema = db.Schema;

const todoSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        todo: {
            type: String,
            trim: true,
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium',
        },
        status: {
            type: String,
            enum: ['To Do', 'In Progress', 'Completed', 'Blocked'],
            default: 'To Do',
        },
        notes: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const TodoSchema = db.model("todo", todoSchema);

export default TodoSchema;
