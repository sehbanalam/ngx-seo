import { Injectable, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  imageUrl?: string;
  url?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  constructor(
    private meta: Meta,
    private title: Title,
    private renderer: Renderer2,
  ) {}

  // General Meta Tags and Open Graph
  updateMetaTags(tags: MetaTags): void {
    if (tags.title) {
      this.title.setTitle(tags.title);
      this.meta.updateTag({ property: 'og:title', content: tags.title });
    }

    if (tags.description) {
      this.meta.updateTag({ name: 'description', content: tags.description });
      this.meta.updateTag({
        property: 'og:description',
        content: tags.description,
      });
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

    if (tags.robots) {
      this.setRobotsTag(tags.robots);
    }
  }

  // Twitter Card Tags
  setTwitterTags(tags: {
    cardType: string;
    title: string;
    creator: string;
    description: string;
    image: string;
    
  }): void {
    this.meta.updateTag({ name: 'twitter:card', content: tags?.cardType });
    this.meta.updateTag({ name: 'twitter:title', content: tags?.title });
    this.meta.updateTag({ name: 'twitter:creator', content: tags?.creator });
    this.meta.updateTag({
      name: 'twitter:description',
      content: tags.description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });
  }

  // Canonical URL
  setCanonicalUrl(url: string): void {
    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.renderer.appendChild(document.head, link);
  }

  // Robots Meta Tag
  setRobotsTag(content: string): void {
    this.meta.updateTag({ name: 'robots', content });
  }

  // Hreflang Tags for International SEO
  setHreflang(locale: string, url: string): void {
    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', locale);
    link.setAttribute('href', url);
    this.renderer.appendChild(document.head, link);
  }

  // Structured Data Markup (Schema.org)
  setStructuredData(schema: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(document.head, script);
  }

  // Breadcrumbs JSON-LD Markup
  setBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
    this.setStructuredData(schema);
  }

  // Audit SEO - Checks for essential tags
  auditSEO(): void {
    const tags = [
      { name: 'title', selector: 'meta[property="og:title"]' },
      { name: 'description', selector: 'meta[property="og:description"]' },
      { name: 'image', selector: 'meta[property="og:image"]' },
    ];
    tags.forEach((tag) => {
      if (!document.querySelector(tag.selector)) {
        console.warn(`Missing essential SEO tag: ${tag.name}`);
      }
    });
  }
}
