import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, 
  ShoppingCart, Search, User, Check, Trash2, ArrowRight, 
  TrendingUp, Film, Sparkles, Tag, DollarSign, Shield, 
  Download, Eye, Edit3, Plus, X, ChevronRight, Star,
  Globe, CreditCard, Clock, Monitor, Sliders, AlertCircle,
  BarChart2, Users, ShoppingBag, Layers, ArrowUpRight
} from 'lucide-react';

// --- CURRENCY CONVERSION DATA ---
const CURRENCIES = {
  INR: { symbol: '₹', rate: 1.0, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
  AUD: { symbol: 'A$', rate: 0.018, label: 'AUD (A$)' },
  CAD: { symbol: 'C$', rate: 0.016, label: 'CAD (C$)' },
  JPY: { symbol: '¥', rate: 1.80, label: 'JPY (¥)' }
};

// --- INITIAL PRODUCTS DATA ---
const INITIAL_PRODUCTS = [
  {
    id: 'vid-1',
    title: 'Gojo Satoru - Infinity',
    category: 'Anime AMV',
    priceINR: 199,
    duration: '0:48',
    resolution: '4K (3840x2160)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.9,
    reviewsCount: 124,
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'A cinematic anime edit of Gojo Satoru from Jujutsu Kaisen. High-quality 4K with smooth transitions, custom visual effects, and intense sync.',
    tags: ['Gojo', 'Jujutsu Kaisen', 'AMV', 'Anime Edit', '4K'],
    featured: true,
    popular: true
  },
  {
    id: 'vid-2',
    title: 'Demon Slayer - Rengoku',
    category: 'Anime AMV',
    priceINR: 199,
    duration: '0:52',
    resolution: '4K (3840x2160)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.8,
    reviewsCount: 99,
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Kyojuro Rengoku flame hashira edit featuring high impact action cuts, color grading, and speed ramping.',
    tags: ['Demon Slayer', 'Rengoku', 'AMV', '4K'],
    featured: true,
    popular: true
  },
  {
    id: 'vid-3',
    title: 'Attack on Titan - Eren',
    category: 'Cinematic Edit',
    priceINR: 249,
    duration: '1:12',
    resolution: '4K (3840x2160)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.9,
    reviewsCount: 156,
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Dark cinematic edit focusing on Eren Yeager transformation and the Rumbling saga.',
    tags: ['AOT', 'Eren', 'Cinematic', '4K'],
    featured: true,
    popular: false
  },
  {
    id: 'vid-4',
    title: 'Naruto - Legends Never Die',
    category: 'Anime AMV',
    priceINR: 199,
    duration: '1:08',
    resolution: '1080p (1920x1080)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.8,
    reviewsCount: 87,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Nostalgic and emotional Naruto Shippuden tribute sync with epic sound design.',
    tags: ['Naruto', 'Sage Mode', 'AMV'],
    featured: true,
    popular: true
  },
  {
    id: 'vid-5',
    title: 'Jujutsu Kaisen - Sukuna',
    category: 'Anime AMV',
    priceINR: 199,
    duration: '0:45',
    resolution: '4K (3840x2160)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.9,
    reviewsCount: 112,
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    description: 'Ryomen Sukuna Malevolent Shrine domain expansion showcase with intense bass syncing.',
    tags: ['Sukuna', 'Jujutsu Kaisen', '4K'],
    featured: false,
    popular: true
  },
  {
    id: 'vid-6',
    title: 'One Piece - Luffy Gear 5',
    category: 'Anime AMV',
    priceINR: 199,
    duration: '1:10',
    resolution: '4K (3840x2160)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.9,
    reviewsCount: 143,
    thumbnail: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'Vibrant and energetic Luffy Gear 5 transformation sequence edit with seamless frame blending.',
    tags: ['One Piece', 'Luffy', 'Gear 5', 'AMV'],
    featured: false,
    popular: true
  },
  {
    id: 'vid-7',
    title: 'Tanjiro - Final Form',
    category: 'Cinematic Edit',
    priceINR: 249,
    duration: '1:03',
    resolution: '4K (3840x2160)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.9,
    reviewsCount: 91,
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    description: 'Sun Breathing 13th Form cinematic cut with dynamic speed ramping and custom audio master.',
    tags: ['Tanjiro', 'Demon Slayer', 'Cinematic'],
    featured: false,
    popular: true
  },
  {
    id: 'vid-8',
    title: 'Tokyo Ghoul - Kaneki',
    category: 'Anime AMV',
    priceINR: 199,
    duration: '0:58',
    resolution: '1080p (1920x1080)',
    aspectRatio: '16:9',
    format: 'MP4',
    rating: 4.8,
    reviewsCount: 76,
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Dark psychological edit featuring Ken Kaneki transformation andUnravel instrumental remix.',
    tags: ['Kaneki', 'Tokyo Ghoul', 'Dark AMV'],
    featured: false,
    popular: true
  }
];

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('home'); // home, shop, product, cart, checkout, orders, admin
  const [products, setProducts] = useState(() => {
    try { const saved = localStorage.getItem('aditya-edits-products'); return saved ? JSON.parse(saved) : INITIAL_PRODUCTS; } catch { return INITIAL_PRODUCTS; }
  });
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [currency, setCurrency] = useState('INR');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [selectedResolution, setSelectedResolution] = useState('All');
  
  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Orders State
  const [orders, setOrders] = useState(() => {
    try { const saved = localStorage.getItem('aditya-edits-orders'); if (saved) return JSON.parse(saved); } catch {}
    return [
    {
      id: 'ORDER-#AE123456',
      date: 'Apr 28, 2026 • 2:14 PM',
      product: INITIAL_PRODUCTS[0],
      priceINR: 199,
      status: 'Completed'
    },
    {
      id: 'ORDER-#AE123457',
      date: 'Apr 25, 2026 • 8:45 PM',
      product: INITIAL_PRODUCTS[1],
      priceINR: 199,
      status: 'Completed'
    },
    {
      id: 'ORDER-#AE123458',
      date: 'Apr 22, 2026 • 1:32 PM',
      product: INITIAL_PRODUCTS[2],
      priceINR: 249,
      status: 'Completed'
    }
    ];
  });

  useEffect(() => { try { const durableProducts = products.filter(p => !String(p.videoUrl || '').startsWith('blob:') && !String(p.thumbnail || '').startsWith('blob:')); localStorage.setItem('aditya-edits-products', JSON.stringify(durableProducts)); } catch { showToast('Browser storage is full. Large uploads need cloud storage.'); } }, [products]);
  useEffect(() => { try { localStorage.setItem('aditya-edits-orders', JSON.stringify(orders)); } catch {} }, [orders]);

  // Quick Preview Modal State
  const [previewVideo, setPreviewVideo] = useState(null);

  // Helper for displaying price with current selected currency
  const formatPrice = (priceInINR) => {
    const curr = CURRENCIES[currency];
    const converted = (priceInINR * curr.rate).toFixed(curr.rate < 1 ? 2 : 0);
    return `${curr.symbol}${converted}`;
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
      showToast(`Added "${product.title}" to cart!`);
    } else {
      showToast(`"${product.title}" is already in your cart!`);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    showToast('Item removed from cart.');
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setActiveTab('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoriesList = ['All', 'Anime AMV', 'Anime Shorts', 'Cinematic Edits', '4K Edits', 'Templates', 'Presets'];

  return (
    <div className="min-h-screen bg-[#05040A] text-[#F7F3FF] font-sans antialiased selection:bg-[#8B2CF5] selection:text-white flex flex-col">
      {/* Toast Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14101E] border border-[#8B2CF5] text-white px-5 py-3 rounded-xl shadow-2xl shadow-[#8B2CF5]/20 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#A855F7]" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Quick Video Preview Modal */}
      {previewVideo && (
        <VideoPreviewModal 
          video={previewVideo} 
          onClose={() => setPreviewVideo(null)} 
          formatPrice={formatPrice}
          addToCart={addToCart}
          openProductDetails={openProductDetails}
        />
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#05040A]/90 backdrop-blur-md border-b border-[#38204F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#8B2CF5] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#8B2CF5]/30 group-hover:scale-105 transition-transform">
              {/* Angular Triangle Logo Icon */}
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F7F3FF] to-[#A855F7]">
              ADITYA <span className="text-[#A855F7]">EDITS</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#A59BB8]">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`hover:text-[#A855F7] transition-colors ${activeTab === 'home' ? 'text-white font-semibold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('shop')} 
              className={`hover:text-[#A855F7] transition-colors ${activeTab === 'shop' ? 'text-white font-semibold' : ''}`}
            >
              Shop
            </button>
            <button 
              onClick={() => { setSelectedCategory('All'); setActiveTab('shop'); }} 
              className="hover:text-[#A855F7] transition-colors"
            >
              Categories
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`hover:text-[#A855F7] transition-colors ${activeTab === 'orders' ? 'text-white font-semibold' : ''}`}
            >
              My Orders
            </button>
          </nav>

          {/* Search Input Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative mx-4">
            <input 
              type="text" 
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') setActiveTab('shop'); }}
              className="w-full bg-[#0D0A16] border border-[#38204F] rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder-[#A59BB8] focus:outline-none focus:border-[#8B2CF5] transition-colors"
            />
            <Search 
              onClick={() => setActiveTab('shop')}
              className="w-4 h-4 text-[#A59BB8] absolute right-3 cursor-pointer hover:text-white" 
            />
          </div>

          {/* Actions & Currency Switcher */}
          <div className="flex items-center gap-4">
            
            {/* Currency Selector */}
            <div className="relative flex items-center bg-[#0D0A16] border border-[#38204F] rounded-lg px-2.5 py-1.5 text-xs text-white">
              <Globe className="w-3.5 h-3.5 text-[#A855F7] mr-1.5" />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-white font-semibold"
              >
                {Object.keys(CURRENCIES).map(currKey => (
                  <option key={currKey} value={currKey} className="bg-[#14101E] text-white">
                    {CURRENCIES[currKey].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Admin Dashboard Toggle Button */}
            <button 
              onClick={() => setActiveTab('admin')} 
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#38204F] bg-[#14101E] text-xs text-[#A855F7] hover:bg-[#8B2CF5]/20 transition-all"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setActiveTab('cart')}
              className="relative p-2.5 bg-[#0D0A16] border border-[#38204F] rounded-xl hover:border-[#8B2CF5] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8B2CF5] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#05040A]">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Login / Sign Up Button */}
            <button 
              onClick={() => setActiveTab('orders')}
              className="bg-gradient-to-r from-[#8B2CF5] to-[#A855F7] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-[#8B2CF5]/30 hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <HomeView 
            products={products}
            formatPrice={formatPrice}
            addToCart={addToCart}
            openProductDetails={openProductDetails}
            setPreviewVideo={setPreviewVideo}
            setActiveTab={setActiveTab}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'shop' && (
          <ShopView 
            products={products}
            formatPrice={formatPrice}
            addToCart={addToCart}
            openProductDetails={openProductDetails}
            setPreviewVideo={setPreviewVideo}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            selectedResolution={selectedResolution}
            setSelectedResolution={setSelectedResolution}
          />
        )}

        {activeTab === 'product' && selectedProduct && (
          <ProductDetailsView 
            product={selectedProduct}
            formatPrice={formatPrice}
            addToCart={addToCart}
            products={products}
            openProductDetails={openProductDetails}
            currency={currency}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'cart' && (
          <CartView 
            cart={cart}
            removeFromCart={removeFromCart}
            formatPrice={formatPrice}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutView 
            cart={cart}
            formatPrice={formatPrice}
            currency={currency}
            onComplete={(newOrder) => {
              setOrders([newOrder, ...orders]);
              setCart([]);
              setActiveTab('orders');
              showToast('Purchase successful! Your order is ready.');
            }}
          />
        )}

        {activeTab === 'orders' && (
          <MyOrdersView 
            orders={orders}
            formatPrice={formatPrice}
            openProductDetails={openProductDetails}
            showToast={showToast}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboardView 
            products={products}
            setProducts={setProducts}
            orders={orders}
            formatPrice={formatPrice}
            showToast={showToast}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#090612] border-t border-[#38204F] py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#8B2CF5] flex items-center justify-center">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13H5.5L12 6.5z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">ADITYA EDITS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#A59BB8]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors">Copyright / DMCA</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <p className="text-xs text-[#A59BB8]">
            &copy; {new Date().getFullYear()} ADITYA EDITS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 1. HOMEPAGE VIEW
// ==========================================
function HomeView({ products, formatPrice, addToCart, openProductDetails, setPreviewVideo, setActiveTab, setSelectedCategory }) {
  const featured = products.filter(p => p.featured);
  const popular = products.filter(p => p.popular);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0D0A16] via-[#14101E] to-[#0D0A16] border border-[#38204F] p-8 sm:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
        {/* Background Glowing Orb */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8B2CF5]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-xl space-y-6 text-center lg:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-[#8B2CF5]/10 border border-[#8B2CF5]/30 text-[#A855F7] text-xs font-semibold uppercase tracking-wider">
            PREMIUM ANIME EDITS MARKETPLACE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] to-[#8B2CF5]">Anime Edits</span>
          </h1>
          <p className="text-[#A59BB8] text-base sm:text-lg">
            Explore, purchase, and download high-quality edits, AMVs, 4K clips, and video templates for your content creation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative w-full sm:w-auto flex-1">
              <input 
                type="text" 
                placeholder="Search for anime edits, AMVs, etc..."
                onKeyDown={(e) => { if(e.key === 'Enter') setActiveTab('shop'); }}
                className="w-full bg-[#05040A] border border-[#38204F] rounded-xl py-3 px-4 text-sm text-white placeholder-[#A59BB8] focus:outline-none focus:border-[#8B2CF5]"
              />
            </div>
            <button 
              onClick={() => setActiveTab('shop')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B2CF5] to-[#A855F7] text-white font-semibold text-sm shadow-lg shadow-[#8B2CF5]/40 hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </div>

        {/* Hero Banner Artwork */}
        <div className="relative z-10 w-full lg:w-1/2 max-w-md">
          <div className="relative rounded-2xl overflow-hidden border border-[#38204F] shadow-2xl group cursor-pointer" onClick={() => openProductDetails(products[0])}>
            <img 
              src={products[0].thumbnail} 
              alt="Hero Banner Anime" 
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05040A] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="text-xs font-semibold text-[#A855F7] bg-[#05040A]/80 px-2.5 py-1 rounded-md border border-[#38204F]">
                  FEATURED EDIT
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{products[0].title}</h3>
              </div>
              <button className="p-3 bg-[#8B2CF5] text-white rounded-full shadow-lg shadow-[#8B2CF5]/50 hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Anime AMV', icon: Film },
            { label: 'Anime Shorts', icon: Sparkles },
            { label: 'Cinematic Edits', icon: Monitor },
            { label: '4K Edits', icon: Eye },
            { label: 'Templates', icon: Layers },
            { label: 'Presets', icon: Sliders }
          ].map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => { setSelectedCategory(cat.label); setActiveTab('shop'); }}
              className="bg-[#0D0A16] border border-[#38204F] hover:border-[#8B2CF5] rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#14101E] border border-[#38204F] group-hover:border-[#8B2CF5] flex items-center justify-center text-[#A855F7]">
                <cat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#F7F3FF] group-hover:text-[#A855F7] transition-colors">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Videos */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Featured Videos</h2>
          <button 
            onClick={() => setActiveTab('shop')} 
            className="text-xs font-semibold text-[#A855F7] hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              formatPrice={formatPrice}
              addToCart={addToCart}
              openProductDetails={openProductDetails}
              setPreviewVideo={setPreviewVideo}
            />
          ))}
        </div>
      </div>

      {/* Popular Videos */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Popular Videos</h2>
          <button 
            onClick={() => setActiveTab('shop')} 
            className="text-xs font-semibold text-[#A855F7] hover:underline flex items-center gap-1"
          >
            Explore All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              formatPrice={formatPrice}
              addToCart={addToCart}
              openProductDetails={openProductDetails}
              setPreviewVideo={setPreviewVideo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. PRODUCT CARD COMPONENT
// ==========================================
function ProductCard({ product, formatPrice, addToCart, openProductDetails, setPreviewVideo }) {
  return (
    <div className="bg-[#0D0A16] border border-[#38204F] hover:border-[#8B2CF5] rounded-2xl overflow-hidden shadow-xl transition-all hover:-translate-y-1.5 flex flex-col justify-between group">
      {/* Thumbnail + Duration + Play Button Overlay */}
      <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => openProductDetails(product)}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A16] via-transparent to-transparent opacity-60" />
        
        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded border border-[#38204F]">
          {product.duration}
        </span>

        {/* Play Preview Hover Trigger */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setPreviewVideo(product);
          }}
          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#8B2CF5]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-[#8B2CF5]/50 hover:scale-110"
        >
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#A59BB8]">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 
            onClick={() => openProductDetails(product)}
            className="text-sm font-bold text-white hover:text-[#A855F7] transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>
        </div>

        {/* Pricing & Cart Action */}
        <div className="flex items-center justify-between pt-2 border-t border-[#38204F]/50">
          <div>
            <span className="text-base font-extrabold text-white">
              {formatPrice(product.priceINR)}
            </span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="px-3 py-1.5 rounded-lg bg-[#14101E] border border-[#38204F] hover:border-[#8B2CF5] hover:bg-[#8B2CF5] text-xs font-semibold text-white transition-all flex items-center gap-1"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SHOP / CATALOG VIEW
// ==========================================
function ShopView({ products, formatPrice, addToCart, openProductDetails, setPreviewVideo, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, selectedSort, setSelectedSort, selectedResolution, setSelectedResolution }) {
  
  // Filter logic
  let filtered = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory || (selectedCategory === '4K Edits' && p.resolution.includes('4K'));
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRes = selectedResolution === 'All' || p.resolution.includes(selectedResolution);
    return matchesCat && matchesQuery && matchesRes;
  });

  // Sort logic
  if (selectedSort === 'Price Low-High') {
    filtered.sort((a, b) => a.priceINR - b.priceINR);
  } else if (selectedSort === 'Price High-Low') {
    filtered.sort((a, b) => b.priceINR - a.priceINR);
  } else if (selectedSort === 'Rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="space-y-8">
      {/* Catalog Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Shop All Edits</h1>
        <p className="text-[#A59BB8] text-sm mt-1">Explore our collection of premium anime edits, AMVs, and cinematic videos.</p>
      </div>

      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Anime AMV', 'Anime Shorts', 'Cinematic Edits', '4K Edits', 'Templates', 'Presets'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-[#8B2CF5] text-white shadow-lg shadow-[#8B2CF5]/30' 
                : 'bg-[#0D0A16] border border-[#38204F] text-[#A59BB8] hover:border-[#8B2CF5] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters Toolbar */}
      <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14101E] border border-[#38204F] rounded-xl py-2 pl-3 pr-8 text-xs text-white placeholder-[#A59BB8] focus:outline-none focus:border-[#8B2CF5]"
          />
          <Search className="w-3.5 h-3.5 text-[#A59BB8] absolute right-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Resolution Filter */}
          <div className="flex items-center gap-2 text-xs text-[#A59BB8]">
            <span>Resolution:</span>
            <select 
              value={selectedResolution}
              onChange={(e) => setSelectedResolution(e.target.value)}
              className="bg-[#14101E] border border-[#38204F] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="All">All</option>
              <option value="4K">4K</option>
              <option value="1080p">1080p</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-2 text-xs text-[#A59BB8]">
            <span>Sort By:</span>
            <select 
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-[#14101E] border border-[#38204F] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Popular">Popular</option>
              <option value="Price Low-High">Price: Low to High</option>
              <option value="Price High-Low">Price: High to Low</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              formatPrice={formatPrice}
              addToCart={addToCart}
              openProductDetails={openProductDetails}
              setPreviewVideo={setPreviewVideo}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-3 bg-[#0D0A16] border border-[#38204F] rounded-2xl">
          <AlertCircle className="w-10 h-10 text-[#A855F7] mx-auto" />
          <h3 className="text-lg font-bold text-white">No Edits Found</h3>
          <p className="text-xs text-[#A59BB8]">Try adjusting your search terms or filter selection.</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. PRODUCT DETAILS & HTML5 VIDEO PLAYER PAGE
// ==========================================
function ProductDetailsView({ product, formatPrice, addToCart, products, openProductDetails, currency, setActiveTab }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#A59BB8]">
        <button onClick={() => setActiveTab('home')} className="hover:text-white">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setActiveTab('shop')} className="hover:text-white">Shop</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-medium">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: HTML5 Video Preview Player */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-2xl overflow-hidden bg-black border border-[#38204F] shadow-2xl group">
            
            {/* HTML5 Video */}
            <video 
              ref={videoRef}
              src={product.videoUrl}
              poster={product.thumbnail}
              className="w-full aspect-video object-contain"
              onEnded={() => setIsPlaying(false)}
            />

            {/* Preview Watermark Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none select-none bg-black/40 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-md">
              <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">
                ADITYA EDITS PREVIEW
              </span>
            </div>

            {/* Video Controls Overlay Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between gap-4 opacity-90 transition-opacity">
              <div className="flex items-center gap-3">
                <button 
                  onClick={togglePlay}
                  className="p-2 rounded-lg bg-[#8B2CF5] text-white hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-[#14101E] text-white border border-[#38204F] hover:border-[#8B2CF5]"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs text-white font-mono">{product.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Speed selector */}
                <select 
                  value={playbackSpeed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className="bg-[#14101E] border border-[#38204F] text-xs text-white rounded px-1.5 py-1 focus:outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1.0x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2.0x</option>
                </select>

                <button 
                  onClick={() => {
                    if (videoRef.current) videoRef.current.requestFullscreen();
                  }}
                  className="p-2 rounded-lg bg-[#14101E] text-white border border-[#38204F]"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Specifications Panel */}
          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Video Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#14101E] p-3 rounded-xl border border-[#38204F]/60">
                <span className="text-[11px] text-[#A59BB8]">Duration</span>
                <p className="text-sm font-bold text-white mt-0.5">{product.duration}</p>
              </div>
              <div className="bg-[#14101E] p-3 rounded-xl border border-[#38204F]/60">
                <span className="text-[11px] text-[#A59BB8]">Resolution</span>
                <p className="text-sm font-bold text-white mt-0.5">{product.resolution}</p>
              </div>
              <div className="bg-[#14101E] p-3 rounded-xl border border-[#38204F]/60">
                <span className="text-[11px] text-[#A59BB8]">Aspect Ratio</span>
                <p className="text-sm font-bold text-white mt-0.5">{product.aspectRatio}</p>
              </div>
              <div className="bg-[#14101E] p-3 rounded-xl border border-[#38204F]/60">
                <span className="text-[11px] text-[#A59BB8]">Format</span>
                <p className="text-sm font-bold text-white mt-0.5">{product.format}</p>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-[#A59BB8] mb-1">Description</h4>
              <p className="text-sm text-[#F7F3FF] leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map(tag => (
                <span key={tag} className="text-[11px] bg-[#14101E] border border-[#38204F] text-[#A855F7] px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Title, Price, Buy Actions */}
        <div className="space-y-6">
          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#A855F7] bg-[#8B2CF5]/10 px-2.5 py-1 rounded-md border border-[#8B2CF5]/30">
                {product.category}
              </span>
              <h1 className="text-2xl font-extrabold text-white mt-3">{product.title}</h1>
              
              <div className="flex items-center gap-2 mt-2 text-xs text-[#A59BB8]">
                <div className="flex items-center text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewsCount} verified reviews</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-[#14101E] border border-[#38204F] space-y-1">
              <span className="text-xs text-[#A59BB8]">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">
                  {formatPrice(product.priceINR)}
                </span>
                {currency !== 'INR' && (
                  <span className="text-xs text-[#A59BB8]">
                    (₹{product.priceINR} INR)
                  </span>
                )}
              </div>
            </div>

            {/* Quick Feature Highlights */}
            <div className="space-y-2 text-xs text-[#A59BB8]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#22C55E]" />
                <span>Instant High-Speed File Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A855F7]" />
                <span>Uncompressed Original Master Audio & Video</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#8B2CF5]" />
                <span>Commercial Usage License Included</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => addToCart(product)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B2CF5] to-[#A855F7] text-white font-bold text-sm shadow-lg shadow-[#8B2CF5]/30 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button 
                onClick={() => {
                  addToCart(product);
                  setActiveTab('cart');
                }}
                className="w-full py-3 rounded-xl bg-[#14101E] border border-[#38204F] hover:border-[#8B2CF5] text-white font-semibold text-sm transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Related Edits Sidebar */}
          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Related Videos</h3>
            <div className="space-y-3">
              {related.map(item => (
                <div 
                  key={item.id}
                  onClick={() => openProductDetails(item)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#14101E] border border-transparent hover:border-[#38204F] cursor-pointer transition-all group"
                >
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-10 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-[#A855F7] transition-colors">{item.title}</h4>
                    <span className="text-[10px] text-[#A59BB8]">{formatPrice(item.priceINR)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. SHOPPING CART VIEW
// ==========================================
function CartView({ cart, removeFromCart, formatPrice, setActiveTab }) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotalINR = cart.reduce((sum, item) => sum + item.priceINR, 0);
  const totalINR = Math.max(0, subtotalINR - discount);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ADITYA10') {
      const disc = Math.round(subtotalINR * 0.1);
      setDiscount(disc);
    } else {
      alert('Invalid coupon code. Try ADITYA10 for 10% off!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-white">Your Cart ({cart.length})</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div 
                key={item.id} 
                className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img src={item.thumbnail} alt={item.title} className="w-20 h-12 object-cover rounded-xl" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                    <span className="text-xs text-[#A59BB8]">{item.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-sm font-extrabold text-white">
                    {formatPrice(item.priceINR)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-[#A59BB8] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Card */}
          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-6 h-fit">
            <h3 className="text-lg font-bold text-white">Order Summary</h3>

            {/* Coupon Code Input */}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Coupon (ADITYA10)" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-[#14101E] border border-[#38204F] rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-[#8B2CF5]"
              />
              <button 
                onClick={applyCoupon}
                className="px-4 py-2 bg-[#8B2CF5] text-white text-xs font-semibold rounded-xl hover:opacity-90"
              >
                Apply
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#A59BB8] border-t border-[#38204F] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(subtotalINR)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#22C55E]">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white border-t border-[#38204F] pt-3">
                <span>Total</span>
                <span>{formatPrice(totalINR)}</span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('checkout')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B2CF5] to-[#A855F7] text-white font-bold text-sm shadow-lg shadow-[#8B2CF5]/30 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 space-y-4 bg-[#0D0A16] border border-[#38204F] rounded-2xl">
          <ShoppingCart className="w-12 h-12 text-[#A59BB8] mx-auto" />
          <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
          <button 
            onClick={() => setActiveTab('shop')}
            className="px-6 py-2.5 rounded-xl bg-[#8B2CF5] text-white font-semibold text-xs"
          >
            Explore Shop
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. CHECKOUT VIEW
// ==========================================
function CheckoutView({ cart, formatPrice, currency, onComplete }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [email, setEmail] = useState('aditya123@gmail.com');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalINR = cart.reduce((sum, item) => sum + item.priceINR, 0);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onComplete({
        id: `ORDER-#AE${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleString(),
        product: cart[0] || INITIAL_PRODUCTS[0],
        priceINR: totalINR,
        status: 'Payment pending'
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-white">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Billing & Payment Steps */}
        <form onSubmit={handlePay} className="lg:col-span-2 space-y-6">
          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8B2CF5] text-xs flex items-center justify-center">1</span>
              Customer Details
            </h3>
            <div>
              <label className="text-xs text-[#A59BB8] block mb-1">Email Address for Download Link</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#14101E] border border-[#38204F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#8B2CF5]"
              />
            </div>
          </div>

          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8B2CF5] text-xs flex items-center justify-center">2</span>
              Payment Method
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'upi', label: 'UPI (FamPay QR)' }
              ].map(method => (
                <label 
                  key={method.id}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === method.id 
                      ? 'border-[#8B2CF5] bg-[#8B2CF5]/10 text-white' 
                      : 'border-[#38204F] bg-[#14101E] text-[#A59BB8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-[#8B2CF5]"
                    />
                    <span className="text-xs font-semibold">{method.label}</span>
                  </div>
                  <CreditCard className="w-4 h-4 text-[#A855F7]" />
                </label>
              ))}
            </div>
            <p className="text-[11px] text-[#A59BB8]">UPI QR display and payment confirmation will be connected in the online setup. This demo does not verify payments automatically.</p>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8B2CF5] to-[#A855F7] text-white font-bold text-sm shadow-lg shadow-[#8B2CF5]/40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Creating order...' : `Place UPI Order • ${formatPrice(totalINR)}`}
          </button>
        </form>

        {/* Mini Order Summary Sidebar */}
        <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-4 h-fit">
          <h3 className="text-base font-bold text-white">Items</h3>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <img src={item.thumbnail} alt="" className="w-12 h-8 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{item.title}</p>
                  <p className="text-[#A59BB8]">{formatPrice(item.priceINR)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. MY ORDERS & DOWNLOADS PAGE
// ==========================================
function MyOrdersView({ orders, formatPrice, openProductDetails, showToast }) {
  return (
    <div className="space-y-8">
      {/* Account Info Bar */}
      <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8B2CF5] to-[#A855F7] flex items-center justify-center text-white font-bold text-lg">
          A
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Aditya Edits Account</h2>
          <p className="text-xs text-[#A59BB8]">aditya123@gmail.com</p>
        </div>
      </div>

      <h1 className="text-2xl font-extrabold text-white">My Purchased Orders</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div 
            key={order.id}
            className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img 
                src={order.product.thumbnail} 
                alt={order.product.title} 
                className="w-24 h-14 object-cover rounded-xl"
              />
              <div className="space-y-1">
                <span className="text-[10px] text-[#A855F7] font-mono">{order.id}</span>
                <h3 className="text-base font-bold text-white">{order.product.title}</h3>
                <p className="text-xs text-[#A59BB8]">{order.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-[#38204F] pt-3 sm:pt-0">
              <span className="text-base font-bold text-white">
                {formatPrice(order.priceINR)}
              </span>

              <button 
                onClick={() => showToast(`Starting secure 4K file download for ${order.product.title}...`)}
                className="px-4 py-2 bg-[#8B2CF5] hover:bg-[#A855F7] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-[#8B2CF5]/30 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. ADMIN DASHBOARD VIEW
// ==========================================
function AdminDashboardView({ products, setProducts, orders, formatPrice, showToast }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Anime AMV');
  const [newPrice, setNewPrice] = useState('199');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [xmlFile, setXmlFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [extraAssets, setExtraAssets] = useState<File[]>([]);

  const totalSalesINR = orders.reduce((sum, o) => sum + o.priceINR, 0);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const created = {
      id: `vid-${Date.now()}`,
      title: newTitle || 'Custom Anime Edit',
      category: newCategory,
      priceINR: Number(newPrice) || 199,
      duration: '0:50',
      resolution: '4K (3840x2160)',
      aspectRatio: '16:9',
      format: 'MP4',
      rating: 5.0,
      reviewsCount: 1,
      thumbnail: thumbnailFile ? URL.createObjectURL(thumbnailFile) : 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      videoUrl: videoFile ? URL.createObjectURL(videoFile) : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      uploadFiles: { video: videoFile, thumbnail: thumbnailFile, xml: xmlFile, zip: zipFile, extraAssets },
      description: 'Newly uploaded premium edit.',
      tags: ['New', 'Edit'],
      featured: false,
      popular: false
    };

    setProducts([created, ...products]);
    setShowUploadModal(false);
    setVideoFile(null);
    setThumbnailFile(null);
    setXmlFile(null);
    setZipFile(null);
    setExtraAssets([]);
    showToast(`Product "${created.title}" added to this session. Files are selected locally; server upload is not connected yet.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
          <p className="text-xs text-[#A59BB8]">Manage catalog, track sales analytics, and manage products.</p>
        </div>

        <button 
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B2CF5] to-[#A855F7] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#8B2CF5]/30 hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Video</span>
        </button>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-5 space-y-2">
          <span className="text-xs text-[#A59BB8]">Total Revenue</span>
          <h3 className="text-2xl font-extrabold text-white">{formatPrice(totalSalesINR + 12450)}</h3>
          <span className="text-[10px] text-[#22C55E]">+12% from last week</span>
        </div>

        <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-5 space-y-2">
          <span className="text-xs text-[#A59BB8]">Total Orders</span>
          <h3 className="text-2xl font-extrabold text-white">48</h3>
          <span className="text-[10px] text-[#22C55E]">+8% from last week</span>
        </div>

        <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-5 space-y-2">
          <span className="text-xs text-[#A59BB8]">Total Customers</span>
          <h3 className="text-2xl font-extrabold text-white">32</h3>
          <span className="text-[10px] text-[#22C55E]">+5 new today</span>
        </div>

        <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-5 space-y-2">
          <span className="text-xs text-[#A59BB8]">Active Catalog Items</span>
          <h3 className="text-2xl font-extrabold text-white">{products.length}</h3>
          <span className="text-[10px] text-[#A855F7]">Active in store</span>
        </div>
      </div>

      {/* Manage Products Table */}
      <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Manage Video Products</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A59BB8]">
            <thead className="border-b border-[#38204F] text-white font-bold">
              <tr>
                <th className="py-3 px-2">Thumbnail</th>
                <th className="py-3 px-2">Title</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#38204F]/50">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="py-3 px-2">
                    <img src={p.thumbnail} alt="" className="w-12 h-8 object-cover rounded" />
                  </td>
                  <td className="py-3 px-2 text-white font-medium">{p.title}</td>
                  <td className="py-3 px-2">{p.category}</td>
                  <td className="py-3 px-2 text-white font-bold">{formatPrice(p.priceINR)}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        title="Edit product title and price"
                        onClick={() => {
                          const title = window.prompt('Product title', p.title);
                          if (title === null) return;
                          const price = window.prompt('Price in INR (₹)', String(p.priceINR));
                          if (price === null) return;
                          const amount = Number(price);
                          if (!title.trim() || !Number.isFinite(amount) || amount < 0) { showToast('Please enter a valid title and price.'); return; }
                          setProducts(current => current.map(item => item.id === p.id ? { ...item, title: title.trim(), priceINR: amount } : item));
                          showToast('Product details updated.');
                        }}
                        className="px-2 py-1.5 text-[#A855F7] hover:bg-[#8B2CF5]/10 rounded"
                      >Edit</button>
                      <button 
                        type="button"
                        title="Delete video"
                        aria-label={`Delete ${p.title}`}
                        onClick={() => {
                          if (!window.confirm(`Delete ${p.title}?`)) return;
                          setProducts(current => current.filter(item => item.id !== p.id));
                          showToast(`Deleted ${p.title}`);
                        }}
                        className="p-1.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Upload Video Product</h3>
              <button onClick={() => setShowUploadModal(false)}><X className="w-5 h-5 text-white" /></button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-[#A59BB8] block mb-1">Title</label>
                <input 
                  type="text" 
                  required 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Gojo Satoru - Unlimited Void"
                  className="w-full bg-[#14101E] border border-[#38204F] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#A59BB8] block mb-1">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#14101E] border border-[#38204F] rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="Anime AMV">Anime AMV</option>
                  <option value="Anime Shorts">Anime Shorts</option>
                  <option value="Cinematic Edits">Cinematic Edits</option>
                  <option value="4K Edits">4K Edits</option>
                </select>
              </div>

              <div>
                <label className="text-[#A59BB8] block mb-1">Price in INR (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-[#14101E] border border-[#38204F] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-3 border-t border-[#38204F] pt-4">
                <p className="text-white font-bold">Product Files</p>
                <div>
                  <label className="text-[#A59BB8] block mb-1">Video File (MP4)</label>
                  <input key={videoFile ? videoFile.name : 'video-empty'} type="file" accept="video/mp4,.mp4" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="block w-full text-[11px] text-[#A59BB8] file:mr-3 file:rounded-lg file:border-0 file:bg-[#38204F] file:px-3 file:py-2 file:text-white" />
                  {videoFile && <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#38204F] bg-[#14101E] px-3 py-2"><p className="min-w-0 truncate text-[10px] text-[#A855F7]">Selected: {videoFile.name}</p><button type="button" title="Remove selected video" aria-label="Remove selected video" onClick={() => setVideoFile(null)} className="shrink-0 rounded-full p-1 text-[#EF4444] hover:bg-[#EF4444]/10"><X className="h-4 w-4" /></button></div>}
                </div>
                <div>
                  <label className="text-[#A59BB8] block mb-1">Thumbnail (PNG / JPG)</label>
                  <input key={thumbnailFile ? thumbnailFile.name : 'thumbnail-empty'} type="file" accept="image/png,image/jpeg,.png,.jpg,.jpeg" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="block w-full text-[11px] text-[#A59BB8] file:mr-3 file:rounded-lg file:border-0 file:bg-[#38204F] file:px-3 file:py-2 file:text-white" />
                  {thumbnailFile && <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#38204F] bg-[#14101E] px-3 py-2"><p className="min-w-0 truncate text-[10px] text-[#A855F7]">Selected: {thumbnailFile.name}</p><button type="button" title="Remove selected thumbnail" onClick={() => setThumbnailFile(null)} className="shrink-0 rounded-full p-1 text-[#EF4444] hover:bg-[#EF4444]/10"><X className="h-4 w-4" /></button></div>}
                </div>
                <div>
                  <label className="text-[#A59BB8] block mb-1">Alight Motion Project (XML)</label>
                  <input key={xmlFile ? xmlFile.name : 'xml-empty'} type="file" accept=".xml,application/xml,text/xml" onChange={(e) => setXmlFile(e.target.files?.[0] || null)} className="block w-full text-[11px] text-[#A59BB8] file:mr-3 file:rounded-lg file:border-0 file:bg-[#38204F] file:px-3 file:py-2 file:text-white" />
                  {xmlFile && <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#38204F] bg-[#14101E] px-3 py-2"><p className="min-w-0 truncate text-[10px] text-[#A855F7]">Selected: {xmlFile.name}</p><button type="button" title="Remove selected XML" onClick={() => setXmlFile(null)} className="shrink-0 rounded-full p-1 text-[#EF4444] hover:bg-[#EF4444]/10"><X className="h-4 w-4" /></button></div>}
                </div>
                <div>
                  <label className="text-[#A59BB8] block mb-1">ZIP Package (optional)</label>
                  <input key={zipFile ? zipFile.name : 'zip-empty'} type="file" accept=".zip,application/zip,application/x-zip-compressed" onChange={(e) => setZipFile(e.target.files?.[0] || null)} className="block w-full text-[11px] text-[#A59BB8] file:mr-3 file:rounded-lg file:border-0 file:bg-[#38204F] file:px-3 file:py-2 file:text-white" />
                  {zipFile && <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#38204F] bg-[#14101E] px-3 py-2"><p className="min-w-0 truncate text-[10px] text-[#A855F7]">Selected: {zipFile.name}</p><button type="button" title="Remove selected ZIP" onClick={() => setZipFile(null)} className="shrink-0 rounded-full p-1 text-[#EF4444] hover:bg-[#EF4444]/10"><X className="h-4 w-4" /></button></div>}
                </div>
                <div>
                  <label className="text-[#A59BB8] block mb-1">Extra Assets (optional)</label>
                  <input key={extraAssets.length ? extraAssets.map(file => file.name).join('|') : 'assets-empty'} type="file" multiple accept="image/*,audio/*,.xml,.txt,.pdf" onChange={(e) => setExtraAssets(Array.from(e.target.files || []))} className="block w-full text-[11px] text-[#A59BB8] file:mr-3 file:rounded-lg file:border-0 file:bg-[#38204F] file:px-3 file:py-2 file:text-white" />
                  {extraAssets.length > 0 && <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-[#38204F] bg-[#14101E] px-3 py-2"><p className="min-w-0 truncate text-[10px] text-[#A855F7]">Selected: {extraAssets.map(file => file.name).join(', ')}</p><button type="button" title="Remove selected assets" onClick={() => setExtraAssets([])} className="shrink-0 rounded-full p-1 text-[#EF4444] hover:bg-[#EF4444]/10"><X className="h-4 w-4" /></button></div>}
                </div>
                <p className="text-[10px] text-[#A59BB8]">Note: File selection is ready in this form, but permanent cloud/server upload is not connected yet.</p>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#8B2CF5] text-white font-bold rounded-xl hover:opacity-90"
              >
                Publish Video
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. QUICK PREVIEW VIDEO MODAL
// ==========================================
function VideoPreviewModal({ video, onClose, formatPrice, addToCart, openProductDetails }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D0A16] border border-[#38204F] rounded-2xl overflow-hidden max-w-2xl w-full space-y-4 p-4 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 rounded-full text-white hover:bg-black"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#38204F]">
          <video 
            src={video.videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <h3 className="text-lg font-bold text-white">{video.title}</h3>
            <p className="text-xs text-[#A59BB8]">{video.category} • {formatPrice(video.priceINR)}</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                onClose();
                openProductDetails(video);
              }}
              className="px-4 py-2 rounded-xl bg-[#14101E] border border-[#38204F] text-xs font-semibold text-white hover:border-[#8B2CF5]"
            >
              Full Details
            </button>
            <button 
              onClick={() => {
                addToCart(video);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-[#8B2CF5] text-xs font-bold text-white hover:opacity-90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}