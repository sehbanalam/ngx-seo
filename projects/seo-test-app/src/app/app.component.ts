import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SEOService } from 'ngx-seo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'seo-test-app';

  constructor(private seoService: SEOService) {}

  ngOnInit(){
    this.seoService.updateMetaTags({
      title: 'Sehban - My Angular App',
      description: 'This is the home page description.',
      keywords: 'Angular, SEO, Open Graph',
      author: 'Sehban Alam',
      imageUrl: 'https://example.com/image.jpg',
      url: 'https://example.com/home'
    });
  }
}
