/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const buyad = async (
  title,
  category,
  dateStart,
  dateEnd,
  displayHours,
  displayDays,
  kiosks,
  advertiser
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/ads',
      data: {
        title,
        category,
        duration: [dateStart, dateEnd],
        displayHours,
        displayDays,
        kiosks,
        advertiser
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Registered Ad successfully!');
      window.setTimeout(() => {
        location.assign('/uploadads');
      }, 2500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
