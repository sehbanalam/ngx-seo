import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  imageUrl?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(private meta: Meta, private title: Title) {}

  updateMetaTags(tags: MetaTags): void {
    if (tags.title) {
      this.title.setTitle(tags.title);
      this.meta.updateTag({ property: 'og:title', content: tags.title });
    }

    if (tags.description) {
      this.meta.updateTag({ name: 'description', content: tags.description });
      this.meta.updateTag({ property: 'og:description', content: tags.description });
    }

    if (tags.keywords) {
      this.meta.updateTag({ name: 'keywords', content: tags.keywords });
    }

    if (tags.author) {
      this.meta.updateTag({ name: 'author', content: tags.author });
    }

    if (tags.imageUrl) {
      this.meta.updateTag({ property: 'og:image', content: tags.imageUrl });
    }

    if (tags.url) {
      this.meta.updateTag({ property: 'og:url', content: tags.url });
    }
  }
}
