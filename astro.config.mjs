// @ts-check

import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables';


import cloudflare from '@astrojs/cloudflare';


export default defineConfig({
  server: {
	    host: '127.0.0.1',
    	port: 4321,
      allowedHosts: ['f44vm.tail71780c.ts.net']
	  },

  site: 'https://linuzz-zen.netlify.app/',
  vite: {},

  integrations: [
      expressiveCode({
          themes: ['github-light', 'github-dark'],
          defaultProps: {
              wrap: true,
              showLineNumbers: true,
              frame: 'terminal',
          },
          styleOverrides: {
              codeFontSize: '0.875rem',
              codeFontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              codeLineHeight: '1.7142857em',
              borderRadius: '0.5rem',
              frameBorderWidth: '1px',
              frameShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              containerPaddingBlock: '0.75rem',
              containerPaddingInline: '1rem',
              lineNumberMarginInline: '1rem',
              lineNumberWidth: '2rem',
          },
          frames: {
              showCopyButton: true,
              showLanguageBadge: true,
          },
          useDarkModeMediaQuery: false,
          themeCssSelector: (theme) => {
              if (theme.name === 'github-dark') return '.dark';
              return false;
          },
      }),
      sitemap(),
	],

  markdown: {
      rehypePlugins: [rehypeWrapTables],
      syntaxHighlight: false,
	},

  fonts: [
      {
          provider: fontProviders.local(),
          name: 'OpenDyslexic Nerd Font',
          cssVariable: '--font-opendyslexic',
          fallbacks: ['sans-serif'],
          options: {
              variants: [
                  { src: ['./src/assets/fonts/OpenDyslexicNerdFont-Regular.otf'], weight: 400, style: 'normal', display: 'swap' },
                  { src: ['./src/assets/fonts/OpenDyslexicNerdFont-Bold.otf'], weight: 700, style: 'bold', display: 'swap' },
              ],
          },
      },
	],

  adapter: cloudflare(),
});