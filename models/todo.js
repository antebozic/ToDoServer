const mongoose = require('mongoose');
const User = require('./user');

const todoSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 160
		},
		priority: {
			type: String,
			default: ''
		},
		completed: {
			type: Boolean,
			default: false
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

todoSchema.pre('remove', async function(next) {
	try {
		//find a user
		let user = await User.findById(this.user);
		//remove id of the todo from their list of todos
		user.todos.remove(this.id);
		//save that user
		await user.save();
		//return next
		return next();
	} catch (e) {
		return next(e);
	}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
