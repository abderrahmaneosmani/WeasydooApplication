import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

export type PropsLabel = {
  label: string;
  value: string;
  setValue: any;
  keyboardType?: KeyboardTypeOptions;
};

const InputLabel = (props: PropsLabel) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.label}
        value={props.value}
        keyboardType={props?.keyboardType ? props.keyboardType : 'default'}
        onChangeText={props.setValue}
      />
    </View>
  );
};

export default InputLabel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: 200,
  },
  text: {
    fontSize: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
