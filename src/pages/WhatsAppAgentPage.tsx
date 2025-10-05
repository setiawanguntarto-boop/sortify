import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Bot, Check } from "lucide-react";

const WhatsAppAgentPage = () => {
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center min-h-screen text-center p-4 sm:p-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full transition-all duration-300 animate-fade-in">
        <div className="mb-5 flex justify-center">
          {/* Icon Robot */}
          <div className="bg-green-100 rounded-full p-4">
            <Bot className="w-16 h-16 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Fitur Agent WhatsApp Segera Hadir
        </h1>
        
        <p className="text-gray-600 mb-8">
          Kami sedang bekerja keras agar Anda bisa mencatat sampah dan poin langsung dari WhatsApp. Terima kasih atas kesabaran Anda! 💚
        </p>
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleNotify}
            disabled={notified}
            className={`w-full flex items-center justify-center gap-2 ${
              notified 
                ? 'bg-emerald-200 text-emerald-900 cursor-not-allowed hover:bg-emerald-200' 
                : ''
            }`}
          >
            {notified ? (
              <>
                <Check className="w-5 h-5" />
                <span>Permintaan Terkirim</span>
              </>
            ) : (
              <>
                <Bell className="w-5 h-5" />
                <span>Beritahu Saya Saat Siap</span>
              </>
            )}
          </Button>
          
          <Link to="/" className="text-green-700 font-medium hover:underline transition-colors flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
        
        {notified && (
          <p className="text-sm text-green-800 mt-4 animate-fade-in">
            Terima kasih! Kami akan mengabari Anda. 😊
          </p>
        )}
      </div>
    </div>
  );
};

export default WhatsAppAgentPage;
