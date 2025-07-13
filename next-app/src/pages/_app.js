// /pages/_app.js
//import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { loadUserFromStorage } from '@/store/authSlice';
import { GoogleOAuthProvider } from '@react-oauth/google'
import '@/styles/custome-style.css';
import '@/styles/globals.css';

function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <AuthInitializer />
        <Component {...pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

