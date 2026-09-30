# From hard-coded content to a component

A homepage hero that lives as a constant in the React module changes only when a developer ships a build. The headline, the image, and the call to action are campaign content. They should change without a release.

The move is smaller than putting the CMS in charge of every region on the page. You pick one component whose content changes on a campaign cycle, and you change where its values come from. The component stays. The source of the values moves.

## Three sources, one component

The [hero studio](/studio) renders one `Hero` from a `HeroContent` object. Only the source of that object changes.

| Stage | Source | Who changes the headline |
| --- | --- | --- |
| Hard-coded React | A constant in the module | A developer |
| Props | An object passed in by the parent | Whoever owns the parent, still a developer |
| Layout Service | `sitecore.route.placeholders['jss-main'][0].fields` | An author, once this document is a real datasource |

Stage 2 is the honest middle. It is also the SXA lesson in miniature: one rendering, content supplied from outside, a variant as a parameter. Stage 3 is the JSS lesson: the outside source has Sitecore's shape, so a rendering host can fetch it later without rewriting the component.

## What stays in code for now

Not every region of the page moves on the first pass. Navigation and page chrome can stay in the front-end until the hero is boring. The capstone is done when the hero alone has crossed from a constant to layout data.

## Scaffold

`jss scaffold Hero` creates a component definition and a React component. You then place it in a placeholder in route data. The studio already has that shape: a `Hero` component, a layout document, and the binding between them. Use the studio first. The component is the definition the CLI would have started for you.

- [ ] You can name the three sources, and who can change the headline in each.
- [ ] You can say why the hero moves first, and what stays in the front-end for now.
