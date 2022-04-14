import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleMinus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import "./task-card.style.css";
import PropTypes from "prop-types";
import { stringFirstCharUpperCase } from "../../utils/string-first-char-upper-case";

/**
 * Task item card
 *
 * @component
 * @example
 * const item = {
 *   title: 'Task title',
 *   completed: true
 * }
 * const handleComplete = () => {}
 * const handleDelete = () => {}
 * return (
 *   <TaskCard item={item} onComplete={handleComplete} onDelete={handleDelete} progressDelete />
 * )
 */
export const TaskCard = ({ item, onComplete, onDelete, progressDelete }) => {
  
  const formattedTitle = useMemo(() => {
    return stringFirstCharUpperCase(item.title);
  }, [item.title]);

  const style = useMemo(
    () => ({
      textDecoration: item.completed && "line-through",
      color: item.completed && "#999999",
      cursor: item.completed && "not-allowed",
    }),
    [item.completed]
  );
  return (
    <div className="task-card">
      <h1 className="task-card__title" style={style}>
        {formattedTitle}
        <span className="task-card__actions">
          {!item.completed && <FontAwesomeIcon
            icon={faCircleCheck}
            onClick={onComplete.bind(null, item)}
            color="green"
            data-testid="complete-task"
          />}
          { progressDelete ? <FontAwesomeIcon className="animate-spinner" icon={faSpinner} /> : <FontAwesomeIcon
            icon={faCircleMinus}
            onClick={onDelete.bind(null, item)}
            color="red"
            data-testid="delete-task"
          />}
        </span>
      </h1>
    </div>
  );
};

TaskCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  progressDelete: PropTypes.bool,
};
