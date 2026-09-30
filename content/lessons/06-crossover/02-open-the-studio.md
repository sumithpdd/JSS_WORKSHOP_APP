# Open the studio

The [hero studio](/studio) is the lab bench. Use it now, before the capstone formalises the migration.

## Do this

1. Open stage **1. Hard-coded React**. Read the summary under the title. That sentence admits the headline needs a release.
2. Open stage **2. Component props**. The component looks the same. The summary changes, because the parent passed different props. You did not edit `CampusHero` to do that.
3. Open stage **3. Layout Service**. Change the title to something a faculty would actually publish, for example `Clearing, still open`. The banner updates. The component name in the JSON stays `Hero`.
4. Set **Variant** to `search`. A search slot appears under the button. Set it back to `campus`. The slot goes away. You changed a parameter, not a second component.
5. Look at the layout document. Find `placeholders`, `jss-main`, `componentName`, `dataSource`, and `fields.Title.value`.

If you break the JSON, the preview keeps the last valid document and the error sits under the editor. Fix the JSON or keep using the form. The form writes the same object.

## What you have just done

You replaced hard-coded lesson content, the hero's words, with data shaped like the CMS. The rest of the portal did not move. That is the continuous story: the workshop site stays a React app, and one component at a time starts to honour layout data.

## Check your work

- [ ] The title changed in stage 3 without a code edit to `CampusHero`.
- [ ] `search` shows the slot and `campus` hides it.
- [ ] You can find `fields.Title` in the JSON after the form edit.
