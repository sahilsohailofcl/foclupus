"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "../../components/ui/button";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import ScrollToTop from "../../components/landing/ScrollToTop";

const posts = [
  {
    title: "The Science of Dopamine Detox: Why It Actually Works",
    excerpt: "Discover the neuroscience behind dopamine detox and how strategic digital breaks can rewire your brain for better focus.",
    category: "Science",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    title: "5 Focus Techniques Top Performers Use Daily",
    excerpt: "Learn the proven strategies that CEOs, athletes, and high achievers use to maintain laser focus in a distracted world.",
    category: "Productivity",
    date: "Dec 8, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "How Gamification Changes Behavior: Lessons from Duolingo",
    excerpt: "Exploring how game mechanics can transform habit-building and why Foclupus uses wolf ranks to motivate users.",
    category: "Design",
    date: "Dec 5, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    title: "Breaking the Scroll Cycle: A 7-Day Challenge",
    excerpt: "A practical guide to reducing mindless scrolling and replacing it with intentional focus sessions.",
    category: "Guides",
    date: "Dec 1, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    title: "The Hidden Cost of Context Switching",
    excerpt: "Research shows it takes 23 minutes to refocus after an interruption. Here's how to protect your deep work.",
    category: "Research",
    date: "Nov 28, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "Building a Morning Routine That Actually Sticks",
    excerpt: "Why most morning routines fail and how to build one that sets you up for a focused, productive day.",
    category: "Habits",
    date: "Nov 25, 2024",
    readTime: "7 min read",
    featured: false,
  },
];

const Blog = () => {
  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-cream-light to-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              The <span className="text-gradient">Focus</span> Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights on productivity, dopamine detox, and building better habits from the Foclupus team.
            </p>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 md:p-12 mb-12 cursor-pointer group"
            >
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm text-white mb-4">
                ⭐ Featured
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:underline">
                {featuredPost.title}
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">{featuredPost.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {featuredPost.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" /> {featuredPost.category}
                </span>
              </div>
            </motion.div>
          )}

          {/* Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl p-6 border border-border/50 cursor-pointer group"
              >
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              Load More Articles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Blog;
