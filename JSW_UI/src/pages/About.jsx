import schaefflerLogo from "../assets/schaeffler.png";
import netpveLogo from "../assets/Netp_Logo_2.10.png";

export default function About() {
  return (
    <div className="w-full max-w-full px-2 sm:px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-5">
        {/* Logos Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
          <div className="flex-shrink-0">
            <img
              src={schaefflerLogo}
              alt="Schaeffler Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block text-gray-300 text-lg">/</div>
          <div className="flex-shrink-0">
            <img
              src={netpveLogo}
              alt="Net+Ve Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {/* Product Name */}
          <div className="bg-gray-50 rounded p-2 sm:p-3 border border-gray-100 hover:border-gray-200 transition-colors">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Product Name
            </p>
            <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
              Net+Ve
            </p>
          </div>

          {/* Developed By */}
          <div className="bg-gray-50 rounded p-2 sm:p-3 border border-gray-100 hover:border-gray-200 transition-colors">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Developed By
            </p>
            <p className="text-base sm:text-lg font-bold text-green-700 mt-1 leading-snug">
              Schaeffler Digital Solutions
            </p>
            <p className="text-xs text-green-700 mt-0.5">
              India Private Limited
            </p>
          </div>

          {/* Visit Website */}
          <div className="bg-gray-50 rounded p-2 sm:p-3 border-2 border-gray-200 hover:border-gray-300 transition-colors">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Visit Website
            </p>
            <a
              href="https://www.schaeffler.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-green-600 hover:text-green-700 transition-colors group break-all"
            >
              www.schaeffler.com
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l6-6m0 0l-6 6"
                />
              </svg>
            </a>
          </div>

          {/* Licensing */}
          <div className="bg-gray-50 rounded p-2 sm:p-3 border border-gray-100 hover:border-gray-200 transition-colors">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Licensing
            </p>
            <div className="mt-1 flex flex-col gap-0.5">
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                Generated At
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#00893D]">
                SDS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
