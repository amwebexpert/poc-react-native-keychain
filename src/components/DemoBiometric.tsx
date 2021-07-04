import React from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {getSecureData, getSupportedBiometryType, removeSecureData} from '../service/secure-service';
import {AppButton} from './AppButton';
import {useStoreSecureData} from './hooks/useStoreSecureData';
import {useToast} from './hooks/useToast';

export const DemoBiometric = () => {
  const toastMessage = useToast();
  const {isStoring, storeSecureData} = useStoreSecureData();

  const showSupportedBiometryType = async () => {
    const result = await getSupportedBiometryType();
    toastMessage(`Supported: ${result}`);
  };

  const removeDataDemo = async () => {
    const result = await removeSecureData();
    toastMessage(`Cleanup result: ${result}`);
  };

  const storeDataDemo = async () => {
    const user = {username: 'zoe@gmail.com', password: 'test1111', refreshToken: 'My-Refresh'};
    storeSecureData(user);
  };

  const getSecureDataDemo = async () => {
    try {
      const secureData = await getSecureData();
      toastMessage(`Secure data retrieved:\n\n ${JSON.stringify(secureData, null, 2)}`);
    } catch (error) {
      toastMessage("Keychain couldn't be accessed!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.title}>Biometric</Text>

        <AppButton disabled={isStoring} title="Supported biometric type" onPress={showSupportedBiometryType} />
        <AppButton disabled={isStoring} title="Store secure data" onPress={storeDataDemo} />
        <AppButton disabled={isStoring} title="Remove secure data" onPress={removeDataDemo} />
        <AppButton disabled={isStoring} title="Biometric test" onPress={getSecureDataDemo} />

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
});
