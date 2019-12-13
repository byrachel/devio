import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Blog } from '../../models/Blog.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})

export class SinglePostComponent implements OnInit {

  post : Blog;

  constructor(private router:Router,
              private route: ActivatedRoute,
              private postsService:PostsService) { }

  ngOnInit() {
    this.post = new Blog('','','','');
    const id = this.route.snapshot.params['id'];
    this.postsService.getSinglePost(+id).then(
      (post:Blog) => {
        this.post = post;
      }
    );
  }

  onBack() {
    this.router.navigate(['/blog']);
  }

}
