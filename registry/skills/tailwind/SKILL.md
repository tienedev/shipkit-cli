---
name: tailwind
description: Tailwind CSS patterns, utilities, and component styling best practices. Use when building UIs with Tailwind CSS.
---

# Tailwind CSS

Utility-first CSS patterns and best practices.

## Core Utilities

### Layout
```html
<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">

<!-- Grid -->
<div class="grid grid-cols-3 gap-6">

<!-- Container -->
<div class="container mx-auto px-4">
```

### Spacing
```html
<!-- Padding -->
<div class="p-4 px-6 py-2">

<!-- Margin -->
<div class="m-4 mx-auto mt-8">

<!-- Gap (flex/grid) -->
<div class="flex gap-4">
```

### Typography
```html
<h1 class="text-3xl font-bold text-gray-900">
<p class="text-base text-gray-600 leading-relaxed">
<span class="text-sm font-medium text-blue-600">
```

### Colors
```html
<!-- Background -->
<div class="bg-white dark:bg-gray-900">

<!-- Text -->
<p class="text-gray-900 dark:text-gray-100">

<!-- Border -->
<div class="border border-gray-200">
```

## Responsive Design

```html
<!-- Mobile-first approach -->
<div class="
  w-full          <!-- Mobile -->
  md:w-1/2        <!-- Tablet -->
  lg:w-1/3        <!-- Desktop -->
">

<!-- Breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536) -->
```

## States & Variants

```html
<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-600">

<!-- Focus -->
<input class="focus:ring-2 focus:ring-blue-500 focus:outline-none">

<!-- Active -->
<button class="active:scale-95">

<!-- Disabled -->
<button class="disabled:opacity-50 disabled:cursor-not-allowed">

<!-- Group hover -->
<div class="group">
  <span class="group-hover:text-blue-600">
</div>
```

## Dark Mode

```html
<!-- Automatic with class strategy -->
<div class="bg-white dark:bg-gray-900">
  <p class="text-gray-900 dark:text-gray-100">
</div>
```

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
}
```

## Common Components

### Button
```html
<button class="
  px-4 py-2
  bg-blue-600 hover:bg-blue-700
  text-white font-medium
  rounded-lg
  transition-colors
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Button
</button>
```

### Card
```html
<div class="
  bg-white dark:bg-gray-800
  rounded-xl
  shadow-sm
  border border-gray-200 dark:border-gray-700
  p-6
">
  <h3 class="text-lg font-semibold">Card Title</h3>
  <p class="text-gray-600 dark:text-gray-400 mt-2">Content</p>
</div>
```

### Input
```html
<input class="
  w-full px-4 py-2
  border border-gray-300 dark:border-gray-600
  rounded-lg
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-gray-100
  focus:ring-2 focus:ring-blue-500 focus:border-transparent
  placeholder:text-gray-400
" />
```

## Best Practices

1. **Mobile-first** - Start with mobile, add responsive variants
2. **Extract components** - Use @apply sparingly, prefer React components
3. **Use design tokens** - Customize theme in config
4. **Consistent spacing** - Stick to the spacing scale
5. **Group related utilities** - Organize by category in class strings

## Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```
