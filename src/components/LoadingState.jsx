import { Loader2 } from "lucide-react";

const LoadingState = ({ message, subText, fullScreen = 1 }) => (
  <div
    className={`flex flex-col items-center justify-center ${
      fullScreen ? "min-h-screen" : "py-20"
    }`}
  >
    <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
    <p className="text-gray-600 font-medium">{message}</p>
    <p className="text-gray-400 text-sm mt-1">{subText}</p>
  </div>
);

export default LoadingState;
