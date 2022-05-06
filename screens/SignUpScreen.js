import React,  { useEffect } from 'react';
import { TextInput, Text, Button} from 'react-native';
import styles from '../utils/styles';
import globalState from '../utils/globalState';
import { useState } from '@hookstate/core';
import { View, TouchableOpacity } from 'react-native';
import { auth } from '../utils/firebase';
import { database as db } from '../utils/firebase';
import { ref, set, get, push } from 'firebase/database';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
    
    const state = useState(globalState);
    const loginState = useState({email: "", password: "", signIn: true});
    
    useEffect(() => {
      console.log(state.loggedIn.get());
    }, [state.loggedIn.get()])

    function resetLoginState () {
      loginState.email.set("");
      loginState.password.set("");
      loginState.signIn.set(true);
    }

    return (
        <View style={styles.loginContainer}>
          <Text style = {styles.text}>{loginState.signIn.get() ? "Sign In" : "Sign Up"}</Text>
          <TextInput 
            placeholder={"email"}
            value={loginState.email.get()} 
            onChangeText={(text) => {loginState.email.set(text)}}
            style={styles.loginInput}></TextInput>
          
          <TextInput 
            placeholder={"password"}
            secureTextEntry={true}
            value={loginState.password.get()} 
            onChangeText={(text) => {loginState.password.set(text)}}
            style={styles.loginInput}></TextInput>
          
        <TouchableOpacity 
          onPress={async () => { 
            if (loginState.email.get() != "" && loginState.password.get() != "") {
              if (loginState.signIn.get() == true) {
                  signInWithEmailAndPassword(auth, loginState.email.get(), loginState.password.get())
                  .then((userCredential) => {
                    // Signed in 
                    resetLoginState();
                    state.loggedIn.set(userCredential.user);
                    console.log("Logged In");
                    navigation.navigate("Home");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                  });
              } else {
                  await createUserWithEmailAndPassword(auth, loginState.email.get(), loginState.password.get())
                  .then(async (userCredential) => {
                    // Signed up
                    state.loggedIn.set(userCredential.user);
                    console.log("Signed Up & Logged In");

                    // Need to update Firebase

                    // See how many players have joined
                    const playerNumRef = ref(db, 'playerNum/');
                    await get(playerNumRef).then(async (snapshot) => {

                      const data = snapshot.val();
                      const playersRef = ref(db, 'players/');

                      // Add the new player, with the new number.
                      const newPlayerRef = push(playersRef);
                      await set(newPlayerRef, {
                        playerEmail: loginState.email.get(),
                        playerId: data,
                      })

                      // Increment the number for the next new player.
                      await set(playerNumRef, data + 1);
                    }).catch((error) => {
                      console.log(error);
                    })

                    resetLoginState();
                    navigation.navigate("Home");
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                  });
              }
            } else {
              console.log("ERROR: email & Password Cannot Be Blank")
            }
          }}
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