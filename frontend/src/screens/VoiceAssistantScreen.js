import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Voice from '@react-native-voice/voice';

import { sendMessage } from '../services/api';

const VoiceAssistantScreen = () => {
  const [text, setText] = useState('');

  const [reply, setReply] = useState('');

  const [listening, setListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = event => {
      if (event.value && event.value.length > 0) {
        setText(event.value[0]);

        setListening(false);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const startListening = async () => {
    console.log('Mic button pressed');

    const hasPermission = await requestMicPermission();

    console.log('Permission:', hasPermission);

    if (!hasPermission) {
      return;
    }

    try {
      console.log('Starting voice...');

      setListening(true);

      await Voice.start('en-US');

      console.log('Voice started');
    } catch (error) {
      console.log('VOICE ERROR:', error);

      setListening(false);
    }
  };

  const askAI = async () => {
    const aiReply = await sendMessage(text);

    setReply(aiReply);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Voice Assistant</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Speak or type..."
        placeholderTextColor="#777"
      />

      <TouchableOpacity style={styles.micButton} onPress={startListening}>
        <Text style={styles.buttonText}>
          {listening ? 'Listening...' : '🎤 Speak'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.askButton} onPress={askAI}>
        <Text style={styles.buttonText}>Ask AI</Text>
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
    backgroundColor: '#121212',
  },

  title: {
    fontSize: 32,
    marginBottom: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#1E1E1E',
    color: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 18,
  },

  micButton: {
    backgroundColor: '#7B2CBF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },

  askButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  reply: {
    marginTop: 40,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default VoiceAssistantScreen;
