import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl lg:text-3xl font-display font-bold">
                Skill<span className="text-primary">Swap</span>
              </span>
            </Link>
            <p className="text-background/70 max-w-md leading-relaxed">
              Exchange skills, grow together. Connect with people who want to learn what you teach and teach what you want to learn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-background/70 hover:text-primary transition-colors duration-300">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/teach" className="text-background/70 hover:text-primary transition-colors duration-300">
                  Teach Skills
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-background/70 hover:text-primary transition-colors duration-300">
                  Learn Skills
                </Link>
              </li>
              <li>
                <Link to="/matching" className="text-background/70 hover:text-primary transition-colors duration-300">
                  Find Matches
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
          <p className="text-background/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for learners everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
