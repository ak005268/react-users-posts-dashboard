import { Link } from "react-router-dom";
import { Mail, Building2, User, MapPin, Phone, ArrowRight } from "lucide-react";

const UserCard = ({ user }) => {

  return (
    <Link
      to={`/user/${user.id}`}
      className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 block relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-16 -mt-16" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 flex items-center gap-2">
                {user.name}
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1"
                />
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                @{user.username}
              </p>
            </div>
          </div>

      
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-gray-600 group-hover:text-gray-700 transition-colors">
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
              <Mail
                size={14}
                className="text-gray-500 group-hover:text-blue-600 transition-colors"
              />
            </div>
            <span className="text-sm truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-2.5 text-gray-600 group-hover:text-gray-700 transition-colors">
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
              <Building2
                size={14}
                className="text-gray-500 group-hover:text-blue-600 transition-colors"
              />
            </div>
            <span className="text-sm truncate">{user.company.name}</span>
          </div>

          {user.phone && (
            <div className="flex items-center gap-2.5 text-gray-600 group-hover:text-gray-700 transition-colors">
              <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                <Phone
                  size={14}
                  className="text-gray-500 group-hover:text-blue-600 transition-colors"
                />
              </div>
              <span className="text-sm">{user.phone}</span>
            </div>
          )}

          {user.address && (
            <div className="flex items-center gap-2.5 text-gray-600 group-hover:text-gray-700 transition-colors">
              <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                <MapPin
                  size={14}
                  className="text-gray-500 group-hover:text-blue-600 transition-colors"
                />
              </div>
              <span className="text-sm truncate">{user.address.city}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
