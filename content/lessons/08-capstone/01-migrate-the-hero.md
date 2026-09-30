# Migrate the hero

This is the capstone. One rendering. The University of Reading homepage banner, as specified in [the MVC lesson](/learn/mvc/uor-hero-today). You finish it in the [hero studio](/studio), stage 3.

## Field map

| MVC datasource | Layout field | Helper when this joins a real app |
| --- | --- | --- |
| Eyebrow | `fields.Eyebrow` | `Text` |
| Title | `fields.Title` | `Text` |
| Summary | `fields.Summary` | `Text` |
| Image | `fields.Image` | `Image` |
| CTA | `fields.Cta` | `Link` |
| Variant parameter | `params.Variant` | A parameters template |

The placeholder in the studio is `jss-main`. On a headless SXA site, confirm the key in placeholder settings before you bind the component. `headless-main` is the name many newer samples use. Mismatched keys are the usual reason a correct component renders on no page.

## Acceptance

Do these in stage 3. They are the test step from the seven-step plan.

1. Set the title to a line Reading marketing could ship this month. The banner changes. `componentName` is still `Hero`.
2. Empty the summary, then put it back. The page still renders.
3. Switch `Variant` to `search` and back to `campus`. Only the slot changes.
4. In the JSON, confirm `dataSource` is still `Home/Hero Banner`. You edited fields, not the item's identity.

## What you would do on the CM next

This room stops at the document. On an XP 10.4 CM with Headless Rendering 22 the same contract becomes items:

- A Hero Banner template with those fields.
- A Json Rendering named `Hero` whose component name matches the factory.
- Placeholder settings that allow it.
- The rendering added to the Home page design.
- An API key, a hostname, and a rendering host pointed at the layout URL.

Code-first import can create that first set from a manifest. After authors have edited the live banner, you stop deploying content with the app and you serialize the template and the rendering only.

## Done

You have migrated the hero when you can defend this sentence: the HTML lives in the React component, the words live in the layout document, and Sitecore remains the place an author will edit those words once the document is a datasource.

- [ ] Title edited from the form, component name unchanged.
- [ ] Variant toggles only the search slot.
- [ ] You can point to the datasource path in the JSON.
