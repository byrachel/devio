import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog.model';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Blog;

  constructor(private postsService: PostsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.post = new Blog('', '', '', '', '');
    const id = this.route.snapshot.params['id'];

    this.postsService.getSinglePost(+id).then(
      (post: Blog) => {
        this.post = post;
      }
    );
  }

  onBack() {
    this.router.navigate(['/blog']);
  }

  onClickCategory(category: string) {
    this.router.navigate(['/blog', category]);
  }

}