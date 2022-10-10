import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import configJson from "./config.json";
class Firebase {
  public app!: firebase.app.App;
  constructor() {
    console.log("%c firebase - initialize", "color: #3182ce;");
    console.log(configJson);
    if (!this.app && !firebase.apps.length)
      this.app = firebase.initializeApp(configJson as any);
  }

  signIn(token: string) {
    if (!this.app) throw new Error("Must have instance firebase app!");
    this.app
      .auth()
      .signInWithCustomToken(token)
      .then(() => {
        console.log("%c firebase - signin success", "color: #4FD1C5;");
      })
      .catch((error) => {
        console.log("%c firebase - error: ", "color: pink", error);
      });
  }
}

export default Firebase;
