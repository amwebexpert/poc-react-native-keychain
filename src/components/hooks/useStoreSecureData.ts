import {useMutation} from 'react-query';
import {storeSecureData as storeSecureDataService} from '../../service/secure-service';

export const useStoreSecureData = () => {
  const storeData = async (data: unknown): Promise<boolean> => {
    // Leave some time to the UI thread to update any spinner mechanism
    await new Promise(resolve => setTimeout(resolve, 0));

    const result = await storeSecureDataService(data);
    return typeof result === 'object';
  };

  const mutation = useMutation(storeData, {
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
