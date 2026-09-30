# Search beside the hero

The Reading search-pathway deck is a different product sitting on the same page. Sitecore Search is the SaaS index, the crawler, the recommendation service, and the widgets. The CMS hero you just migrated is not one of those widgets.

## What the deck is unhappy about

Site search today, in that conversation: hard to implement, weak for authors, low relevance, little insight. Sitecore Search is proposed as preview search as you type, a results page, recommendations on listings and articles, and a set of widgets that includes a **Hero / Carousel Banner**, preview search, recently viewed, and trending content.

Read that widget name carefully. Search has its own hero. It is a merchandised or recommended banner, fed by the search index and by rules in the Search console. It is not the datasource you mapped in the previous lesson.

## Two banners, two owners

| Banner | Owner of the words | Owner of the HTML |
| --- | --- | --- |
| JSS `Hero` | A Sitecore datasource, edited in the CMS | The rendering host |
| Search Hero / Carousel | The Search index and the widget configuration | Search's JS widget, or a hosted page |

Use the JSS hero when the message is editorial: clearing, open day, a chancellor's line. Use the Search widget when the message is computed: trending courses, recommended content for a returning visitor.

The studio's `search` variant is the compromise the homepage often needs. The editorial hero stays. A slot opens beside the call to action for preview search. That slot is where a Search JS widget mounts. The variant parameter is how an author chooses the homepage that has the slot. The widget itself is configured in Sitecore Search, not in the Hero Banner template.

## How Search is allowed to integrate

The deck splits the front-end choices:

- **JavaScript components.** Fast to place, less control over the markup. A preview-search box in the hero slot is this kind of integration.
- **Hosted pages.** Search renders a results page or a listing for you. More setup, less of your design system.
- **APIs.** The rendering host or the browser calls Search and draws with your own components. The most control, the most code.

For the first release, mount preview search in the slot and keep results on a page you own or a hosted results page. Do not fold Search fields into the Hero Banner template. The next team will not know which system is allowed to overwrite the title.

## Personalize is the third voice

The same Reading decks separate XP rules from Sitecore Personalize. A rule that swaps the hero datasource for a faculty audience can stay in XP and arrive already resolved in the layout JSON. A journey that recommends content across the app and the site belongs in Personalize and Search. The React component still renders what it is given.

- [ ] You can say which hero marketing edits, and which hero Search edits.
- [ ] You can describe the `search` variant as a slot, not as a second CMS template.
