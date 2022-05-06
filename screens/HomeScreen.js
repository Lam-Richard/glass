import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import globalState from '../utils/globalState';
import { SquareGrid } from '../components/SquareGrid';
import { colors, fallColors, basketColors } from '../utils/colors';
import styles from '../utils/styles';
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';


export default function HomeScreen({ navigation }) {
  
  const state = useState(globalState);

  useEffect(() => {
    console.log("THIS IS THE CLICKED SQUARE IT WORKS ", state.clickedSquare.get());
  },[state.clickedSquare.get()])

  
  useEffect(() => {
    console.log(state.label.get());
  },[state.label.get()])

  function createSquare () {
    state.id.set(p => p + 1);
    return {
      id: state.id.get(),
      color: colors[Math.floor(Math.random() * colors.length)],
      word: "",
      description: ""
    };
  }

  function getSquareIndexById (id) {
    return state.squares.get().indexOf(state.squares.get().find(element => element.id == id));
  }

  
  function getClickedSquare () {
      return state.squares[getSquareIndexById(state.clickedSquare.get())];
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("The user is still logged in :0")
      // ...
    } else {
      // User is signed out
      state.loggedIn.set(null);
      navigation.navigate("Auth");
    }
  });
  
  return (

      <View style={styles.container}>
        <SquareGrid></SquareGrid>
        <View style={styles.banner}>
          <Text>Player {state.turn.get() % state.noPlayers.get() + 1}'s Turn! </Text>
          <Text onPress={() => { 
            signOut(auth)
            .then(() => {
              state.loggedIn.set(null);
              navigation.navigate("Auth");
            })
            .catch((error) => {
              console.log(error);
            })
          }} style={styles.blueUnderline}>Logout</Text>
        </View>
        <TextInput 
          placeholder={"Add a Word to the Grid!"}
          value={state.label.get()} 
          onChangeText={(text) => {state.label.set(text)}}
          style={styles.input}></TextInput>
        <TouchableOpacity 
          onPress={() => {
            // state.squares.merge([createSquare()])
            // state.turn.set(p => p + 1);
            if (state.squares.get().length == 25) {
              console.log("We're done here")
            } else {
              state.squares.merge([createSquare()])
              state.turn.set(p => p + 1);
            }
          }}
          style={styles.addButton}>
          <Text>Add</Text>
        </TouchableOpacity>

        {state.squares.get().length != 0 ?
            <TextInput
            multiline={true}
            style={styles.textarea}
            numberOfLines={4}
            onChangeText={(text) => {
              if (getClickedSquare().word.get() != "") {
                getClickedSquare().description.set(text);
              } else {
                alert(`Fill box ${getClickedSquare().id.get()} with a word first :0`)
              }
            }}
            value={getClickedSquare().description.get()}
            /> : 
            null
        }
       
      </View>
  );
}




