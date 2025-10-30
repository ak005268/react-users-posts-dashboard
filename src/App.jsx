import './App.css'
import { DataProvider } from "./context/DataContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
      <DataProvider>
        <div className="min-h-screen bg-gray-100 text-gray-800">
          <AppRoutes />
        </div>
      </DataProvider>
  );
};

export default App;
