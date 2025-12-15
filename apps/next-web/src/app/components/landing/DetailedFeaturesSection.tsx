"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timer, Brain, Repeat, Target, Heart, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const features = [
  { icon: Timer, title: "Focus Mode", subtitle: "Build Deep Work Habits", description: "Choose from 15, 25, 45, or 60-minute focus sessions ...", highlights: ["Customizable durations", "Pomodoro technique", "XP rewards per session", "Focus history tracking"], gradient: "from-primary to-primary/80", image: "🎯" },
  { icon: Brain, title: "Dopamine Detox Path", subtitle: "Rewire Your Brain", description: "12+ science-backed lessons ...", highlights: ["12+ interactive lessons", "Science-backed content", "Progressive curriculum", "Practical exercises"], gradient: "from-accent to-accent/80", image: "🧠" },
  { icon: Repeat, title: "Habit Builder", subtitle: "Track What Matters", description: "Track habits across 6 categories ...", highlights: ["6 habit categories", "Streak tracking", "Daily reminders", "Visual progress"], gradient: "from-orange-glow to-primary", image: "📊" },
  { icon: Target, title: "Daily Challenges", subtitle: "Stay Motivated", description: "Fresh challenges every day ...", highlights: ["Auto-reset daily", "Bonus XP rewards", "Achievement unlocks", "Difficulty levels"], gradient: "from-purple-glow to-accent", image: "🏆" },
  { icon: Heart, title: "Mindfulness Tools", subtitle: "Find Your Calm", description: "Guided breathing exercises ...", highlights: ["Breathing exercises", "Mood tracking", "Guided meditations", "Stress relief tools"], gradient: "from-primary to-accent", image: "🧘" },
  { icon: BarChart3, title: "Progress & Analytics", subtitle: "See Your Growth", description: "Visualize your transformation ...", highlights: ["Screen time saved", "XP analytics", "Streak history", "Focus improvements"], gradient: "from-accent to-purple-glow", image: "📈" },
];

const FeatureBlock = ({ feature, index }: any) => {
  const Icon = feature.icon;
  const isEven = index % 2 === 0;
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
      <div className="flex-1 w-full">
        <div className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="text-center relative z-10">
            <span className="text-8xl md:text-9xl">{feature.image}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div>
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            <Icon className="w-4 h-4" />
            {feature.subtitle}
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">{feature.title}</h3>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">{feature.description}</p>

          <ul className="space-y-3 mb-6">
            {feature.highlights.map((highlight: string, i: number) => (
              <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3 text-foreground">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><span className="text-primary text-sm">✓</span></span>
                {highlight}
              </motion.li>
            ))}
          </ul>

          <Button variant="ghost" className="text-primary hover:text-primary/80 group p-0">Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button>
        </div>
      </div>
    </motion.div>
  );
};

const DetailedFeaturesSection: React.FC = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Explore Every <span className="text-gradient-primary">Feature</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Dive deep into what makes Foclupus the ultimate focus companion</p>
      </div>

      <div className="space-y-24 md:space-y-32">
        {features.map((f, i) => <FeatureBlock key={f.title} feature={f} index={i} />)}
      </div>
    </div>
  </section>
);

export default DetailedFeaturesSection;
