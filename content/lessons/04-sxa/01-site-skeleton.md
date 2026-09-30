# The headless site skeleton

JSS draws components. SXA, and headless SXA after it, decides how a *site* is assembled: many sites, shared pieces, page designs, and which renderings a placeholder will accept. If you skip that skeleton, every new faculty site becomes a copy of the React app's routes.

SXA speeds up sites by reusing components, layouts, and templates, and by standardising how Sitecore projects are built. JSS is the SDK that lets a JavaScript app render those sites and take modern hosting options. They answer different questions.

## What you set up before the hero matters

A headless SXA site, in the terms that workshop and the later headless-SXA material use, has a shape like this:

| Object | Job |
| --- | --- |
| Tenant / site collection | A boundary for a brand or a group of sites |
| Site | University of Reading public site, with a hostname, a start item, a language |
| Page design | The arrangement of partial designs for a template, such as Home |
| Partial design | A reusable band: header, footer, a hero row |
| Placeholder settings | The key, the renderings allowed in it, whether an author can edit it |
| Shared site | Content and presentation reused by more than one site |

The homepage hero belongs on the Home page design, inside a placeholder whose settings allow `Hero` and, later, a search widget. Faculty sites that should share the header inherit the partial design. They do not fork the React header component per site.

## Open the site

1. Open the Content Editor and select the headless site in the content tree.

![Content Editor with the headless site selected. Home shows its presentation details.](/workshop/open-content-editor.png)

The site item holds the hostname, the start item, and the language. Home sits under that site. Use the Presentation tab when you work on page designs and partial designs. Confirm you are on the right site before you place the hero.

## Authoring the designs

The sequence is: create a partial design, assign it as a base, design it in Experience Editor, create a page design, assign partials to it, map templates to page designs. Rule-based mapping exists when the template alone is not enough.

You do that in Sitecore. The React app only has to render the placeholders those designs produce.

- [ ] You can place the hero on a page design in words: Home template, main placeholder, `Hero` allowed.
- [ ] You can say what a partial design is for, using the header as the example.
