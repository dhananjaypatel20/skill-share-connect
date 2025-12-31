import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { isLoggedIn, getUser, setUser, getTeachSkills, getLearnSkills, Skill, LearnSkill } from "@/lib/storage";
import { toast } from "sonner";
import { User, Mail, BookOpen, GraduationCap, Edit2, Check, X } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUserState] = useState<{ username: string; email: string } | null>(null);
  const [teachSkills, setTeachSkills] = useState<Skill[]>([]);
  const [learnSkills, setLearnSkills] = useState<LearnSkill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    
    const userData = getUser();
    setUserState(userData);
    if (userData) {
      setFormData({
        username: userData.username,
        email: userData.email,
      });
    }
    setTeachSkills(getTeachSkills());
    setLearnSkills(getLearnSkills());
  }, [navigate]);

  const validateForm = () => {
    const newErrors = { username: "", email: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (formData.username.length > 20) {
      newErrors.username = "Username must be less than 20 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      setUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
      });
      setUserState({
        username: formData.username.trim(),
        email: formData.email.trim(),
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
    setErrors({ username: "", email: "" });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <Layout>
      <section className="py-12 lg:py-20 gradient-hero min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Profile Card */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl lg:text-3xl font-display font-bold">
                My <span className="text-primary">Profile</span>
              </h1>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
              )}
            </div>

            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-12 h-12 text-primary" />
              </div>
              
              {isEditing ? (
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className={errors.username ? 'border-destructive' : ''}
                    />
                    {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleSave} className="gap-2">
                      <Check className="w-4 h-4" /> Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-lg">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">{user.username}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                    <span>{user.email}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              <div className="text-center p-4 bg-primary/5 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-display font-bold">{teachSkills.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Skills Teaching</p>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-xl">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-display font-bold">{learnSkills.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Skills Learning</p>
              </div>
            </div>
          </div>

          {/* Skills Overview */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Teaching Skills */}
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-display font-semibold">Teaching Skills</h2>
              </div>
              
              {teachSkills.length > 0 ? (
                <div className="space-y-2">
                  {teachSkills.map((skill) => (
                    <div key={skill.id} className="p-3 bg-secondary/50 rounded-lg">
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">{skill.category} • {skill.level}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No teaching skills added yet</p>
              )}
            </div>

            {/* Learning Skills */}
            <div className="bg-card rounded-2xl p-6 shadow-elegant border border-border animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-lg font-display font-semibold">Learning Goals</h2>
              </div>
              
              {learnSkills.length > 0 ? (
                <div className="space-y-2">
                  {learnSkills.map((skill) => (
                    <div key={skill.id} className="p-3 bg-secondary/50 rounded-lg">
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">Goal: {skill.desiredLevel}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No learning goals added yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
