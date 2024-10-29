import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SEOService } from 'ngx-seo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'seo-test-app';

  constructor(private seoService: SEOService) {}

  tags = {
    title: 'NGX-SEO',
    description: 'This is the home page description.',
    keywords: 'Angular, SEO, Open Graph',
    author: 'Sehban Alam',
    imageUrl: 'https://example.com/image.jpg',
    url: 'https://example.com/home',
  };

  ngOnInit() {
    this.seoService.updateMetaTags(this.tags);

    this.seoService.setTwitterTags({
      title: 'NGX-SEO',
      creator:"Sehban Alam",
      description: 'This is the home page description.',
      image: 'https://example.com/image.jpg',
      cardType: 'summary_large_image',
    });

    
  }
}
