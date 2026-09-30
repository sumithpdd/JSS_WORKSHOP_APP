# Application modes

![Five application modes: Disconnected, Connected, Integrated, API-Only, and Headless Server-Side Rendering.](/workshop/application-modes.png)

Teams mix modes up and then debug the wrong host. Five of them are enough.

### Disconnected Mode

- Sitecore is not required.
- The app hosts locally.
- It uses local content data.

#### Characteristics

- Rendering is performed by the browser.
- Data comes from local JSON or YML files.
- Usage: development.

#### Configuration

- Run `jss start` to start in disconnected mode.
- Open [http://localhost:3000](http://localhost:3000) if it does not open automatically.

![Disconnected mode. The developer uses the dev server on localhost port 3000. A mock Sitecore proxy on port 3042 reads route data from /data/routes/en.yml.](/workshop/disconnected-mode.png)

The dev server is the app the developer opens. The mock Sitecore proxy stands in for Sitecore and reads the route file, so the browser can render without a Content Management server.

### Connected Mode

- Sitecore is required.
- The app hosts locally.
- Content data comes from Sitecore.

#### Characteristics

- Rendering is performed by the browser.
- Data comes from Sitecore.
- Usage: development against Sitecore.

#### How to use

- Run `jss start:connected` to start the dev server.
- Open [http://localhost:3000](http://localhost:3000) if it does not open automatically.

![Connected mode. The developer uses the dev server on localhost port 3000. That server reads Sitecore, which reads the Sitecore content database.](/workshop/connected-mode.png)

The dev server still runs on the developer's machine. Instead of a mock proxy and a local route file, it reads the Sitecore instance, and Sitecore reads the content database.

### Integrated Mode

- Sitecore is required.
- The app hosts on Sitecore.
- Content data comes from Sitecore.
- Rendering is server-side.

#### Characteristics

- Rendering is performed by the server.
- Data comes from the Sitecore Layout Service.
- The application must be configured with Sitecore.
- Usage: the Content Management and authoring server, and a production Content Delivery server when you are not using headless hosting.

#### How to use

- Open the hostname configured for the app, such as `http://your-configured-app-hostname/`.

![Integrated mode. The user requests the Sitecore app hostname. Sitecore reads the content database and calls node.exe, the server-side rendering host.](/workshop/integrated-mode.png)

The user does not open a local dev server. They open the Sitecore hostname. Sitecore reads the content database and asks the Node process, `node.exe`, to render the page.

### API-Only Mode

- Consume personalized Sitecore layout data from any platform that understands JSON.

#### Characteristics

- Sitecore headless APIs return raw JSON. Those APIs include the Layout Service, GraphQL, the Dictionary Service, and the Sitecore Services Client.
- Anything that understands JSON can consume them: a native mobile app, a chatbot, or another channel.

#### How to use

- Layout Service and Dictionary Service: `http://myapp.dev.local/sitecore/api/layout/render/jss?item=/&sc_apikey={YOUR_API_KEY}`
- GraphQL: follow the instructions on [jss.sitecore.com](http://jss.sitecore.com/).
- Sitecore Services Client: already available out of the box with standard Sitecore.

### Headless Server-Side Rendering Mode

- Server-side rendering is performed on a Node server.
- Data comes from the Sitecore Content Delivery role.

#### Characteristics

- Rendering is performed by the server. A Node host does that work: Azure App Service, Netlify, Heroku, or a similar service.
- Data comes from the Sitecore Content Delivery Layout Service.
- Usage: decouple rendering of the JSS app from Sitecore, and serve more than one channel from the same API.

#### How to use

- Install the JSS app on the proxy, such as Heroku or Netlify.
- Run `npm run start` against that proxy.

![Headless server-side rendering. The user requests the Node host, such as www.yourapp.com on Azure App Service, Netlify, or Heroku. That host reads the Sitecore Content Delivery role, which reads the content database.](/workshop/headless-ssr-mode.png)

The user opens the public app hostname. The Node host renders the page and asks the Sitecore Content Delivery role for layout data. Sitecore reads the content database. The rendering process does not run inside Sitecore.

## Application modes in practice

![In practice, disconnected and connected are development modes. Integrated mode is used in development and in production. API-only and headless server-side rendering are production modes.](/workshop/application-modes-in-practice.png)

**Development.** Disconnected mode and connected mode. Integrated mode is also used while you are still building.

**Production.** Integrated mode, API-only mode, and headless server-side rendering mode.

Integrated mode is the overlap. You can use it on the authoring server while you develop, and on a Content Delivery server in production when you are not using a separate headless host.

`jss setup` records the website root, the app hostname, and the API key item ID. `jss deploy config` pushes the Sitecore config include. `jss deploy app` builds the app, builds a manifest, and imports items. After that, `jss start:connected` reads content from the CM. The hero title would come from the datasource item you imported, and the studio form would be replaced by the Content Editor.

Item IDs created by import are deterministic for the same app content. The workshop warning still applies: renaming, moving, or re-importing without stable IDs produces duplicates. Once authors own the hero item, stop importing content over the top of them.

## What headless server-side rendering changes

Visitors hit the rendering host. The host asks the CD, or Experience Edge, for layout JSON, and returns HTML. Editors still need a host that can open the page in editing mode, with `pageEditing` true in the context, so field helpers light up.

API-only is the mode you choose for a channel that will not use the React components: a course-finder app that only wants the hero fields, a kiosk, a feed. It consumes the same Layout Service, or a GraphQL query, and draws with its own UI.

## Personalisation stays in the document

JSS tracks the page view through the layout request unless you disable it. Rules that hide or swap a rendering are resolved by Sitecore before the JSON is built. The React app renders the list it was given. You do not reimplement the rule engine in the component.

- [ ] You can name the five modes and say whether Sitecore is required for each.
- [ ] You can say where headless server-side rendering runs, and where its data comes from.
