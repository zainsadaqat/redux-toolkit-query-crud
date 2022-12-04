import React from 'react';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../features/api/apiSlice';

const TodoList = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: 'New Todo', completed: false });
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <article>
        {todos.map((item) => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={item.id}
            >
              <h2>{item.title}</h2>
              <input
                type="checkbox"
                onClick={() => updateTodo({ ...item, id: item.id })}
              />
              <button type="button" onClick={() => deleteTodo({ id: item.id })}>
                Delete
              </button>
            </div>
          );
        })}
      </article>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <div>
      <h2>Todo List:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Todo:</label>
        <input type="text" name="todo" />
      </form>
      {content}
    </div>
  );
};

export default TodoList;
