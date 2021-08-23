import {useMutation} from 'react-query';
import {ServiceData, storeSecureData as storeSecureDataService} from '../../service/secure-service';

export const useStoreSecureData = <T>() => {
  const storeData = async <T>(serviceData: ServiceData<T>): Promise<boolean> => {
    // Leave some time to the UI thread to update any spinner mechanism
    await new Promise(resolve => setTimeout(resolve, 0));

    const result = await storeSecureDataService(serviceData);
    return typeof result === 'object';
  };

  const mutation = useMutation<boolean, unknown, ServiceData<T>, void>(storeData, {
    onMutate: (serviceData: ServiceData<T>) => {
      console.log('useStoreSecureData.onMutate', serviceData);
      // Optionally return a context containing data to use when for example rolling back
      // const mutation = useMutation<....... ServiceData<T>, {timestamp: string}>(storeData, {
      // return {timestamp: new Date().toLocaleTimeString()};
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
