import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          'service-details': path.resolve(__dirname, 'service-details.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          'project-details': path.resolve(__dirname, 'project-details.html'),
          team: path.resolve(__dirname, 'team.html'),
          'team-details': path.resolve(__dirname, 'team-details.html'),
          pricing: path.resolve(__dirname, 'pricing.html'),
          shop: path.resolve(__dirname, 'shop.html'),
          'product-details': path.resolve(__dirname, 'product-details.html'),
          cart: path.resolve(__dirname, 'cart.html'),
          checkout: path.resolve(__dirname, 'checkout.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          'blog-details': path.resolve(__dirname, 'blog-details.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          appointment: path.resolve(__dirname, 'appointment.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          'request-quote': path.resolve(__dirname, 'request-quote.html'),
          careers: path.resolve(__dirname, 'careers.html'),
          'career-details': path.resolve(__dirname, 'career-details.html'),
          '404': path.resolve(__dirname, '404.html'),
          'coming-soon': path.resolve(__dirname, 'coming-soon.html'),
          maintenance: path.resolve(__dirname, 'maintenance.html'),
          'privacy-policy': path.resolve(__dirname, 'privacy-policy.html'),
          'terms-conditions': path.resolve(__dirname, 'terms-conditions.html'),
          terms: path.resolve(__dirname, 'terms.html'),
          'thank-you': path.resolve(__dirname, 'thank-you.html'),
        },
      },
    },
  };
});
