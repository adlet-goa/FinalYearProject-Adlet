/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const getads = async kioskid => {
  try {
    const apiurl = `http://127.0.0.1:8000/api/v1/kiosks/${kioskid}`;
    const response = await axios.get(apiurl);
    if (response.data.status === 'success') {
      showAlert('success', 'Ads fetched successfully!');
      const getmyads = response.data.data.data.ads;
      if (getmyads.length > 0) {
        var temph = '';
        var tempb = '';
        temph += '<tr>';
        temph += '<th>Title';
        temph += '<th>Category';
        temph += '<th>Duration Start';
        temph += '<th>Duration End';
        document.getElementById('showHead').innerHTML = temph;
        getmyads.forEach(element => {
          tempb += '<tr>';
          tempb += '<td>' + element.title;
          tempb += '<td>' + element.category;
          tempb += '<td>' + element.duration[0].split('T')[0];
          tempb += '<td>' + element.duration[1].split('T')[0];
        });
        document.getElementById('showData').innerHTML = tempb;
        console.log(element.duration);
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
    const apiurl = 'http://127.0.0.1:8000/api/v1/users/getMyKiosks';
    const response = await axios.get(apiurl);
    if (response.data.status === 'success') {
      showAlert('success', 'Ads fetched successfully!');
      const mykiosks = response.data.data.kiosks;
      if (mykiosks.length > 0) {
        var temph = '';
        var tempb = '';
        temph += '<tr>';
        temph += '<th>Name';
        temph += '<th>Address';
        temph += '<th>Op Hours';
        temph += '<th>Op Days';
        temph += '<th>Subscription';
        temph += '<th>Est Reach';
        temph += '<th>Total Earnings';
        temph += '<th>#Ads Running';
        document.getElementById('showHeadK').innerHTML = temph;
        mykiosks.forEach(element => {
          tempb += '<tr>';
          tempb += '<td>' + element.name;
          tempb += '<td>' + element.location.address;
          tempb += '<td>' + element.operatingHours;
          tempb += '<td>' + element.operatingDays;
          tempb += '<td>' + element.subscription;
          tempb += '<td>' + element.estReach;
          tempb += '<td>' + element.earnings;
          tempb += '<td>' + element.ads.length;
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
