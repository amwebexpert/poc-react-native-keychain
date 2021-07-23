import React from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {getAllServices, getSecureData, getSupportedBiometryType, removeSecureData} from '../service/secure-service';
import {AppButton} from './AppButton';
import {useStoreSecureData} from './hooks/useStoreSecureData';
import {useToast} from './hooks/useToast';

export const DemoBiometric = () => {
  const toastMessage = useToast();
  const {isStoring, storeSecureData} = useStoreSecureData();
  const [service, setService] = React.useState('ca.norris.chuck.service1');

  const showSupportedBiometryType = async () => {
    const result = await getSupportedBiometryType();
    toastMessage(`Supported: ${result}`);
  };

  const removeDataDemo = async () => {
    const result = await removeSecureData(service);
    toastMessage(`Cleanup result: ${result}`);
  };

  const storeDataDemo = async () => {
    const data = {username: 'zoe@gmail.com', password: 'test1111', refreshToken: 'My-Refresh', service};
    storeSecureData({data, service});
  };

  const getSecureDataDemo = async () => {
    try {
      const secureData = await getSecureData(service);
      toastMessage(`Secure data retrieved:\n\n ${JSON.stringify(secureData, null, 2)}`);
    } catch (error) {
      toastMessage("Keychain couldn't be accessed!");
    }
  };

  const listServices = async () => {
    const result = await getAllServices();
    toastMessage(`Services: ${JSON.stringify(result)}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.title}>Biometric</Text>

        <TextInput style={styles.input} onChangeText={setService} value={service} />

        <AppButton disabled={isStoring} title="Supported biometric type" onPress={showSupportedBiometryType} />
        <AppButton disabled={isStoring} title="Store secure data" onPress={storeDataDemo} />
        <AppButton disabled={isStoring} title="Remove secure data" onPress={removeDataDemo} />
        <AppButton disabled={isStoring} title="Biometric test" onPress={getSecureDataDemo} />
        <AppButton disabled={isStoring} title="Get all services" onPress={listServices} />

        {isStoring && <ActivityIndicator color="lightblue" />}
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
    color: 'lightblue',
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    padding: 4,
    borderWidth: 1,
    backgroundColor: 'lightblue',
    color: 'darkblue',
  },
});
