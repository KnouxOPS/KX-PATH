import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Whatsapp,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlassLogoProps {
  language: "en" | "ar";
}

export default function GlassLogo({ language }: GlassLogoProps) {
  const isRTL = language === "ar";

  const contactInfo = {
    phone1: "0565049898",
    phone2: "0522949152",
    email: "tarek.mudon@gmail.com",
    company_ar: "طريق الخبرة للخدمات الفنية",
    company_en: "TRYQ ALKHBRH TECHNICAL SERVICES",
    slogan_ar: "خبرتنا طريقكم للتميز",
    slogan_en: "Your Path to Excellence",
  };

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, "_blank");
  };

  const handleEmail = () => {
    window.open(`mailto:${contactInfo.email}`, "_blank");
  };

  const handleWhatsApp = (number: string) => {
    window.open(`https://wa.me/971${number.substring(1)}`, "_blank");
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-teal-500/20 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
      {/* Main Logo Section */}
      <div
        className={`flex items-center justify-between p-8 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Logo and Company Info */}
        <div
          className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Glass Logo Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400/30 via-cyan-400/30 to-teal-400/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg flex items-center justify-center">
              {/* Building Icon representing the company */}
              <div className="relative">
                {/* Main building structure */}
                <div className="w-8 h-10 bg-gradient-to-t from-blue-500/60 to-cyan-400/60 rounded-t-lg border border-white/40 relative">
                  {/* Windows */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="absolute top-3 left-1 w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="absolute top-3 right-1 w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="absolute top-5 left-1 w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="absolute top-5 right-1 w-1 h-1 bg-white/60 rounded-full"></div>
                </div>

                {/* Side building */}
                <div className="absolute -right-2 top-2 w-4 h-8 bg-gradient-to-t from-teal-500/60 to-blue-400/60 rounded-t-md border border-white/40">
                  <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                  <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                  <div className="absolute top-5 left-1 w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                </div>

                {/* Curved path/road */}
                <div className="absolute -bottom-1 -left-2 w-12 h-2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent rounded-full blur-sm"></div>
              </div>

              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl animate-pulse"></div>
            </div>

            {/* Reflection effect */}
            <div className="absolute -bottom-2 left-2 w-16 h-4 bg-gradient-to-t from-cyan-400/10 to-transparent rounded-full blur-md"></div>
          </div>

          {/* Company Name and Slogan */}
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <h1 className="text-2xl font-bold text-white mb-1">
              {language === "ar"
                ? contactInfo.company_ar
                : contactInfo.company_en}
            </h1>
            <p className="text-cyan-300/80 text-sm font-medium">
              {language === "ar"
                ? contactInfo.slogan_ar
                : contactInfo.slogan_en}
            </p>

            {/* Decorative underline */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 rounded-full"></div>
          </div>
        </div>

        {/* Contact Actions */}
        <div
          className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Quick Call Button */}
          <Button
            onClick={() => handleCall(contactInfo.phone1)}
            className="bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-600/90 hover:to-emerald-600/90 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-4 h-4 mr-2" />
            {language === "ar" ? "اتصال سريع" : "Quick Call"}
          </Button>

          {/* WhatsApp Button */}
          <Button
            onClick={() => handleWhatsApp(contactInfo.phone1)}
            className="bg-gradient-to-r from-green-600/80 to-green-500/80 hover:from-green-700/90 hover:to-green-600/90 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>

          {/* Email Button */}
          <Button
            onClick={handleEmail}
            className="bg-gradient-to-r from-blue-600/80 to-cyan-500/80 hover:from-blue-700/90 hover:to-cyan-600/90 backdrop-blur-sm border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Mail className="w-4 h-4 mr-2" />
            {language === "ar" ? "إيميل" : "Email"}
          </Button>
        </div>
      </div>

      {/* Contact Information Bar */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 px-8 py-4">
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Contact Details */}
          <div
            className={`flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {/* Phone 1 */}
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => handleCall(contactInfo.phone1)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-green-300" />
              </div>
              <span className="text-white font-medium group-hover:text-green-300 transition-colors">
                {contactInfo.phone1}
              </span>
            </div>

            {/* Phone 2 */}
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => handleCall(contactInfo.phone2)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4 text-green-300" />
              </div>
              <span className="text-white font-medium group-hover:text-green-300 transition-colors">
                {contactInfo.phone2}
              </span>
            </div>

            {/* Email */}
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={handleEmail}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4 text-blue-300" />
              </div>
              <span className="text-white font-medium group-hover:text-blue-300 transition-colors">
                {contactInfo.email}
              </span>
            </div>
          </div>

          {/* Location */}
          <div
            className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-orange-300" />
            </div>
            <span className="text-white/80 font-medium">
              {language === "ar"
                ? "الإمارات العربية المتحدة"
                : "United Arab Emirates"}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
