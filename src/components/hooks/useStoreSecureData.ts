import {useMutation} from 'react-query';
import {storeSecureData as useStoreSecureDataService} from '../../service/secure-service';

export const useStoreSecureData = () => {
  const mutation = useMutation(useStoreSecureDataService, {
    onMutate: variables => {
      console.log('useStoreSecureData.onMutate', variables);

      // Optionally return a context containing data to use when for example rolling back
      return {timestamp: new Date().toLocaleTimeString()};
    },
    onError: (error, variables, context) => {
      console.log('useStoreSecureData.onError', {error, variables, context});
    },
    onSuccess: (data, variables, context) => {
      console.log('useStoreSecureData.onSuccess', {data, variables, context});
    },
    onSettled: (data, error, variables, context) => {
      console.log('useStoreSecureData.onSettled', {data, error, variables, context});
    },
  });

  return {
    isStoring: mutation.isLoading,
    isStoringError: mutation.isError,
    storeSecureData: mutation.mutate,
  };
};
