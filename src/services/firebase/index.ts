import firebase from 'firebase/compat/app';
// import "firebase/compat/auth";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
class Firebase {
  private app!: firebase.app.App;
  private auth!: Auth;
  constructor() {
    console.log('%c firebase - initialize', 'color: #3182ce;');
    if (!this.app && !firebase.apps.length) {
      const configuration = this.initializeConfiguration();
      this.app = firebase.initializeApp(configuration);
      this.auth = getAuth(this.app);
    }
  }

  initializeConfiguration() {
    return {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    };
  }

  signIn = async (email: string, password: string) => {
    if (!this.app) throw new Error('Must have firebase instance app!');

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('%c firebase - signin success', 'color: #4FD1C5;');
      const user = userCredential.user;
      return user;
    } catch (error: any) {
      console.log('%c firebase - error: ', 'color: pink', error.message);
      throw error;
    }
  };

  createUserAccount = async (email: string, password: string) => {
    if (!this.app) throw new Error('Must have firebase instance app!');
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error: any) {
      console.log('%c firebase - error: ', 'color: pink', error.message);
      throw error;
    }
  };
}

export default Firebase;
