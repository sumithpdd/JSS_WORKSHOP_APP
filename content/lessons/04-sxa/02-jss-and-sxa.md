# JSS and SXA together

"JSS or SXA" was a fair question when the two products first met. It is the wrong question for a rebuild. JSS and SXA are used together: a JSS site, page and partial designs, and shared content.

## What the first combination supported

- Partial designs and page designs
- Placeholder settings
- A shared site, for content and for presentation
- SXA modules as item scaffolding, with a question mark in the deck

## What that first combination left out

- The SXA toolbox
- Rendering variants
- Out-of-the-box redirects
- Out-of-the-box site or tenant modules in the way MVC SXA authors expected

Treat that list as an early snapshot. Headless SXA on later XP, and headless sites on XM Cloud and SitecoreAI, continued the idea and changed the details. Rendering variants returned in the headless component model as headless variants: extra presentations of one component, selected by name, living under the site's Presentation settings. The Grade II and "Introduction to Headless SXA for XMC" packs are the place to confirm the current click-path. Do not teach that early unsupported list as if it were the product today.

## What you still tell a team

SXA, or headless SXA, owns the site skeleton and the authoring guardrails. JSS owns the React implementation of each rendering. A variant is a second presentation of `Hero`, still one datasource contract. If `campus` and `search` only toggle a slot, a rendering parameter is enough. If they are different markup, they are variants, and both must be in the component module the rendering host deploys.

Component sharing follows the same split. The React component is in source control. The Sitecore rendering item, the placeholder settings, and the page design are items. Both have to move together, or the layout document will name a component the app cannot draw.

- [ ] You can correct "we must choose JSS or SXA" without dismissing either.
- [ ] You can say when a parameter is enough and when you need a second presentation.
