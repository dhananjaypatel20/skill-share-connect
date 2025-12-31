import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { isLoggedIn, getLearnSkills, addLearnSkill, updateLearnSkill, deleteLearnSkill, experienceLevels, LearnSkill } from "@/lib/storage";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, GraduationCap, X, Check } from "lucide-react";

const Learn = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<LearnSkill[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    desiredLevel: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    loadSkills();
  }, [navigate]);

  const loadSkills = () => {
    setSkills(getLearnSkills());
  };

  const resetForm = () => {
    setFormData({ name: "", desiredLevel: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.desiredLevel) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.name.length > 50) {
      toast.error("Skill name must be less than 50 characters");
      return;
    }

    if (editingId) {
      updateLearnSkill(editingId, formData);
      toast.success("Skill updated successfully!");
    } else {
      addLearnSkill(formData);
      toast.success("Skill added successfully!");
    }

    loadSkills();
    resetForm();
  };

  const handleEdit = (skill: LearnSkill) => {
    setFormData({
      name: skill.name,
      desiredLevel: skill.desiredLevel,
    });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteLearnSkill(id);
    loadSkills();
    toast.success("Skill deleted successfully!");
  };

  return (
    <Layout>
      <section className="py-12 lg:py-20 gradient-hero min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-slide-up">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold">
                  Skills I Want to <span className="text-primary">Learn</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Discover what you want to master next
              </p>
            </div>
            
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Add Skill
              </Button>
            )}
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-elegant border border-border mb-8 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">
                  {editingId ? "Edit Skill" : "Add New Skill"}
                </h2>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Skill Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Guitar Playing"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={50}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">Desired Level</Label>
                    <Select
                      value={formData.desiredLevel}
                      onValueChange={(value) => setFormData({ ...formData, desiredLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select desired level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Check className="w-4 h-4" />
                    {editingId ? "Update Skill" : "Add Skill"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Skills List */}
          {skills.length > 0 ? (
            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="bg-card rounded-xl p-5 shadow-elegant border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Desired Level: {skill.desiredLevel}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">No learning goals yet</h3>
              <p className="text-muted-foreground mb-6">
                Add skills you want to learn from others
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Add Your First Goal
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Learn;
