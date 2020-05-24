/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const getads = async kioskid => {
  try {
    const apiurl = `http://127.0.0.1:3000/api/v1/kiosks/${kioskid}/ads`;
    const response = await axios.get(apiurl);
    if (response.data.status === 'success') {
      showAlert('success', 'Ads fetched successfully!');
      const getmyads = response.data.data.data;
      if (getmyads.length > 0) {
        var temph = '';
        var tempb = '';
        temph += '<tr>';
        temph += '<th>Title';
        temph += '<th>Category';
        temph += '<th>Created On';
        document.getElementById('showHead').innerHTML = temph;
        getmyads.forEach(element => {
          tempb += '<tr>';
          tempb += '<td>' + element.title;
          tempb += '<td>' + element.category;
          tempb += '<td>' + element.createdAt;
        });
        document.getElementById('showData').innerHTML = tempb;
      } else {
        showAlert('success', 'No Data');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export async function getMyKiosks() {
  try {
    const apiurl = 'http://127.0.0.1:3000/api/v1/users/getMyKiosks';
    const response = await axios.get(apiurl);
    if (response.data.status === 'success') {
      showAlert('success', 'Ads fetched successfully!');
      const mykiosks = response.data.data.kiosks;
      console.log(mykiosks.length);
      if (mykiosks.length > 0) {
        var temph = '';
        var tempb = '';
        temph += '<tr>';
        temph += '<th>Title';
        temph += '<th>Created On';
        document.getElementById('showHeadK').innerHTML = temph;
        mykiosks.forEach(element => {
          tempb += '<tr>';
          tempb += '<td>' + element.title;
          tempb += '<td>' + element.createdAt;
        });
        document.getElementById('showDataK').innerHTML = tempb;
      } else {
        showAlert('success', 'No Data');
      }
    }
  } catch (error) {
    console.error(error);
  }
}
