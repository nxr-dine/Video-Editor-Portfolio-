# Editing Guide

## Add or edit a project

Open `app/page.tsx` and update two places:

1. Add the translated project title and category in the `projects` list inside `en`, `fr`, and `ar`.
2. Add the matching media entry in `projectMedia` near the top of the file.

Keep the same order in all three language lists and in `projectMedia`.

Each `projectMedia` entry supports:

- `category`: the project category used as the editing reference
- `image`: image path in `public/` or an external image URL
- `format`: `short` for vertical video or `long` for landscape video
- `youtubeUrl`: YouTube video or Shorts URL; use an empty string if there is no video yet
- `featured`: `true` to show the project in the All tab, `false` to hide it there

Example:

```ts
{
  image: '/videos cover/my-video.png',
  format: 'short',
  youtubeUrl: 'https://www.youtube.com/shorts/VIDEO_ID',
  featured: true,
}
```

  ## Add a new category

  Faceless Content is already available as a filter. For future categories, add the category in four places:

  1. Add the English category label to the `filters` list in `en`.
  2. Add the French translation to the `filters` list in `fr`.
  3. Add the Arabic translation to the `filters` list in `ar`.
  4. Add the category to the `ProjectCategory` type and use the English label in the matching `projectMedia` entry.

  Example for a new `Documentary` category:

  ```ts
  type ProjectCategory = 'Podcast' | 'Short Form' | 'Motion Graphics' | 'YouTube' | 'Documentary'

  // en: filters: ['All', 'Short Form', 'Documentary', ...]
  // fr: filters: ['Tout', 'Format court', 'Documentaire', ...]
  // ar: filters: ['الكل', 'فيديو قصير', 'وثائقي', ...]
  ```

  Then assign `Documentary` to the relevant `projectMedia` entry and use the translated category label in that project's `projects` tuple for each language.

## Update social links

Edit `contactLinks` in `app/page.tsx`. The links are reused by the hero and footer.

## Update the CV or profile photo

- Replace the CV at `public/cv.pdf`.
- Replace the profile photo at `public/me.png`.

## Update text

Edit the matching language object in `translations`:

- `en` for English
- `fr` for French
- `ar` for Arabic

## Run a check

Use:

```bash
pnpm exec tsc --noEmit
```
