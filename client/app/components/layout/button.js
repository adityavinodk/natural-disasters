import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, label})=>{
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop:10,
        padding:20,
        width:'100%',
        backgroundColor: '#00aeef',
        borderRadius: 4,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18
    }
});

export {Button};