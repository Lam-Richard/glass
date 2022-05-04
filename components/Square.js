import { Text, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { useEffect } from 'react';
import globalState from '../utils/globalState';

// Some state has to be passed for ID purposes...
export const Square = ({id}) => {
    const state = useState(globalState);

    function getSquareIndexById (id) {
      return state.squares.get().indexOf(state.squares.get().find(element => element.id == id));
    }
  
    
    function getThisSquare () {
        return state.squares[getSquareIndexById(id)];
    }

    useEffect(() => {
        console.log("HELLO? ", getThisSquare().word.get());
    },[getThisSquare().word.get()])

    return (
      <TouchableOpacity 
        onLongPress={() => {
            console.log("A Long Press Happened...!");
        }}
        onPress={() => {
            console.log("This is the label: ", state.label.get());
            console.log("This is the color: ", getThisSquare().color.get());
            state.clickedSquare.set(getThisSquare().id.get());    
            
            if (getThisSquare().word.get() != "") {
                console.log("Box Already Labeled!")
            } else if (state.label.get() == "") {
                console.log("Label cannot be empty!")
            } else {
                getThisSquare().word.set(state.label.get());
                state.label.set("");
                state.turn.set(p => p + 1);
            }
        }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          backgroundColor: getThisSquare().color.get()
        }}>
        <Text style={{height: 30, color: 'black', zIndex: 999}}>{getThisSquare().word.get()}</Text>
      </TouchableOpacity>
    )
  }