import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthListener } from './src/features/auth/hooks/useAuthListener';
import "./global.css"
const queryClient = new QueryClient();  
 
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
