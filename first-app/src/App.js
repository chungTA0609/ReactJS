import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo.js';
import Form from './components/Form.js';
import FilterButton from './components/FilterButton.js'
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";


const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);




function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks?.length);

  function toggleTaskCompleted(id) {
    const updatedTask = tasks?.map(
      task => {
        if (id === task.id) {
          return { ...task, completed: !task.completed }
        }

        return task
      }
    );
    setTasks(updatedTask);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  function editTasks(id, newName) {
    const editedTaskList = tasks?.map(task => {
      if (id === task.id) {
        return { ...tasks, name: newName };
      }
      return tasks;
    });
    setTasks(editedTaskList);
  }
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks?.filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTasks={editTasks}
      />
    ));

  const tasksNoun = taskList?.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList?.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex={"-1"} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
