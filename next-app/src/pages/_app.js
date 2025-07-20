// /pages/_app.js
//PORT=4000 npm run dev
//url('/assets/img/bg.jpg');
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/bootstrap.min.css';
import '@/styles/custome-style.css'
import '@/styles/globals.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { loadUserFromStorage } from '@/store/authSlice';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Script from 'next/script';


function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></Script>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <AuthInitializer />
          <Component {...pageProps} />
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

