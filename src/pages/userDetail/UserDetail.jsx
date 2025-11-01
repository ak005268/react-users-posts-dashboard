import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { PlusCircle, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import UserInfo from "./UserInfo";
import PostTable from "./PostTable";
import PaginationBar from "./PaginationBar";
import PostModal from "./PostModal";
import LoadingState from "../../components/LoadingState";

const POSTS_PER_PAGE = 3;

const UserDetail = () => {
  const { id } = useParams();
  const { users, posts, loading, error, addPost, editPost, deletePost } =
    useContext(DataContext);

  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      const selectedUser = users?.find((u) => u.id === Number(id));
      setUser(selectedUser);
    }
  }, [users, id]);

  useEffect(() => {
    const userSpecificPosts = posts?.filter((p) => p.userId === Number(id));
    setUserPosts(userSpecificPosts);
  }, [posts, id]);

  const totalPages = Math.ceil(userPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = userPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleAddOrEdit = (data) => {
    if (editingPostId) {
      editPost(editingPostId, data);
    } else {
      addPost(Number(id), data);
    }
    setOpen(false);
    setEditingPostId(null);
  };

  const openModal = (post = null) => {
    setEditingPostId(post ? post.id : null);
    setOpen(true);
  };

  if (loading)
    return (
      <LoadingState
        message="Loading user details..."
        subText="Please wait a moment"
      />
    );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={24} className="text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={24} className="text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-800">
              User Not Found
            </h3>
          </div>
          <p className="text-yellow-700 text-sm mb-4">
            The requested user could not be found.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Users</span>
      </Link>

      <UserInfo user={user} />

      <PostTable
        userPosts={userPosts}
        posts={paginatedPosts}
        currentPage={currentPage}
        onEdit={openModal}
        onDelete={deletePost}
        POSTS_PER_PAGE={POSTS_PER_PAGE}
      />

      <PaginationBar
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
      />

      <PostModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingPostId(null);
        }}
        onSubmit={handleAddOrEdit}
        editingPostId={editingPostId}
      />
    </div>
  );
};

export default UserDetail;
