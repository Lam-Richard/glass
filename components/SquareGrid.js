import { View } from 'react-native';
import { useState } from '@hookstate/core';
import globalState from '../utils/globalState';
import { Square } from './Square';

export const SquareGrid = () => {

    const state = useState(globalState);
  
    return(
      <View style={{
        width: Math.ceil(Math.sqrt(state.squares.get().length)) * 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        top: 165
  
      }}>
        {state.squares.get().map(val => {
          return (
            <Square 
              key={val.id} 
              id={val.id}
            >
            </Square>
          )}
          )}
      </View>
    )
  }