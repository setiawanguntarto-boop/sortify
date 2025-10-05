import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import sortifyLogo from "@/assets/sortify-logo.png";

// Dummy data to simulate API response
const dummyData: Record<string, { points: number; level: string; history: Array<{ date: string; type: string; qty: string; points: number }> }> = {
  '+6287731771859': {
    points: 1280,
    level: '🌱 Green Hero',
    history: [
      { date: '04-10-2025', type: 'Setor Plastik PET', qty: '5 Kg', points: 50 },
      { date: '03-10-2025', type: 'Setor Kertas Kardus', qty: '10 Kg', points: 80 },
      { date: '01-10-2025', type: 'Tukar Poin (Pulsa)', qty: '1', points: -200 },
      { date: '28-09-2025', type: 'Setor Logam', qty: '3 Kg', points: 45 }
    ]
  },
  '+6281234567890': {
    points: 720,
    level: '🍃 Eco Starter',
    history: [
      { date: '02-10-2025', type: 'Setor Kaca', qty: '4 Kg', points: 30 },
      { date: '28-09-2025', type: 'Setor Plastik Campuran', qty: '6 Kg', points: 40 }
    ]
  }
};

const CekPoinPage = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userData, setUserData] = useState<{ points: number; level: string; history: Array<{ date: string; type: string; qty: string; points: number }> } | null>(null);

  const handleCheckPoints = () => {
    const trimmedPhone = phone.trim();
    
    // Basic validation
    if (!/^\+62\d{9,13}$/.test(trimmedPhone)) {
      setError('Format nomor salah. Contoh: +6281234567890');
      return;
    }
    setError('');
    
    // Show loading state
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const data = dummyData[trimmedPhone];
      
      if (!data) {
        setError('Nomor Anda belum terdaftar di sistem Sortify.');
        setLoading(false);
        return;
      }

      setUserData(data);
      setShowResult(true);
      setLoading(false);
    }, 1000);
  };

  const resetView = () => {
    setShowResult(false);
    setPhone('');
    setError('');
    setUserData(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheckPoints();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={sortifyLogo} alt="Sortify" className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">Sortify</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Input Section */}
        {!showResult && (
          <section className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Cek Poin Anda</h1>
            <p className="text-muted-foreground mb-8">Masukkan nomor WhatsApp yang terdaftar untuk melihat total poin dan riwayat Anda.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
              <Input
                type="tel"
                placeholder="+628xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-center text-lg"
              />
              <Button
                onClick={handleCheckPoints}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Mengecek...
                  </>
                ) : (
                  'Lihat Poin'
                )}
              </Button>
            </div>
            {error && <p className="text-destructive mt-3 text-sm">{error}</p>}
          </section>
        )}

        {/* Result Section */}
        {showResult && userData && (
          <section className="mt-12 text-center animate-fade-in">
            <h2 className="text-2xl font-semibold mb-2">
              Halo, <span className="text-primary font-bold">{phone}</span>
            </h2>
            <p className="text-muted-foreground mb-8">Berikut ringkasan poin dan aktivitas terbaru Anda.</p>

            {/* Summary Card */}
            <div className="bg-card shadow-lg rounded-xl p-6 max-w-lg mx-auto mb-8 border border-border">
              <p className="text-muted-foreground">Total Poin Anda</p>
              <h3 className="text-5xl font-bold text-primary my-2">{userData.points.toLocaleString('id-ID')}</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                Status Anda: <span className="font-semibold text-primary">{userData.level}</span>
              </p>
            </div>

            {/* History Table */}
            <div className="bg-card shadow-lg rounded-xl p-4 sm:p-6 max-w-3xl mx-auto border border-border">
              <h4 className="text-lg font-semibold mb-4 text-left">Riwayat Aktivitas</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead className="bg-muted/50 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Tanggal</th>
                      <th className="px-4 py-3 font-semibold">Jenis</th>
                      <th className="px-4 py-3 font-semibold">Jumlah</th>
                      <th className="px-4 py-3 font-semibold text-right">Poin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {userData.history.map((item, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                        <td className="px-4 py-3">{item.type}</td>
                        <td className="px-4 py-3">{item.qty}</td>
                        <td className={`px-4 py-3 font-semibold text-right ${item.points > 0 ? 'text-success' : 'text-destructive'}`}>
                          {item.points > 0 ? '+' : ''}{item.points.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button>
                Tukar Poin
              </Button>
              <Button variant="outline" onClick={resetView}>
                Cek Nomor Lain
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CekPoinPage;
