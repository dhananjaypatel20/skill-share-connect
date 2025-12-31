import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, Target, Heart, Lightbulb, Users, Coins, GraduationCap } from "lucide-react";

const About = () => {
  const problems = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Expensive Learning",
      description: "Quality courses and tutors often cost hundreds or thousands of dollars.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Limited Access",
      description: "Not everyone has access to expert teachers in their area.",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Unused Skills",
      description: "Many talented people have skills they could share but don't know how.",
    },
  ];

  const objectives = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Democratize Learning",
      description: "Make skill-sharing accessible to everyone regardless of financial status.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Build Community",
      description: "Create meaningful connections between learners and teachers.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Encourage Growth",
      description: "Inspire continuous learning and personal development for all.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-6">
              About <span className="text-primary">SkillSwap</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              We believe that knowledge should be accessible to everyone. SkillSwap is a platform 
              where people can exchange skills without money – you teach what you know and learn 
              what you want.
            </p>
          </div>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
                The Skill Exchange <span className="text-primary">Concept</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Imagine a world where learning doesn't cost money. Where a photographer can 
                  teach photography to a programmer who, in return, teaches them how to code. 
                  That's the vision behind SkillSwap.
                </p>
                <p>
                  Our platform connects people with complementary skills. You list what you 
                  can teach and what you want to learn. We find matches and facilitate the 
                  exchange. It's that simple.
                </p>
                <p>
                  No subscriptions, no fees, no barriers. Just pure knowledge exchange between 
                  people who want to grow together.
                </p>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/20">
                <blockquote className="text-xl lg:text-2xl font-display italic text-foreground">
                  "The best way to learn is to teach. The best way to grow is to share."
                </blockquote>
                <p className="mt-4 text-muted-foreground">— SkillSwap Philosophy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              The Problem We're <span className="text-primary">Solving</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Traditional learning comes with barriers that prevent many from reaching their potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div 
                key={problem.title}
                className="bg-card rounded-2xl p-8 shadow-elegant border border-border animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-6">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Our <span className="text-primary">Objectives</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We're on a mission to transform how people learn and share knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div 
                key={objective.title}
                className="group bg-primary/5 rounded-2xl p-8 border border-primary/20 hover:bg-primary hover:border-primary transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground transition-all duration-300">
                  {objective.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary-foreground transition-colors">{objective.title}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-primary-foreground/80 transition-colors">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Join the <span className="text-primary">Movement</span>
          </h2>
          <p className="text-lg text-background/70 max-w-xl mx-auto mb-8">
            Be part of a community that believes in free knowledge exchange. Start your skill-swapping journey today.
          </p>
          <Link to="/login">
            <Button variant="hero" size="xl" className="group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
