import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { isLoggedIn, getTeachSkills, getLearnSkills, Skill, LearnSkill } from "@/lib/storage";
import { Repeat, BookOpen, GraduationCap, ArrowRight, Sparkles, Plus } from "lucide-react";

interface Match {
  teachSkill: Skill;
  learnSkill: LearnSkill;
  matchScore: number;
}

const Matching = () => {
  const navigate = useNavigate();
  const [teachSkills, setTeachSkills] = useState<Skill[]>([]);
  const [learnSkills, setLearnSkills] = useState<LearnSkill[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    
    const teach = getTeachSkills();
    const learn = getLearnSkills();
    setTeachSkills(teach);
    setLearnSkills(learn);
    
    // Generate matches based on similar skill names
    const generatedMatches: Match[] = [];
    
    teach.forEach((teachSkill) => {
      learn.forEach((learnSkill) => {
        const teachWords = teachSkill.name.toLowerCase().split(/\s+/);
        const learnWords = learnSkill.name.toLowerCase().split(/\s+/);
        
        // Check for matching words
        const commonWords = teachWords.filter(word => 
          learnWords.some(lw => lw.includes(word) || word.includes(lw))
        );
        
        if (commonWords.length > 0) {
          const score = Math.round((commonWords.length / Math.max(teachWords.length, learnWords.length)) * 100);
          generatedMatches.push({
            teachSkill,
            learnSkill,
            matchScore: Math.min(score + 50, 100),
          });
        }
      });
    });
    
    // Sort by match score
    generatedMatches.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(generatedMatches);
  }, [navigate]);

  const hasSkills = teachSkills.length > 0 || learnSkills.length > 0;

  return (
    <Layout>
      <section className="py-12 lg:py-20 gradient-hero min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Repeat className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold">
                Skill <span className="text-primary">Matches</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              Discover how your teaching and learning skills connect
            </p>
          </div>

          {/* Skills Summary */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 shadow-elegant border border-border animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{teachSkills.length}</p>
                  <p className="text-sm text-muted-foreground">Skills to Teach</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-elegant border border-border animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{learnSkills.length}</p>
                  <p className="text-sm text-muted-foreground">Skills to Learn</p>
                </div>
              </div>
            </div>
          </div>

          {/* Matches */}
          {matches.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-display font-semibold">Found {matches.length} Potential Match{matches.length !== 1 ? 'es' : ''}</h2>
              </div>
              
              <div className="grid gap-4">
                {matches.map((match, index) => (
                  <div
                    key={`${match.teachSkill.id}-${match.learnSkill.id}`}
                    className="bg-card rounded-2xl p-6 shadow-elegant border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${(index + 2) * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                        <Sparkles className="w-3 h-3" />
                        {match.matchScore}% Match
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Teach Skill */}
                      <div className="flex-1 bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-primary uppercase">You Teach</span>
                        </div>
                        <p className="font-semibold">{match.teachSkill.name}</p>
                        <p className="text-sm text-muted-foreground">{match.teachSkill.level}</p>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shrink-0">
                        <Repeat className="w-5 h-5" />
                      </div>
                      
                      {/* Learn Skill */}
                      <div className="flex-1 bg-accent/5 rounded-xl p-4 border border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="w-4 h-4 text-accent" />
                          <span className="text-xs font-medium text-accent uppercase">You Learn</span>
                        </div>
                        <p className="font-semibold">{match.learnSkill.name}</p>
                        <p className="text-sm text-muted-foreground">Goal: {match.learnSkill.desiredLevel}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : hasSkills ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <Repeat className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">No matches found yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Add more skills to teach and learn to find potential skill exchange opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/teach">
                  <Button variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Teaching Skill
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add Learning Goal
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <Repeat className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Start by adding skills</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Add skills you can teach and skills you want to learn to discover matches
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/teach">
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="w-4 h-4" /> Add Teaching Skill
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button className="gap-2">
                    <GraduationCap className="w-4 h-4" /> Add Learning Goal
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Matching;
