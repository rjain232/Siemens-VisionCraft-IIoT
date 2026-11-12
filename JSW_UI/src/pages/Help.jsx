import { Phone, Mail, MapPin } from "lucide-react";

export default function Help() {
  return (
    <div className="w-full max-w-full px-2 sm:px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-5">
        {/* Header Section */}
        <div className="mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-200">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Get in touch with our team
          </p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Phone Card */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200 hover:border-sky-300 hover:bg-sky-50/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <Phone size={18} className="text-sky-600" />
              </div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Phone
              </p>
            </div>
            <a
              href="tel:9765000543"
              className="text-base sm:text-lg font-semibold text-gray-900 hover:text-sky-600 transition-colors break-all"
            >
              9765000543
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200 hover:border-sky-300 hover:bg-sky-50/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <Mail size={18} className="text-sky-600" />
              </div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Email
              </p>
            </div>
            <a
              href="mailto:chouggnd@schaeffler.com"
              className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-sky-600 transition-colors break-all"
            >
              chouggnd@schaeffler.com
            </a>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200 hover:border-sky-300 hover:bg-sky-50/30 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <MapPin size={18} className="text-sky-600" />
              </div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Address
              </p>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900">
              Pune, Maharashtra
            </p>
          </div>
        </div>

        {/* Full Address Section */}
        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Full Address
          </p>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            1111-1114, Nandan ProBiz, Baner, Pune, Maharashtra 411045 IN
          </p>
        </div>
      </div>
    </div>
  );
}
