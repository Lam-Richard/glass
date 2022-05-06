import React,  { useEffect } from 'react';
import { TextInput, Text, Button} from 'react-native';
import styles from '../utils/styles';
import globalState from '../utils/globalState';
import { useState } from '@hookstate/core';
import { View, TouchableOpacity } from 'react-native';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
    
    const state = useState(globalState);
    const loginState = useState({username: "", password: "", signIn: true});
    
    useEffect(() => {
      console.log(state.loggedIn.get());
    }, [state.loggedIn.get()])

    function resetLoginState () {
      loginState.username.set("");
      loginState.password.set("");
      loginState.signIn.set(true);
    }

    return (
        <View style={styles.loginContainer}>
          <Text style = {styles.text}>{loginState.signIn.get() ? "Sign In" : "Sign Up"}</Text>
          <TextInput 
            placeholder={"username"}
            value={loginState.username.get()} 
            onChangeText={(text) => {loginState.username.set(text)}}
            style={styles.loginInput}></TextInput>
          
          <TextInput 
            placeholder={"password"}
            secureTextEntry={true}
            value={loginState.password.get()} 
            onChangeText={(text) => {loginState.password.set(text)}}
            style={styles.loginInput}></TextInput>
          
        <TouchableOpacity 
          onPress={() => { 
    //         if (loginState.username.get() != "" && loginState.password.get() != "") {
    //           if (loginState.signIn.get() == true) {
    //               signInWithEmailAndPassword(auth, loginState.username.get(), loginState.password.get())
    //               .then((userCredential) => {
    //                 // Signed in 
    //                 resetLoginState();
    //                 state.loggedIn.set(userCredential.user);
    //                 console.log("Logged In");
    //                 navigation.navigate("Home");
    //               })
    //               .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //               });
    //           } else {
    //               createUserWithEmailAndPassword(auth, loginState.username.get(), loginState.password.get())
    //               .then((userCredential) => {
    //                 // Signed in 
    //                 resetLoginState();
    //                 state.loggedIn.set(userCredential.user);
    //                 console.log("Signed Up & Logged In");
    //                 navigation.navigate("Home");
    //               })
    //               .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //               });
    //           }
    //         } else {
    //           console.log("ERROR: Username & Password Cannot Be Blank")
    //         }
    //       }}
    // <TouchableOpacity 
          navigation.navigate("AddMoment") }} 
          style={styles.submitButton}>
          <Text>Submit</Text>
        </TouchableOpacity>
        <View style={styles.loginMsg}>
          <Text>{loginState.signIn.get() ? "Don't have an account?"  : "Already have an account?"}&nbsp;</Text>        
          <Text style={styles.blueUnderline} onPress={() => { loginState.signIn.set(p => !p)}}>{loginState.signIn.get() ? "Sign up"  : "Sign in"}</Text>
          </View>  
         
        </View>
    );
  }