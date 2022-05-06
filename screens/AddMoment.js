import * as ImagePicker from 'expo-image-picker';
import { View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import styles from '../utils/styles';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function AddMoment({ navigation }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const [recording, setRecording] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }
 
    return (
        <View style={styles.loginContainer}>          
    <TouchableOpacity 
          onPress={() => { pickImage }}
          style={styles.imagechooser}>
          <Text>Input Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <TouchableOpacity
         style={styles.audioChooser}
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onPress={recording ? stopRecording : startRecording}>
              <Text>Add Audio here</Text>
          </TouchableOpacity>
        <TextInput
            placeholder={"share a memory!"}
            style={styles.memoryBox}>
        </TextInput>
        <TouchableOpacity
            style={styles.submitButton}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
