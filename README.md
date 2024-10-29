# ngx-seo

#### **REQUIREMENTS: Angular 18+ with Server Side Rendering**

**`ngx-seo`** is an Angular SEO package for managing meta tags, Open Graph, Twitter cards, structured data, canonical URLs, and more, enhancing the SEO of your Angular applications.

## Features

- Update meta tags (title, description, keywords, etc.)

- Open Graph and Twitter Card support

- Structured data with JSON-LD (Schema.org)

- Canonical URLs for improved SEO

- Language settings (hreflang) for internationalization

- Breadcrumb schema for improved search visibility

- SEO auditing function to check for essential tags

## Installation

```
npm install ngx-seo
```

## Usage

### Step 1: Import `NgxSeoModule` in Your App

Add `NgxSeoModule` to the `imports` array in your main module.

```
import { NgxSeoModule } from 'ngx-seo';

@NgModule({
  imports: [
    NgxSeoModule,
    // other imports...
  ],
})
export class AppModule {}
```

### Step 2: Inject `SEOService` into Your Component

You can now inject the `SEOService` and use it to manage your page’s SEO settings.

```
import { Component, OnInit } from '@angular/core';
import { SEOService } from 'ngx-seo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SEOService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Home - My Angular App',
      description: 'This is the home page description.',
      keywords: 'Angular, SEO, Open Graph',
      author: 'Your Name',
      imageUrl: 'https://example.com/image.jpg',
      url: 'https://example.com/home',
      robots: 'index,follow'
    });

    this.seoService.setTwitterTags({
      cardType: 'summary_large_image',
      title: 'Home - My Angular App',
      creator: 'Your Name',
      description: 'This is the home page description.',
      image: 'https://example.com/image.jpg'
    });

    this.seoService.setCanonicalUrl('https://example.com/abc');

    this.seoService.setRobotsTag('noindex');

    this.seoService.setHreflang('en', 'https://example.com/en');

    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "My Angular App",
      "url": "https://example.com",
      "logo": "https://example.com/logo.png"
    });

    this.seoService.setBreadcrumbSchema([
      { name: 'Home', url: 'https://example.com' },
      { name: 'Blog', url: 'https://example.com/blog' }
    ]);

    this.seoService.auditSEO(); // Run SEO audit to check essential tags
  }
}
```

## API Reference

### `1. updateMetaTags(tags: MetaTags)`

Sets common meta tags such as title, description, keywords, and Open Graph tags.

#### Parameters

- `tags`: Object containing properties like `title`, `description`, `keywords`, `author`, `imageUrl`, `url`, and `robots`.

#### Example

```
this.seoService.updateMetaTags({
  title: 'Product Page',
  description: 'Description of the product.',
  keywords: 'Product, E-commerce, Shop',
  imageUrl: 'https://example.com/product.jpg',
  url: 'https://example.com/product',
  robots: 'index,follow'
});
```

### `2. setTwitterTags(tags: { title: string; description: string; image: string; cardType: string })`

Sets Twitter Card metadata.

#### Parameters

- `tags`: Object containing properties `cardType`, `title`, `creator`, `description`, `image`.

#### Example

```
this.seoService.setTwitterTags({
  cardType: 'summary_large_image',
  title: 'Product - My Angular App',
  creator: 'Your Name',
  description: 'Description for Twitter Card.',
  image: 'https://example.com/product.jpg'
});
```

### `3. setCanonicalUrl(url?: string)`

Sets the canonical URL for the page.

#### Parameters

- `url` (optional): The URL to set as canonical. 

#### Example

```
this.seoService.setCanonicalUrl('https://example.com/page');`
```

### `4. setRobotsTag(content: string)`

Sets the robots meta tag to control indexing and following.

#### Parameters

- `content`: A string like `index,follow` or `noindex,nofollow`.

#### Example

```
this.seoService.setRobotsTag('index,follow');
```

### `5. setHreflang(locale: string, url: string)`

Sets the `hreflang` attribute for internationalization.

#### Parameters

- `locale`: Locale code (e.g., `en`, `es`).
- `url`: URL corresponding to the specified locale.

#### Example

```
this.seoService.setHreflang('es', 'https://example.com/es');
```

### `6. setStructuredData(schema: any)`

Sets structured data using JSON-LD for Schema.org. Useful for enhancing SEO with rich results.

#### Parameters

- `schema`: JSON object with structured data schema.

#### Example

```
this.seoService.setStructuredData({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "My Angular App",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png"
});
```

### `7. setBreadcrumbSchema(breadcrumbs: { name: string; url: string }[])`

Adds a Breadcrumb schema for SEO.

#### Parameters

- `breadcrumbs`: Array of objects, each containing a `name` and `url`.

#### Example

```
this.seoService.setBreadcrumbSchema([
  { name: 'Home', url: 'https://example.com' },
  { name: 'Blog', url: 'https://example.com/blog' }
]);
```

### `8. auditSEO()`

Checks the page for essential SEO tags (like title, description, and image) and logs any missing tags.

#### Example

```
this.seoService.auditSEO();
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.
