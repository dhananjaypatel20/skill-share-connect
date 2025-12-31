import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { isLoggedIn, getTeachSkills, addTeachSkill, updateTeachSkill, deleteTeachSkill, skillCategories, experienceLevels, Skill } from "@/lib/storage";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, BookOpen, X, Check } from "lucide-react";

const Teach = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    loadSkills();
  }, [navigate]);

  const loadSkills = () => {
    setSkills(getTeachSkills());
  };

  const resetForm = () => {
    setFormData({ name: "", category: "", level: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category || !formData.level) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.name.length > 50) {
      toast.error("Skill name must be less than 50 characters");
      return;
    }

    if (editingId) {
      updateTeachSkill(editingId, formData);
      toast.success("Skill updated successfully!");
    } else {
      addTeachSkill(formData);
      toast.success("Skill added successfully!");
    }

    loadSkills();
    resetForm();
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    });
    setEditingId(skill.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteTeachSkill(id);
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
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold">
                  Skills I <span className="text-primary">Teach</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Share your expertise with others in the community
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
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Skill Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Python Programming"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={50}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">Experience Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData({ ...formData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
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
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {skill.category} • {skill.level}
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
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">No skills added yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by adding a skill you can teach to others
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Add Your First Skill
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Teach;
