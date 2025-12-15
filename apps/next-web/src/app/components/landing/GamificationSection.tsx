"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star, Award, Zap, Trophy, Sparkles } from "lucide-react";

const ConfettiPiece = ({ delay }: { delay: number }) => {
  const colors = ["bg-primary", "bg-accent", "bg-orange-glow", "bg-purple-glow"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomX = Math.random() * 100;
  return (
    <motion.div initial={{ y: -20, x: randomX, opacity: 1 }} animate={{ y: 200, opacity: 0, x: randomX + (Math.random() - 0.5) * 100 }} transition={{ duration: 2, delay }} className={`absolute w-2 h-2 ${randomColor} rounded-sm`} style={{ left: `${randomX}%` }} />
  );
};

const LevelUpCard: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden">
      {showConfetti && <div className="absolute inset-0 pointer-events-none">{[...Array(20)].map((_, i) => <ConfettiPiece key={i} delay={i * 0.05} />)}</div>}
      <div className="glass-card rounded-3xl p-8 text-center relative">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary glow-orange mb-4">
          <Trophy className="w-12 h-12 text-primary-foreground" />
        </div>
        <div className="mb-2"><Sparkles className="w-8 h-8 text-primary mx-auto mb-2" /></div>
        <h3 className="text-2xl font-black text-foreground mb-2">Level Up!</h3>
        <p className="text-4xl font-black text-gradient-primary mb-2">Level 23</p>
        <p className="text-muted-foreground">+500 XP Bonus Earned!</p>
      </div>
    </motion.div>
  );
};

const GamificationSection: React.FC = () => {
  const stats = [
    { icon: Zap, label: "XP Points", value: "2,450", color: "text-primary" },
    { icon: Flame, label: "Day Streak", value: "7", emoji: "🔥", color: "text-orange-glow" },
    { icon: Star, label: "Challenges", value: "12/15", color: "text-accent" },
    { icon: Award, label: "Badges", value: "8", color: "text-purple-glow" },
  ];

  return (
    <section className="py-24 bg-cream-dark overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full text-sm text-accent font-semibold mb-4">Rewards & Achievements</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Level Up & <span className="text-gradient-accent">Earn Rewards</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Every session brings you closer to becoming the Alpha of your life</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.9, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className="glass-card rounded-2xl p-5 text-center cursor-pointer">
                    <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-black text-foreground">{stat.value} {stat.emoji}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold text-foreground mb-4">Recent Achievements</h4>
              <div className="flex flex-wrap gap-3">
                {["🏃 First Session", "🔥 7 Day Streak", "📚 Detox Complete", "🎯 Challenge Master"].map((badge, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} whileHover={{ scale: 1.1 }} className="bg-primary/10 text-foreground text-sm font-medium px-4 py-2 rounded-full">
                    {badge}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <LevelUpCard />
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
