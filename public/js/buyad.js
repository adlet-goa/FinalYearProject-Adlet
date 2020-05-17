/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const buyad = async (
  title,
  mimeType,
  category,
  date,
  displayHours,
  displayDays
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/ads',
      data: {
        title,
        mimeType,
        category,
        duration:[date],
        displayHours,
        displayDays
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Registered Ad successfully!');
      window.setTimeout(() => {
        location.assign('/uploadad');
      }, 2500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
