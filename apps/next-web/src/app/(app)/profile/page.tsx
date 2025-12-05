'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Trophy,
  Flame,
  Zap,
  Edit2,
  Save,
  X,
  Activity,
  Calendar,
  Mail,
  Target,
  Crown,
  LogOut,
  Clock,
  ArrowRight,
  User,
  ChevronRight
} from 'lucide-react';

/* --------------------------------------------------
   Types
   -------------------------------------------------- */
interface UserProfile {
  id: string;
  username: string;
  email: string;
  points: number;
  bio: string;
  joinedDate: string;
  currentStreak: number;
  longestStreak: number;
  focusHours: number;
  coreFocus: string;
  isPro: boolean;
}

interface ChartDataPoint {
  day: string;
  minutes: number;
}

interface BadgeProps {
  points: number;
}

/* --------------------------------------------------
   Mock Data & Utilities
   -------------------------------------------------- */
const INITIAL_PROFILE: UserProfile = {
  id: 'user_123',
  username: 'AlphaWolf_99',
  email: 'hunter@foclupus.com',
  points: 1250,
  bio: 'Chasing goals and leading the pack. Focused on deep work and consistent habits.',
  joinedDate: 'Dec 2025',
  currentStreak: 5,
  longestStreak: 10,
  focusHours: 0,
  coreFocus: '',
  isPro: false
};

const generateMockSessions = (): ChartDataPoint[] => {
  const sessions: ChartDataPoint[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    sessions.push({
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      minutes: Math.floor(Math.random() * 120) + 20
    });
  }
  return sessions;
};

/* --------------------------------------------------
   Reusable Motion Card
   -------------------------------------------------- */
const MotionCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}> = ({ children, className = '', delay = 0, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.42, delay, type: 'spring', stiffness: 120 }}
    whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)' }}
    onClick={onClick}
    className={`bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

/* --------------------------------------------------
   Rank Badge
   -------------------------------------------------- */
const RankBadge: React.FC<BadgeProps> = ({ points }) => {
  const { className, label: text, Icon } = useMemo(() => {
    if (points >= 1000) return { className: 'bg-gradient-to-r from-yellow-400 to-orange-500', label: 'Alpha', Icon: Trophy };
    if (points >= 500) return { className: 'bg-gradient-to-r from-blue-400 to-indigo-500', label: 'Beta', Icon: Zap };
    return { className: 'bg-gray-400', label: 'Pup', Icon: User };
  }, [points]);

  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-bold text-white rounded-full shadow-md ${className}`}>
      {/* Icon is a dynamic component */}
      {/* @ts-ignore */}
      <Icon className="w-4 h-4 mr-2" />
      {text}
    </span>
  );
};

/* --------------------------------------------------
   Main Component
   -------------------------------------------------- */
export default function ProfilePage(): JSX.Element {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({ ...INITIAL_PROFILE });

  // Keep a stable chart data for the session
  const chartData = useMemo(() => generateMockSessions(), []);

  useEffect(() => {
    // Sync edit form whenever the profile changes
    setEditData({ ...profile });
  }, [profile]);

  const level = Math.floor(profile.points / 100) + 1;

  const handleSave = () => {
    // Merge trimmed values and keep previous values as fallback
    setProfile((prev) => ({
      ...prev,
      username: (editData.username ?? prev.username).trim(),
      bio: (editData.bio ?? prev.bio).trim(),
      coreFocus: (editData.coreFocus ?? prev.coreFocus).trim()
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Hook up your auth logout here
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF6] text-slate-800 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-orange-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{profile.username}</h1>
              <div className="flex items-center gap-3 mt-1">
                <RankBadge points={profile.points} />
                <span className="text-sm text-slate-500 font-medium">Level {level}</span>
              </div>
            </div>
          </div>

          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:border-orange-300 transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </motion.button>
          )}
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MotionCard delay={0.08} className="p-5 border-l-4 border-l-red-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Current Streak</span>
            </div>

            <div className="text-3xl font-extrabold text-slate-900">{profile.currentStreak}</div>
          </MotionCard>

          <MotionCard delay={0.16} className="p-5 border-l-4 border-l-yellow-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Longest Streak</span>
            </div>

            <div className="text-3xl font-extrabold text-slate-900">{profile.longestStreak}</div>
          </MotionCard>

          <MotionCard delay={0.24} className="p-5 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Focus Time (Hrs)</span>
            </div>

            <div className="text-3xl font-extrabold text-slate-900">{profile.focusHours}h</div>
          </MotionCard>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart + Core Focus */}
          <div className="lg:col-span-2 space-y-6">
            <MotionCard delay={0.36} className="p-6">
              <div className="text-orange-500 flex justify-end mb-2 text-sm font-bold">
                <a href="/progress" className="inline-flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" /> Focus Activity
                </h3>
                <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded-md">Last 7 Days</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#fff7ed' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.minutes > 60 ? '#f97316' : '#fdba74'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </MotionCard>

            <MotionCard delay={0.44} className="p-6 bg-gradient-to-br from-slate-50 to-white">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-slate-800">My Core Focus</h3>
              </div>

              {isEditing ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">YOUR MISSION</label>
                  <input
                    aria-label="core-focus"
                    type="text"
                    className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                    value={editData.coreFocus ?? ''}
                    onChange={(e) => setEditData({ ...editData, coreFocus: e.target.value })}
                    placeholder="What is your main goal? (e.g., Master React)"
                  />
                </div>
              ) : (
                <div>
                  {profile.coreFocus ? (
                    <p className="text-xl font-medium text-slate-900">"{profile.coreFocus}"</p>
                  ) : (
                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                      <p className="text-slate-500 font-medium">Focus Goal Undefined</p>
                      <p className="text-xs text-slate-400 mt-1">This is the mission guiding your journey. Keep up the hunt!</p>
                    </div>
                  )}
                </div>
              )}
            </MotionCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6 flex flex-col h-full">
            <MotionCard delay={0.52} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">About Me</h2>

                {isEditing && (
                  <div className="flex gap-2">
                    <button onClick={handleCancel} className="p-1 text-slate-400 hover:text-slate-600" aria-label="cancel-edit">
                      <X size={20} />
                    </button>
                    <button onClick={handleSave} className="p-1 text-green-500 hover:text-green-600" aria-label="save-edit">
                      <Save size={20} />
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">BIO</label>
                    <textarea
                      rows={4}
                      value={editData.bio ?? ''}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    />
                  </div>
                  <button onClick={handleSave} className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-slate-600 leading-relaxed italic text-sm">"{profile.bio}"</p>
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-medium">Joined {profile.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-medium">{profile.email}</span>
                    </div>
                  </div>
                </div>
              )}
            </MotionCard>

            <MotionCard delay={0.6} className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Crown className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Subscription Status</h3>
                  <p className="text-xs text-slate-300">Free Pack</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">Upgrade to Alpha Pack for unlimited sessions, advanced insights, and exclusive content.</p>

              <a href="/subscription">
                <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-yellow-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  Upgrade to Alpha Pack <ArrowRight size={16} />
                </button>
              </a>
            </MotionCard>

            <div className="mt-auto pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout of Foclupus
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
