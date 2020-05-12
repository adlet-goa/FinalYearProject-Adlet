/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const buykiosk = async (
  name,
  address,
  lat,
  lon,
  description,
  operatingHours,
  operatingDays,
  screenSize
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/kiosks',
      data: {
        name,
        address,
        lat,
        lon,
        description,
        operatingHours,
        operatingDays,
        screenSize
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Purchase Registered');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
