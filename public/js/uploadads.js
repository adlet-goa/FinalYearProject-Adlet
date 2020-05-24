/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const uploadads = async media => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/ads',
      data: {
        media
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Registered Ad successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 2500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
