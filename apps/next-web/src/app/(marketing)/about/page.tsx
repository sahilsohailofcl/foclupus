"use client";

import { motion } from "framer-motion";
import { Flame, Heart, Target, Users, Zap, Shield } from "lucide-react";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import ScrollToTop from "../../components/landing/ScrollToTop";

const values = [
  {
    icon: Heart,
    title: "User-First Design",
    description: "Every feature is crafted with deep empathy for our users' struggles with digital distractions.",
  },
  {
    icon: Target,
    title: "Science-Backed",
    description: "Our dopamine detox lessons and focus techniques are grounded in neuroscience research.",
  },
  {
    icon: Zap,
    title: "Playful Progress",
    description: "We believe transformation should feel like play, not punishment. Gamification makes growth fun.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. We never sell user information and prioritize security always.",
  },
];

const team = [
  { name: "Alex Wolf", role: "Founder & CEO", initial: "A" },
  { name: "Sarah Chen", role: "Head of Product", initial: "S" },
  { name: "Marcus Rivera", role: "Lead Developer", initial: "M" },
  { name: "Emily Park", role: "UX Designer", initial: "E" },
];

const About = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cream-light to-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              We're Building a <span className="text-gradient">Focused Future</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Foclupus was born from a simple belief: everyone deserves the tools to reclaim their attention 
              in an increasingly distracting world. We're on a mission to help millions transform their 
              relationship with technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In 2024, the average person spends 7+ hours on screens daily. Social media algorithms 
                are designed to capture attention, leaving millions feeling scattered, anxious, and unproductive.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We created Foclupus to fight back—not with guilt or harsh restrictions, but with a joyful, 
                gamified journey that makes building focus habits genuinely fun. Like a determined wolf, 
                we help our users develop the mental discipline to thrive in the digital age.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 text-center"
            >
              <div className="w-24 h-24 gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                <Flame className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">50,000+</h3>
              <p className="text-muted-foreground">Wolves in Our Pack</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 text-center"
              >
                <div className="w-14 h-14 gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Pack</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A small, passionate team dedicated to helping you focus
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {member.initial}
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default About;
