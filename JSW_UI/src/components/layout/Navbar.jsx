import { Bell, Menu } from "lucide-react";
import img from "../../assets/Netp_Logo_2.10.png";
import jswLogo from "../../assets/jsw-logo.png";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
        <a href="/" className="flex items-center gap-2">
          <img
            src={jswLogo}
            alt="JSW Logo"
            className="h-20 w-auto object-contain sm:h-28"
          />
        </a>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1">
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sky-500" />
        </button>
        <div className="ml-2 flex h-9 w-24 cursor-pointer items-center justify-center text-white">
          <img src={img} alt="Net+Ve Logo" className="h-full w-full object-contain" />
        </div>
      </div>
    </header>
  );
}
