import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import globalState from '../utils/globalState';
import { SquareGrid } from '../components/SquareGrid';
import { colors, fallColors, basketColors } from '../utils/colors';
import styles from '../utils/styles';

export default function HomeScreen() {

  
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
  
  return (

      <View style={styles.container}>
        <SquareGrid></SquareGrid>
        <Text style={styles.banner}>Player {state.turn.get() % state.noPlayers.get() + 1}'s Turn!</Text>
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




