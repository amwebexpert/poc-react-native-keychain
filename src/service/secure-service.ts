import * as Keychain from 'react-native-keychain';

export type ServiceData = {
  data: unknown;
  service: string;
};

const options: Keychain.Options = {
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
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

export const storeSecureData = async ({data, service}: ServiceData): Promise<boolean> => {
  const jsonData = JSON.stringify(data);
  const result = await Keychain.setGenericPassword('secure-data', jsonData, {...options, service});
  console.log('Storage result', result);

  return typeof result === 'object';
};

export const getSecureData = async (service: string): Promise<any | null> => {
  const credentials = await Keychain.getGenericPassword({...options, service});
  if (credentials) {
    return JSON.parse(credentials.password);
  } else {
    return null;
  }
};

export const removeSecureData = async (service: string): Promise<boolean> => {
  return Keychain.resetGenericPassword({...options, service});
};

export const getAllServices = async (): Promise<string[]> => {
  return Keychain.getAllGenericPasswordServices();
};
