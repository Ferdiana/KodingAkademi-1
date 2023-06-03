import * as React from 'react';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    navigationRef.navigate(name, params);
  } else {
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// Gunakan fungsi ini untuk melakukan navigasi dari tempat lain dalam aplikasi Anda
// Misalnya, dalam komponen Anda, Anda bisa menggunakan:
// navigate('home', { screen: 'Dashboard' });

// Jika Anda ingin menggunakan fungsi ini di luar komponen, pastikan Anda telah mengimpor `navigationRef` dari file ini, dan Anda juga telah menginisialisasi `RootNavigation.js` di akar aplikasi Anda.
// Misalnya, dalam file `App.js`, Anda bisa menggunakan:
// import { navigationRef } from './RootNavigation';
// ...
// <NavigationContainer ref={navigationRef}>
// ...

export default function RootNavigation() {
  return null;
}
