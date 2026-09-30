# The coupled CMS

A traditional Sitecore site does three jobs in one product.

**Content management.** Authors create and organise items in the Content Editor, with templates, workflow, and security.

**Content delivery.** A published web database serves the site.

**Content presentation.** Sitecore turns items plus presentation details into HTML. In the MVC generation that HTML is produced by controller renderings and Razor views on the Content Delivery role.

The browser receives a finished page. The front-end technology is the one Sitecore is rendering: ASP.NET MVC. A second channel, an app, a kiosk, a campaign site with its own stack, does not get that page. Each channel needs its own presentation, so the CMS effort is repeated once per channel.

## What MVC gives you

Sitecore MVC is a real separation inside the coupled site. A controller handles the request, a model carries the datasource, a view renders markup. You can unit-test the controller. You can reuse a rendering on many pages. Experience Editor lets an author see the page while they edit.

That separation is inside one runtime. The view still lives with the CMS. Personalisation rules swap renderings on the server. The page that leaves the CD is HTML.

## Component-based architecture

A Sitecore page is not one block of HTML. A layout on a device lists the components that make the page, and each component owns one region.

The Default layout lists those components as controls: navigation, breadcrumb, intro, content, image, related items, footer.

![The Default layout and the controls that compose the page](/workshop/component-based-layout.png)

The published page is those components drawn together. The breadcrumb, the title, the side navigation, the related links, the body, and the image are separate components on one layout.

![A page built from those components](/workshop/component-based-page.png)

The layout decides which components appear and where they sit. The component decides the HTML. The datasource decides the words. JSS keeps this model. A placeholder is the named slot a control occupies, and a JSS component is the React version of one of those controls.

## Where Sitecore already split content from presentation

Sitecore items have never been "a blob of HTML". A page item points at presentation details: devices, layouts, renderings, placeholders, datasources. The rendering engine is what joins them into a response.

Headless keeps that item model and stops the CD from being the thing that emits the page HTML. The Layout Service emits the presentation details as JSON. Something else, your React app, does the joining.

## What authors feel if you only take the API

A pure content API gives editors fields. It does not give them the page. The hybrid claim, from the architecture deck and from Sitecore's own headless description, is that authors keep both: the fields and the layout. Placeholders, renderings, and rules stay in Sitecore. The React app agrees to render whatever the layout document lists.

That agreement is the rest of this workshop. MVC is the baseline you are leaving one component at a time, starting with the hero.

- [ ] You can name the three jobs a coupled CMS combines.
- [ ] You can point at a region of the page and name it as a component on the layout.
- [ ] You can say what the Layout Service returns instead of HTML.
