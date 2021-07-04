import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export const AppButton = ({title, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Button title={title} onPress={onPress}>
        {title}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});
