import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { getUser, getTeachSkills, getLearnSkills, isLoggedIn, Skill, LearnSkill } from "@/lib/storage";
import { BookOpen, GraduationCap, Repeat, ArrowRight, Plus, Sparkles } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [teachSkills, setTeachSkills] = useState<Skill[]>([]);
  const [learnSkills, setLearnSkills] = useState<LearnSkill[]>([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    setUser(getUser());
    setTeachSkills(getTeachSkills());
    setLearnSkills(getLearnSkills());
  }, [navigate]);

  const quickActions = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Add Skill to Teach",
      description: "Share your expertise with others",
      link: "/teach",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Add Skill to Learn",
      description: "Find what you want to master",
      link: "/learn",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: <Repeat className="w-6 h-6" />,
      title: "View Matches",
      description: "Discover skill exchange opportunities",
      link: "/matching",
      color: "bg-primary/10 text-primary",
    },
  ];

  if (!user) return null;

  return (
    <Layout>
      <section className="py-12 lg:py-20 gradient-hero min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Dashboard</span>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold mb-2">
              Welcome back, <span className="text-primary">{user.username}</span>!
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to swap some skills today?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                to={action.link}
                className="group bg-card rounded-2xl p-6 shadow-elegant border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <ArrowRight className="w-5 h-5 text-muted-foreground mt-4 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Skills Overview */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Teaching Skills */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">Skills I Teach</h2>
                </div>
                <Link to="/teach">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </Link>
              </div>
              
              {teachSkills.length > 0 ? (
                <div className="space-y-3">
                  {teachSkills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">{skill.category} • {skill.level}</p>
                      </div>
                    </div>
                  ))}
                  {teachSkills.length > 4 && (
                    <Link to="/teach" className="block text-center text-sm text-primary hover:underline mt-4">
                      View all {teachSkills.length} skills
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No teaching skills added yet</p>
                  <Link to="/teach">
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" /> Add Your First Skill
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Learning Skills */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-display font-semibold">Skills I Want to Learn</h2>
                </div>
                <Link to="/learn">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </Link>
              </div>
              
              {learnSkills.length > 0 ? (
                <div className="space-y-3">
                  {learnSkills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-muted-foreground">Desired: {skill.desiredLevel}</p>
                      </div>
                    </div>
                  ))}
                  {learnSkills.length > 4 && (
                    <Link to="/learn" className="block text-center text-sm text-primary hover:underline mt-4">
                      View all {learnSkills.length} skills
                    </Link>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No learning goals added yet</p>
                  <Link to="/learn">
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" /> Add Your First Goal
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
