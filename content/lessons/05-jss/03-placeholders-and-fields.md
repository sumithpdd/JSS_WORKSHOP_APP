# Placeholders, fields, and where you start

JSS keeps Sitecore's layout model and sends it to React as a tree. A placeholder is a named list of components. A component may expose further placeholders. The tree removes the old ambiguity about which "main" you meant, because each list has a parent.

When the app imports code-first content, those placeholders are dynamic. In connected mode, Sitecore's own presentation details are converted into the same tree. Your `Placeholder` helper walks that tree and asks a component factory for `Hero`.

## Understanding Layout

JSS extends Sitecore's dynamic, component-based layout model to the front end.

The entry point owns a placeholder. The component owns the markup. The layout definition says which components sit in that placeholder.

```jsx
// Layout.js (entry point)
<div>
  <placeholder name="jss-main" />
</div>
```

```jsx
// HelloWorld.js (component)
<div>hello world!</div>
```

```yaml
# layout definition
placeholders:
  jss-main:
    - componentName: HelloWorld
    - componentName: HelloWorld
```

Two `HelloWorld` entries in `jss-main` render as two copies of the component:

```html
<div>
  <div>hello world!</div>
  <div>hello world!</div>
</div>
```

## Placeholders in JSS

- Use a tree in the layout, so there is no ambiguity about which placeholder is targeted.
- In connected mode, data from Sitecore is converted into that tree.
- When importing items into Sitecore, treat the placeholders as dynamic.

### Placeholder on a component

Import `Placeholder`, then define it on the component. Each name is a slot in the tree. `jss-left-column` and `jss-right-column` are different placeholders, even though they sit in the same component.

```jsx
import React from "react";
import { Placeholder } from "@sitecore-jss/sitecore-jss-react";
import { Container, Row, Col } from "reactstrap";

const TwoColumn = ({ route, rendering }) => (
  <Row>
    <Col xs="6">
      <Placeholder name="jss-left-column" rendering={rendering} route={route} />
    </Col>
    <Col xs="6">
      <Placeholder name="jss-right-column" rendering={rendering} route={route} />
    </Col>
  </Row>
);

export default TwoColumn;
```

### Placeholders in the component definition

Register the same names on the component definition. If the React component exposes a placeholder and the definition does not list it, Sitecore will not return components placed in that placeholder.

```js
// eslint-disable-next-line no-unused-vars
import { CommonFieldTypes, SitecoreIcon, Manifest } from "@sitecore-jss/sitecore-jss-manifest";

/**
 * Adds the TwoColumn component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: "TwoColumn",
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: "heading", type: CommonFieldTypes.SingleLineText }],
    placeholders: [
      { name: "jss-left-column", displayName: "left column" },
      { name: "jss-right-column", displayName: "right column" },
    ],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
```

### Add components into placeholders

The route YAML puts components inside the placeholders the component defined. Each column is its own list.

```yaml
- componentName: TwoColumn
  placeholders:
    jss-left-column:
      - componentName: ContentBlock
        fields:
          content: Left column content
    jss-right-column:
      - componentName: ContentBlock
        fields:
          content: Right column content
```

## Placeholders on the layout

`jss-main` is the root placeholder. It is named in three places.

- Add it to `Layout.js`.
- Add it to the `placeholders.sitecore.js` definition.
- Add it to `package.json`.

```jsx
<div className="container">
  <Placeholder name="jss-main" rendering={route} />
</div>
```

```js
manifest.addPlaceholder(
  { name: "jss-main", displayName: "Main" },
  { name: "jss-tabs", displayName: "Tabs", id: "tabs-placeholder" }
);
```

```json
"config": {
  "appName": "exercises",
  "rootPlaceholders": ["jss-main"]
}
```

## The hero's fields

Use the types the SDK already knows.

| Field | Stored as |
| --- | --- |
| Eyebrow, Title | Single-Line Text, rendered with `Text` |
| Summary | Multi-Line Text, rendered with `Text` |
| Image | Image field, rendered with `Image`, alt text included |
| CTA | General Link, rendered with `Link` |

## Component properties

Parameters configure the component. They are separate from fields, and they are defined on the manifest definition. There are two styles.

**With a component parameters template.** Give the parameter a name and a field type. The editor gets a real field.

```js
export default function (manifest) {
  manifest.addComponent({
    name: "Heading",
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: "heading", type: CommonFieldTypes.SingleLineText }],
    params: [{ name: "heading", type: CommonFieldTypes.SingleLineText }],
  });
}
```

**Without component parameters.** A bare list of names also works:

```js
params: ["heading"]
```

The editor experience is the difference. A parameters template shows the parameter as a field the author can use. `params: ["heading"]` stores a string a developer has to remember.

## App import and code-first workflow

```code-first
path
```

JSS can start code-first, so JavaScript developers work disconnected from Sitecore. Application import then brings that application into Sitecore and generates the artifacts Sitecore needs to manage it: templates, renderings, and content. That bootstraps the Sitecore side, and it leaves front-end developers in control of the data structures.

## Ways to start

### Code First

- You start with the front end. A Sitecore install is optional.
- Front-end code defines Sitecore structures via component descriptors (manifest) and route data.
- Sitecore information architecture is generated via the import process.
- Sitecore development artifacts (templates, renderings, and the rest) are also generated.

#### Frontend Developer Environment

![Frontend developer environment. Any OS, any IDE, completely unplugged. Pull npm packages, use the placeholder component, and keep content in JSON files.](/workshop/code-first-frontend-environment.png)

The developer works on any operating system and any IDE, completely unplugged from Sitecore. They pull the npm packages, use the placeholder component, and keep content in JSON files.

#### Integrated Environment (CI)

![Integrated environment. Sitecore with the JSS package, the JavaScript bundle, and manifest generation for templates, content items, layout details, and rendering items, then manifest import.](/workshop/code-first-integrated-environment.png)

Continuous integration has Sitecore with the JSS package and the JavaScript bundle. Manifest generation produces the templates, content items, layout details, and rendering items. Manifest import brings them into Sitecore.

### Sitecore First

- Sitecore information architecture (templates, renderings, and the rest) is created by the Sitecore developer. No import process is used.
- The front-end developer works disconnected from Sitecore and creates components and mock route data from the spec or contract the Sitecore developer provides.
- The contract can be defined first, so both sides work at the same time.

#### Sitecore Environment

![Sitecore environment. Sitecore with the JSS package. Information architecture, data templates, renderings, and content items are created.](/workshop/sitecore-first-sitecore-environment.png)

Sitecore already has the JSS package. The information architecture, data templates, renderings, and content items are created there. Nothing is imported from the front-end project.

#### Frontend Developer Environment

![Frontend developer environment for Sitecore-first. Any OS, any IDE. Pull npm packages and the placeholder component, and pull Layout Service JSON occasionally or always.](/workshop/sitecore-first-frontend-environment.png)

The front-end developer still works on any operating system and any IDE. They pull the npm packages and the placeholder component, and they pull Layout Service JSON, occasionally or on every run.

> **Important.** You can start code-first and move to Sitecore-first. You cannot start Sitecore-first and move to code-first.

## Develop your application

![Develop the application in any IDE. A component uses the JSS Placeholder. Route data can be local JSON, or content read from Sitecore.](/workshop/develop-your-application.png)

Work connected or disconnected from Sitecore, in any IDE.

- Use local content stored in JSON.
- Or use live content from Sitecore.

The component imports `Placeholder` from `@sitecore-jss/sitecore-jss-react`. Route data can live beside the app and be converted into Layout Service shape, which is what the component already knows how to render.

![A Home component imports Placeholder from the JSS React package and places page-header and page-content on the route.](/workshop/develop-your-application-components.png)

Import the Sitecore JSS npm packages to add the language-specific components. Those components are what turn on Experience Editor features:

- Content editing
- Page designing
- Personalization
- Testing

## JSS CLI

- Install it with `npm install -g @sitecore-jss/sitecore-jss-cli`.
- Use it to create, package, and run your JSS application.
- Use `--help` to get help on commands.

![jss --help. Commands include clean, deploy, manifest, package, setup, start, start:connected, build, and scaffold.](/workshop/jss-cli-help.png)

### JSS CLI: Create app

`jss create [appname] [angular|react|vue|react-native]`

- `--hostname` sets the Sitecore hostname the app connects to.
- `--repository`, `-r` sets the git repository.
- `--branch`, `-b` sets the branch in that git repository.
- `--source`, `-s` sets a local filesystem location.

### JSS CLI: Start your app in disconnected mode

`jss start`

![jss start in disconnected mode. The app compiles, then serves the dictionary in English and the layout for the home route.](/workshop/jss-start-disconnected.png)

The dev server starts without Sitecore. It serves local content: the dictionary for the language, and the layout for the route.

### JSS CLI: Scaffold

`jss scaffold [componentname]`

It creates two files: a definition, and a React component.

![jss scaffold Demo. The CLI creates the component definition and the React component, then tells you to add the component to a route and run jss start.](/workshop/jss-scaffold.png)

The component reads a field with the JSS `Text` helper:

```jsx
import React from "react";
import { Text } from "@sitecore-jss/sitecore-jss-react";

const Demo = (props) => (
  <div>
    <p>Demo Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default Demo;
```

The definition registers that component on the manifest, including the `heading` field:

```js
import { CommonFieldTypes, SitecoreIcon, Manifest } from "@sitecore-jss/sitecore-jss-manifest";

/**
 * Adds the Demo component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function (manifest) {
  manifest.addComponent({
    name: "Demo",
    icon: SitecoreIcon.DocumentTag,
    fields: [{ name: "heading", type: CommonFieldTypes.SingleLineText }],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
```

![The JSS CLI deploying from the app folder. deploy-config copies Sitecore config onto the instance. deploy-codefirst is the next command.](/workshop/develop-your-application-deploy.png)

Deploy the application to Sitecore with the JSS CLI:

`jss deploy package`

That command does four things:

- Builds the production bundle of the app.
- Builds the application manifest.
- Builds a Sitecore package.
- Installs the application in Sitecore.

## Importing your application

![Import pipelines. Import creates items, then updates fields and layout, creates rendering instances, and imports media. Datasource strategy decides where datasource items are created.](/workshop/importing-your-application.png)

Import is a series of pipelines. They import a manifest created in JavaScript. That manifest describes the templates, renderings, and content items the JSS app needs.

`create.item` creates routes and items. `update.item` sets values and layout. `import.field` and `import.layout` write the fields and the presentation. `create.renderingInstance` places a rendering, using the datasource strategy to decide where its datasource item lives. `create.media` imports media.

## Manage application in Sitecore

![Experience Editor on an imported JSS page. The title field is editable, the item is in the JSS Development Workflow, and the author can publish.](/workshop/manage-application-in-sitecore.png)

- All required artifacts are created on import.
- Full editing is available in the Content Editor and in Experience Editor.
- Authors can add personalization and testing.
- Workflow and security are enabled, so a later import overwrites content only when that overwrite is allowed.

## Routing

![Routes under data/routes. The Exercises folder, with en.yml, is the page at localhost:3000/en/Exercises.](/workshop/jss-routing.png)

- Define routes to pages under `/data/routes`.
- Folders are pages. YAML files define the languages.
- The default language is `en`.

A folder named `Exercises` with `en.yml` is the page at `/en/Exercises`.

## Creating content

Content is defined in YAML.

![A route YAML file. pageTitle, the Heading in jss-header, and the ContentBlock in jss-main are the Home page at localhost:3000.](/workshop/creating-content-yaml.png)

- Adding new routes
  - Create folders for items (pages) and YAML files for the different languages.
- Additional folders under `data`
  - `component-content`
  - `content`
  - `dictionary`
  - `media`
- The default route type is defined in `/sitecore/definitions/routes.sitecore.js`.

## Templates

- Define custom templates under `/sitecore/definitions/templates`.
- Register each one with `manifest.addTemplate`.

```js
manifest.addTemplate({
  name: "string",
  displayName: "string", // optional
  inherits: ["string"], // optional
  fields: [], // optional, array of field
  icon: "string", // optional
  defaultWorkflow: "string", // optional
});
```

## Field types

| Field | YAML |
| --- | --- |
| Single-Line Text | `Fieldname: string` |
| Multi-Line Text | `Fieldname: string`. Use `\|` for more than one line. |
| Rich Text | `Fieldname: string`. Use `\|` for more than one line. |
| Content list | A list of `id` values under the field name. |
| Item link | A list of `id` values under the field name. |
| General Link | `href`, plus optional `text`, `class`, `target`, and `title`. |
| Image | `src` and `alt`, plus optional `id`, `displayname`, `title`, `keywords`, `description`, `width`, `height`, and `class`. |
| File | `Fieldname: string` |
| Number | `Fieldname: number` |
| Checkbox | `Fieldname: boolean` |
| Date | `Fieldname: string` |
| DateTime | `Fieldname: string` |

```yaml
content:
  - id: option-1
  - id: option-2
```

```yaml
link:
  href: string
  text: string
  class: string
  target: string
  title: string
```

```yaml
image:
  id: string
  src: string
  alt: string
  displayname: string
  title: string
  keywords: string
  description: string
  width: 0
  height: 0
  class: string
```

- [ ] You can explain a placeholder as a named list of components.
- [ ] You can say what code-first generates on import, and what Sitecore-first leaves to the Sitecore developer.
- [ ] You can say which way of starting can move to the other, and which cannot.
