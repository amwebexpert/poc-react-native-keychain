import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

type Props = {
  disabled: boolean;
  title: string;
  onPress: () => void;
};

export const AppButton = ({title, disabled, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Button disabled={disabled} title={title} onPress={onPress}>
        {title}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
