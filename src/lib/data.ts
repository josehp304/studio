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
};

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

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
  },
];
