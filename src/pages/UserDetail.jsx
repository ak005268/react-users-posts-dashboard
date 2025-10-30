import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import DashboardLayout from "../components/layout/DashboardLayout";

const POSTS_PER_PAGE = 3; 

const UserDetail = () => {
  const { id } = useParams();
  const { users, posts, loading, error, addPost, editPost, deletePost } = useContext(DataContext);

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPostId, setEditingPostId] = useState(null);

  const loaderRef = useRef(null);

  useEffect(() => {
    if (users.length > 0) {
      const selectedUser = users.find((u) => u.id === Number(id));
      setUser(selectedUser);
    }
  }, [users, id]);

  useEffect(() => {
    const userSpecificPosts = posts.filter((p) => p.userId === Number(id));
    setUserPosts(userSpecificPosts);
  }, [posts, id]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Add or Edit Post
  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (editingPostId) {
      editPost(editingPostId, newPost);
      setEditingPostId(null);
    } else {
      addPost(Number(id), newPost);
    }
    setNewPost({ title: "", body: "" });
  };

  if (loading) return <div className="text-center mt-10">Loading user...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-10 text-gray-500">User not found.</div>;

  return (
    <DashboardLayout>
      {/* Back Button */}
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Users
      </Link>

      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
        <p className="text-gray-600">{user.website}</p>
      </div>

      {/* Add/Edit Post Form */}
      <form
        onSubmit={handleAddOrEdit}
        className="bg-white p-4 rounded-lg shadow mb-6 space-y-3"
      >
        <h3 className="font-semibold text-lg">
          {editingPostId ? "Edit Post" : "Add New Post"}
        </h3>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Post Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          className="w-full border p-2 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingPostId ? "Update" : "Add"}
        </button>
      </form>

      {/* Posts List */}
      <div className="space-y-4">
        {userPosts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{post.title}</h4>
              <p className="text-gray-600">{post.body}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditingPostId(post.id);
                  setNewPost({ title: post.title, body: post.body });
                }}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {visiblePosts < userPosts.length && (
        <div ref={loaderRef} className="text-center mt-4 text-gray-500">
          Loading more...
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserDetail;
