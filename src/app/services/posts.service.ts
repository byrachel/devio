import { Injectable } from '@angular/core';
import { Blog } from '../models/Blog.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { Router } from '@angular/router';

@Injectable()

export class PostsService {
  // Je crée mon tableau d'articles
  posts: Blog[] = [];
  // Je récupère un post afin de créer le tableau
  postSubject = new Subject<Blog[]>();

  emitPosts() {
    this.postSubject.next(this.posts);
  }

  constructor(private route:Router) {
    this.getPosts();
  }

  savePosts() {
    firebase.database().ref('/blog').set(this.posts);
  }

  // updatePost(post,index) {
  //   this.posts[index] = post;
  //   this.emitPosts;
  // }

  updatePost(id, newPost:Blog){
    //post.title = post.title;
    console.log(id + newPost)
    firebase.database().ref('/blog/' +id).update(newPost).catch(
      (error) => {
        console.log(error);
      }
    );
  }


  getPosts() {
    // 'value' permet à Firebase de faire une maj sur tous les appareils connectés dès qu'on fait une modification.
    // La fonction callback reçoit DataSnapshot qui contient plusieurs méthodes dont val() qui retourne la valeur des données.
    firebase.database().ref('/blog').on('value', (data: Datasnapshot) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/blog/' + id).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // getPostsByCategory(category:string) {
  //   firebase.database().ref('/blog' + category).orderByChild("category").equalTo(category).on("value", (data: Datasnapshot) => {
  //       this.posts = data.val() ? data.val() : [];
  //   });
  // }

  createNewPost(newPost:Blog) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

}