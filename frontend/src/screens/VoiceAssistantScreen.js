import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import VoiceToText from 'react-native-voice-to-text';

import { sendMessage } from '../services/api';

const VoiceAssistantScreen = () => {
  const [text, setText] = useState('');

  const [reply, setReply] = useState('');

  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);

  const startVoiceRecognition = async () => {
    try {
      setListening(true);

      setReply('');

      console.log('Starting voice recognition...');

      const result = await VoiceToText.startListening();

      console.log('VOICE RESULT:', result);

      if (result && result.value && result.value.length > 0) {
        setText(result.value[0]);
      } else {
        setReply('No speech detected');
      }
    } catch (error) {
      console.log('VOICE ERROR:', JSON.stringify(error, null, 2));

      setReply(error?.message || 'Voice recognition failed');
    } finally {
      setListening(false);
    }
  };

  const askAI = async () => {
    if (!text.trim()) {
      setReply('Please speak or type something');

      return;
    }

    try {
      setLoading(true);

      setReply('');

      console.log('Sending to AI:', text);

      const aiReply = await sendMessage(text);

      console.log('AI Reply:', aiReply);

      setReply(aiReply);
    } catch (error) {
      console.log('AI ERROR:', JSON.stringify(error, null, 2));

      setReply('Error talking to AI');
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity
        style={[styles.micButton, listening && styles.listeningButton]}
        onPress={startVoiceRecognition}
      >
        <Text style={styles.buttonText}>
          {listening ? '🎙 Listening...' : '🎤 Speak'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.askButton}
        onPress={askAI}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Ask AI</Text>
        )}
      </TouchableOpacity>

      <View style={styles.replyContainer}>
        <Text style={styles.reply}>{reply}</Text>
      </View>
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

  micButton: {
    backgroundColor: '#7B2CBF',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 15,
    width: '85%',
    alignItems: 'center',
  },

  listeningButton: {
    backgroundColor: '#D00000',
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

  replyContainer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 10,
  },

  reply: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    lineHeight: 34,
  },
});

export default VoiceAssistantScreen;
