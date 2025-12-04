// Define the pages for type safety across Next.js and React Native
export type PageKey = 
  | 'Home' 
  | 'Onboarding' 
  | 'FocusMode' 
  | 'DetoxPath' 
  | 'Habits' 
  | 'Mindfulness' 
  | 'Progress' 
  | 'Challenges' 
  | 'Profile' 
  | 'Subscription' 
  | 'Landing'
  | 'Settings';

// This function translates the page key to the URL path for Next.js (Web)
// For React Native, this might return a path that React Navigation understands.
export function createPageUrl(page: PageKey): string {
  switch (page) {
    case 'Home':
      return '/home'; // Main app home sits at /home (under (app) grouping)
    case 'Onboarding':
      return '/onboarding';
    case 'FocusMode':
      return '/focus-mode';
    case 'DetoxPath':
      return '/detox-path';
    case 'Habits':
      return '/habits';
    case 'Mindfulness':
      return '/mindfulness';
    case 'Challenges':
      return '/challenges';
    case 'Progress':
      return '/progress';
    case 'Profile':
      return '/profile';
    case 'Settings':
      return '/settings';
    case 'Subscription':
      return '/subscription';
    case 'Landing':
      return '/landing';
    default:
      return '/';
  }
}