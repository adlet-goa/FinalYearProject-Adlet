/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const uploadads = async (adsid, data) => {
  try {
    const link = `http://127.0.0.1:3000/api/v1/ads/${adsid}`
    const res = await axios({
      method: 'PATCH',
      url:link,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Ad uploaded successfully!');
      window.setTimeout(() => {
        location.assign('/payment');
      }, 2500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
