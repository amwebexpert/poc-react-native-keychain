import * as Keychain from 'react-native-keychain';

const options: Keychain.Options = {
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  authenticationType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
  authenticationPrompt: {
    title: 'Identification biométrique requise',
    subtitle: 'Service sécurisé via la biométrie (empreintes ou identification faciale)',
    description: 'Nous tentons de vous identifier de la manière la plus sécuritaire possible sur votre appareil',
    cancel: 'Annuler la biométrie',
  },
};

export enum BiometryTypeEnum {
  FINGERPRINT = 'Fingerprint',
  FACE = 'Face',
  IRIS = 'Iris',
}

export const getSupportedBiometryType = async (): Promise<null | BiometryTypeEnum> => {
  const type = await Keychain.getSupportedBiometryType(options);
  // console.log('Supported biometric type', type);
  switch (type) {
    case Keychain.BIOMETRY_TYPE.FACE:
    case Keychain.BIOMETRY_TYPE.FACE_ID:
      return BiometryTypeEnum.FACE;

    case Keychain.BIOMETRY_TYPE.TOUCH_ID:
    case Keychain.BIOMETRY_TYPE.FINGERPRINT:
      return BiometryTypeEnum.FINGERPRINT;

    case Keychain.BIOMETRY_TYPE.IRIS:
      return BiometryTypeEnum.IRIS;

    default:
      return null;
  }
};

export const storeSecureData = async (data: unknown): Promise<boolean> => {
  console.log('inside service');
  const result = await Keychain.setGenericPassword('secure-data', JSON.stringify(data), options);
  console.log('Storage result', result);

  return typeof result === 'object';
};

export const getSecureData = async (): Promise<any | null> => {
  const credentials = await Keychain.getGenericPassword(options);
  if (credentials) {
    return JSON.parse(credentials.password);
  } else {
    return null;
  }
};

export const removeSecureData = async (): Promise<boolean> => {
  return Keychain.resetGenericPassword();
};
