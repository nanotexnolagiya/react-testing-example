import { useEffect, useRef } from "react";
import { useCrud } from "../hooks/crud.hook";
import { Input } from "../components/input";
import { TaskCard } from "../components/task-card";
import { tasksService } from "../services/tasks.service";

const ENTER_CHAR_CODE = 13;

export const Tasks = () => {
  const {
    items: tasks,
    getItems: getTasks,
    addItem: addTask,
    deleteItem: deleteTask,
    updateItem: updateTask,
    loading: tasksLoading,
    formLoading: taskFormLoading
  } = useCrud(tasksService);
  const newTaskRef = useRef();

  const handleKeyPress = (e) => {
    if (e.charCode === ENTER_CHAR_CODE) {
      addTask({
        title: newTaskRef.current.value,
        completed: false,
      });
      newTaskRef.current.value = "";
    }
  };

  const handleComplete = (item) => {
    updateTask(item.id, {
      ...item,
      completed: true,
    });
  };

  const handleDelete = (item) => {
    deleteTask(item.id);
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="data-list">
      <h1>Tasks</h1>
      <Input
        ref={newTaskRef}
        onKeyPress={handleKeyPress}
        label="Add new task"
        placeholder="New task title"
        disabled={taskFormLoading}
      />
      {tasksLoading
        ? "Loading"
        : tasks.map((task) => (
            <TaskCard
              item={task}
              key={task.id}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
    </div>
  );
};
