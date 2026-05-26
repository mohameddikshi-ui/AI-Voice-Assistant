import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

import { sendMessage } from '../services/api';

const VoiceAssistantScreen = () => {
  const [text, setText] = useState('');

  const [reply, setReply] = useState('');

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.log(e);
    }
  };

  Voice.onSpeechResults = async event => {
    const spokenText = event.value[0];

    setText(spokenText);

    const aiReply = await sendMessage(spokenText);

    setReply(aiReply);

    Tts.speak(aiReply);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Voice Assistant</Text>

      <TextInput value={text} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={startListening}>
        <Text style={styles.buttonText}>Start Talking</Text>
      </TouchableOpacity>

      <Text style={styles.reply}>{reply}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
  },

  button: {
    backgroundColor: 'black',
    padding: 15,
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
  },

  reply: {
    marginTop: 30,
    fontSize: 18,
  },
});

export default VoiceAssistantScreen;
