/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { buykiosk } from './buykiosk';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const signupForm = document.querySelector('.form--signup');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const buykioskFrom = document.querySelector('.form--kiosk');
const buykioskFromGeo = document.querySelector('.form--kioskGeo');

// DELEGATION

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, role, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (buykioskFrom)
  buykioskFrom.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const address = document.getElementById('address').value;
    const description = document.getElementById('description').value;
    const operatingHours = document.getElementById('operatingHours').value;
    const operatingDays = document.getElementById('operatingDays').value;
    const screenSize = document.getElementById('screenSize').value;
    buykiosk(
      name,
      lat,
      lon,
      address,
      description,
      operatingHours,
      operatingDays,
      screenSize
    );
  });

if (buykioskFromGeo)
  buykioskFromGeo.addEventListener('click', e => {
    e.preventDefault();
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(lat, lon);
        document.getElementById('lat').value = lat;
        document.getElementById('lon').value = lon;
      });
    } else {
      console.log('geolocation not available');
    }
  });
