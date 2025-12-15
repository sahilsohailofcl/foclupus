"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Twitter, Instagram, Github } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "#download" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const Footer: React.FC = () => (
  <footer className="bg-brown-dark py-16">
    <div className="container">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Flame className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-cream-light">
              Foclupus
            </span>
          </Link>

          <p className="text-cream/60 text-sm mb-6 max-w-xs">
            Turn screen time into growth time. Join the pack and master your
            focus with gamified productivity.
          </p>

          <div className="flex items-center gap-3">
            {[Twitter, Instagram, Github].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center text-cream/60 hover:text-cream hover:bg-cream/20 transition-colors"
                aria-label="Social link"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-bold text-cream-light mb-4">Product</h4>
          <ul className="space-y-2">
            {footerLinks.product.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-cream-light mb-4">Company</h4>
          <ul className="space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold text-cream-light mb-4">Legal</h4>
          <ul className="space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-cream/10 pt-8 text-center">
        <p className="text-cream/40 text-sm">
          © 2025 Foclupus. Made with ❤️ for focused wolves everywhere. 🐺
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
