# Common JSX Components

This document describes the common JSX components available for use in MDX files throughout the repository.

## Cards Component

The `Cards` component is used to display a group of card links. It wraps one or more `Card` components.

### Usage

```mdx
<Cards>
  <Card
    title="Learn more about RuneScape"
    href="https://runescape.wiki"
  />
  <Card
    title="Official RuneScape Website"
    href="https://www.runescape.com"
  />
</Cards>
```

### Card Component Properties

- `title` (required): The text displayed on the card
- `href` (required): The URL the card links to

### Example

Here's a real example from the repository:

```mdx
<Cards>
  <Card title="Learn more about RuneScape" href="https://runescape.wiki" />
  <Card title="Official RuneScape Website" href="https://www.runescape.com" />
</Cards>
```

## Need More Components?

If you need to use a component that isn't documented here, or if you're unsure how to use a component:

- Open an issue on GitHub asking about the component
- Check existing MDX files in the repository for examples
- Ask in your pull request description - we're happy to help!

