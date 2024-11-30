import { Input } from 'antd';
import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useReducer } from "react";
import ReactDOM from "react-dom/client";

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];
type Todo = (typeof initialTodos)[number];

const reducer = (state: Todo[], action: { id?: number, type: string; title?: string; }) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    case 'add':
      return [
        ...state,
        {
          id: state.length + 1,
          complete: false,
          title: action.title!,
        }
      ];
    default:
      return state;
  }
};

export default function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo: Todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  const onAdd = (title: string) => {
    dispatch({ type: "add", title });
  };

  return (
    <>
      <div>
        <Input onChange={(e) => { onAdd(e.target.value); }} />
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  );
}