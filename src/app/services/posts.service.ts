import { Injectable } from '@angular/core';
import { Blog } from '../models/Blog.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // Je crée mon tableau d'articles
  posts: Blog[] = [];
  // Je récupère un subject afin de créer le tableau
  postSubject = new Subject<Blog[]>();

  constructor(private route:Router) {
    this.getPosts();
  }

  emitPosts() {
    this.postSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/blog').set(this.posts);
  }

  getPosts() {
    // 'value' permet à Firebase de faire une maj sur tous les appareils connectés dès qu'on fait une modification.
    // La fonction callback reçoit DataSnapshot qui contient plusieurs méthodes dont val() qui retourne la valeur des données.
    firebase.database().ref('/blog').on('value', (data: Datasnapshot) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

    getPostsByCategory(category:string) {
      firebase.database().ref('/blog').orderByChild("category").equalTo(category).on("value", (data: Datasnapshot) => {
        this.posts = data.val() ? data.val() : [];
        console.log(this.posts)

      });
    }

  createNewPost(newPost:Blog) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }
  
}
