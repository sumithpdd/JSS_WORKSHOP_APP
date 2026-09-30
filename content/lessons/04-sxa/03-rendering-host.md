# The rendering host

Once Sitecore stops emitting the page HTML, something else must. That something is the rendering host: a Node process, or a host such as Vercel, running the React application. It requests layout data and returns HTML to the visitor.

The editing experience needs the same application. The hybrid deck calls that copy the editing host. Authors preview through it. If the hero component is missing from the build the editing host runs, Experience Editor or Pages shows a hole where the banner should be.

## JSS integration and data flow

![JSS integration and data flow. Development or CI sends a packaged manifest to the import service and an update package through Sitecore.Ship. Items feed the Layout Service, the Node view engine, the Content Service, and the Dictionary Service. The browser receives route JSON, rendered HTML, item JSON, and dictionary JSON.](/workshop/jss-integration-data-flow.png)

Development or continuous integration sends a packaged manifest to the import service, and an update package through Sitecore.Ship. Both write items.

Those items feed four services. The Layout Service returns route JSON. The Node view engine turns that route JSON into server-side rendered HTML. The Content Service, or the Services Client, returns item JSON. The Dictionary Service returns dictionary JSON. The browser or app can take any of those, and a Node server can sit in front and do the first render.

## Server-side JavaScript Rendering

![Server-side JavaScript rendering. The browser sends an HTTP request to Node.js. Node returns the page as HTML and JavaScript. Later updates stay in React, Angular, or Vue.](/workshop/server-side-javascript-rendering.png)

Server-side rendering is usually better for the first render. It helps SEO, and it leaves room for other server integration, such as auth middleware.

JavaScript runs on the server. The browser receives HTML to draw. After that first load, updates go through the UI library: React, Angular, or Vue.

On the Content Management server, server-side rendering is turned on with the JS View Engine so Experience Editor can open the page. In production, server-side rendering is optional. The same application can render in the browser.

## Integrated topology

```topology
integrated
```

Sitecore and Node run on the same machines. Each Sitecore instance has a Node process beside it. Visitors reach those instances through a load balancer.

**Pros**

- Sample config is provided out of the box.
- Good for embedded JSS apps.

**Cons**

- Node and Content Delivery share CPU.
- Not recommended for large-scale, high-traffic apps.

**Warning**

- Caching is all or nothing.

## Headless topology

```topology
headless
```

Sitecore Content Delivery sits behind its own load balancer. A separate Node tier sits in front, behind a second load balancer. The visitor reaches Node. Node asks Sitecore for layout data and returns HTML. The two tiers scale separately. The Content Management server still has Node available so editors can open the page.

**Pros**

- Sample config is provided out of the box.
- Pre-rendered HTML is good for SEO.
- Sitecore sits behind the proxy, which is good for security.
- Node and the Content Delivery servers scale separately.

**Improving performance**

- Enable caching. The technique is documented at [jss.sitecore.com/docs/techniques/performance/caching](https://jss.sitecore.com/docs/techniques/performance/caching).
- Scale the infrastructure.

Later names for the visitor-facing half are the rendering host and, in the XM Cloud and SitecoreAI pictures, the front-end hosting platform. The job did not change.

## On-prem, for a team that still has XP

The lab note "Migrated from SXA, deploy an on-prem instance with a rendering host" is the environment for proving the headless half without pretending you are already on SitecoreAI. The CM keeps the items, the designs, and the editor. The rendering host is a separate deploy of this React app, pointed at the Layout Service with a real API key and a real hostname.

Headless Rendering 22.x is the module line documented for XP 10.4. That is the version to install on a Reading-shaped CM when you leave this stand-in behind.

## What the studio is pretending

Stage 3 of the [hero studio](/studio) holds the layout document in the browser. A rendering host would fetch that document from:

`/sitecore/api/layout/render/jss?item=/&sc_lang=en&sc_apikey={key}`

Your app then walks `placeholders`, finds `componentName: Hero`, and renders it. The studio skips the network and does the walk locally.

- [ ] You can separate the CM, the rendering host, and the editing host.
- [ ] You can say why the hero component has to be in the editing build, not only the public build.
