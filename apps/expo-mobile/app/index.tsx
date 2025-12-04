import React from 'react';
import { ScrollView, View, Text, RefreshControl, Platform } from 'react-native';
import { Link, Stack } from 'expo-router';
import { styled } from 'tailwindcss-react-native'; 
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@foclupus/utils/apiClient';
import { createPageUrl } from '@foclupus/utils/src/navigation';
import { Sparkles, Zap, Leaf, Target, ChevronRight, Flame } from 'lucide-react-native';

// Import all shared UI components
import { 
  WolfRankBadge, 
  StreakDisplay, 
  HabitCard, 
  ChallengeCard 
} from '@foclupus/ui';

// Style native components using Tailwind
const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledLink = styled(Link);

// Data fetching hook (Same as web, but adapted for mobile structure)
const useProfileQuery = () => useQuery({
    queryKey: ['userProfile'],
    queryFn: () => apiClient.entities.UserProfile.list('-created_date', 1).then(data => data[0]), 
});

const useHabitsQuery = () => useQuery({
  queryKey: ['dailyHabits'],
  queryFn: () => apiClient.entities.Habit.list(),
});

// Mock Habit Completion handler (for demonstration)
const handleHabitCompletion = async (habitId: string) => {
  // Replace with actual API call (e.g., apiClient.entities.Habit.update(habitId, { completed_today: true }))
  console.log(`Toggling habit ${habitId} on mobile.`);
  // In a real app, you would invalidate queries here to refetch:
  // queryClient.invalidateQueries({ queryKey: ['dailyHabits'] });
};


export default function MobileHomeScreen() {
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: isProfileLoading, refetch: refetchProfile, isRefetching } = useProfileQuery();
  const { data: habits = [], isLoading: isHabitsLoading } = useHabitsQuery();

  // MOCK DATA for other entities (Challenges, Metrics)
  const challenges = [
    { id: 'c1', title: '30 min Deep Focus', xp_reward: 10, current_progress: 20, target_value: 30, completion_status: 'in_progress' as const },
    { id: 'c2', title: 'Finish 1 Detox Lesson', xp_reward: 0, current_progress: 1, target_value: 1, completion_status: 'complete' as const },
    { id: 'c3', title: 'Read 10 mins', xp_reward: 10, current_progress: 0, target_value: 10, completion_status: 'pending' as const },
  ];
  const screenTimeSaved = userProfile?.screen_time_saved || '2h 15m'; 

  // Use Stack.Screen to set the header for the Expo Router tab/page
  // Note: We set headerShown: false in _layout, so we manage the header ourselves here if needed.
  Stack.Screen({ options: { title: 'Home', headerShown: false } });

  const onRefresh = React.useCallback(() => {
    refetchProfile();
    queryClient.invalidateQueries({ queryKey: ['dailyHabits'] });
  }, [refetchProfile, queryClient]);

  if (isProfileLoading) {
    return (
      <StyledView className="flex-1 items-center justify-center bg-wolf-bg-light">
        <StyledText className="text-wolf-brown-light">Loading Profile...</StyledText>
      </StyledView>
    );
  }

  if (!userProfile) {
    return (
      <StyledView className="flex-1 items-center justify-center p-4 bg-wolf-bg-light">
        <StyledText className="text-2xl font-bold text-wolf-red mb-4">Profile Not Found</StyledText>
        <StyledText className="text-wolf-brown-light mb-6">Cannot load user data.</StyledText>
      </StyledView>
    );
  }
  
  const xpForNextLevel = 100 + (userProfile.level * 50);
  const xpProgress = Math.min(userProfile.xp, xpForNextLevel);

  return (
    <StyledScrollView 
      className="flex-1 bg-wolf-bg-light p-4"
      refreshControl={ // Added pull-to-refresh for mobile
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor={Platform.OS === 'ios' ? '#b22d15' : '#8b7355'} />
      }
    >
      <StyledView className="space-y-6 pb-12">
        
        {/* Welcome & Stats */}
        <StyledView className="space-y-4 pt-4">
          <StyledView className="flex-row justify-between items-start">
            <StyledView>
              <StyledText className="text-3xl font-bold text-wolf-brown-dark">Welcome back, {userProfile.wolf_name}!</StyledText>
              <StyledText className="text-wolf-brown-light">Day {userProfile.current_streak} streak. Keep going!</StyledText>
            </StyledView>
            <WolfRankBadge rank={userProfile.wolf_rank} />
          </StyledView>

          <StyledView className="flex-row flex-wrap justify-between gap-3">
            <StyledView className="w-[48%]">
              <StreakDisplay streak={userProfile.current_streak} longestStreak={userProfile.longest_streak} />
            </StyledView>
            
            <StyledView className="w-[48%] bg-white p-4 rounded-xl shadow-md border border-wolf-border flex flex-col items-center">
              <Sparkles size={24} color="#de8538" />
              <StyledText className="text-2xl font-bold text-wolf-red">{userProfile.xp}</StyledText>
              <StyledText className="text-sm text-wolf-brown-light">Total XP</StyledText>
            </StyledView>
            
            {/* Level Progress */}
            <StyledView className="w-full bg-white p-4 rounded-xl shadow-md border border-wolf-border">
              <StyledView className="flex-row justify-between items-center mb-2">
                <StyledText className="font-semibold text-wolf-brown-dark">Level {userProfile.level} Progress</StyledText>
                <StyledText className="text-sm text-wolf-brown-light">{xpProgress} / {xpForNextLevel} XP</StyledText>
              </StyledView>
              <StyledView className="h-2 bg-[#f0e4d7] rounded-full overflow-hidden">
                <StyledView
                  className="h-full bg-wolf-gold rounded-full"
                  style={{ width: `${(xpProgress / xpForNextLevel) * 100}%` }}
                />
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Daily Challenges */}
        <StyledView className="space-y-3">
          <StyledText className="text-2xl font-bold text-wolf-brown-dark">Daily Challenges</StyledText>
          <StyledView className="flex-row flex-wrap justify-between gap-3">
            {challenges.map(challenge => (
              <StyledView key={challenge.id} className="w-full">
                <ChallengeCard challenge={challenge} /> 
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Today's Habits */}
        <StyledView className="space-y-3">
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-2xl font-bold text-wolf-brown-dark">Today's Habits</StyledText>
            {/* Link to Habits Page */}
            <StyledLink href={createPageUrl('Habits') as any} className="text-sm text-wolf-red">
                All Habits 
                <ChevronRight size={16} color="#b22d15" />
            </StyledLink>
          </StyledView>
          <StyledView className="flex-row flex-wrap justify-between gap-3">
            {habits.slice(0, 4).map(habit => (
              <StyledView key={habit.id} className="w-[48%]">
                {/* HabitCard uses the same onPress prop as on the web */}
                <HabitCard 
                  habit={{ ...habit, completed_today: false }} // Mock completed_today status
                  onPress={() => handleHabitCompletion(habit.id)}
                /> 
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Quick Access (using Link for navigation) */}
        <StyledView className="space-y-3">
          <StyledText className="text-2xl font-bold text-wolf-brown-dark">Quick Access</StyledText>
          <StyledView className="flex-row flex-wrap justify-between gap-3">
            <StyledLink href="/focus-mode" asChild className="w-[48%]">
              <StyledView className="bg-[#f0f6ff] p-5 rounded-xl border border-[#d2e3f5] text-center items-center">
                <Zap size={32} color="#4a90e2" />
                <StyledText className="font-semibold text-wolf-brown-dark">Start Focus</StyledText>
              </StyledView>
            </StyledLink>
            <StyledLink href="/detox-path" asChild className="w-[48%]">
              <StyledView className="bg-[#fff7f0] p-5 rounded-xl border border-[#f5e3d2] text-center items-center">
                <Leaf size={32} color="#de8538" />
                <StyledText className="font-semibold text-wolf-brown-dark">Detox Lesson</StyledText>
              </StyledView>
            </StyledLink>
          </StyledView>
        </StyledView>
        
      </StyledView>
    </StyledScrollView>
  );
}