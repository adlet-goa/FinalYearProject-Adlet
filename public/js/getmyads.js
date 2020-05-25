/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export async function getMyAds() {
  try {
    const apiurl = '/api/v1/users/getMyAds';
    const response = await axios.get(apiurl);
    if (response.data.status === 'success') {
      showAlert('success', 'Ads fetched successfully!');
      const myads = response.data.data.ads;
      if (myads.length > 0) {
        var temph = '';
        var tempb = '';
        temph += '<tr>';
        temph += '<th>Title';
        temph += '<th>Category';
        temph += '<th>Est Reach';
        temph += '<th>Duration Start';
        temph += '<th>Duration End';
        temph += '<th>Price';
        temph += '<th>No. of Kiosks Running this Ad';
        document.getElementById('showHead').innerHTML = temph;
        myads.forEach(element => {
          tempb += '<tr>';
          tempb += '<td>' + element.title;
          tempb += '<td>' + element.category;
          tempb += '<td>' + element.estReach;
          tempb += '<td>' + element.duration[0].split('T')[0];
          tempb += '<td>' + element.duration[1].split('T')[0];
          tempb += '<td>' + element.price;
          tempb += '<td>' + element.kiosks.length;
        });
        document.getElementById('showData').innerHTML = tempb;
      } else {
        showAlert('success', 'No Data');
      }
    }
  } catch (error) {
    console.error(error);
  }
}
