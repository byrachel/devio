import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Blog;
  isAuth: boolean;
  idToUpdate:number;

  constructor(private postsService: PostsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.post = new Blog('', '', '', '', '');
    const id = this.route.snapshot.params['id'];

    this.postsService.getSinglePost(+id).then(
      (post: Blog) => {
        this.post = post;
        this.idToUpdate = id;
      }
    );

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

  onBack() {
    this.router.navigate(['/blog']);
  }

  onClickCategory(category: string) {
    this.router.navigate(['/blog', category]);
  }

  onEditPost(post) {
    if(this.isAuth) {
      let id = this.idToUpdate;
      this.router.navigate(['/blog', 'new', id]);
      }
      else {
        this.router.navigate(['/signup']);
      }
    }

}