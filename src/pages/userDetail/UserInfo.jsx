import { Mail, Globe, Phone, Building2, MapPin } from "lucide-react";

const UserInfo = ({ user }) => {

  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              {user.name}
            </h2>
            <p className="text-blue-100 text-sm font-medium">
              @{user.username}
            </p>
          </div>
 
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 group">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-100 transition-colors">
            <Mail size={20} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="text-sm text-gray-800 font-medium truncate">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-200 group">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-green-100 transition-colors">
            <Phone size={20} className="text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Phone
            </p>
            <p className="text-sm text-gray-800 font-medium">{user.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-200 group">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-purple-100 transition-colors">
            <Globe size={20} className="text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Website
            </p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 font-medium hover:underline truncate block"
            >
              {user.website}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors duration-200 group">
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-orange-100 transition-colors">
            <Building2 size={20} className="text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Company
            </p>
            <p className="text-sm text-gray-800 font-medium truncate">
              {user.company.name}
            </p>
            <p className="text-xs text-gray-500 italic truncate mt-0.5">
              {user.company.catchPhrase}
            </p>
          </div>
        </div>

        {user.address && (
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors duration-200 group sm:col-span-2">
            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-indigo-100 transition-colors">
              <MapPin size={20} className="text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Address
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {user.address.street}, {user.address.suite}
              </p>
              <p className="text-sm text-gray-600">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
