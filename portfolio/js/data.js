// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE to update your portfolio content.
// Anything wrapped in [ADD ...] is a placeholder you should replace.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  displayName: 'Thirumala Reddy',
  fullName: 'Thirumala Reddy Basi Reddy',
  role: 'B.Tech Student',
  tagline:
    'I am a B.Tech student passionate about software development, problem solving, full-stack web development, data structures and algorithms, and emerging technologies.',
};

export const ROLES = ['B.Tech Student', 'Aspiring Software Developer', 'DSA Practitioner', 'Full-Stack Learner'];

// Leave blank to hide fields from the public Contact section
export const contact = {
  email: '2605659@gmail.com',
  phone: '', // kept private
  location: 'Chennai, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/thirumala-reddy-833624393/',
  github: 'https://github.com/ThirumalaReddy4',
  leetcode: 'https://leetcode.com/u/thirumalareddy27/',
};

// Resume PDF lives in assets/resume.pdf
export const RESUME_URL = 'assets/resume.pdf';

export const interests = [
  'Software Development',
  'Full-Stack Web Development',
  'Data Structures & Algorithms',
  'Database Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Problem Solving',
];

export const education = [
  {
    level: 'B.Tech — School of Computing & Data Science',
    institution: 'Sai University, Chennai',
    detail: 'Currently in 2nd year',
    score: 'CGPA 8.6 (First Year)',
    year: '2025 — Present',
  },
  {
    level: 'Intermediate',
    institution: 'Sri Chaitanya, Vijayawada, Andhra Pradesh',
    detail: 'Andhra Pradesh Board',
    score: '90.8%',
    year: '',
  },
  {
    level: '10th Standard',
    institution: 'Kendriya Vidyalaya, Kadapa, Andhra Pradesh',
    detail: 'CBSE Board',
    score: '64.8%',
    year: '',
  },
];

export const skillGroups = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C', level: 'Practicing' },
      { name: 'C++', level: 'Practicing' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'Java', level: 'Learning' },
      { name: 'JavaScript', level: 'Learning' },
      { name: 'SQL', level: 'Learning' },
    ],
  },
  {
    title: 'Core Computer Science',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Practicing' },
      { name: 'Object-Oriented Programming', level: 'Practicing' },
      { name: 'Database Management', level: 'Learning' },
      { name: 'File Handling', level: 'Intermediate' },
      { name: 'Problem Solving', level: 'Practicing' },
    ],
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML', level: 'Learning' },
      { name: 'CSS', level: 'Learning' },
      { name: 'JavaScript', level: 'Learning' },
      { name: 'Full-Stack Web Development', level: 'Learning' },
    ],
  },
  {
    title: 'Python Ecosystem',
    skills: [
      { name: 'OOP', level: 'Intermediate' },
      { name: 'File Handling', level: 'Intermediate' },
      { name: 'JSON', level: 'Practicing' },
      { name: 'Modules & Packages', level: 'Practicing' },
    ],
  },
];

export const dsaTopics = [
  'Arrays', 'Searching', 'Sorting', 'Recursion', 'Stack', 'Queue',
  'Linked List', 'Trees', 'Binary Search Tree', 'Tree Traversals', 'Algorithms', 'Complexity Analysis',
];

// { name, description, technologies: [], githubUrl, liveUrl }
export const projects = [
  {
    name: 'Movie Recommendation Helper Package',
    description: 'A Python package organized into modules for movie ratings, genres, search, and package initialization.',
    technologies: ['Python', 'Modules & Packages'],
    githubUrl: '',
    liveUrl: '',
  },
  {
    name: 'JARVIS Voice Assistant',
    description: 'A Python-based voice assistant using speech recognition and text-to-speech concepts.',
    technologies: ['Python', 'Speech Recognition'],
    githubUrl: '',
    liveUrl: '',
  },
  {
    name: 'Attendance Management System',
    description: 'A beginner-friendly full-stack academic project concept covering frontend, backend, and database components.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    githubUrl: '',
    liveUrl: '',
  },
  {
    name: 'AquaPulse Product Launch Workflow',
    description: 'An academic practical using AI productivity tools to develop a fictional smart water bottle product brief, content, and launch materials.',
    technologies: ['AI Productivity Tools'],
    githubUrl: '',
    liveUrl: '',
  },
];

export const achievements = [
  { label: 'LeetCode Problems Solved', value: 46, suffix: '+' },
  { label: 'Typing Speed', value: 90, suffix: '+ WPM' },
  { label: 'Hours of Typing Practice', value: 70, suffix: '+' },
  { label: 'DSA Foundations (Trees & BST)', display: 'Completed' },
];

export const currentlyLearning = [
  'Java', 'JavaScript', 'SQL', 'Data Structures & Algorithms',
  'Full-Stack Web Development', 'Artificial Intelligence', 'Machine Learning',
];

export const orbitCards = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'dsa', label: 'DSA / Coding' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const navSections = [
  'home', 'about', 'education', 'skills', 'projects', 'dsa', 'achievements', 'resume', 'contact',
];
