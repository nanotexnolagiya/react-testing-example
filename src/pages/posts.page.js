import { useEffect, useRef, useState } from "react";
import { useCrud } from "../hooks/crud.hook";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { PostCard } from "../components/post-card/post-card.component";
import { Textarea } from "../components/textarea";
import { postsService } from "../services/posts.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Posts = () => {
  const {
    items: posts,
    getItems: getPosts,
    addItem: addPost,
    updateItem: updatePost,
    deleteItem: deletePost,
    loading: postsLoading,
    formLoading: postsFormLoading
  } = useCrud(postsService);
  const [edited, setEdited] = useState(null);
  const newPostTitleRef = useRef();
  const newPostBodyRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      title: newPostTitleRef.current.value,
      body: newPostBodyRef.current.value,
    };
    if (edited) {
      updatePost(edited.id, values);
      setEdited(null);
    } else {
      addPost(values);
      newPostTitleRef.current.value = '';
      newPostBodyRef.current.value = '';
    }
  };

  const handleEdit = (item) => {
    setEdited(item);
  };

  const handleDelete = (item) => {
    deletePost(item.id);
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    newPostTitleRef.current.value = edited?.title || '';
    newPostBodyRef.current.value = edited?.body || '';
  }, [edited]);

  return (
    <div className="data-list">
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <Input ref={newPostTitleRef} label="Title" placeholder="Post title" />
        <Textarea ref={newPostBodyRef} label="Body" placeholder="Post body" />
        <Button type="submit" disabled={postsFormLoading}>
          { postsFormLoading ? <FontAwesomeIcon className="animate-spinner" icon={faSpinner} /> : 'Save' }
        </Button>
      </form>
      {postsLoading ? 'Loading' : posts.map((post) => (
        <PostCard
          item={post}
          key={post.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
