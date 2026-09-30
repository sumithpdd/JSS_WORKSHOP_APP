export type FieldValue = { value: string };
export type ImageField = { value: { src: string; alt: string } };
export type LinkField = { value: { href: string; text: string } };

export type HeroFields = {
  Eyebrow: FieldValue;
  Title: FieldValue;
  Summary: FieldValue;
  Image: ImageField;
  Cta: LinkField;
};

export type HeroRendering = {
  componentName: "Hero";
  dataSource: string;
  params: { Variant: "campus" | "search" };
  fields: HeroFields;
};

export type LayoutDocument = {
  sitecore: {
    context: {
      language: string;
      pageEditing: boolean;
      site: { name: string };
    };
    route: {
      name: string;
      displayName: string;
      placeholders: {
        "jss-main": HeroRendering[];
      };
    };
  };
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  summary: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  showSearchSlot: boolean;
};

export const HARD_CODED_HERO: HeroContent = {
  eyebrow: "University of Reading",
  title: "Find your place to study",
  summary:
    "A homepage banner written straight into the React component. Change the headline and you need a developer, a build, and a release.",
  imageAlt: "Campus lawns in late summer, used here as a workshop stand-in",
  ctaText: "Explore courses",
  ctaHref: "/study",
  showSearchSlot: false,
};

export const PROP_DRIVEN_HERO: HeroContent = {
  ...HARD_CODED_HERO,
  summary:
    "Same component, but the words arrive as props. This is the SXA idea in miniature: one rendering, content and a variant supplied from outside.",
};

export function createLayoutDocument(): LayoutDocument {
  return {
    sitecore: {
      context: {
        language: "en",
        pageEditing: false,
        site: { name: "university-of-reading" },
      },
      route: {
        name: "home",
        displayName: "Home",
        placeholders: {
          "jss-main": [
            {
              componentName: "Hero",
              dataSource: "Home/Hero Banner",
              params: { Variant: "campus" },
              fields: {
                Eyebrow: { value: "University of Reading" },
                Title: { value: "Find your place to study" },
                Summary: {
                  value:
                    "This headline now lives in layout data, the same shape the Layout Service returns. Edit the field. The component does not change.",
                },
                Image: {
                  value: {
                    src: "",
                    alt: "Campus lawns in late summer, used here as a workshop stand-in",
                  },
                },
                Cta: { value: { href: "/study", text: "Explore courses" } },
              },
            },
          ],
        },
      },
    },
  };
}

export function heroFromLayout(layout: LayoutDocument): HeroContent {
  const rendering = layout.sitecore.route.placeholders["jss-main"][0];
  return {
    eyebrow: rendering.fields.Eyebrow.value,
    title: rendering.fields.Title.value,
    summary: rendering.fields.Summary.value,
    imageAlt: rendering.fields.Image.value.alt,
    ctaText: rendering.fields.Cta.value.text,
    ctaHref: rendering.fields.Cta.value.href,
    showSearchSlot: rendering.params.Variant === "search",
  };
}
