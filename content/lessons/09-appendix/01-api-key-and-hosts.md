# API key, hosts, and setup

## Sitecore: Create API Key

Create a new API Key item under `/sitecore/system/Settings/Services/API Keys` in the master database.

![Content Editor. API Keys is selected under Settings, Services. The insert options are API Key and OData Item API Key.](/workshop/sitecore-create-api-key.png)

Specify CORS Origins and AllowedControllers. Use wildcards for this training. Specify real values on production.

![JSS Key item. CORS Origins and AllowedControllers are both set to a wildcard.](/workshop/sitecore-api-key-cors.png)

## Sitecore: Configure hosts

Add an entry into the hosts file for your app.

![The hosts file. 127.0.0.1 maps sitecore-jss-workshop.identityserver, sitecore-jss-workshop.xconnect, sitecore-jss-workshop.sc, and ex.sitecore-jss-workshop.sc.](/workshop/sitecore-hosts-file.png)

Add a binding in IIS for your app.

![IIS site bindings. http on port 80 for sitecore-jss-workshop.sc and ex.sitecore-jss-workshop.sc.](/workshop/sitecore-iis-bindings.png)

## JSS CLI: Setup

Run `jss setup`.

- Your Sitecore website root folder
- Your app hostname
- Your API Key (item ID of your API item)

![jss setup. The Sitecore folder, hostname http://ex.sitecore-jss-workshop.sc, and the API key item ID are entered. Next steps are deploy config, deploy app, and open the app in integrated mode.](/workshop/jss-setup.png)

## JSS: Check configuration

Check the site definition in `/sitecore/config/[yourappname].config`.

![exercises.config. The site definition sets hostName to ex.sitecore-jss-workshop.sc, rootPath to /sitecore/content/exercises, startItem to /home, and database to master.](/workshop/jss-site-definition.png)

## JSS CLI: Deploy config

`jss deploy config` deploys Sitecore config files to Sitecore.

![jss deploy config copies ./sitecore/config into the Sitecore App_Config Include folder.](/workshop/jss-deploy-config.png)

## JSS CLI: Deploy app

`jss deploy app --includeContent --includeDictionary`

- Creates a production build of your app.
- Creates a manifest for content and items and imports it into Sitecore.
- You will see your app appearing under `/content` in Sitecore.
- You can run your app in integrated mode with Sitecore content.
- You can now run your app in connected mode.

![Experience Editor on the exercises home item. The page reads Welcome to Sitecore JSS.](/workshop/jss-deploy-app.png)

## JSS CLI: Connected mode

`jss start:connected`

Content is now coming from your Sitecore host.

![localhost:3000 shows Welcome to Sitecore JSS. The network panel requests the dictionary from ex.sitecore-jss-workshop.sc.](/workshop/jss-start-connected.png)

## Sitecore: App configuration

Apps are registered on Sitecore in the config under `configuration/javaScriptServices/apps`. Check `/sitecore/config/[yourappname].config`.

![The exercises app sets sitecorePath, useLanguageSpecificLayout, graphQLEndpoint, and inherits defaults.](/workshop/jss-app-configuration.png)

Override the defaults. The defaults are defined in `\App_Config\Sitecore\JavaScriptServices\Sitecore.JavaScriptServices.Apps.config`.

![The defaults app sets filesystemPath, serverBundle, import user, language, database, device, and the Project paths for templates, renderings, layouts, and placeholders.](/workshop/jss-app-defaults.png)

## Manifest API: addComponent

```js
{
  id: string:optional,

  displayName: string:optional,
  fields: fields:optional,
  params: params:optional,
  placeholders: placeholders:optional, // placeholders exposed by rendering
  allowedPlaceholders: array[string]:optional, // placeholders component is allowed in (normally inferred by route data)
  displayFieldEditorButton: boolean:optional = true,
  fieldEditorFields: array[string]:optional = all fields, // field names
  customExperienceButtons: array[string]:optional, // names or IDs
  insertOptions: array[string]:optional, // template names or IDs
  graphQLQuery: string:optional, // see GraphQL integrated documentation
  // note: while these use the same structure as a route, they do not use placeholders and are not mapped as routes.
  // This enables adding child items to the datasource.
  children: array[route],
}
```

## JSS: Tracking

JSS tracks page views by default through the Layout Service.

- This can be disabled by adding `tracking=false` to the Layout Service requests.
- It is configurable via the `dataApi` object in JSS apps.

### JSS tracking service

- Disabled by default.
- Can be enabled by setting `Sitecore.JSS.TrackerServiceEnabled` to `true`.
- Use `trackingApi` from `sitecore-jss-tracking`.

## JSS: Track Pageview

Page view events require a Sitecore item ID. Use a surrogate item ID if you want to track a route that is not an item.

```js
trackingApi.trackEvent(
  [{ pageId: "{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}", url: "/" }],
  trackingApiOptions
);
```

## JSS: Authentication

The Layout Service respects any logged-in user and Sitecore security. You can use security and authentication with JSS.

Sitecore Services Client includes an Authentication Service. It can log into Sitecore over REST and set the `.ASPXAUTH` cookie. You may invoke this service from your JSS application to use Sitecore authentication and authorization.

For testing, try it in integrated mode because of the CORS origins issue.

## JSS: Forms

Sitecore Forms is a form-authoring framework that lets marketers author their own forms, collect data, and analyze form performance.

It is not possible to use Sitecore Forms in disconnected mode.

![Browser and Sitecore. The browser gets layout data plus the form schema, renders the form, and posts the data. Sitecore runs the submit action. A multistep form returns the next step schema.](/workshop/jss-forms.png)

## JSS: Disconnected GraphQL (Connected)

A bit trickier.

- Register a GraphQL mocking server.
- Ensure requests are proxied to this server.
- The example is in the exercises app, `disconnected-mode-proxy.js`.

```js
afterMiddlewareRegistered: (app) => {
  // Connected graphQL adjustment for disconnected mode
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  let options = {
    introspectionResult: introspectionResult,
    mocks: {
      JSON: () => {
        return { value: "Test" }; // This needs deeper research to properly output the correct value
      },
    },
  };
  let graphqlService = createDisconnectedGraphqlService(options);
  app.use(config.graphQLEndpointPath, graphqlService.middleware);
},
```

## Placeholder Settings

- Define the placeholder key.
- Set the allowed controls.
- Define whether the placeholder is editable.

![Content Editor. A Placeholder Settings item has Placeholder Key, Allowed Controls, and Editable.](/workshop/placeholder-settings.png)

- [ ] You created an API Key under `/sitecore/system/Settings/Services/API Keys` and set CORS Origins and AllowedControllers.
- [ ] You added a hosts entry and an IIS binding for the app.
- [ ] You ran `jss setup` with the Sitecore folder, the app hostname, and the API key item ID.
- [ ] You checked `hostName` in `/sitecore/config/[yourappname].config`.
- [ ] You ran `jss deploy config` and `jss deploy app --includeContent --includeDictionary`.
- [ ] You ran `jss start:connected` and the page content came from the Sitecore host.
- [ ] You found the app under `javaScriptServices/apps` and the defaults in `Sitecore.JavaScriptServices.Apps.config`.
- [ ] You can say that page-view tracking is on by default, and that the tracking service stays off until `Sitecore.JSS.TrackerServiceEnabled` is `true`.
