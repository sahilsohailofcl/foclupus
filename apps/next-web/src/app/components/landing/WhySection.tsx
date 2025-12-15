"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const benefits = [
  "Reduce screen time by 50% on average",
  "Build focus muscles with proven techniques",
  "Join a pack of focused wolves",
  "Track your transformation in real-time",
  "Unlock achievements and rewards",
  "Science-backed dopamine detox methods",
];

const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref as any} className="text-5xl md:text-6xl font-black text-cream-light">{count}{suffix}</span>;
};

const WhySection: React.FC = () => (
  <section className="py-20 bg-cream-dark">
    <div className="container">
      <div className="gradient-stats rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-cream-light mb-4">Why Wolves Choose Foclupus</h2>
            <p className="text-cream/80 mb-8">Join thousands of focused individuals who've transformed their relationship with technology</p>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <motion.li key={b} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-cream/90">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-brown-dark/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-cream/10">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <AnimatedNumber value={50} suffix="+" />
              <p className="text-cream/70 mt-2">Hours saved per month</p>
            </div>

            <div className="bg-brown-dark/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-cream/10">
              <AnimatedNumber value={92} suffix="%" />
              <p className="text-cream/70 mt-2">Report better focus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhySection;
