import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const Input = function({value, label, onChangeText, placeholder, secureTextEntry}){
    return (
        <View>
            <Text >{label}</Text>
            <TextInput
            autoCorrect={false}
            onChangeText={onChangeText}
            value = {value}
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    textAlign: 'justify',
    color: '#333333',
    marginBottom: 5,
    padding: 5,
    fontSize: 20,
    width: '100%'
  }
});

export {Input};