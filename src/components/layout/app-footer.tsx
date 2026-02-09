import React from 'react';
import Link from 'next/link';
import { Logo } from '../icons/logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', 'aria-label': 'Facebook' },
  { icon: Twitter, href: '#', 'aria-label': 'Twitter' },
  { icon: Instagram, href: '#', 'aria-label': 'Instagram' },
  { icon: Linkedin, href: '#', 'aria-label': 'LinkedIn' },
];

const instructorLinks = [
  'Profile',
  'Login',
  'Register',
  'Instructor',
  'Dashboard',
];
const studentLinks = [
  'Profile',
  'Login',
  'Register',
  'Student',
  'Dashboard',
];

export function AppFooter() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div className="space-y-4 xl:col-span-2">
            <Logo />
            <p className="text-primary-foreground/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris
              quis nulla cillum, in wrinki dictum.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} aria-label={social['aria-label']}>
                  <Button variant="outline" size="icon" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10">
                    <social.icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">For Instructor</h3>
            <ul className="space-y-2">
              {instructorLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">For Student</h3>
            <ul className="space-y-2">
              {studentLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Subscribe</h3>
            <p className="text-primary-foreground/80">
              Send us a newsletter to get update
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-primary-foreground/10 text-white placeholder:text-primary-foreground/50 rounded-r-none border-none focus-visible:ring-1 focus-visible:ring-accent"
              />
              <Button type="submit" className="rounded-l-none bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 py-6 text-center text-primary-foreground/60 md:flex md:justify-between md:text-left">
          <p>&copy; 2024 DreamsLMS. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4 md:mt-0">
            <Link href="#">Terms & Condition</Link>
            <span className="opacity-50">|</span>
            <Link href="#">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
