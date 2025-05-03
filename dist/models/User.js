import { Schema, model } from 'mongoose';
// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Create a virtual property called friendCount
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
    return `${this.friends.length}`;
});
// Initialize our User model
const User = model('user', userSchema);
export default User;
