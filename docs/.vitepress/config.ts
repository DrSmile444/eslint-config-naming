// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitepress';

import { version } from '../../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ESLint Config Naming',
  description: 'Best-practice naming conventions for TypeScript via ESLint.',
  lastUpdated: true,
  cleanUrls: true,

  head: [['link', { rel: 'icon', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/getting-started' },
      { text: 'Rules', link: '/rules/' },
      { text: 'FAQ', link: '/faq' },
      {
        text: `v${version}`,
        items: [
          { text: `v${version} (current)`, link: '/' },
          { text: 'Release Notes', link: 'https://github.com/DrSmile444/eslint-config-naming/releases' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Philosophy', link: '/philosophy' },
          {
            text: 'Usage',
            items: [
              { text: 'Flat Config (ESLint v9)', link: '/usage/flat-config' },
              { text: 'Legacy .eslintrc', link: '/usage/eslintrc' },
              { text: 'Bring Your Own Parser', link: '/usage/parser-setup' },
              { text: 'Compatibility', link: '/usage/compatibility' },
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
            items: [
              { text: 'Overview', link: '/rules/parameters/' },
              { text: 'Base', link: '/rules/parameters/base' },
              { text: 'Destructured', link: '/rules/parameters/destructured' },
            ],
          },
          {
            text: 'Types',
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
            items: [
              { text: 'Overview', link: '/rules/variables/' },
              { text: 'Default', link: '/rules/variables/default' },
              { text: 'Const / Global', link: '/rules/variables/const-global' },
              { text: 'Destructured', link: '/rules/variables/destructured' },
              { text: 'Boolean Prefix', link: '/rules/variables/boolean-prefix' },
              { text: 'Boolean Destructured', link: '/rules/variables/boolean-destructured' },
              { text: '*Component Filter', link: '/rules/variables/component' },
              { text: 'Node.js Common Variables', link: '/rules/variables/node-common' },
            ],
          },
          {
            text: 'Functions',
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
        link: 'https://github.com/DrSmile444/eslint-config-naming',
      },
    ],
  },
});
