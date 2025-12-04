import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, Platform, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { styled } from 'tailwindcss-react-native'; 
import { apiClient } from '@foclupus/utils/apiClient'; 

import { Play, Pause, Square, Zap, Award } from 'lucide-react-native';

// Styled Components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

type FocusState = 'idle' | 'running' | 'paused' | 'completed';

// Custom Button adapted for this screen (using Pressable)
const FocusButton: React.FC<{ onPress: () => void, children: React.ReactNode, primary?: boolean, secondary?: boolean }> = ({ onPress, children, primary, secondary }) => (
  <StyledPressable 
    onPress={onPress} 
    className={`w-32 h-12 rounded-xl flex-row items-center justify-center shadow-lg transition duration-150 ${
      primary ? 'bg-wolf-red' : secondary ? 'bg-wolf-gold' : 'bg-white border-2 border-wolf-border'
    }`}
    style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
    })}
  >
    <StyledText className={`text-lg font-bold ${primary || secondary ? 'text-white' : 'text-wolf-brown-dark'}`}>
      {children}
    </StyledText>
  </StyledPressable>
);


export default function MobileFocusModeScreen() {
  const [sessionDuration, setSessionDuration] = useState(25 * 60); 
  const [timeLeft, setTimeLeft] = useState(sessionDuration);
  const [focusState, setFocusState] = useState<FocusState>('idle');
  const [xpEarned, setXpEarned] = useState(0);

  // Set header options via Stack
  Stack.Screen({ options: { title: 'Focus Mode', headerShown: focusState === 'idle' } });


  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (focusState !== 'running') {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setFocusState('completed');
          handleSessionCompletion(sessionDuration);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [focusState, sessionDuration]);
  
  useEffect(() => {
    if (focusState === 'idle') {
      setTimeLeft(sessionDuration);
    }
  }, [sessionDuration, focusState]);


  // ------------------------------------------------
  // Control Handlers
  // ------------------------------------------------
  const handleStart = () => setFocusState('running');
  const handlePause = () => setFocusState('paused');
  const handleResume = () => setFocusState('running');

  const handleStop = () => {
    Alert.alert(
      "End Session?",
      "Stopping now will forfeit any XP reward.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "End", 
          onPress: () => {
            setFocusState('idle');
            setTimeLeft(sessionDuration);
            router.back();
          }, 
          style: "destructive" 
        }
      ]
    );
  };
  
  // ------------------------------------------------
  // Session Completion & API Logging
  // ------------------------------------------------
  const handleSessionCompletion = useCallback(async (actualDuration: number) => {
    const calculatedXp = Math.floor(actualDuration / 60) * 2; 
    setXpEarned(calculatedXp);

    const sessionData = {
      user_id: 'user-123', 
      duration_minutes: Math.floor(actualDuration / 60),
      is_complete: true,
      xp_awarded: calculatedXp,
      focus_goal: 'Deep Work (Mobile)', 
      completed_at: new Date().toISOString(),
    };

    try {
      await apiClient.entities.FocusSession.create(sessionData); 
      console.log(`Mobile Focus session logged. Earned ${calculatedXp} XP.`);
      
      // Show completion alert (simulating the web modal)
      Alert.alert(
        "Focus Achieved!",
        `You successfully focused for ${formatTime(actualDuration)}. + ${calculatedXp} XP earned.`,
        [{ text: "Continue Journey", onPress: () => router.back() }]
      );
      
    } catch (error) {
      console.error('Failed to log mobile focus session:', error);
      Alert.alert(
        "Focus Achieved!",
        `You focused for ${formatTime(actualDuration)}. Logging failed, but you still earned XP! (+${calculatedXp})`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
  }, []);

  const isRunningOrPaused = focusState === 'running' || focusState === 'paused';

  return (
    <StyledView className="flex-1 bg-wolf-bg-light items-center justify-center p-4">
      
      <StyledView className="absolute top-4">
        <StyledView className="flex-row items-center">
          <Zap size={32} color="#b22d15" />
          <StyledText className="text-4xl font-extrabold text-wolf-red ml-2">Focus Mode</StyledText>
        </StyledView>
      </StyledView>

      {/* Duration Selection (Simulated Select) */}
      {focusState === 'idle' && (
        <StyledView className="flex-row items-center space-x-2 absolute top-24">
          <StyledText className="text-lg text-wolf-brown-light">Duration:</StyledText>
          <StyledPressable 
            onPress={() => setSessionDuration(sessionDuration === 25 * 60 ? 45 * 60 : 25 * 60)}
            className="p-3 bg-white border border-wolf-border rounded-xl"
          >
            <StyledText className="text-wolf-brown-dark">{formatTime(sessionDuration)}</StyledText>
          </StyledPressable>
        </StyledView>
      )}

      {/* Timer Ring/Display */}
      <StyledView className="relative w-72 h-72 my-16">
        <StyledView className="absolute inset-0 rounded-full bg-[#f0e4d7] flex items-center justify-center">
          <StyledView className="w-64 h-64 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-wolf-border">
            <StyledText className="text-6xl font-black text-wolf-red">
              {formatTime(timeLeft)}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
      
      {/* Control Buttons */}
      <StyledView className="flex-row space-x-4">
        {focusState === 'idle' && (
          <FocusButton onPress={handleStart} primary>
            <StyledView className="flex-row items-center">
              <Play size={20} color="white" />
              <StyledText className="text-white ml-2">Start</StyledText>
            </StyledView>
          </FocusButton>
        )}
        {focusState === 'running' && (
          <>
            <FocusButton onPress={handlePause} secondary>
              <StyledView className="flex-row items-center">
                <Pause size={20} color="white" />
                <StyledText className="text-white ml-2">Pause</StyledText>
              </StyledView>
            </FocusButton>
            <FocusButton onPress={handleStop}>
              <StyledView className="flex-row items-center">
                <Square size={20} color="#2d1810" />
                <StyledText className="text-wolf-brown-dark ml-2">Stop</StyledText>
              </StyledView>
            </FocusButton>
          </>
        )}
        {focusState === 'paused' && (
          <>
            <FocusButton onPress={handleResume} primary>
              <StyledView className="flex-row items-center">
                <Play size={20} color="white" />
                <StyledText className="text-white ml-2">Resume</StyledText>
              </StyledView>
            </FocusButton>
            <FocusButton onPress={handleStop}>
              <StyledView className="flex-row items-center">
                <Square size={20} color="#2d1810" />
                <StyledText className="text-wolf-brown-dark ml-2">Stop</StyledText>
              </StyledView>
            </FocusButton>
          </>
        )}
      </StyledView>
    </StyledView>
  );
}