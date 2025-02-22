# YCF Components

A collection of modern, accessible React components featured in [shadcn's 21 Dev](https://21st.dev/). Built with Next.js 14, TypeScript, and Tailwind CSS, this library includes interactive components like Custom Cursor, Infinite Scroll Container, Product Gallery with zoom functionality, and Stagger Text animations.

## 🌟 Components

### Custom Cursor
- Smooth cursor animations
- Customizable styles and behaviors
- Interactive hover effects

### Infinite Scroll Container
- Seamless infinite scrolling
- Dynamic content loading
- Performance optimized

### Product Gallery
- Interactive image zoom
- Keyboard navigation
- Touch-friendly interface
- Image preloading

### Stagger Text
- Text animation effects
- Customizable timing
- Smooth transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: 
  - Radix UI Primitives
  - react-inner-image-zoom
- **Motion**: Framer Motion
- **Icons**: Lucide Icons
- **Theme**: Dark mode support with next-themes

## 📦 Installation

```bash
npm install
# or
yarn install
```

## 🚀 Usage

### Custom Cursor
```tsx
import { CustomCursor } from '@/components/custom-cursor'

function App() {
  return (
    <div>
      <CustomCursor />
      {/* Your content */}
    </div>
  )
}
```

### Infinite Scroll Container
```tsx
import { InfiniteScrollContainer } from '@/components/infinite-scroll-container'

function App() {
  return (
    <InfiniteScrollContainer onLoadMore={() => loadMoreItems()}>
      {/* Your scrollable content */}
    </InfiniteScrollContainer>
  )
}
```

### Product Gallery
```tsx
import { ProductGallery } from '@/components/product'

function App() {
  const images = ['/product-1.jpg', '/product-2.jpg']
  return <ProductGallery imagesUrl={images} />
}
```

### Stagger Text
```tsx
import { StaggerText } from '@/components/stagger-text'

function App() {
  return <StaggerText text="Hello World" />
}
```

## ✨ Features

- Modern, responsive design
- TypeScript support
- Accessible components
- Mobile-first approach
- Performance optimized
- Framer Motion animations
- Tailwind CSS styling
- Dark mode support

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

Licensed under the MIT License. See LICENSE file for details.

