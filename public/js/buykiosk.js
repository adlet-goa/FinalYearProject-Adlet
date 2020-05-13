/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const buykiosk = async (
  name,
  lat,
  lon,
  address,
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
        location: {
          address,
          coordinates: [lat, lon],
          description
        },
        operatingHours,
        operatingDays,
        screenSize
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Registered Kiosk successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 2500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
