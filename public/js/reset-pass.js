/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const getResetmail = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
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

export const resetpassword = async (token, password, passwordConfirm) => {
  try {
    const apiurl = ` /api/v1/users/resetPassword/${token}`;
    const res = await axios({
      method: 'PATCH',
      url: apiurl,
      data: {
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password Changed!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
