/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  filteredTodos: Todo[];
  editingTodoId: number | null;
  editingTodoTitle: string;
  todoOnDeleting: number | null;
  todoOnUpdating: number | null;
  todosOnDeleting: number[];
  todosOnUpdating: number[];
  handleChangeCompletedStatus: (todo: Todo) => void;
  handleEditSave: () => void;
  handleEditingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditCancel: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleEditing: (todo: Todo) => void;
  handleDeletingTodo: (id: number) => void;
};

export const TodoList = React.memo(
  forwardRef<HTMLInputElement, Props>(
    (
      {
        filteredTodos,
        editingTodoId,
        editingTodoTitle,
        todoOnDeleting,
        todoOnUpdating,
        todosOnDeleting,
        todosOnUpdating,
        handleChangeCompletedStatus,
        handleEditSave,
        handleEditingChange,
        handleEditCancel,
        handleEditing,
        handleDeletingTodo,
      },
      ref,
    ) => {
      return (
        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  id={`todo-status-${todo.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleChangeCompletedStatus(todo)}
                />
              </label>

              {editingTodoId === todo.id ? (
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    handleEditSave();
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={editingTodoTitle}
                    onChange={handleEditingChange}
                    onBlur={handleEditSave}
                    onKeyDown={handleEditCancel}
                    ref={ref}
                    autoFocus
                  />
                </form>
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleEditing(todo)}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDeletingTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              )}

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active':
                    todo.id === 0 ||
                    todo.id === todoOnDeleting ||
                    todo.id === todoOnUpdating ||
                    todosOnDeleting.includes(todo.id) ||
                    todosOnUpdating.includes(todo.id),
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
      );
    },
  ),
);
