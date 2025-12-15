"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Apple, Smartphone, Globe, QrCode } from "lucide-react";

const DownloadSection: React.FC = () => (
  <section className="py-24 bg-cream-dark overflow-hidden">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary font-semibold mb-4"><Smartphone className="w-4 h-4" /> Get the App</div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Download & <span className="text-gradient-primary">Start Today</span></h2>
          <p className="text-muted-foreground text-lg mb-8">Available on iOS, Android, and as a Progressive Web App. Install it anywhere and start your focus journey.</p>

          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center"><Apple className="w-8 h-8 text-background" /></div>
              <div className="flex-1"><p className="text-sm text-muted-foreground">Download on the</p><p className="font-bold text-foreground text-lg">App Store</p></div>
              <Button variant="hero" size="sm">Get</Button>
            </div>
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center"><Smartphone className="w-8 h-8 text-primary-foreground" /></div>
              <div className="flex-1"><p className="text-sm text-muted-foreground">Get it on</p><p className="font-bold text-foreground text-lg">Google Play</p></div>
              <Button variant="hero" size="sm">Get</Button>
            </div>
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer border-2 border-dashed border-primary/30">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center"><Globe className="w-8 h-8 text-accent-foreground" /></div>
              <div className="flex-1"><p className="text-sm text-muted-foreground">Or use it as</p><p className="font-bold text-foreground text-lg">Web App (PWA)</p><p className="text-xs text-muted-foreground">Add to home screen from any browser</p></div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center">
          <div className="glass-card rounded-3xl p-8 text-center max-w-sm">
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto bg-foreground rounded-2xl flex items-center justify-center"><QrCode className="w-32 h-32 text-background" /></div>
            </div>
            <h3 className="font-bold text-foreground mb-2">Scan to Download</h3>
            <p className="text-sm text-muted-foreground mb-4">Point your camera at the QR code to get started instantly</p>
            <div className="flex justify-center gap-4 text-4xl"><span>🐺</span><span>📱</span><span>🚀</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DownloadSection;
