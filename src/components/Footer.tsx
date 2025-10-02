import sortifyLogo from "@/assets/sortify-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={sortifyLogo} alt="Sortify" className="h-8 w-8 brightness-0 invert" />
              <span className="text-xl font-bold">Sortify</span>
            </div>
            <p className="text-sm text-background/70">
              Turn waste into points. Your contribution matters.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#how-it-works" className="hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#benefits" className="hover:text-background transition-colors">Benefits</a></li>
              <li><a href="#demo" className="hover:text-background transition-colors">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#about" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-background transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="mailto:setiawan@naraflow.id" className="hover:text-background transition-colors">
                  setiawan@naraflow.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/6287731771859" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/70">
          <p>© 2025 Sortify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
