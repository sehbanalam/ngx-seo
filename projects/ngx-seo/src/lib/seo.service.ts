import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
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
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
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
    if (isPlatformBrowser(this.platformId)) {
      const link: HTMLLinkElement = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);

      // Remove any existing canonical link to avoid duplicates
      const existingLink = document.querySelector('link[rel="canonical"]');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }

      document.head.appendChild(link);
    }
  }
  // Robots Meta Tag
  setRobotsTag(content: string): void {
    this.meta.updateTag({ name: 'robots', content });
  }

 // Hreflang Tags for International SEO
 setHreflang(locale: string, url: string): void {
  if (isPlatformBrowser(this.platformId)) {
    const link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', locale);
    link.setAttribute('href', url);

    // Remove any existing hreflang tag for the locale to avoid duplicates
    const existingLink = document.querySelector(`link[rel="alternate"][hreflang="${locale}"]`);
    if (existingLink) {
      document.head.removeChild(existingLink);
    }

    document.head.appendChild(link);
  }
}

 // Structured Data Markup (Schema.org)
 setStructuredData(schema: any): void {
  if (isPlatformBrowser(this.platformId)) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    // Remove any existing structured data script to avoid duplicates
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    document.head.appendChild(script);
  }
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
      if (isPlatformBrowser(this.platformId)) {
        const tags = [
          { name: 'title', selector: 'meta[property="og:title"]' },
          { name: 'description', selector: 'meta[property="og:description"]' },
          { name: 'image', selector: 'meta[property="og:image"]' },
        ];
        
        tags.forEach((tag) => {
          if (!document.querySelector(tag.selector)) {
            console.warn(`Missing essential SEO tag: ${tag.name}`);
          } else {
            console.log(`=> SEO Audit - No problems found in: ${tag.name}`);
          }
        });
      }
    }
}
