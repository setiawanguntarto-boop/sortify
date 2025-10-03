import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sortifyLogo from "@/assets/sortify-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={sortifyLogo} alt="Sortify" className="h-8 w-8" />
          <span className="text-xl font-bold">Sortify</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/cara-kerja" className="text-sm font-medium hover:text-primary transition-colors">
            Cara Kerja
          </Link>
          <a href="/#benefits" className="text-sm font-medium hover:text-primary transition-colors">
            Keuntungan
          </a>
          <a href="/#demo" className="text-sm font-medium hover:text-primary transition-colors">
            Demo
          </a>
          <Link to="/tentang" className="text-sm font-medium hover:text-primary transition-colors">
            Tentang
          </Link>
          <a href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Kontak
          </a>
        </div>
        
        <Button variant="default" size="default">
          Cek Poin Saya
        </Button>
      </nav>
    </header>
  );
};

export default Header;
