// ── 1. UBER RIDE DISPATCH REACT JSX ──
const UBER_JSX = `import React, { useState } from 'react';

export default function UberRideScreen() {
  const [pickup, setPickup] = useState('Mumbai Airport Terminal 2');
  const [destination, setDestination] = useState('BKC Financial Centre, Bandra');
  const [selectedRide, setSelectedRide] = useState('premier');
  const [activeTab, setActiveTab] = useState('Ride');
  const [isBooked, setIsBooked] = useState(false);

  const rides = [
    { id: 'premier', name: 'Uber Premier', desc: 'Premium sedans • Top drivers', eta: '3 mins away', price: 540, badge: 'Popular' },
    { id: 'go', name: 'Uber Go', desc: 'Compact hatchbacks • Affordable', eta: '5 mins away', price: 320, badge: 'Cheapest' },
    { id: 'xl', name: 'Uber XL', desc: 'Spacious 6-seaters • Extra luggage', eta: '7 mins away', price: 780, badge: 'Family' },
    { id: 'auto', name: 'Uber Auto', desc: 'Doorstep pickup • Meter free', eta: '2 mins away', price: 180, badge: 'Fastest' }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-[#222222] px-6 py-4 flex items-center justify-between bg-[#121212]/90 backdrop-blur">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black tracking-tighter">Uber</span>
          <div className="flex items-center gap-4 text-xs font-semibold">
            {['Ride', 'Package', 'Rental', 'Activity'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`px-3.5 py-1.5 rounded-full transition \${activeTab === tab ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}\`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-[#222222] font-medium text-slate-300">Help</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs">
            JD
          </div>
        </div>
      </nav>

      {/* Main Grid: Left Booking Form + Right Live Map Simulator */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Column: Ride Selector */}
        <div className="lg:col-span-5 p-6 flex flex-col gap-5 border-r border-[#222222] bg-[#0a0a0a] overflow-y-auto">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Request a ride</h1>
            <p className="text-xs text-slate-400 mt-1">Get picked up in minutes by top-rated drivers</p>
          </div>

          {/* Pickup & Destination Inputs */}
          <div className="space-y-2 relative">
            <div className="relative">
              <span className="absolute left-3.5 top-3 w-2 h-2 rounded-full bg-white"></span>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location"
                className="w-full pl-8 pr-3 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white transition"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-3 w-2 h-2 rounded-sm bg-black border border-white"></span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="w-full pl-8 pr-3 py-2.5 bg-[#181818] border border-[#2a2a2a] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white transition font-medium"
              />
            </div>
          </div>

          {/* Vehicle List */}
          <div className="space-y-2.5">
            <h2 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Suggested Rides</h2>
            {rides.map(r => (
              <div
                key={r.id}
                onClick={() => setSelectedRide(r.id)}
                className={\`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between \${
                  selectedRide === r.id 
                    ? 'border-white bg-[#1a1a1a] shadow-lg shadow-white/5' 
                    : 'border-[#222222] bg-[#121212] hover:bg-[#181818]'
                }\`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#252525] flex items-center justify-center font-bold text-lg">
                    {r.id === 'premier' ? '🚘' : r.id === 'go' ? '🚗' : r.id === 'xl' ? '🚙' : '🛺'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{r.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a2a2a] text-slate-300 font-mono">{r.badge}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{r.eta} &bull; {r.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-white">₹{r.price}</span>
                  <p className="text-[10px] text-emerald-400 font-mono">Guaranteed</p>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Action */}
          <div className="mt-auto pt-3">
            <button
              onClick={() => setIsBooked(true)}
              className="w-full py-3.5 bg-white hover:bg-slate-200 text-black font-extrabold rounded-xl transition shadow-lg text-sm"
            >
              {isBooked ? 'Ride Confirmed! Driver en route...' : \`Request \${rides.find(r => r.id === selectedRide)?.name}\`}
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2 font-mono">Prices include toll, parking, and GST taxes.</p>
          </div>
        </div>

        {/* Right Column: Live Simulated Map */}
        <div className="lg:col-span-7 bg-[#141923] relative p-6 flex flex-col justify-between overflow-hidden">
          {/* Simulated Map Roads */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <line x1="50" y1="100" x2="600" y2="400" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6 4" />
            <line x1="100" y1="500" x2="500" y2="100" stroke="#475569" strokeWidth="2" />
            <line x1="300" y1="50" x2="350" y2="480" stroke="#475569" strokeWidth="2" />
            <circle cx="200" cy="200" r="10" fill="#22c55e" />
            <circle cx="500" cy="340" r="10" fill="#ef4444" />
          </svg>

          {/* Floating Driver Card */}
          <div className="z-10 bg-[#0f141c]/95 border border-white/10 rounded-2xl p-4 shadow-2xl max-w-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Driver In Vicinity
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">4.92 ★ (1.8k rides)</span>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                DL
              </div>
              <div>
                <p className="text-xs font-bold text-white">Rajesh Verma &bull; Honda City</p>
                <p className="text-[11px] font-mono text-slate-400">MH-02-EE-4921 &bull; White Sedan</p>
              </div>
            </div>
          </div>

          {/* Live ETA Card */}
          <div className="z-10 bg-[#0f141c]/95 border border-white/10 rounded-xl p-3 shadow-xl self-end text-xs font-mono text-slate-300">
            Estimated Trip Duration: <strong className="text-white">28 mins (18.4 km)</strong> via Western Express Hwy
          </div>
        </div>

      </div>
    </div>
  );
}`;

// ── 2. CAR DEALERSHIP & CONFIGURATOR REACT JSX ──
const CAR_JSX = `import React, { useState } from 'react';

export default function CarConfiguratorScreen() {
  const [selectedTrim, setSelectedTrim] = useState('plaid');
  const [selectedColor, setSelectedColor] = useState('Midnight Silver');
  const [wheels, setWheels] = useState('21 Tempest');

  const trims = {
    longRange: { name: 'Hyperion Long Range AWD', price: 89990, range: '650 km', zeroTo100: '3.1 s', topSpeed: '250 km/h', hp: '670 HP' },
    plaid: { name: 'Hyperion Plaid Tri-Motor', price: 119990, range: '600 km', zeroTo100: '1.99 s', topSpeed: '322 km/h', hp: '1,020 HP' }
  };

  const colors = [
    { name: 'Pearl White', hex: '#f8fafc', extra: 0 },
    { name: 'Midnight Silver', hex: '#475569', extra: 1500 },
    { name: 'Deep Crimson Red', hex: '#dc2626', extra: 2500 },
    { name: 'Solid Obsidian Black', hex: '#0f172a', extra: 1500 }
  ];

  const currentTrim = trims[selectedTrim];
  const totalPrice = currentTrim.price + (colors.find(c => c.name === selectedColor)?.extra || 0);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans flex flex-col">
      {/* Brand Navigation */}
      <header className="border-b border-white/10 px-8 py-4 flex items-center justify-between bg-[#0e1017]/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <span className="text-base font-black tracking-widest text-white uppercase">Apex Motors</span>
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="text-white">Hyperion GT</span>
            <span className="hover:text-white cursor-pointer transition">CyberTruck</span>
            <span className="hover:text-white cursor-pointer transition">Roadster Aero</span>
            <span className="hover:text-white cursor-pointer transition">Supercharging</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-500/20">
          Book Test Drive
        </button>
      </header>

      {/* Main Showcase & Configurator */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: 3D Vehicle Render Showcase */}
        <div className="lg:col-span-8 p-8 flex flex-col justify-between border-r border-white/10 bg-gradient-to-b from-[#0e1017] to-[#090a0f] relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">HYPER-EV PLATFORM</span>
              <span className="text-xs text-slate-500 font-mono">MY-2026 EDITION</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mt-2">{currentTrim.name}</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
              Engineered with carbon-sleeved rotors and active aerodynamic torque vectoring. Zero emissions with unprecedented hypercar acceleration.
            </p>
          </div>

          {/* Vehicle Visual Placeholder with Dynamic Color Tint */}
          <div className="my-10 p-12 rounded-3xl bg-[#12151e] border border-white/10 flex flex-col items-center justify-center relative shadow-2xl">
            <div className="text-6xl mb-4">🏎️</div>
            <div className="text-center">
              <span className="text-sm font-bold text-white block">Apex Hyperion GT in {selectedColor}</span>
              <span className="text-xs font-mono text-cyan-400">Equipped with {wheels} wheels &bull; AWD Vectoring</span>
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500 bg-black/40 px-3 py-1 rounded-full border border-white/5">
              360° Interactive View Active
            </div>
          </div>

          {/* Performance Specs Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#12151e] border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500">0 - 100 KM/H</span>
              <p className="text-2xl font-black text-white mt-1">{currentTrim.zeroTo100}</p>
            </div>
            <div className="bg-[#12151e] border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500">EST. EPA RANGE</span>
              <p className="text-2xl font-black text-cyan-400 mt-1">{currentTrim.range}</p>
            </div>
            <div className="bg-[#12151e] border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500">PEAK OUTPUT</span>
              <p className="text-2xl font-black text-white mt-1">{currentTrim.hp}</p>
            </div>
            <div className="bg-[#12151e] border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500">TOP SPEED</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">{currentTrim.topSpeed}</p>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Configurator Panel */}
        <div className="lg:col-span-4 p-6 bg-[#0c0e14] flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Select Powertrain</h2>
              <div className="space-y-3 mt-3">
                <div
                  onClick={() => setSelectedTrim('plaid')}
                  className={\`p-4 rounded-xl border cursor-pointer transition \${
                    selectedTrim === 'plaid' ? 'border-cyan-500 bg-cyan-950/20 shadow' : 'border-white/10 bg-[#12151e] hover:bg-[#161a25]'
                  }\`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-white">Tri-Motor Plaid</span>
                    <span className="text-xs font-mono font-bold text-cyan-400">$119,990</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">1,020 hp &bull; 1.99s 0-100 &bull; Carbon brake package</p>
                </div>

                <div
                  onClick={() => setSelectedTrim('longRange')}
                  className={\`p-4 rounded-xl border cursor-pointer transition \${
                    selectedTrim === 'longRange' ? 'border-cyan-500 bg-cyan-950/20 shadow' : 'border-white/10 bg-[#12151e] hover:bg-[#161a25]'
                  }\`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-white">Dual-Motor Long Range</span>
                    <span className="text-xs font-mono font-bold text-slate-300">$89,990</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">670 hp &bull; 650 km range &bull; Premium audio</p>
                </div>
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Exterior Finish</h2>
              <div className="flex items-center gap-3 mt-3">
                {colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={\`w-10 h-10 rounded-full border-2 transition shadow-lg relative flex items-center justify-center \${
                      selectedColor === c.name ? 'border-cyan-400 scale-110 ring-2 ring-cyan-500/30' : 'border-white/20 hover:scale-105'
                    }\`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && <span className="text-[10px] text-black font-bold">✓</span>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2 font-mono">{selectedColor}</p>
            </div>
          </div>

          {/* Pricing & Checkout */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs text-slate-400 font-medium">Total Vehicle Price</span>
              <span className="text-2xl font-black text-white font-mono">\${totalPrice.toLocaleString()}</span>
            </div>
            <button className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-xl shadow-cyan-500/20">
              Continue to Purchase Order
            </button>
            <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">Est. delivery: 2 - 4 weeks to your region.</p>
          </div>
        </div>

      </div>
    </div>
  );
}`;

// ── 3. E-COMMERCE / NIKE SHOPPING REACT JSX ──
const SHOPPING_JSX = `import React, { useState } from 'react';

export default function NikeGearStore() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(410);

  const products = [
    { id: 1, name: 'Nike Air Max Pulse Roam', category: 'Men Shoes', price: 150, rating: '4.8 (340)', badge: 'Best Seller', imgEmoji: '👟', color: 'Summit White' },
    { id: 2, name: 'ZoomX Vaporfly 3 Next%', category: 'Road Racing', price: 260, rating: '4.9 (1.2k)', badge: 'Marathon Gold', imgEmoji: '⚡', color: 'Volt Yellow' },
    { id: 3, name: 'Pegasus 41 GORE-TEX Shield', category: 'All-Weather', price: 140, rating: '4.7 (890)', badge: 'Waterproof', imgEmoji: '🌧️', color: 'Obsidian Black' },
    { id: 4, name: 'Nike Dunk Low Retro SE', category: 'Lifestyle', price: 115, rating: '4.6 (520)', badge: 'Classic', imgEmoji: '🛹', color: 'Panda B&W' },
    { id: 5, name: 'Alphafly 3 Proto Edition', category: 'Road Racing', price: 285, rating: '5.0 (410)', badge: 'Limited Stock', imgEmoji: '🏁', color: 'Pure Platinum' },
    { id: 6, name: 'Metcon 9 Training Pro', category: 'Gym & Crossfit', price: 150, rating: '4.8 (750)', badge: 'Stability', imgEmoji: '🏋️', color: 'Dark Smoke' }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category.includes(activeCategory));

  const handleAddToCart = (price) => {
    setCartCount(prev => prev + 1);
    setCartTotal(prev => prev + price);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col">
      {/* Top Notification Bar */}
      <div className="bg-[#0f172a] text-white text-[11px] py-2 px-6 text-center font-medium tracking-wide">
        ⚡ Members get Free Express Shipping & 30-Day Wear Test Guarantee &bull; <strong className="underline cursor-pointer">Join Now</strong>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="text-2xl font-black tracking-tighter text-black">NIKE // SPORT</span>
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-600">
            {['All', 'Road Racing', 'Men Shoes', 'Lifestyle', 'Gym & Crossfit'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`transition pb-1 \${activeCategory === cat ? 'text-black border-b-2 border-black' : 'hover:text-black'}\`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Search & Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-slate-100 px-3 py-1.5 rounded-full text-xs text-slate-500 w-44">
            <span className="mr-2">🔍</span>
            <input type="text" placeholder="Search shoes..." className="bg-transparent border-none outline-none w-full text-slate-800" />
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold shadow hover:bg-slate-800 transition">
            <span>🛒 Cart</span>
            <span className="w-5 h-5 rounded-full bg-blue-600 text-[10px] flex items-center justify-center font-mono">{cartCount}</span>
            <span className="font-mono ml-1 text-slate-300">(\${cartTotal})</span>
          </button>
        </div>
      </header>

      {/* Catalog Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Performance Footwear</h1>
            <p className="text-xs text-slate-500 mt-1">Showing {filteredProducts.length} high-performance models</p>
          </div>
          <span className="text-xs font-bold text-slate-600 font-mono">Sort: Featured Releases &darr;</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              
              {/* Product Visual */}
              <div className="bg-slate-100 p-8 flex flex-col items-center justify-center relative overflow-hidden h-52 group-hover:bg-slate-200/70 transition">
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black text-white font-mono">
                  {p.badge}
                </span>
                <span className="text-6xl transform group-hover:scale-110 transition duration-300">{p.imgEmoji}</span>
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500">{p.color}</span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-medium">{p.category}</span>
                    <span className="font-bold text-amber-500">★ {p.rating}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">{p.name}</h3>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Retail Price</span>
                    <span className="text-lg font-black text-slate-900">\${p.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(p.price)}
                    className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}`;

module.exports = {
  UBER_JSX,
  CAR_JSX,
  SHOPPING_JSX
};
