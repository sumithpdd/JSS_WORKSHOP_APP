# Hybrid, for a university

Picking a stack is a decision, not a framework. The same questions belong on any site.

## Ask these before you pick a stack

1. Is this a new site, or an upgrade of one that already runs?
2. Does the existing MVC site have to keep serving pages while you move?
3. Which channels are real in the next year: the public site, a course finder, an app, a partner portal?
4. Who must change a headline without a sprint: central marketing, a faculty, an agency?
5. Where do personalisation and search actually live: in XP today, in Sitecore Personalize and Sitecore Search later?

Reading's decks describe a fragmented estate, XP features in daily use, and a future architecture that is hybrid and SaaS-shaped, with SitecoreAI as the later authoring platform. That is an upgrade with a live site, not a greenfield. Hybrid fits because editors already work in Experience Editor, and because a pure content API would take the homepage away from them.

## The seven steps, applied to one component

The May 2023 planning note lists a migration in seven steps. Use them on the hero, so they stay concrete.

| Step | For the Reading hero |
| --- | --- |
| 1. Goals | Authors change the banner without a release. A second head can reuse the same layout later. |
| 2. Learn the architecture | Layout Service, a React component, a rendering host. This workshop. |
| 3. Plan | One rendering, one datasource template, one placeholder. The rest of the homepage stays MVC until this one is boring. |
| 4. APIs | You rarely build a custom hero API. Headless Services already exposes layout and items. |
| 5. Front end | The `Hero` component in this repo's studio. |
| 6. Test | Edit a field, confirm the preview, confirm the search variant, confirm empty fields do not crash the page. |
| 7. Deploy | A rendering host for visitors, and the same app available to the editing chrome. |

Step 4 is where teams over-build. The Layout Service is the endpoint. GraphQL is there when a component needs a shape the layout document does not already contain. A hero with five fields does not need a custom endpoint.

## What you give up, on purpose

Editors do not get a free-form canvas inside the React file. They get the fields and the parameters you exposed, placed in placeholders Sitecore knows. That is the hybrid bargain. Brand governance lives in the component. Campaign agility lives in the datasource.

Developers give up Razor as the place the HTML is born. They take on a rendering host, a front-end pipeline, and the duty to render Sitecore field helpers so Experience Editor or Pages can still type into the banner.

- [ ] You can answer the five questions for Reading, even roughly.
- [ ] You can defend "no custom hero API" to someone who wants one.
