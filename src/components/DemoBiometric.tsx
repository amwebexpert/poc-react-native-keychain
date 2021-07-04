import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import {useMutation} from 'react-query';
import {getSecureData, getSupportedBiometryType, removeSecureData, storeSecureData} from '../service/secure-service';

export const DemoBiometric = () => {
  const [isBusy, setIsBusy] = useState(false);
  const mutation = useMutation(storeSecureData, {
    onMutate: variables => {
      console.log('A mutation is about to happen!', variables);

      // Optionally return a context containing data to use when for example rolling back
      return {timestamp: new Date().toLocaleTimeString()};
    },
    onError: (error, variables, context) => {
      console.log('An error happened!', {error, variables, context});
    },
    onSuccess: (data, variables, context) => {
      console.log('Success', {data, variables, context});
    },
    onSettled: (data, error, variables, context) => {
      console.log('onSettled', {data, error, variables, context});
    },
  });

  const toastMessage = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const showSupportedBiometryType = async () => {
    const result = await getSupportedBiometryType();
    toastMessage(`Supported: ${result}`);
  };

  const storeDataDemo = async () => {
    const user = {
      username: 'zoemiller@mailinator.com',
      password: 'test1111',
      refreshToken: 'My-Refresh-Token',
    };

    mutation.mutate(user);
  };

  const removeDataDemo = async () => {
    const result = await removeSecureData();
    toastMessage(`Cleanup result: ${result}`);
  };

  async function getSecureDataDemo() {
    try {
      const secureData = await getSecureData();
      toastMessage(`Secure data retrieved:\n ${JSON.stringify(secureData, null, 2)}`);
    } catch (error) {
      toastMessage("Keychain couldn't be accessed!");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.title}>Val: {`${isBusy}`}</Text>
        <Text style={styles.title}>{mutation.status}</Text>
        <Button title="Supported biometric type" onPress={showSupportedBiometryType}>
          Supported biometric type
        </Button>
        <Button title="Store secure data" onPress={() => storeDataDemo()}>
          Store secure data
        </Button>
        <Button title="Remove secure data" onPress={removeDataDemo}>
          Remove secure data
        </Button>
        <Button title="Biometric test" onPress={getSecureDataDemo}>
          Biometric test
        </Button>
        <Button title="Busy" onPress={() => setIsBusy(v => !v)}>
          Busy
        </Button>

        {mutation.isLoading && <ActivityIndicator color="red" />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'red',
    fontSize: 36,
  },
});
