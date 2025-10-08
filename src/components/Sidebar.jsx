import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/products", label: "Products", icon: "🛍️" },
    { path: "/orders", label: "Orders", icon: "📦" },
    { path: "/customers", label: "Customers", icon: "👥" },
    { path: "/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-white text-xl font-bold">E-Commerce Admin</h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        {/* Additional Links */}
        <div className="absolute bottom-0 w-full border-t border-gray-700">
          <button className="flex items-center w-full px-6 py-3 text-left text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <span className="text-lg mr-3">⚙️</span>
            <span className="font-medium">Settings</span>
          </button>
          <button className="flex items-center w-full px-6 py-3 text-left text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
            <span className="text-lg mr-3">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
