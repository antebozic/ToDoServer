const db = require('../models');

//api/users/:id/todos
exports.createTodo = async function(req, res, next) {
	try {
		let todo = await db.Todo.create({
			text: req.body.text,
			priority: req.body.priority,
			user: req.params.id
		});
		let foundUser = await db.User.findById(req.params.id);
		foundUser.todos.push(todo.id);
		await foundUser.save();
		let foundTodo = await db.Todo.findById(todo.id);
		return res.status(200).json(foundTodo);
	} catch (err) {
		return next(err);
	}
};
// PUT - /api/users/:id/todos/:todo_id
exports.updateTodo = async function(req, res, next) {
	try {
		//get todo by id from DB
		//updated todo and save to DB
		//send back todo to user

		let todo = await db.Todo.findByIdAndUpdate(req.params.todo_id, req.body, { new: true });
		res.status(200).json(todo);
	} catch (err) {
		return next(err);
	}
};

exports.updateTodoPriority = async function(req, res, next) {
	try {
		//get todo by id from DB
		//updated todo and save to DB
		//send back todo to user

		let todo = await db.Todo.findByIdAndUpdate(req.params.todo_id, req.body, { new: true });
		res.status(200).json(todo);
	} catch (err) {
		return next(err);
	}
};

// GET - /api/users/:id/todos/:todo_id
exports.getTodo = async function(req, res, next) {
	try {
		let todo = await db.Todo.findById(req.params.todo_id);
		res.status(200).json(todo);
	} catch (err) {
		return next(err);
	}
};

// GET - /api/users/:id/todos
exports.getTodos = async function(req, res, next) {
	try {
		let todos = await db.Todo.find({
			user: req.params.id
		});
		res.status(200).json(todos);
	} catch (err) {
		next(err);
	}
};

// DELETE - /api/users/:id/todos/:todo_id
exports.deleteTodo = async function(req, res, next) {
	try {
		let foundTodo = await db.Todo.findById(req.params.todo_id);
		await foundTodo.remove();
		res.status(200).json(foundTodo);
	} catch (err) {
		return next(err);
	}
};
