import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import "./post-card.style.css";
import { useMemo } from "react";
import { stringFirstCharUpperCase } from "../../utils/string-first-char-upper-case";

/**
 * Post item card
 *
 * @component
 * @example
 * const item = {
 *   title: 'Post title',
 *   body: 'Post body'
 * }
 * const handleEdit = () => {}
 * const handleDelete = () => {}
 * return (
 *   <PostCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
 * )
 */
export const PostCard = ({ item, onEdit, onDelete }) => {
  const formattedTitle = useMemo(() => {
    return stringFirstCharUpperCase(item.title);
  }, [item.title]);

  const formattedBody = useMemo(() => {
    return stringFirstCharUpperCase(item.body);
  }, [item.body]);

  return (
    <div className="post-card">
      <h1 className="post-card__title">
        {formattedTitle}
        <span className="post-card__actions">
          <FontAwesomeIcon
            icon={faPen}
            onClick={onEdit.bind(null, item)}
            color="blue"
          />
          <FontAwesomeIcon
            icon={faCircleMinus}
            onClick={onDelete.bind(null, item)}
            color="red"
          />
        </span>
      </h1>
      <p className="post-card__body">{formattedBody}</p>
    </div>
  );
};

PostCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
