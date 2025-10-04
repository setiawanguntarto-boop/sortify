import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Leaf, Star, Users, CheckCircle, Clock, Download, ChevronLeft, ChevronRight } from "lucide-react";
import sortifyLogo from "@/assets/sortify-logo.png";

// Sample data - replace with API fetch
const SAMPLE_DATA = [
  { date: '2025-09-29', user: '0817xxxx333', type: 'Lainnya', category: 'Sekam', qty: 7, unit: 'Karung', status: 'PENDING', points: 14 },
  { date: '2025-10-01', user: '0813xxxx222', type: 'Kertas Kardus', category: 'Kardus', qty: 12, unit: 'Kg', status: 'VALID', points: 24 },
  { date: '2025-10-03', user: '0812xxxx111', type: 'Plastik PET', category: 'PET', qty: 5, unit: 'Kg', status: 'VALID', points: 10 },
  { date: '2025-10-04', user: '0819xxxx555', type: 'Logam', category: 'Kaleng', qty: 8, unit: 'Kg', status: 'PROCESS', points: 16 },
  { date: '2025-09-25', user: '0812xxxx111', type: 'Plastik PET', category: 'PET', qty: 15, unit: 'Kg', status: 'VALID', points: 30 },
  { date: '2025-09-26', user: '0813xxxx222', type: 'Kertas Kardus', category: 'Kertas', qty: 6, unit: 'Kg', status: 'VALID', points: 12 },
  { date: '2025-09-30', user: '0818xxxx444', type: 'Logam', category: 'Besi', qty: 4, unit: 'Kg', status: 'VALID', points: 8 },
  { date: '2025-09-20', user: '0817xxxx333', type: 'Lainnya', category: 'Kaca', qty: 10, unit: 'Kg', status: 'VALID', points: 20 },
  { date: '2025-09-22', user: '0816xxxx777', type: 'Plastik PET', category: 'PET', qty: 9, unit: 'Kg', status: 'VALID', points: 18 },
  { date: '2025-09-23', user: '0816xxxx777', type: 'Kertas Kardus', category: 'Kertas', qty: 2, unit: 'Kg', status: 'VALID', points: 4 },
  { date: '2025-09-28', user: '0815xxxx999', type: 'Plastik PET', category: 'PET', qty: 11, unit: 'Kg', status: 'VALID', points: 22 },
  { date: '2025-10-02', user: '0814xxxx888', type: 'Lainnya', category: 'Elektronik kecil', qty: 1, unit: 'Unit', status: 'PENDING', points: 5 }
];

const DashboardPage = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter data
  const filteredData = useMemo(() => {
    return SAMPLE_DATA.filter(record => {
      const recordDate = new Date(record.date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      const matchDate = (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate);
      const matchType = typeFilter === "ALL" || record.type === typeFilter;
      const matchStatus = statusFilter === "ALL" || record.status === statusFilter;
      const matchSearch = !searchUser || record.user.includes(searchUser.trim());

      return matchDate && matchType && matchStatus && matchSearch;
    });
  }, [dateFrom, dateTo, typeFilter, statusFilter, searchUser]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalKg = filteredData.filter(x => x.unit === 'Kg').reduce((sum, x) => sum + x.qty, 0);
    const totalPoints = filteredData.reduce((sum, x) => sum + x.points, 0);
    const users = new Set(filteredData.map(x => x.user)).size;
    const validCount = filteredData.filter(x => x.status === 'VALID').length;
    const validPct = filteredData.length ? Math.round((validCount / filteredData.length) * 100) : 0;
    
    return { totalKg, totalPoints, users, validPct };
  }, [filteredData]);

  // Composition data for pie chart
  const compositionData = useMemo(() => {
    const types = ['Plastik PET', 'Kertas Kardus', 'Logam', 'Lainnya'];
    return types.map(type => ({
      name: type,
      value: filteredData.filter(x => x.type === type && x.unit === 'Kg').reduce((sum, x) => sum + x.qty, 0)
    })).filter(item => item.value > 0);
  }, [filteredData]);

  // Trend data by week
  const trendData = useMemo(() => {
    const buckets: Record<string, number> = {};
    filteredData.forEach(record => {
      const d = new Date(record.date);
      const weekLabel = `${d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}`;
      if (!buckets[weekLabel]) buckets[weekLabel] = 0;
      buckets[weekLabel] += record.unit === 'Kg' ? record.qty : 0;
    });
    
    return Object.entries(buckets)
      .map(([date, kg]) => ({ date, kg }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredData]);

  // Leaderboard
  const leaderboard = useMemo(() => {
    const map = new Map<string, { user: string; qty: number; points: number }>();
    filteredData.forEach(r => {
      if (!map.has(r.user)) map.set(r.user, { user: r.user, qty: 0, points: 0 });
      const entry = map.get(r.user)!;
      if (r.unit === 'Kg') entry.qty += r.qty;
      entry.points += r.points;
    });
    return Array.from(map.values()).sort((a, b) => b.qty - a.qty).slice(0, 10);
  }, [filteredData]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const resetFilters = () => {
    setDateFrom("");
    setDateTo("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setSearchUser("");
    setCurrentPage(1);
  };

  const exportCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {});
    const csv = [headers.join(',')].concat(
      data.map(row => headers.map(h => `"${String(row[h] ?? '')}"`).join(','))
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(220 9% 46%)', 'hsl(38 92% 50%)'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img src={sortifyLogo} alt="Sortify" className="h-10 w-10" />
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Sortify Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Transparansi Pengelolaan Sampah Digital</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="w-5 h-5" />
              <span>{new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1" htmlFor="dateFrom">Dari Tanggal</label>
                  <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1" htmlFor="dateTo">Sampai</label>
                  <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1" htmlFor="typeFilter">Jenis</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="typeFilter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua</SelectItem>
                      <SelectItem value="Plastik PET">Plastik PET</SelectItem>
                      <SelectItem value="Kertas Kardus">Kertas Kardus</SelectItem>
                      <SelectItem value="Logam">Logam</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1" htmlFor="statusFilter">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="statusFilter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Semua</SelectItem>
                      <SelectItem value="VALID">Valid</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PROCESS">Diproses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setCurrentPage(1)}>Terapkan</Button>
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
              </div>
              <div className="ml-auto flex gap-2">
                <Input
                  type="search"
                  placeholder="Cari no. HP…"
                  className="w-48 md:w-64"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
                <Button variant="outline" onClick={() => exportCSV(filteredData, 'sortify-transactions.csv')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Sampah</p>
                <p className="text-3xl font-extrabold tracking-tight">{kpis.totalKg.toLocaleString('id-ID')} <span className="text-base font-semibold text-muted-foreground">Kg</span></p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
                <Star className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Poin</p>
                <p className="text-3xl font-extrabold tracking-tight">{kpis.totalPoints.toLocaleString('id-ID')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">User Aktif</p>
                <p className="text-3xl font-extrabold tracking-tight">{kpis.users.toLocaleString('id-ID')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Input Valid</p>
                <p className="text-3xl font-extrabold tracking-tight">{kpis.validPct}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Tren Sampah (Kg)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="kg" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Komposisi Jenis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={compositionData} cx="50%" cy="50%" labelLine={false} label={entry => `${entry.name}: ${entry.value}kg`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {compositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Leaderboard Kontribusi</CardTitle>
              <Button variant="outline" size="sm" onClick={() => exportCSV(leaderboard, 'sortify-leaderboard.csv')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase text-muted-foreground bg-muted/50">
                    <tr>
                      <th className="text-left p-3">User</th>
                      <th className="text-left p-3">Jumlah (Kg)</th>
                      <th className="text-left p-3">Poin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/30">
                        <td className="p-3 font-medium">{entry.user}</td>
                        <td className="p-3">{entry.qty.toLocaleString('id-ID')}</td>
                        <td className="p-3 font-semibold text-primary">{entry.points.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Riwayat Transaksi</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Halaman {currentPage} / {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase text-muted-foreground bg-muted/50">
                    <tr>
                      <th className="text-left p-3">Tanggal</th>
                      <th className="text-left p-3">User</th>
                      <th className="text-left p-3">Jenis</th>
                      <th className="text-left p-3">Qty</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((record, idx) => {
                      const statusBadge = record.status === 'VALID' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                          record.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
                      const statusLabel = record.status === 'VALID' ? '✅ Valid' : record.status === 'PENDING' ? '⚠️ Pending' : '🔄 Diproses';

                      return (
                        <tr key={idx} className="border-b border-border hover:bg-muted/30">
                          <td className="p-3">{new Date(record.date).toLocaleDateString('id-ID')}</td>
                          <td className="p-3">{record.user}</td>
                          <td className="p-3">{record.type}{record.category ? ` – ${record.category}` : ''}</td>
                          <td className="p-3">{record.qty.toLocaleString('id-ID')} {record.unit}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2.5 py-1 rounded-full ${statusBadge}`}>{statusLabel}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sortify — Dashboard Prototype
        </footer>
      </main>
    </div>
  );
};

export default DashboardPage;
