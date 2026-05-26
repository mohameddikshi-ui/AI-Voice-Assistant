import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Tts from 'react-native-tts';

import { sendMessage } from '../services/api';

const VoiceAssistantScreen = () => {

  const [text, setText] = useState('');

  const [reply, setReply] = useState('');

  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!text.trim()) {

      setReply('Please type something');

      return;
    }

    try {

      setLoading(true);

      setReply('');

      const aiReply = await sendMessage(text);

      setReply(aiReply);

      // AI SPEAKS RESPONSE
      Tts.speak(aiReply);

    } catch (error) {

      console.log(error);

      setReply('Error talking to AI');

    } finally {

      setLoading(false);
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        AI Voice Assistant
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Type message..."
        placeholderTextColor="#777"
      />

      <TouchableOpacity
        style={styles.askButton}
        onPress={askAI}
      >

        {
          loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              Ask AI
            </Text>
          )
        }

      </TouchableOpacity>

      <Text style={styles.reply}>
        {reply}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },

  title: {
    fontSize: 34,
    marginBottom: 35,
    color: 'white',
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    fontSize: 18,
  },

  askButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  reply: {
    marginTop: 40,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    lineHeight: 34,
  },
});

export default VoiceAssistantScreen;