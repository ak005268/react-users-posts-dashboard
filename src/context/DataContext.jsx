import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const usersRes = await fetch("/data/users.json");
        const postsRes = await fetch("/data/posts.json");

        if (!usersRes.ok || !postsRes.ok) throw new Error("Failed to load data");

        const usersData = await usersRes.json();
        const postsData = await postsRes.json();

        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        console.error(err);
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const addPost = (userId, newPost) => {
    const id = posts.length + 1;
    const post = { id, userId, ...newPost };
    setPosts((prev) => [...prev, post]);
  };

  const editPost = (postId, updatedData) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <DataContext.Provider
      value={{
        users,
        posts,
        loading,
        error,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
