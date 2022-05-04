import React,  { useEffect } from 'react';
import { TextInput } from 'react-native';
import styles from '../utils/styles';
import { useState } from '@hookstate/core';
import { View, TouchableOpacity } from 'react-native';

export default function SignUpScreen () {
    
    const tempState = useState({textValue: ""});

    useEffect(() => {
        console.log("tempState Text: ", tempState);
    },[tempState.textValue.get()])

    return (
        <View>
        <TextInput onChangeText={(text) => {tempState.textValue.set(text)}} style={styles.input}></TextInput>
        <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
                // Possible Asynchronization Issues?!?
                console.log("Before: ", tempState.textValue.get());
                tempState.textValue.set("");
                console.log("After ", tempState.textValue.get());
            }}>

        </TouchableOpacity>
        </View>
    );
};