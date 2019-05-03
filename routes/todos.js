const express = require('express');

//mergeParams: true enables us to get id from params inside this router
const router = express.Router({ mergeParams: true });

const { createTodo, getTodo, getTodos, updateTodo, updateTodoPriority, deleteTodo } = require('../handlers/todos');

// prefix - /api/users/:id/todos
router.route('/').get(getTodos).post(createTodo);

// prefix - /api/users/:id/todos/:todo_id

router.route('/:todo_id').get(getTodo).put(updateTodo).put(updateTodoPriority).delete(deleteTodo);

module.exports = router;
