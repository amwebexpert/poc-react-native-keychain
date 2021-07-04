import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {DemoBiometric} from './components/DemoBiometric';

export const queryClient: QueryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoBiometric />
    </QueryClientProvider>
  );
};

export default App;
