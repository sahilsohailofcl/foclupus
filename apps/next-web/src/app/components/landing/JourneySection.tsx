"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const ranks = [
  { name: "Cub", emoji: "🐺", levels: "1-5", description: "Begin your journey", color: "bg-muted", textColor: "text-foreground" },
  { name: "Scout", emoji: "🌟", levels: "6-15", description: "Learning the ways", color: "bg-primary/20", textColor: "text-foreground" },
  { name: "Hunter", emoji: "🎯", levels: "16-30", description: "Building focus muscles", color: "bg-primary/40", textColor: "text-foreground" },
  { name: "Guardian", emoji: "🛡️", levels: "31-50", description: "Protecting your time", color: "bg-accent/40", textColor: "text-foreground" },
  { name: "Alpha", emoji: "👑", levels: "50+", description: "Master of focus", color: "gradient-primary", textColor: "text-primary-foreground" },
];

const JourneySection: React.FC = () => (
  <section className="py-24 bg-background overflow-hidden">
    <div className="container">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary font-semibold mb-4">
          <span className="text-xl">🐺</span> Your Transformation
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Your Journey to <span className="text-gradient-primary">Peak Focus</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Watch your wolf evolve as you progress through 5 epic ranks</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {ranks.map((rank, index) => (
            <motion.div key={rank.name} initial={{ opacity: 0, y: 40, scale: 0.8 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}>
              <div className={`${rank.color} rounded-3xl p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden`}>
                <div className="text-5xl md:text-6xl mb-3">{rank.emoji}</div>
                <h3 className={`font-bold text-lg ${rank.textColor} mb-1`}>{rank.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">Level {rank.levels}</p>
                <p className={`text-xs ${rank.name === 'Alpha' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{rank.description}</p>
                {index === 4 && <div className="absolute -top-2 -right-2"><Sparkles className="w-6 h-6 text-primary-foreground"/></div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
