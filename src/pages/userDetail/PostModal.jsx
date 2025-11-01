import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../../context/DataContext";
import { X, FileText } from "lucide-react";

const PostModal = ({ open, onClose, onSubmit, editingPostId }) => {
  const { posts } = useContext(DataContext);
  const initialData = posts.find((details) => details?.id === editingPostId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  useEffect(() => {
    if (initialData && editingPostId) {
      reset(initialData);
    } else {
      reset({ title: "", body: "" });
    }
  }, [initialData, editingPostId, open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <FileText size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {editingPostId ? "Edit Post" : "Create New Post"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Enter a compelling title..."
              className={`w-full px-4 py-3 border-2 rounded-lg  focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                errors.title ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full" />
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("body", { required: "Content is required" })}
              placeholder="Write your post content here..."
              rows="6"
              className={`w-full px-4 py-3 border-2 rounded-lg  focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${
                errors.body ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
              }`}
            />
            {errors.body && (
              <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full" />
                {errors.body.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              {editingPostId ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;