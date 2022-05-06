import React,  { useEffect } from 'react';
import { TextInput, Text, Button} from 'react-native';
import styles from '../utils/styles';
import { useState } from '@hookstate/core';
import { View, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
 
    return (
        <View style={styles.loginContainer}>
          <Text style = {styles.text}>Sign In</Text>
          <TextInput 
            placeholder={"username"}
          //   value={state.label.get()} 
          //   onChangeText={(text) => {state.label.set(text)}}
            style={styles.loginInput}></TextInput>
          
          <TextInput 
            placeholder={"password"}
          //   value={state.label.get()} 
          //   onChangeText={(text) => {state.label.set(text)}}
            style={styles.loginInput}></TextInput>
  
          
    <TouchableOpacity 
          onPress={() => { navigation.navigate("Home") }}
          style={styles.submitButton}>
          <Text>Submit</Text>
        </TouchableOpacity>
  
         
        </View>
    );
  }