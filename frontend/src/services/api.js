import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const sendMessage = async message => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message: message,
    });

    return response.data.reply;
  } catch (error) {
    console.log('API ERROR:', JSON.stringify(error, null, 2));

    return 'Error talking to AI';
  }
};
