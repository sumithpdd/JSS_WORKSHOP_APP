# Layout Service

## Sitecore Layout Service

![Sitecore Layout Service. The item repository, personalisation, and presentation stay in Sitecore. The rendering engine still produces HTML. The Layout Service sends presentation details out to decoupled content delivery.](/workshop/sitecore-layout-service.png)

The Layout Service:

- Outputs JSON data for the selected item.
- Contains information about the context and the route data (placeholders, components, datasourced content).
- Is based on the presentation details of your item.

![Device Editor, Controls. Content Block is placed in the jss-main placeholder.](/workshop/layout-service-presentation-details.png)

The Layout Service for this workshop is:

```text
http://ex.sitecore-jss-workshop.sc/sitecore/api/layout/render/jss
```

A request looks like this:

```text
/sitecore/api/layout/render/jss?item=/&sc_lang=en&sc_apikey={item-id}
```

`item` is the path. `sc_lang` is the language. `sc_apikey` is the ID of an API key item under the services settings. On a training instance the CORS and controller restrictions are often wildcards. On production they are not.

![The layout URL split into item path, language, and API key.](/workshop/layout-service-url.png)

## The Layout Service — Output

![Layout Service JSON. Context, the route, and the jss-main placeholder with Content Block are each outlined.](/workshop/layout-service-output.png)

- Sitecore Context
  - Language, pageEditing, site info
- Route
  - Info on the resolved route and fields
- Placeholders and components
  - What component needs to go in what placeholder, and what data is defined on that component

Headless Rendering for XP 10.4 exposes this service from the CM and the CD. Experience Edge exposes layout and item data through GraphQL after publish, which is a later lesson. The shape of the `sitecore` object is the part your component cares about.

## A hero, in that shape

```json
{
  "sitecore": {
    "context": { "language": "en", "pageEditing": false, "site": { "name": "university-of-reading" } },
    "route": {
      "name": "home",
      "placeholders": {
        "jss-main": [
          {
            "componentName": "Hero",
            "dataSource": "Home/Hero Banner",
            "params": { "Variant": "campus" },
            "fields": {
              "Title": { "value": "Find your place to study" }
            }
          }
        ]
      }
    }
  }
}
```

`jss-main` is the placeholder name from the JSS sample era. Headless SXA sites and SitecoreAI samples often call the main placeholder `headless-main`. The app and the Sitecore placeholder settings must use the same key. The studio uses `jss-main` so it matches the workshop deck you already have.

## The Dictionary Service

The Dictionary Service outputs dictionary data for labels and fixed text on your components.

![Dictionary Service JSON for the exercises app in English. Phrases include Documentation, GraphQL, Styleguide, and a sample entry.](/workshop/dictionary-service.png)

A label that never changes per page, such as a skip-link or a search button, belongs here. The hero's title does not. It is a field on a datasource, because marketing changes it.

## GraphQL

[GraphQL](http://graphql.org/learn/) is the query language. On this workshop instance the items endpoint is `/sitecore/api/graph/items/master`, and the browser for it is `/sitecore/api/graph/items/master/ui`.

### GraphQL: Items Query

- Designed to support the frontend.
- Offers amazing tooling.
- Strongly typed, self-documenting.
- Bandwidth efficient.
- Easy real-time data.

### REST vs GraphQL

| | REST | GraphQL |
| --- | --- | --- |
| Request | Normally an HTTP request that returns JSON. | Normally an HTTP request that returns JSON. |
| Payload | Resources return complete resource data. | Queries return only the required data. |
| Several resources | Data from multiple resources requires several requests. | The GraphQL schema enables a single query to express complex data relationships. |
| Results and errors | Results are arbitrarily formatted. Error handling is limited to HTTP status codes. | Results have a standard, predictable structure based on the query input. Error replies are standardized and rich. |
| Documentation | Documentation requires adoption of separate standards (for example Swagger). | Self-documenting and browseable. |
| Batching | | Supports batching queries. |

More detail: [https://goo.gl/qo6YUp](https://goo.gl/qo6YUp)

### Extreme extensibility

- Host on .NET Core or full framework.
- Resolve data from anywhere.
- Create your own **Graph Types** that map C# types to GraphQL types.
- Write your own **Schema Providers** to integrate other datasources.
- Add **Schema Extenders** to change existing schema types.

### GraphQL: Configuration

Expose your GraphQL endpoint through the configuration. Check `[yourappname].config`.

Configure the template path, queries, extenders, and everything else you need.

![The exercises endpoint at /api/exercises asks for an SSC API key. The config registers that URL and sets the schema, templates path, and filters.](/workshop/graphql-configuration.png)

### GraphQL: UI

GraphQL comes with a UI. Navigate to your endpoint and append `/ui?sc_apikey=[yourapikey]`.

```text
http://ex.sitecore-jss-workshop.sc/api/exercises/ui?sc_apikey={YOUR_API_KEY}
```

![Sitecore Experience Graph Browser. A query for /sitecore/templates returns Branches, Common, List Manager, System, Foundation, and Feature. The schema lists item, datasource, and datasources.](/workshop/graphql-ui.png)

### GraphQL: Items Query basics

`item` just retrieves the item.

![An item query for /sitecore/content/exercises/home returns the home page title and child routes graphql, styleguide, and workshop.](/workshop/graphql-item-query.png)

### GraphQL: Datasource Query basics

`datasource` goes through the `parseDataSource` pipeline, the same way MVC resolves a datasource you set on a rendering.

![IntegratedDemoQuery takes a datasource and a context item. The datasource resolves to home, and the context item resolves to the styleguide route and its children.](/workshop/graphql-datasource-query.png)

## GraphQL and JSS

```graphql-modes
compare
```

## GraphQL: Integrated GraphQL

The integrated query is configured on the component definition, on the Component GraphQL Query field.

Sitecore passes the datasource and the context item to your query when you use the provided helper function.

```graphql
query IntegratedDemoQuery($datasource: String!, $contextItem: String!)
```

Nothing special has to be done on the front-end side.

![Component GraphQL Query on a component definition. The query reads the datasource as MainNavigation and walks its NavItem children.](/workshop/graphql-integrated-query.png)

## GraphQL: Connected GraphQL

Connected GraphQL queries your GraphQL endpoint instead of modifying the Layout Service output.

Use `GraphQLData` for the JSS and Apollo integration.

![The GraphQL Connected sample. Apollo runs the query against the Sitecore endpoint and shows the context item id, name, and page title.](/workshop/graphql-connected.png)

Open stage 3 of the [hero studio](/studio). The JSON panel is this document. The form is a friendlier editor over the same object.

- [ ] You can point at context, route, placeholder, component name, and a field.
- [ ] You can say what `sc_apikey` identifies.
