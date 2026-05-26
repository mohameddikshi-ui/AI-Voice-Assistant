import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000';

export const sendMessage = async message => {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      message: message,
    });

    return response.data.reply;
  } catch (error) {
    console.log(error);

    return 'Error talking to AI';
  }
};
