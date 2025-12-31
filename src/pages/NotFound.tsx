import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout showFooter={false}>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center gradient-hero">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-8xl lg:text-9xl font-display font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl lg:text-3xl font-display font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="hero" className="gap-2">
                <Home className="w-5 h-5" /> Go Home
              </Button>
            </Link>
            <Button variant="heroOutline" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="w-5 h-5" /> Go Back
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
