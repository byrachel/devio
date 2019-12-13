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

    const firebaseConfig = {
      apiKey: "AIzaSyBN9dQVrSM_m9Jil7BN5e_--WyJs6ldgQU",
      authDomain: "http-client-demo-c59a6.firebaseapp.com",
      databaseURL: "https://http-client-demo-c59a6.firebaseio.com",
      projectId: "http-client-demo-c59a6",
      storageBucket: "http-client-demo-c59a6.appspot.com",
      messagingSenderId: "656084897783",
      appId: "1:656084897783:web:fa95656fa7db83196a28f2",
      measurementId: "G-QEEE9B846F"
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
