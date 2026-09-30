# What you can take back

You came to learn how to build a JSS component. The homepage hero is that component. The markup lives in React. The words, the image, and the link come from a layout document. Sitecore places the component in a placeholder it already knows.

## What the component owns

The component owns the HTML. The layout document owns the field values. Authors edit those fields once the document is a Sitecore datasource. A Sitecore Search widget can sit in a placeholder beside the hero. It is a separate component. It does not become the hero's template.

## The seven steps, scored against the hero

This is the same seven-step list from the headless decision, scored against the hero.

| Step | Where you are |
| --- | --- |
| Goals | Authors change the banner without a release |
| Architecture | Coupled, pure, hybrid, rendering host, Edge |
| Plan | One rendering, one template, one placeholder |
| APIs | Layout Service, no custom hero endpoint |
| Front end | A `Hero` component that reads layout fields |
| Test | Title, empty summary, variant |
| Deploy | A CM, an API key, and a rendering host |

## On the next real day

1. Install Headless Rendering 22 on the XP 10.4 CM if the hero must be proved on XP before a SitecoreAI move.
2. Create the API key with real CORS origins.
3. Scaffold the app from [Sitecore JSS](https://github.com/Sitecore/jss) and render the fields with `Text`, `Image`, `Link`, and `Placeholder` from [`@sitecore-jss/sitecore-jss-react`](https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-react.html).
4. Put `Hero` on the Home page design. Confirm the placeholder key.
5. Deploy the rendering host and the editing host from the same build.
6. Only then add a Sitecore Search preview widget as its own component beside the hero.

- [ ] You can say what the component owns and what the layout document owns.
- [ ] You can name the next component you would leave until the hero is done, and why it can wait.
