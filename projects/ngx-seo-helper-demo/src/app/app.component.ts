import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SEOService } from 'ngx-seo-helper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ngx-seo-helper-demo';

  constructor(private seoService: SEOService){}

  ngOnInit(){

    this.seoService.updateMetaTags({
      title: 'Home - My Angular App',
      description: 'This is the home page description.',
      keywords: 'Angular, SEO, Open Graph',
      author: 'Your Name',
      imageUrl: 'https://example.com/image.jpg',
      url: 'https://example.com/home',
      robots: 'index,follow'
    });

  }
}
