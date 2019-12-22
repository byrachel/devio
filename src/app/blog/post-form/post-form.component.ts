import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Blog } from '../../models/Blog.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  defaultCategory = 'Formation';

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private postsService:PostsService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      resum: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  onSavePost() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const category = this.postForm.get('category').value;
    const resum = this.postForm.get('resum').value;
    const link = this.postForm.get('link').value;
    const newPost = new Blog(title, content, category, resum, link);
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/blog']);
  }

}
