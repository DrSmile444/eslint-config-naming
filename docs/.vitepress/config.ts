import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@drsmile444/eslint-config-naming',
  description: 'Best-practice naming conventions for TypeScript via ESLint.',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/getting-started' },
      { text: 'Rules', link: '/rules/' },
      { text: 'Guides', link: '/guides/migrating-from-airbnb' },
      { text: 'Examples', link: '/examples/quick-reference' },
      { text: 'FAQ', link: '/faq' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          {
            text: 'Usage',
            items: [
              { text: 'Flat Config (ESLint v9)', link: '/usage/flat-config' },
              { text: 'Bring Your Own Parser', link: '/usage/parser-setup' },
              { text: 'Compatibility', link: '/usage/compatibility' },
            ],
          },
          {
            text: 'Philosophy',
            items: [
              { text: 'Principles', link: '/philosophy/principles' },
              { text: 'Decisions', link: '/philosophy/decisions' },
            ],
          },
        ],
      },
      {
        text: 'Rules',
        items: [
          { text: 'Rule Matrix', link: '/rules/' },
          { text: 'Object Literal Properties', link: '/rules/object-literal-property' },
          {
            text: 'Member-like',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/member-like/' },
              { text: 'Public Static', link: '/rules/member-like/public-static' },
              { text: 'Private Static', link: '/rules/member-like/private-static' },
              { text: 'Public', link: '/rules/member-like/public' },
              { text: 'Private', link: '/rules/member-like/private' },
              { text: 'Private Readonly', link: '/rules/member-like/private-readonly' },
              { text: 'Protected', link: '/rules/member-like/protected' },
            ],
          },
          {
            text: 'Parameters',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/parameters/' },
              { text: 'Base', link: '/rules/parameters/base' },
              { text: 'Destructured', link: '/rules/parameters/destructured' },
            ],
          },
          {
            text: 'Types',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/types/' },
              { text: 'Enum Members', link: '/rules/types/enum-member' },
              { text: 'Interfaces', link: '/rules/types/interface' },
              { text: 'Classes', link: '/rules/types/class' },
              { text: 'Enum Names', link: '/rules/types/enum-name' },
              { text: 'Type-like', link: '/rules/types/type-like' },
            ],
          },
          {
            text: 'Variables',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/variables/' },
              { text: 'Default', link: '/rules/variables/default' },
              { text: 'Const / Global', link: '/rules/variables/const-global' },
              { text: 'Destructured', link: '/rules/variables/destructured' },
              { text: 'Boolean Prefix', link: '/rules/variables/boolean-prefix' },
              { text: 'Boolean Destructured', link: '/rules/variables/boolean-destructured' },
              { text: '*Component Filter', link: '/rules/variables/component' },
            ],
          },
          {
            text: 'Functions',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/functions/' },
              { text: 'Local (Default)', link: '/rules/functions/default' },
              { text: 'Exported / Global', link: '/rules/functions/exported-global' },
              { text: 'CamelCase Enforcement', link: '/rules/functions/camel-case-only' },
            ],
          },
          { text: 'Quoted Members', link: '/rules/quoted-members' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Migrating from Airbnb', link: '/guides/migrating-from-airbnb' },
          { text: 'Naming Booleans', link: '/guides/naming-booleans' },
          { text: 'Enums that Read Well', link: '/guides/enums-that-read-well' },
          { text: 'Destructuring Strategy', link: '/guides/destructuring-strategy' },
          { text: 'React & Components', link: '/guides/react-and-components' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Quick Reference', link: '/examples/quick-reference' },
          { text: 'API & Services', link: '/examples/domain-samples/api-services' },
          { text: 'React Frontend', link: '/examples/domain-samples/react-frontend' },
          { text: 'Node Libraries', link: '/examples/domain-samples/node-libraries' },
          { text: 'Playground', link: '/examples/playground' },
        ],
      },
      {
        text: 'Troubleshooting',
        items: [
          { text: 'Common Errors', link: '/troubleshooting/common-errors' },
          { text: 'Parser / Project Errors', link: '/troubleshooting/parser-project-errors' },
          { text: 'Rule Precedence', link: '/troubleshooting/rule-precedence' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Schema', link: '/reference/schema' },
          { text: 'Selectors Cheatsheet', link: '/reference/selectors-cheatsheet' },
          { text: 'Changelog', link: '/reference/changelog' },
        ],
      },
      { text: 'Contributing', link: '/contributing' },
      { text: 'FAQ', link: '/faq' },
    ],

    search: { provider: 'local' },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/drsmile444',
      },
    ],
  },
});

