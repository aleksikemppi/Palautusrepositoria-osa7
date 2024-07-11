import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.get(id);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setBlog(returnedBlog);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.addComment(blog.id, { comment: newComment });
      setBlog(returnedBlog);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default Blog;
