import React, { useState, useEffect, useContext } from 'react';
import { FaHome, FaPlusCircle, FaUser, FaPersonBooth, FaWpexplorer, FaShoppingCart, FaInternetExplorer, FaDeploydog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../utils/cartcontext'; 

const BottomNavbar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);

  const { cartItems } = useContext(CartContext); // Access cart items from context

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <FaHome /> },
    { name: 'Explore', path: '/explore-page', icon: <FaWpexplorer /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart /> },
    { name: 'Profile', path: '/profile', icon: <FaPersonBooth /> },
  ];

  const handleNavClick = (path) => {
    setActiveNav(path);
  };

  return (
    <div className="fixed bottom-[-1px] left-0 w-full bg-white h-20 rounded-tr-3xl rounded-tl-3xl shadow-t-lg py-4 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={() => handleNavClick(item.path)}
          className={`flex flex-col items-center gap-1 ${
            activeNav === item.path ? 'text-[#F7931A]' : 'text-[#363853] gap-2'
          }`}
        >
          <div className="relative text-xl">
            {item.icon}
            {/* Display the cart item count on the Cart icon */}
            {item.name === 'Cart' && cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#363853] text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="text-[12px]">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;
