# Meta.json Files

## What are Meta.json Files?

In Fumadocs (the documentation framework used by the main site), `meta.json` files control the **order and structure** of pages in the navigation sidebar. They tell Fumadocs which pages exist and in what order they should appear.

## Meta.json Structure

A `meta.json` file is a simple JSON file that contains a `pages` array:

```json
{
  "pages": ["index", "keybinds", "combat-basics", "damage"]
}
```

**Important points:**

- Each entry in the `pages` array is a **filename without the `.mdx` extension**
- The order in the array determines the order pages appear in the navigation
- The `index` page is typically first and serves as the overview page for that content section

## When to Create or Edit Meta.json Files

### Adding a New Page to an Existing Section

If you're adding a new page to an existing directory (like `content/getting-started/`), you need to add it to that directory's `meta.json` file:

1. Open the `meta.json` file in the directory where your new page will live
2. Add the filename (without `.mdx`) to the `pages` array in the desired position
3. Make sure the JSON is valid (commas between items, proper brackets)

**Example:** Adding a new page called `skilling-basics.mdx` to `content/getting-started/`:

**Before:**

```json
{
  "pages": ["index", "keybinds", "combat-basics"]
}
```

**After:**

```json
{
  "pages": ["index", "keybinds", "combat-basics", "skilling-basics"]
}
```

### Creating a New Section with Multiple Pages

If you're creating a completely new section (new directory), you'll need to:

1. Create the new directory (e.g., `content/new-section/`)
2. Create your MDX files in that directory
3. Create a `meta.json` file in that directory listing all your pages
4. Add the new section to the parent directory's `meta.json` (if it's a subsection)

**Example:** Creating a new section called `Bossing`:

1. Create `content/guides/pvp/index.mdx`
2. Create `content/guides/pvp/strategy.mdx`
3. Create `content/guides/pvp/meta.json`:
   ```json
   {
     "pages": ["index", "strategy"]
   }
   ```
4. Add `"pvp"` to `content/guides/meta.json`:
   ```json
   {
     "pages": ["index", "early-game", "mid-game", "late-game", "Bossing"]
   }
   ```

## Tips for Meta.json Files

- Always include `"index"` as the first page in a section's meta.json
- Keep page names consistent (use kebab-case: `my-page-name.mdx`)
- The order matters - arrange pages in a logical reading order
- If you're unsure where a page should go, ask in an issue or PR description

