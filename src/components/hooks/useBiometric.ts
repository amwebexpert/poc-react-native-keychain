import {useMutation} from 'react-query';
import {storeSecureData as storeSecureDataService} from '../../service/secure-service';

export const useBiometric = () => {
  const mutation = useMutation(storeSecureDataService);

  return {
    isWorking: mutation.isLoading,
    isError: mutation.isError,
    storeSecureData: mutation.mutate,
  };
};
