import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const loggedIn = function({name}){
    return (
        <View>
            <Text style={styles.welcome}>Hello {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
})