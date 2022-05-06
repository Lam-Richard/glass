import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import globalState from '../utils/globalState';
import { SquareGrid } from '../components/SquareGrid';
import { colors, fallColors, basketColors } from '../utils/colors';
import styles from '../utils/styles';
import { auth } from '../utils/firebase';
import { database as db } from '../utils/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, get, set, push } from 'firebase/database';


export default function HomeScreen({ navigation }) {
  
  const state = useState(globalState);
  
  useEffect(() => {
    const turnRef = ref(db, 'turn');
    const idRef = ref(db, 'squareId');

    onValue(turnRef, (snapshot) => {
      console.log("FRIED");
      const data = snapshot.val();
      state.gameTurn.set(data);
    });

    onValue(idRef, (snapshot) => {
      const data = snapshot.val();
      state.id.set(data);
    })

  }, [])

  // useEffect(() => {
  //   const squaresRef = ref(db, 'squares');
  //   onValue(squaresRef, (snapshot) => {
  //     console.log("FIRED");
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       if (data != undefined) {
  //         state.squares.set(Object.values(data));
  //       }
  //     }
     
  //   })
  // }, [])

  // useEffect(async () => {
  //   console.log("Did this fire :0")
  //   const squaresRef = ref(db, 'squares');
  //   for (var square of state.squares.get()) {
  //     console.log(square);
  //   }
  //   // await set(squaresRef, state.squares.get());
  // }, [state.squares.get()])
  
  useEffect(() => {
    console.log(state.label.get());
  },[state.label.get()])




  async function createSquare () {
    await upId();
    return {
      id: state.id.get(),
      color: colors[Math.floor(Math.random() * colors.length)],
      word: "",
      description: ""
    };
  }

  async function upId () {
    const idRef = ref(db, 'squareId');
    const snapshot = await get(idRef);
    const data = snapshot.val();
    await set(idRef, data + 1);
  }

  function getSquareIndexById (id) {
    return state.squares.get().indexOf(state.squares.get().find(element => element.id == id));
  }

  
  function getClickedSquare () {
      return state.squares[getSquareIndexById(state.clickedSquare.get())];
  }


 
  useEffect(() => {
    const playersRef = ref(db, 'players');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("The user is still logged in :0");
        onValue(playersRef, async (snapshot) => {
          const data = await snapshot.val();
          const dataArr = Object.values(data);
          const player = dataArr.find(element => element.playerEmail == user.email);
          state.currentPlayer['playerEmail'].set(player.playerEmail);
          state.currentPlayer['playerId'].set(player.playerId);
          console.log(state.currentPlayer.get());
        })
        // ...
      } else {
        // User is signed out
        state.loggedIn.set(null);
        state.currentPlayer['playerEmail'].set("");
        state.currentPlayer['playerId'].set(0);
        navigation.navigate("Auth");

      }
    });
  }, [])
 
  useEffect(() => {
    state.myTurn.set(state.gameTurn.get() + 1 == state.currentPlayer['playerId'].get());
  }, [state.gameTurn.get(), state.currentPlayer['playerId'].get()])
  
  async function updateTurn () {
    const newTurnRef = ref(db, 'turn');
    const snapshot = await get(newTurnRef);
    const data = snapshot.val();
    await set(newTurnRef, (data + 1) % (state.noPlayers.get()));
  }

  return (

      <View style={styles.container}>
        <SquareGrid></SquareGrid>
        <View style={styles.banner}>
          <Text>{ state.myTurn.get() ? "It's Your Turn! " : `It's Player ${state.gameTurn.get() + 1}'s move...! `}</Text>
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
          onPress={async () => {
            if (state.myTurn.get() == true) {
              if (state.squares.get().length == 25) {
                console.log("We're done here")
              } else {
                const squaresRef = ref(db, 'squares');
                const newSquareRef = push(squaresRef);
                const newSquare = await createSquare();
                await set(newSquareRef, newSquare);
                state.squares.merge([newSquare]);
                await updateTurn();
              }
            } else {
              console.log("It's not your turn :0")
            }
            
          }}
          style={styles.addButton}>
          <Text>New Square</Text>
        </TouchableOpacity>

        {state.squares.get().length != 0 ?
            <TextInput
            multiline={true}
            style={styles.textarea}
            numberOfLines={4}
            // This part will not exist in the future if we want separate page
            // onChangeText={(text) => {
            //   if (getClickedSquare().word.get() != "") {
            //     getClickedSquare().description.set(text);
            //   } else {
            //     alert(`Fill box ${getClickedSquare().id.get()} with a word first :0`)
            //   }
            // }}
            // value={getClickedSquare().description.get()}
            /> : 
            null
        }
       
      </View>
  );
}




