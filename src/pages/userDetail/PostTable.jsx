import { useState, useDeferredValue, useMemo, useRef } from "react";
import { Edit, Trash2, FileText, Search, PlusCircle } from "lucide-react";
import KeyboardListener from "../../components/KeyboardListener"; 
import HeaderWithSearch from "../../components/HeaderWithSearch";

const PostTable = ({
  posts,
  currentPage,
  onEdit,
  onDelete,
  userPosts,
  POSTS_PER_PAGE,
}) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const deferredSearch = useDeferredValue(search);

  const filteredPosts = useMemo(() => {
    const term = deferredSearch.toLowerCase().trim();
    if (!term) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.body.toLowerCase().includes(term)
    );
  }, [posts, deferredSearch]);

  const handleCtrlK = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <KeyboardListener keyboard="k" onTrigger={handleCtrlK} />

      <HeaderWithSearch
        title="Posts"
        icon={FileText}
        count={`${userPosts.length} ${
          userPosts.length === 1 ? "Post" : "Posts"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts... (Ctrl + K)"
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => onEdit()}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium group"
          >
            <PlusCircle
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span>Add New Post</span>
          </button>
        </div>
      </HeaderWithSearch>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
             <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <tr
                    key={post.id}
                    className="hover:bg-blue-50/50 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm group-hover:bg-blue-200 transition-colors">
                        {(currentPage - 1) * POSTS_PER_PAGE + index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800 line-clamp-2">
                        {post.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm line-clamp-3 max-w-md">
                        {post.body}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => onEdit(post)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md group/btn"
                          title="Edit post"
                        >
                          <Edit
                            size={18}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                        </button>
                        <button
                          onClick={() => onDelete(post.id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group/btn"
                          title="Delete post"
                        >
                          <Trash2
                            size={18}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <FileText size={48} className="text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">
                        No posts found
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Try searching with a different keyword
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden divide-y divide-gray-200">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="p-4 hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm">
                    {(currentPage - 1) * POSTS_PER_PAGE + index + 1}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-xs line-clamp-3">
                    {post.body}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <FileText size={48} className="text-gray-300 mb-3 mx-auto" />
              <p className="text-gray-500 font-medium">No posts found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try searching with a different keyword
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostTable;
