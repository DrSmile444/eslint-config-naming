# \*Component variables

- Filter: `^\w*Component$`
- Allowed: `PascalCase` for variables ending with `Component`.
- **Debatable:** Not all component are named with `Component` suffix

## Why This Rule

React and similar frameworks treat components as first-class values. When you store a component in a variable (common with HOCs or dynamic components), it should use PascalCase like other components:

**React conventions:**

```tsx
// Component as variable - should be PascalCase
const EditActionComponent = () => <button>Edit</button>; // WHY: PascalCase required so JSX recognizes it as a component

// Component usage - reads naturally
<EditActionComponent />;
```

This aligns with React's convention that components use PascalCase. Without this rule, you'd be forced to use camelCase for component variables, creating inconsistency:

```tsx
// Awkward without this rule
const editActionComponent = () => <button>Edit</button>; // WHY: camelCase would break JSX element detection and is invalid in JSX
<editActionComponent />; // Invalid JSX!
```

The `*Component` suffix pattern is commonly used for:

- Higher-order component results: `const EnhancedComponent = withAuth(BaseComponent)`
- Dynamic component selection: `const ModalComponent = isLarge ? LargeModal : SmallModal`
- Lazy-loaded components: `const LazyComponent = lazy(() => import('./Heavy'))`

**References:**

- [React Docs - Components and Props](https://react.dev/learn/your-first-component)
- [React TypeScript Cheatsheet - Function Components](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)

## ✅ Good

```ts
const EditActionComponent = () => null; // WHY: PascalCase for a component variable
```

## ❌ Bad

```ts
const editActionComponent = () => null; // WHY: camelCase component variable is invalid in JSX usage
```
