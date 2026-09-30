# Why we are here

Sitecore JavaScript Services (JSS) is the SDK a React application uses to render content and layout from Sitecore. Authors keep the fields and the page structure. The React app draws them.

This workshop is for developers who need that path in one sitting: what a coupled MVC site does today, what SXA still owns, and how a JSS component takes over one piece of the page. The piece we use is a homepage hero. The same steps apply to the next component you build on a real project.

By the end you should be able to:

- Say what the React JSS SDK is for.
- Read a Layout Service response and find the placeholder, the component, and the fields.
- Point a teammate at the official setup docs instead of a slide.

## Read this before you install anything

- [Sitecore JavaScript Rendering SDK (JSS) for React](https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-react.html) is the 22.x reference. Headless Rendering 22 matches Sitecore XP 10.4.
- [JSS documentation](https://doc.sitecore.com/xp/en/developers/hd/latest/sitecore-headless-development/sitecore-javascript-rendering-sdks--jss-.html) is the index for every SDK, including Next.js.
- [Architecture overview](https://doc.sitecore.com/xp/en/developers/hd/latest/sitecore-headless-development/architecture-overview.html) shows the rendering host and the Sitecore instance side by side.
- [JSS on GitHub](https://github.com/Sitecore/jss) holds the packages, templates, and changelog.

## Set up a JSS app

Use these when you leave this portal and create a real application.

1. Install the current Node.js LTS from [nodejs.org](https://nodejs.org).
2. Follow [Getting started with JSS for Next.js](https://doc.sitecore.com/xp/en/developers/hd/latest/sitecore-headless-development/getting-started-with-jss-for-next-js-development.html). Next.js is the current starter. The React SDK above is the library those apps use for fields and placeholders.
3. For a full Sitecore instance on your machine, use the [container setup walkthrough](https://doc.sitecore.com/xp/en/developers/hd/latest/sitecore-headless-development/walkthrough--setting-up-a-development-environment-with-the-sitecore-containers-template-for-next-js.html).
4. Download the server module for your Sitecore version from [Headless Rendering downloads](https://developers.sitecore.com/downloads/Sitecore_Headless_Rendering). The JavaScript packages are published under [`@sitecore-jss` on npm](https://www.npmjs.com/org/sitecore-jss).

A short connected-mode tour, if you want a sample site beside the docs: [JSS Connected Demo prerequisites](https://developers.sitecore.com/trials/jss-connected-demo/getting-started/prerequisites).

## In this room

Work through the lessons in order. The [hero studio](/studio) is where the homepage banner moves from hard-coded React to layout data. Put your name in the bar at the top so your progress is kept.

- [ ] You can say, in one sentence, why this workshop exists.
- [ ] You have opened the JSS for React docs.
- [ ] You know which walkthrough creates a Next.js JSS app.
