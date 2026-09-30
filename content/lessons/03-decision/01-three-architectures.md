# Three architectures

Headless work uses the same three pictures. Keep them separate. Projects get expensive when a team says "headless" and means two of them at once.

## Coupled

Content management, delivery, and presentation are one web application. Authors control the page. A new channel is a new site, or a custom integration. This is XP MVC as Reading runs it today.

## Pure headless

The CMS stores objects. It does not own the page. Delivery is an API. Presentation is entirely in the channel application. Authors edit fields. A designer who wants the image on the other side of the headline waits for a front-end release. Omnichannel is natural, because nothing in the CMS assumed a browser.

## Hybrid

Management can be page-based and object-based. Authors still control presentation: placeholders, renderings, designs. Delivery is an API, so the same layout can feed a website and another channel. Sitecore's own description of hybrid headless is this extra claim: authors keep layout, not only fields.

Sitecore calls this a decoupled CMS. Components have separate responsibilities. Content and presentation are split, and the marketing features stay: editing, testing, personalisation. The Layout Service is how the presentation layer leaves the CD as data.

## What is Sitecore Headless

![What is Sitecore Headless. The Services Client is an OData item API. SXA reuses components, layouts, and templates and adds a JSON content service. JSS is the SDK for building the application in JavaScript.](/workshop/what-is-sitecore-headless.png)

The Services Client is a service layer for OData item access. SXA is the toolkit for reusing components, layouts, and templates across sites, with a JSON modeling tool and a content service. JSS is the SDK JavaScript developers use to build the application on Sitecore.

![What each option provides. All three return JSON and have security. SXA and JSS add analytics, personalization, and content testing. Only JSS adds a client library and decoupled rendering.](/workshop/headless-options-comparison.png)

| | Services Client | Experience Accelerator | JavaScript Services |
| --- | --- | --- | --- |
| JSON output | Yes | Yes | Yes |
| Security enabled | Yes | Yes | Yes |
| Analytics | No | Yes | Yes |
| Personalization | No | Yes | Yes |
| Content testing | No | Yes | Yes |
| Client library | No | No | Yes |
| Decoupled rendering | No | No | Yes |

![Headless in Sitecore. Content, personalisation, and presentation stay in Sitecore. Experience Accelerator returns HTML through the rendering engine. JavaScript Services returns JSON through the Layout Service. GraphQL and the Services Client are the other APIs.](/workshop/headless-in-sitecore.png)

- A Sitecore-based service layer provides access to personalized content.
- The service layer provides the same content, but no additional markup.
- There are multiple options for JSON-formatted content.
- A full JavaScript SDK is available to create applications, including physically decoupled content delivery and a rendering engine.
- No Sitecore knowledge is needed for JavaScript developers.

Experience Accelerator is the column that still returns HTML. JavaScript Services is the column this workshop builds: the Layout Service API returns JSON, and a JavaScript application renders it. GraphQL and the OData Item Service are the other ways out of the same content repository. Personalisation still runs in Sitecore before the content leaves.

## A compact comparison

| | Coupled MVC | Pure headless | Hybrid on Sitecore |
| --- | --- | --- | --- |
| Who emits HTML | The CD | The channel app | The rendering host, or the browser |
| Who places components | Sitecore presentation | Front-end code | Sitecore presentation, rendered by the app |
| Author control of the page | High | Low | High, if the app honours the layout |
| Second channel | Another implementation | Same content API | Same layout or content API, new head |
| Front-end stack | ASP.NET MVC | Chosen per channel | Chosen per head, React in this workshop |

## What "Sitecore already separated them" means

Sitecore has always separated content and presentation with an item-based architecture.

| | Content Management | Content Delivery | Presentation |
| --- | --- | --- | --- |
| Traditional CMS ("Coupled") | Page based system to author content and presentation | Content is stored mixed with presentation | Delivers pages and content is composed by the user to a single channel |
| Headless CMS | Content Authoring | Content delivery API based | Presentation depends on other systems |
| **Decoupled CMS** | **Content Authoring** | **Delivery of content through a website or API** | **Presentation can be rendered server side and by client applications** |

The rendering engine combined content and presentation to draw the page. Headless keeps the personalisation engine and swaps the rendering engine's output from HTML to JSON, with a JavaScript SDK on the other side.

You do not have to accept that for every page on day one. Headless Services has a long-standing path for rendering an existing MVC site through the Layout Service and converting route by route. The hero is that first route.

- [ ] You can describe hybrid in one sentence an editor would accept.
- [ ] You can say which column Reading's homepage is in today.
