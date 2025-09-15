'use client';

import { Provider } from 'react-redux';
import { store } from '../components/slice/Store';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
