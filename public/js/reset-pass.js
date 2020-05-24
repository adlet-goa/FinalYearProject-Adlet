/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const getResetmail = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/forgotPassword',
      data: {
        email
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Mail Sent');
      window.setTimeout(() => {
        location.assign('/reset-password');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
