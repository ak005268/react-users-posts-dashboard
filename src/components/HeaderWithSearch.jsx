const HeaderWithSearch = ({ title, icon: Icon, count, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col md:flex-row lg:items-center justify-between gap-4">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
          {Icon && <Icon className="text-blue-600" size={24} />}
          {title}
        </h3>
        {typeof count === "number" && (
          <p className="text-gray-600 text-sm">{count}</p>
        )}
      </div>

      {children}
    </div>
  );
};

export default HeaderWithSearch;
