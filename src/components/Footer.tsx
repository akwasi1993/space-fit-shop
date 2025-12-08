import { Link } from "react-router-dom";
import { Dumbbell, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">HomeFit</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your destination for premium home gym equipment and fitness programs. Build your dream home gym today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shop Equipment
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Workout Programs
                </Link>
              </li>
              <li>
                <Link to="/inspiration" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Inspiration
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@homefit.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                1-800-HOMEFIT
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Fitness Street<br />Gym City, GC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HomeFit. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
