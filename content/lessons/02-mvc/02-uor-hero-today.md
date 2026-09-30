# The Reading hero, as MVC

University of Reading's current platform conversation is XP 10.4: content management, Experience Editor, search, media, forms, identity. The homepage hero is a useful first migration because everyone can see it, it has few fields, and it is the banner Sitecore Search will later want to sit beside.

Treat the component below as the workshop contract. It is the stand-in we will migrate. It is not a claim about a controller in the Reading solution.

## The rendering contract

| Piece | Workshop stand-in |
| --- | --- |
| Rendering | `Hero`, a controller rendering |
| View | Razor markup for eyebrow, title, summary, image, link |
| Datasource template | Hero Banner |
| Placeholder | A key on the homepage layout, often something like `main` |
| Parameters | A variant, if the same rendering is reused |

Fields an author should be able to change without a build:

| Field | Sitecore type | Example |
| --- | --- | --- |
| Eyebrow | Single-Line Text | University of Reading |
| Title | Single-Line Text | Find your place to study |
| Summary | Multi-Line Text | One sentence under the title |
| Image | Image | Campus photograph, with alt text |
| CTA | General Link | Explore courses → `/study` |

A parameter, `Variant`, is presentation. `campus` is the editorial banner. `search` reserves a slot for a search box. The parameter is not a reason to fork the view into two renderings.

## What the Razor view is doing

```html
<section class="hero">
  <p>@Model.Eyebrow</p>
  <h1>@Model.Title</h1>
  <p>@Model.Summary</p>
  <img src="@Model.Image.Src" alt="@Model.Image.Alt" />
  <a href="@Model.Cta.Href">@Model.Cta.Text</a>
</section>
```

The view knows the HTML. Sitecore knows the field values, the datasource, and which placeholder the rendering sits in. Experience Editor can edit the text because the view emits editable field helpers, or because the Chrome data is wrapped around those helpers.

## What you should refuse to hard-code

The title of a recruitment campaign changes every cycle. If it lives in the `.cshtml`, every change is a developer, a build, and a deployment. If it lives on the datasource, it is a workflow and a publish.

The HTML structure, the responsive behaviour, and the decision that a search slot appears for one variant: that is still code. Headless does not move that into the Content Editor. Hybrid headless moves the *values* and the *placement*.

Open the [hero studio](/studio) and look at stage 1. That stage is the React twin of a view with the strings written in the file.

- [ ] You can list the five fields and the one parameter.
- [ ] You can point at stage 1 of the studio and say which strings would force a release.
