import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'devio';
  isAuth: boolean;

  constructor (private authService: AuthService) {

    var firebaseConfig = {
      apiKey: "AIzaSyBOxxIul37COnLRwhW5TcEuVwrFOzQ3FUc",
      authDomain: "devio-12a3e.firebaseapp.com",
      databaseURL: "https://devio-12a3e.firebaseio.com",
      projectId: "devio-12a3e",
      storageBucket: "devio-12a3e.appspot.com",
      messagingSenderId: "183025572234",
      appId: "1:183025572234:web:3efd48e44a9e9182189073"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        }
        else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
