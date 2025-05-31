import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Award, Wallet, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useStore();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { to: '/', label: 'Home', icon: TrendingUp },
    { to: '/deposit', label: 'Deposit', icon: Wallet },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="bg-background border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Award className="w-8 h-8 text-primary mr-2" />
          <span className="text-white font-bold text-xl hidden sm:inline">
            Win-Win <span className="text-primary">Syndicate</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-1 py-2 text-sm font-medium ${
                  location.pathname === item.to
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary transition-colors'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Balance */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="bg-background-light px-3 py-1.5 rounded-lg">
            <span className="text-primary font-bold">{formatCurrency(user.balance)}</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 right-0 bg-background-light border-b border-gray-800 md:hidden z-50"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <div className="bg-background-light px-3 py-2 rounded-lg text-center">
                  <span className="text-gray-400 text-sm">Balance: </span>
                  <span className="text-primary font-bold">{formatCurrency(user.balance)}</span>
                </div>
                
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        location.pathname === item.to
                          ? 'bg-gray-800 text-primary'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;