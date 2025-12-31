// Utility functions for localStorage operations

export interface User {
  username: string;
  email: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  createdAt: string;
}

export interface LearnSkill {
  id: string;
  name: string;
  desiredLevel: string;
  createdAt: string;
}

// User functions
export const getUser = (): User | null => {
  const user = localStorage.getItem('skillswap_user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: User): void => {
  localStorage.setItem('skillswap_user', JSON.stringify(user));
};

export const clearUser = (): void => {
  localStorage.removeItem('skillswap_user');
};

export const isLoggedIn = (): boolean => {
  return getUser() !== null;
};

// Teach Skills functions
export const getTeachSkills = (): Skill[] => {
  const skills = localStorage.getItem('skillswap_teach_skills');
  return skills ? JSON.parse(skills) : [];
};

export const addTeachSkill = (skill: Omit<Skill, 'id' | 'createdAt'>): Skill => {
  const skills = getTeachSkills();
  const newSkill: Skill = {
    ...skill,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  skills.push(newSkill);
  localStorage.setItem('skillswap_teach_skills', JSON.stringify(skills));
  return newSkill;
};

export const updateTeachSkill = (id: string, updates: Partial<Skill>): void => {
  const skills = getTeachSkills();
  const index = skills.findIndex(s => s.id === id);
  if (index !== -1) {
    skills[index] = { ...skills[index], ...updates };
    localStorage.setItem('skillswap_teach_skills', JSON.stringify(skills));
  }
};

export const deleteTeachSkill = (id: string): void => {
  const skills = getTeachSkills().filter(s => s.id !== id);
  localStorage.setItem('skillswap_teach_skills', JSON.stringify(skills));
};

// Learn Skills functions
export const getLearnSkills = (): LearnSkill[] => {
  const skills = localStorage.getItem('skillswap_learn_skills');
  return skills ? JSON.parse(skills) : [];
};

export const addLearnSkill = (skill: Omit<LearnSkill, 'id' | 'createdAt'>): LearnSkill => {
  const skills = getLearnSkills();
  const newSkill: LearnSkill = {
    ...skill,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  skills.push(newSkill);
  localStorage.setItem('skillswap_learn_skills', JSON.stringify(skills));
  return newSkill;
};

export const updateLearnSkill = (id: string, updates: Partial<LearnSkill>): void => {
  const skills = getLearnSkills();
  const index = skills.findIndex(s => s.id === id);
  if (index !== -1) {
    skills[index] = { ...skills[index], ...updates };
    localStorage.setItem('skillswap_learn_skills', JSON.stringify(skills));
  }
};

export const deleteLearnSkill = (id: string): void => {
  const skills = getLearnSkills().filter(s => s.id !== id);
  localStorage.setItem('skillswap_learn_skills', JSON.stringify(skills));
};

// Skill categories
export const skillCategories = [
  'Programming',
  'Design',
  'Music',
  'Languages',
  'Sports',
  'Cooking',
  'Photography',
  'Writing',
  'Business',
  'Art',
  'Other',
];

// Experience levels
export const experienceLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];
