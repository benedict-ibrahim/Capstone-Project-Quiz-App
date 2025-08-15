import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Quipz Quiz
            </Link>
            
            <div className="flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive('/') 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/history" 
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive('/history') 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                History
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>Powered by Open Trivia Database</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;