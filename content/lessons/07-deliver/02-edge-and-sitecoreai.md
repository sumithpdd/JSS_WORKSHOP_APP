# Experience Edge and SitecoreAI

XP 10.4 can serve the Layout Service from the CD. That is enough to prove the hero. It is not the delivery picture in the Reading future-architecture slides, or in the XM Cloud technical deck.

## Experience Edge

Experience Edge is Sitecore's delivery API at the edge: a publishing target for items, layout, and media, with a GraphQL endpoint and a cached layout. You publish from the CM. The rendering host reads from Edge, so a campaign publish does not require a Node rebuild when the only change is field values.

The hybrid deck's list is the one to remember: a GraphQL API, an atomic layout response, personalisation on that path where the product supports it, and a publish pipeline rather than each head scraping the CD.

Headless Rendering 22.x, for XP 10.4, includes the Experience Edge connector as a separate module. Installing JSS does not by itself turn the CD into Edge.

## The SitecoreAI picture

The XMC technical deck and the Reading architecture slides draw the same split:

| Part | Role |
| --- | --- |
| Authoring | Items, Pages, sites, components, workflow |
| Experience Edge | Layout and content for delivery |
| Rendering host | The public React application |
| Editing path | The same application, used for preview |
| Local dev | The front-end repo, against a dev environment or against disconnected data |
| Deploy | Build of the rendering host, and serialization of items |

SitecoreAI is the SaaS authoring platform those slides point at. Stream, brand-aware writing, and translation sit on the authoring side. They do not replace the hero component. They help an author fill the fields you already defined.

A practical sequence for Reading is: prove `Hero` against XP 10.4 and a rendering host, publish through Edge when the connector is in place, and treat SitecoreAI as the later home for authoring once the component contract is stable. Re-platforming the homepage and inventing the component model in the same sprint is how the hero gets built twice.

## Two deploys, on purpose

The React app and the Sitecore items move on different pipelines. The XMC deck shows items as YAML via the serialization CLI, pushed into an environment, and the rendering host built from the front-end repository. The hero's datasource template is an item. `CampusHero.tsx` is application code. Shipping one without the other is the usual outage: the layout names `Hero`, and the host has no component by that name.

- [ ] You can say what a field change needs (a publish) and what a markup change needs (a rendering-host deploy).
- [ ] You can place SitecoreAI on the authoring side of the diagram.
