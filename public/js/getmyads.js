/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export async function getMyAds() {
  try {
    const apiurl = 'http://127.0.0.1:8000/api/v1/users/getMyAds';
    const response = await axios.get(apiurl);
    if (response.data.status === 'success') {
      showAlert('success', 'Ads fetched successfully!');
      console.log(response.data);
      
      const myads = response.data.data.ads;
      console.log(myads);
      if (myads.length > 0) {
        var temph = '';
        var tempb = '';
        temph += '<tr>';
        temph += '<th>Title';
        temph += '<th>Created On';
        document.getElementById('showHead').innerHTML = temph;
        myads.forEach(element => {
          tempb += '<tr>';
          tempb += '<td>' + element.title;
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
}
