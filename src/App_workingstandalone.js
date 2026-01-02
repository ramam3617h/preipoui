import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Building2, Calendar, Users, DollarSign, ShoppingCart, CheckCircle, AlertCircle, LogOut, Menu, X } from 'lucide-react';

// Mock API functions (replace with actual API calls)
const api = {
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email === 'admin@example.com' && password === 'admin') {
      return { success: true, user: { id: 1, email, name: 'Admin User', role: 'admin' } };
    }
    if (email && password) {
      return { success: true, user: { id: 2, email, name: 'John Doe', role: 'customer' } };
    }
    return { success: false, error: 'Invalid credentials' };
  },
  
  register: async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, user: { id: 2, email, name, role: 'customer' } };
  },
  
  getShares: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, company: 'TechStart Inc', sector: 'Technology', price: 150, available: 5000, minOrder: 100, valuation: '500M', founded: '2020', status: 'available' },
      { id: 2, company: 'HealthCare Plus', sector: 'Healthcare', price: 85, available: 3000, minOrder: 50, valuation: '300M', founded: '2019', status: 'available' },
      { id: 3, company: 'FinTech Solutions', sector: 'Finance', price: 200, available: 2000, minOrder: 100, valuation: '750M', founded: '2018', status: 'available' },
      { id: 4, company: 'Green Energy Co', sector: 'Energy', price: 120, available: 4000, minOrder: 75, valuation: '450M', founded: '2021', status: 'available' },
      { id: 5, company: 'AI Robotics Ltd', sector: 'Technology', price: 180, available: 1500, minOrder: 100, valuation: '600M', founded: '2019', status: 'limited' },
    ];
  },
  
  bookShares: async (shareId, quantity) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, bookingId: Math.random().toString(36).substr(2, 9) };
  },
  
  getMyBookings: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, company: 'TechStart Inc', quantity: 100, price: 150, total: 15000, status: 'confirmed', date: '2026-01-01' },
      { id: 2, company: 'HealthCare Plus', quantity: 50, price: 85, total: 4250, status: 'pending', date: '2026-01-02' },
    ];
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [shares, setShares] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (user) {
      loadShares();
    }
  }, [user]);

  const loadShares = async () => {
    const data = await api.getShares();
    setShares(data);
  };

  const filteredShares = shares.filter(share => {
    const matchesSearch = share.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || share.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = ['all', ...new Set(shares.map(s => s.sector))];

  if (!user) {
    return <AuthScreen onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PreIPO Market</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setView('marketplace')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'marketplace' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setView('bookings')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'bookings' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                My Bookings
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => setView('admin')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${view === 'admin' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Admin
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setView('cart')}
                  className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
              <button
                onClick={() => setUser(null)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => { setView('marketplace'); setShowMobileMenu(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Marketplace
              </button>
              <button
                onClick={() => { setView('bookings'); setShowMobileMenu(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                My Bookings
              </button>
              <button
                onClick={() => { setView('cart'); setShowMobileMenu(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Cart ({cart.length})
              </button>
              <button
                onClick={() => setUser(null)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'marketplace' && (
          <Marketplace
            shares={filteredShares}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            sectors={sectors}
            cart={cart}
            setCart={setCart}
          />
        )}
        {view === 'cart' && <Cart cart={cart} setCart={setCart} setView={setView} />}
        {view === 'bookings' && <MyBookings />}
        {view === 'admin' && user.role === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}

function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = isLogin
        ? await api.login(formData.email, formData.password)
        : await api.register(formData.name, formData.email, formData.password);

      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">PreIPO Market</h1>
          <p className="text-gray-600 mt-2">Invest in tomorrow's leaders today</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${!isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo credentials:</p>
          <p className="font-mono text-xs mt-1">admin@example.com / admin</p>
        </div>
      </div>
    </div>
  );
}

function Marketplace({ shares, searchTerm, setSearchTerm, selectedSector, setSelectedSector, sectors, cart, setCart }) {
  const [selectedShare, setSelectedShare] = useState(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pre-IPO Shares Marketplace</h1>
        <p className="text-gray-600">Discover and invest in high-potential unlisted companies</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shares.map(share => (
          <ShareCard
            key={share.id}
            share={share}
            onViewDetails={setSelectedShare}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>

      {selectedShare && (
        <ShareDetailsModal
          share={selectedShare}
          onClose={() => setSelectedShare(null)}
          cart={cart}
          setCart={setCart}
        />
      )}
    </div>
  );
}

function ShareCard({ share, onViewDetails, cart, setCart }) {
  const isInCart = cart.some(item => item.id === share.id);

  const addToCart = () => {
    if (!isInCart) {
      setCart([...cart, { ...share, quantity: share.minOrder }]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{share.company}</h3>
            <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {share.sector}
            </span>
          </div>
          <Building2 className="h-8 w-8 text-blue-600" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per share</span>
            <span className="font-semibold text-gray-900">${share.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available</span>
            <span className="font-semibold text-gray-900">{share.available.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Min. Order</span>
            <span className="font-semibold text-gray-900">{share.minOrder}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Valuation</span>
            <span className="font-semibold text-gray-900">${share.valuation}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(share)}
            className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          <button
            onClick={addToCart}
            disabled={isInCart}
            className={`flex-1 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
              isInCart
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShareDetailsModal({ share, onClose, cart, setCart }) {
  const isInCart = cart.some(item => item.id === share.id);

  const addToCart = () => {
    if (!isInCart) {
      setCart([...cart, { ...share, quantity: share.minOrder }]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{share.company}</h2>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {share.sector}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm">Price per Share</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${share.price}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">Available Shares</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{share.available.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Valuation</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${share.valuation}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">Founded</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{share.founded}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Minimum order quantity: {share.minOrder} shares</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Expected IPO timeline: Q3 2026</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Lock-in period: 12 months post-IPO</span>
              </li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={() => {
                addToCart();
                onClose();
              }}
              disabled={isInCart}
              className={`flex-1 px-6 py-3 rounded-md transition-colors font-medium ${
                isInCart
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isInCart ? 'Already in Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, setCart, setView }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(item.minOrder, newQuantity) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    setLoading(true);
    for (const item of cart) {
      await api.bookShares(item.id, item.quantity);
    }
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setCart([]);
      setView('bookings');
    }, 2000);
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">Your shares have been successfully booked.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some shares to get started</p>
        <button
          onClick={() => setView('marketplace')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Marketplace
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        {cart.map(item => (
          <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.company}</h3>
                <span className="text-sm text-gray-600">{item.sector}</span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                <input
                  type="number"
                  min={item.minOrder}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || item.minOrder)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Price per share</label>
                <p className="text-lg font-semibold text-gray-900 py-2">${item.price}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Subtotal</label>
                <p className="text-lg font-semibold text-gray-900 py-2">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">${total.toLocaleString()}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const data = await api.getMyBookings();
    setBookings(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h2>
        <p className="text-gray-600">Start investing in pre-IPO companies today</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${booking.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">${booking.total.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  const [newShare, setNewShare] = useState({
    company: '',
    sector: 'Technology',
    price: '',
    available: '',
    minOrder: '',
    valuation: '',
    founded: ''
  });

  const handleAddShare = (e) => {
    e.preventDefault();
    alert('Share added successfully! (This would call the API in production)');
    setNewShare({
      company: '',
      sector: 'Technology',
      price: '',
      available: '',
      minOrder: '',
      valuation: '',
      founded: ''
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Listings</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900">48</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$2.4M</p>
            </div>
            <DollarSign className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'add'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Add New Share
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Users
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <p className="text-gray-600">Overview dashboard coming soon...</p>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleAddShare} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newShare.company}
                    onChange={(e) => setNewShare({...newShare, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                  <select
                    value={newShare.sector}
                    onChange={(e) => setNewShare({...newShare, sector: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Energy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Share ($)</label>
                  <input
                    type="number"
                    required
                    value={newShare.price}
                    onChange={(e) => setNewShare({...newShare, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Shares</label>
                  <input
                    type="number"
                    required
                    value={newShare.available}
                    onChange={(e) => setNewShare({...newShare, available: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Quantity</label>
                  <input
                    type="number"
                    required
                    value={newShare.minOrder}
                    onChange={(e) => setNewShare({...newShare, minOrder: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valuation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 500M"
                    value={newShare.valuation}
                    onChange={(e) => setNewShare({...newShare, valuation: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
                  <input
                    type="text"
                    required
                    placeholder="2020"
                    value={newShare.founded}
                    onChange={(e) => setNewShare({...newShare, founded: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Add Share Listing
              </button>
            </form>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Users</h3>
              <p className="text-gray-600">User management coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
