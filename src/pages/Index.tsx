import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, Repeat, BookOpen, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Share Your Knowledge",
      description: "List the skills you can teach and help others grow while building meaningful connections.",
    },
    {
      icon: <Repeat className="w-6 h-6" />,
      title: "Exchange Skills",
      description: "Trade expertise without money. Teach photography, learn coding. It's that simple.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Find Perfect Matches",
      description: "Our matching system connects you with people who complement your learning goals.",
    },
  ];

  const stats = [
    { value: "100%", label: "Free Forever" },
    { value: "∞", label: "Skills to Learn" },
    { value: "24/7", label: "Access Anytime" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">No Money Needed</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
                Learn & Teach
                <br />
                <span className="text-primary">Without Money</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Exchange skills with others in your community. Teach what you know, learn what you love. 
                No fees, no subscriptions – just pure knowledge sharing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button variant="hero" className="w-full sm:w-auto group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="heroOutline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-border">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl lg:text-3xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="People exchanging skills and knowledge"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Skill Match!</p>
                    <p className="text-xs text-muted-foreground">Photography ↔ Spanish</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              SkillSwap makes it easy to exchange knowledge with others. Here's how you can get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group bg-card rounded-2xl p-8 shadow-elegant border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold mb-6">
            Ready to Start <span className="text-primary">Swapping?</span>
          </h2>
          <p className="text-lg text-background/70 max-w-xl mx-auto mb-8">
            Join our community of learners and teachers. Start sharing your skills today – completely free.
          </p>
          <Link to="/login">
            <Button variant="hero" size="xl" className="group">
              Join SkillSwap Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
