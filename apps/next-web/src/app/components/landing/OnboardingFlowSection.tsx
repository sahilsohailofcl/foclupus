"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCircle, Target, LayoutDashboard, TrendingUp, BarChart3 } from "lucide-react";

const steps = [
  { icon: UserCircle, step: 1, title: "Create Your Wolf", description: "Sign up and pick your wolf name. Set your focus goals.", emoji: "🐺" },
  { icon: Target, step: 2, title: "Choose Your Path", description: "Select Focus, Detox, Mindfulness, or tackle all three!", emoji: "🎯" },
  { icon: LayoutDashboard, step: 3, title: "Complete Daily Activities", description: "Focus sessions, lessons, habits, and challenges await.", emoji: "📋" },
  { icon: TrendingUp, step: 4, title: "Earn XP & Level Up", description: "Watch your wolf evolve from Cub to Alpha.", emoji: "⬆️" },
  { icon: BarChart3, step: 5, title: "Track Your Progress", description: "See your transformation with detailed analytics.", emoji: "📊" },
];

const OnboardingFlowSection: React.FC = () => (
  <section className="py-24 bg-cream overflow-hidden">
    <div className="container">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary font-semibold mb-4">🗺️ Your Adventure</div>
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">How Your Journey <span className="text-gradient-primary">Unfolds</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">From signup to Alpha—here's your path to peak focus</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-2">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                <div className="md:text-center flex-1">
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default OnboardingFlowSection;
