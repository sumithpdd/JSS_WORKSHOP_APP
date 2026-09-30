# The React SDK

The package is [`@sitecore-jss/sitecore-jss-react`](https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-react.html). Sitecore's 22.x docs, the line that matches Headless Rendering for XP 10.4, describe it as the library of utilities and UI helpers for rendering data that comes from the Layout Service.

The packages live in the [`Sitecore/jss`](https://github.com/Sitecore/jss) repository, published under the `@sitecore-jss` organisation on npm. The set you still recognise is the core library, the manifest tools for code-first import, dev tools, and a proxy for headless mode. Names have moved as the SDK moved to Next.js-first samples. The job of the React helpers has not.

## JSS Libraries

![JSS libraries on npm, published under @sitecore-jss, including the core package, pipelines, the manifest, and the proxy.](/workshop/jss-libraries.png)

JSS libraries are the packages that bring Sitecore presentation-layer counterparts into the JavaScript UI framework you are using. They contain a placeholder component, and components that render Sitecore fields: Text, Image, Link, and the rest.

The same idea is published for React, React Native (experimental), Angular 5, and Vue. This workshop uses the React library.

## Helpers you will actually use on the hero

| Sitecore field | React helper |
| --- | --- |
| Single-Line Text, Multi-Line Text | `Text` |
| Rich Text | `RichText` |
| Image | `Image` |
| General Link | `Link` |
| A placeholder on the component | `Placeholder` |

`Text`, `Image`, and `Link` are what make a field editable in the editing host. If you render `fields.Title.value` as a plain string, the banner looks right to a visitor and wrong to an author. The studio on this portal prints plain strings on purpose, and labels itself as a stand-in. The first change you make when this component joins a real JSS app is to swap those strings for the helpers.

## Sitecore Headless: JavaScript Services (JSS)

```jss
Work disconnected from Sitecore, via a code-first approach which generates Sitecore IA (or not)
Build your JavaScript application using familiar tools (React), with Sitecore "sprinkles" (SDK)
Utilize the Layout Service for content and layout of application routes
Full editing, testing, and personalization capabilities in Experience Editor via server-side rendering
Deploy the application to physically decoupled node.js for a true headless architecture
```

The steps play in order. You can start disconnected. The React app uses the SDK where a field or a placeholder appears. The Layout Service supplies the route. Experience Editor still edits, tests, and personalises, through server-side rendering. The running app is a Node process that does not live inside the Content Delivery role.

When you scaffold an app you use the current `create-sitecore-jss` path from the GitHub templates, choose React or Next.js to match the hosting decision, and point it at XP 10.4 with Headless Rendering 22 if the CM is still on-prem.

- [ ] You can name the helper for the title, the image, and the link.
- [ ] You can explain why a plain string is a problem in the editing host.
