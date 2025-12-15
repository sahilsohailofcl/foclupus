"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles, CreditCard, ChevronDown, Apple, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const WolfMascot: React.FC = () => (
  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div className="absolute inset-0 rounded-full gradient-primary flex items-center justify-center shadow-xl glow-orange">
        <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} className="text-8xl md:text-9xl">🐺</motion.span>
      </div>
      <div className="absolute -top-2 -right-2 bg-card border-2 border-primary rounded-xl px-4 py-2 shadow-lg">
        <span className="text-xl font-black text-foreground">+25 XP</span>
      </div>
    </div>
  </motion.div>
);

const TrustBadge = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: number }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="flex items-center gap-2 text-muted-foreground text-sm">
    <Icon className="w-4 h-4 text-primary" />
    <span>{text}</span>
  </motion.div>
);

const ScrollIndicator: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-2 cursor-pointer">
      <span className="text-sm text-muted-foreground">Scroll to explore</span>
      <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
    </motion.div>
  </motion.div>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen gradient-hero pt-24 pb-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary font-semibold mb-6">
              <span className="text-xl">🐺</span>
              The Focused Wolf
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
              Master Focus. <span className="text-gradient-primary">Defeat Distractions.</span><br className="hidden md:block" /> Become the Alpha.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of wolves on a gamified journey to break free from screen addiction, build laser focus, and level up your life—one session at a time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <Link
              href="/onboarding"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Button variant="hero" size="lg" className="text-lg px-8">Start Your Journey <ArrowRight className="w-5 h-5" /></Button>
              </Link>
              <Button variant="hero-outline" size="lg" className="text-lg px-8">Try Free</Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <Button variant="outline" size="sm" className="gap-2"><Apple className="w-4 h-4" /> iOS App</Button>
              <Button variant="outline" size="sm" className="gap-2"><Smartphone className="w-4 h-4" /> Android App</Button>
              <span className="text-xs text-muted-foreground px-2">or</span>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Add to Home Screen (PWA)</Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
              <TrustBadge icon={Users} text="Join the pack" delay={0.6} />
              <span className="text-border hidden sm:block">•</span>
              <TrustBadge icon={Sparkles} text="Free to start" delay={0.7} />
              <span className="text-border hidden sm:block">•</span>
              <TrustBadge icon={CreditCard} text="No credit card" delay={0.8} />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <WolfMascot />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
