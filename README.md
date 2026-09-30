# JSS Workshop

A learning portal for Sitecore headless. It follows the same shape as the marketers guided lab: Next.js, a lesson sidebar, markdown pages, progress kept in the browser. The difference is the story. You learn MVC, SXA, and JSS by changing one thing, the University of Reading homepage hero, inside this app.

Lessons start as files. The hero studio shows that banner hard-coded, then fed by props, then fed by a layout document in the shape the Layout Service returns.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Layout

- `content/lessons` holds the workshop text.
- `src/content/course.json` is the chapter order.
- `src/data/uor-hero.ts` is the stand-in layout document.
- `src/app/studio` is the live migration.

The hero copy is a workshop stand-in, not content from the live Reading site.

## Source decks

Teaching notes were taken from the JSS workshop decks in `JSS_Materials` (headless or MVC, the hybrid headless deck, the MVC planning note, the XMC technical repository) and from the XP and SitecoreAI decks, including the search pathway.

React SDK reference: [Sitecore JavaScript Rendering SDK (JSS) for React](https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-react.html). Packages and samples: [github.com/Sitecore/jss](https://github.com/Sitecore/jss).
