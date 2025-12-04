import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@foclupus/utils/apiClient';
import { styled } from 'tailwindcss-react-native'; 
import { CheckCircle, Lock, Leaf } from 'lucide-react-native';

// Styled Components
const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

// Mock DetoxLesson Entity Type (Must match the web structure)
interface DetoxLesson {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  is_complete: boolean;
  is_locked: boolean;
}

// ------------------------------------------------
// Data Fetching (Same as web)
// ------------------------------------------------
async function fetchDetoxLessons(): Promise<DetoxLesson[]> {
  // MOCK DATA: In a real app, this would call apiClient.entities.DetoxLesson.list()
  const mockLessons: DetoxLesson[] = [
    { id: 'l1', title: 'The Dopamine Loop', description: 'Understand how habits form.', xp_reward: 10, is_complete: true, is_locked: false },
    { id: 'l2', title: 'Digital Boundaries', description: 'Strategies for screen limits.', xp_reward: 15, is_complete: false, is_locked: false },
    { id: 'l3', title: 'Boredom as Fuel', description: 'Embracing discomfort to focus.', xp_reward: 20, is_complete: false, is_locked: true },
    { id: 'l4', title: 'The Wolfpack Mindset', description: 'Leveraging community for detox.', xp_reward: 25, is_complete: false, is_locked: true },
  ];
  return mockLessons; 
}

export default function MobileDetoxPathScreen() {
  const queryClient = useQueryClient();
  
  Stack.Screen({ options: { title: 'Detox Path', headerShown: true } });

  const { data: lessons, isLoading, error } = useQuery({
    queryKey: ['detoxLessons'],
    queryFn: fetchDetoxLessons,
  });

  // ------------------------------------------------
  // Data Mutation (Marking Complete - Same logic as web)
  // ------------------------------------------------
  const completeLessonMutation = useMutation({
    mutationFn: async ({ id, is_complete }: { id: string, is_complete: boolean }) => {
      // Logic to call the API client update function
      // await apiClient.entities.DetoxLesson.update(id, { is_complete });
      
      // MOCK: Simulate XP update
      const xp = lessons?.find(l => l.id === id)?.xp_reward || 0;
      console.log(`Simulating lesson update for ${id}. Awarding ${xp} XP.`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['detoxLessons'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      Alert.alert("Lesson Updated!", `Status changed for Lesson ${variables.id}.`);
    },
    onError: () => {
        Alert.alert("Error", "Failed to update lesson status.");
    }
  });

  const handleToggleComplete = (lesson: DetoxLesson) => {
    if (lesson.is_locked) {
      Alert.alert("Locked", "Complete previous lessons to unlock this path.");
      return;
    }
    
    completeLessonMutation.mutate({ 
      id: lesson.id, 
      is_complete: !lesson.is_complete 
    });
  };

  if (isLoading) return <StyledText className="text-center py-10 text-wolf-brown-light">Loading the Detox Path...</StyledText>;
  if (error) return <StyledText className="text-center py-10 text-red-700">An error occurred.</StyledText>;

  return (
    <StyledScrollView className="flex-1 bg-wolf-bg-light p-4">
      <StyledView className="space-y-6 max-w-4xl mx-auto pb-12">
        
        {/* Header */}
        <StyledView className="text-center space-y-2 items-center">
          <Leaf size={40} color="#4CAF50" />
          <StyledText className="text-3xl font-extrabold text-wolf-brown-dark">The Dopamine Detox Path</StyledText>
          <StyledText className="text-wolf-brown-light text-center">A series of lessons designed to reset your focus.</StyledText>
        </StyledView>

        {/* Lesson List */}
        <StyledView className="space-y-4">
          {lessons?.map((lesson, index) => (
            <StyledPressable
              key={lesson.id}
              onPress={() => handleToggleComplete(lesson)}
              disabled={lesson.is_locked}
              className={`overflow-hidden transition-all p-4 rounded-xl shadow-md border-2 
                ${lesson.is_complete ? 'border-[#4CAF50] bg-[#f2fcf2]' : 
                  lesson.is_locked ? 'border-gray-200 bg-gray-50' : 
                  'border-wolf-border bg-white active:bg-gray-100'
                }
              `}
            >
              <StyledView className="flex-row items-center justify-between">
                
                {/* Left side: Icon and Text */}
                <StyledView className="flex-row items-center space-x-4 flex-1">
                  <StyledView className={`p-3 rounded-full ${lesson.is_locked ? 'bg-gray-300' : lesson.is_complete ? 'bg-[#4CAF50]' : 'bg-wolf-gold/20'}`}>
                    {lesson.is_locked ? (
                      <Lock size={24} color="#9ca3af" />
                    ) : (
                      <Leaf size={24} color={lesson.is_complete ? 'white' : '#de8538'} />
                    )}
                  </StyledView>
                  <StyledView className="flex-1">
                    <StyledText className={`text-lg font-bold ${lesson.is_locked ? 'text-gray-500' : 'text-wolf-brown-dark'}`}>
                      {index + 1}. {lesson.title}
                    </StyledText>
                    <StyledText className={`text-sm ${lesson.is_locked ? 'text-gray-400' : 'text-wolf-brown-light'}`}>
                      {lesson.description}
                    </StyledText>
                  </StyledView>
                </StyledView>
                
                {/* Right side: XP and Status */}
                <StyledView className="flex-row items-center space-x-2 ml-4">
                    <StyledText className={`text-sm font-semibold ${lesson.is_locked ? 'text-gray-500' : 'text-wolf-gold'}`}>
                        +{lesson.xp_reward} XP
                    </StyledText>
                    {lesson.is_complete && (
                      <CheckCircle size={24} color="#4CAF50" fill="#4CAF50" />
                    )}
                </StyledView>
              </StyledView>
            </StyledPressable>
          ))}
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
}