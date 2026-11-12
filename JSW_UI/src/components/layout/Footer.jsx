import img from "../../assets/schaeffler.png";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-1">
      <div className="relative flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <img src={img} alt="Schaeffler" className="h-10 " />
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <span className="absolute right-0 text-xs text-gray-400">v{__APP_VERSION__}</span>
      </div>
    </footer>
  );
}
