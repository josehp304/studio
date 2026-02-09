
import { PlaceHolderImages } from './placeholder-images';

export type Instructor = {
  name: string;
  avatarUrl: string;
};

export type Course = {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  instructor: Instructor;
  rating: number;
  reviewCount: number;
  studentCount: number;
  lessons: number;
  duration: string;
  curriculum: {
    section: string;
    lessons: { title: string; duration: string; isPreview: boolean }[];
  }[];
};

export type FeaturedInstructor = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  isVerified: boolean;
};

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const featuredInstructors: FeaturedInstructor[] = [
  {
    id: '1',
    name: 'Joyce Pence',
    role: 'Lead Designer',
    avatarUrl: getImage('instructor-1'),
    rating: 4.8,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Edith Dorsey',
    role: 'Accountant',
    avatarUrl: getImage('instructor-2'),
    rating: 5.0,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Ruben Holmes',
    role: 'Architect',
    avatarUrl: getImage('instructor-3'),
    rating: 4.8,
    isVerified: true,
  },
  {
    id: '4',
    name: 'Carol Magner',
    role: 'Lead Designer',
    avatarUrl: getImage('instructor-5'),
    rating: 4.5,
    isVerified: true,
  },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Information About UI/UX Design Degree',
    category: 'Development',
    price: 300,
    originalPrice: 99.99,
    imageUrl: getImage('course-1'),
    instructor: { name: 'Nicole Brown', avatarUrl: getImage('instructor-1') },
    rating: 4.5,
    reviewCount: 20,
    studentCount: 50,
    lessons: 12,
    duration: '10hr 30min',
    curriculum: [
      { section: 'Introduction to UI/UX', lessons: [{ title: 'What is UI/UX Design?', duration: '15min', isPreview: true }, { title: 'The Design Process', duration: '30min', isPreview: false }] },
      { section: 'User Research', lessons: [{ title: 'Conducting User Interviews', duration: '45min', isPreview: false }, { title: 'Creating User Personas', duration: '40min', isPreview: false }] },
      { section: 'Wireframing & Prototyping', lessons: [{ title: 'Low-Fidelity Wireframes', duration: '50min', isPreview: false }, { title: 'High-Fidelity Prototypes with Figma', duration: '1hr 30min', isPreview: false }] },
    ],
  },
  {
    id: '2',
    title: 'Wordpress for Beginners - Master Wordpress Quickly',
    category: 'Development',
    price: 250,
    originalPrice: 80,
    imageUrl: getImage('course-2'),
    instructor: { name: 'John Smith', avatarUrl: getImage('instructor-2') },
    rating: 4.8,
    reviewCount: 45,
    studentCount: 120,
    lessons: 20,
    duration: '15hr 00min',
    curriculum: [
        { section: 'Getting Started with WordPress', lessons: [{ title: 'Installation and Setup', duration: '20min', isPreview: true }, { title: 'Exploring the Dashboard', duration: '25min', isPreview: false }] },
        { section: 'Themes and Plugins', lessons: [{ title: 'Choosing and Installing Themes', duration: '35min', isPreview: false }, { title: 'Essential Plugins for Every Site', duration: '50min', isPreview: false }] },
        { section: 'Content Creation', lessons: [{ title: 'Creating Posts and Pages', duration: '45min', isPreview: false }, { title: 'Working with the Block Editor', duration: '1hr', isPreview: false }] },
    ],
  },
  {
    id: '3',
    title: 'Sketch from A to Z (2024): Become an app designer',
    category: 'Design',
    price: 400,
    imageUrl: getImage('course-3'),
    instructor: { name: 'Emily White', avatarUrl: getImage('instructor-3') },
    rating: 4.9,
    reviewCount: 150,
    studentCount: 300,
    lessons: 35,
    duration: '25hr 10min',
     curriculum: [
      { section: 'Sketch Fundamentals', lessons: [{ title: 'Introduction to the Sketch Interface', duration: '30min', isPreview: true }, { title: 'Basic Shapes and Vector Tools', duration: '1hr', isPreview: false }] },
      { section: 'Advanced Techniques', lessons: [{ title: 'Working with Symbols', duration: '1hr 15min', isPreview: false }, { title: 'Prototyping and Animations', duration: '2hr', isPreview: false }] },
      { section: 'Designing a Real App', lessons: [{ title: 'Project Brief and Research', duration: '45min', isPreview: false }, { title: 'Designing the UI Screens', duration: '3hr', isPreview: false }] },
    ],
  },
  {
    id: '4',
    title: 'Learn Angular Fundamentals From beginning to advance',
    category: 'Development',
    price: 150,
    imageUrl: getImage('course-4'),
    instructor: { name: 'David Lee', avatarUrl: getImage('instructor-4') },
    rating: 4.2,
    reviewCount: 30,
    studentCount: 80,
    lessons: 18,
    duration: '12hr 30min',
     curriculum: [
      { section: 'Angular Basics', lessons: [{ title: 'What is Angular?', duration: '15min', isPreview: true }, { title: 'Components and Modules', duration: '1hr', isPreview: false }] },
      { section: 'Routing and Navigation', lessons: [{ title: 'Setting up Routes', duration: '45min', isPreview: false }, { title: 'Route Parameters', duration: '30min', isPreview: false }] },
      { section: 'Forms and Services', lessons: [{ title: 'Template-Driven Forms', duration: '1hr', isPreview: false }, { title: 'Creating a Data Service', duration: '1hr', isPreview: false }] },
    ],
  },
  {
    id: '5',
    title: 'Build Responsive Real-World Websites with HTML5 and CSS3',
    category: 'Development',
    price: 500,
    originalPrice: 120.50,
    imageUrl: getImage('course-5'),
    instructor: { name: 'Anna Taylor', avatarUrl: getImage('instructor-5') },
    rating: 5.0,
    reviewCount: 250,
    studentCount: 500,
    lessons: 40,
    duration: '30hr 00min',
     curriculum: [
      { section: 'HTML5 Deep Dive', lessons: [{ title: 'Semantic HTML', duration: '1hr', isPreview: true }, { title: 'Forms and Input Types', duration: '1hr 30min', isPreview: false }] },
      { section: 'CSS3 Mastery', lessons: [{ title: 'Flexbox and Grid', duration: '2hr', isPreview: false }, { title: 'Animations and Transitions', duration: '1hr 45min', isPreview: false }] },
      { section: 'Responsive Design', lessons: [{ title: 'Media Queries', duration: '1hr 15min', isPreview: false }, { title: 'Mobile-First Approach', duration: '1hr', isPreview: false }] },
    ],
  },
  {
    id: '6',
    title: 'C# Unity Game Developer 2D',
    category: 'IT & Software',
    price: 280,
    imageUrl: getImage('course-6'),
    instructor: { name: 'Chris Martin', avatarUrl: getImage('instructor-6') },
    rating: 4.7,
    reviewCount: 90,
    studentCount: 220,
    lessons: 30,
    duration: '22hr 45min',
     curriculum: [
      { section: 'Unity and C# Basics', lessons: [{ title: 'Setting up Unity', duration: '30min', isPreview: true }, { title: 'C# Scripting Fundamentals', duration: '1hr 30min', isPreview: false }] },
      { section: 'Building 2D Games', lessons: [{ title: 'Player Movement', duration: '1hr', isPreview: false }, { title: 'Physics and Collisions', duration: '1hr 15min', isPreview: false }] },
      { section: 'Advanced Game Features', lessons: [{ title: 'Creating Enemies', duration: '2hr', isPreview: false }, { title: 'UI and Game Managers', duration: '1hr 45min', isPreview: false }] },
    ],
  },
  {
    id: '7',
    title: 'The Complete Web Developer Course 2.0',
    category: 'Development',
    price: 320,
    imageUrl: getImage('course-7'),
    instructor: { name: 'John Smith', avatarUrl: getImage('instructor-2') },
    rating: 4.6,
    reviewCount: 110,
    studentCount: 280,
    lessons: 28,
    duration: '20hr 15min',
     curriculum: [
      { section: 'Frontend Development', lessons: [{ title: 'HTML, CSS, and JavaScript', duration: '5hr', isPreview: true }, { title: 'React for Beginners', duration: '4hr', isPreview: false }] },
      { section: 'Backend Development', lessons: [{ title: 'Node.js and Express', duration: '5hr', isPreview: false }, { title: 'Databases with MongoDB', duration: '4hr', isPreview: false }] },
      { section: 'Full-Stack Project', lessons: [{ title: 'Building a Blog', duration: '2hr 15min', isPreview: false }] },
    ],
  },
    {
    id: '8',
    title: 'The Ultimate Drawing Course - Beginner to Advanced',
    category: 'Art & Design',
    price: 180,
    originalPrice: 45,
    imageUrl: getImage('course-8'),
    instructor: { name: 'Emily White', avatarUrl: getImage('instructor-3') },
    rating: 4.9,
    reviewCount: 300,
    studentCount: 1050,
    lessons: 50,
    duration: '40hr 00min',
     curriculum: [
      { section: 'Drawing Fundamentals', lessons: [{ title: 'Lines, Shapes, and Forms', duration: '2hr', isPreview: true }, { title: 'Perspective and Composition', duration: '3hr', isPreview: false }] },
      { section: 'Figure Drawing', lessons: [{ title: 'Anatomy for Artists', duration: '5hr', isPreview: false }, { title: 'Poses and Gestures', duration: '4hr', isPreview: false }] },
      { section: 'Advanced Techniques', lessons: [{ title: 'Shading and Lighting', duration: '5hr', isPreview: false }, { title: 'Digital Painting', duration: '6hr', isPreview: false }] },
    ],
  },
  {
    id: '9',
    title: 'Photography Masterclass: A Complete Guide to Photography',
    category: 'Photography',
    price: 220,
    imageUrl: getImage('course-9'),
    instructor: { name: 'Anna Taylor', avatarUrl: getImage('instructor-5') },
    rating: 4.8,
    reviewCount: 180,
    studentCount: 750,
    lessons: 25,
    duration: '18hr 20min',
     curriculum: [
      { section: 'Camera Basics', lessons: [{ title: 'Understanding Exposure', duration: '1hr', isPreview: true }, { title: 'Aperture, Shutter Speed, and ISO', duration: '1hr 30min', isPreview: false }] },
      { section: 'Composition Techniques', lessons: [{ title: 'Rule of Thirds', duration: '1hr', isPreview: false }, { title: 'Leading Lines and Framing', duration: '1hr 15min', isPreview: false }] },
      { section: 'Editing and Post-Processing', lessons: [{ title: 'Introduction to Lightroom', duration: '2hr', isPreview: false }, { title: 'Advanced Photoshop Techniques', duration: '3hr', isPreview: false }] },
    ],
  },
];
