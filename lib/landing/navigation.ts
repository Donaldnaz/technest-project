export const LANDING_HOME = "/";

export type NavLink = {
  href: string;
  label: string;
};

export function getHashId(href: string): string | null {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return null;
}

export function toLandingSectionHref(hashId: string): string {
  return `/${hashId.startsWith("#") ? hashId : `#${hashId}`}`;
}

export type FooterNavGroup = {
  title: string;
  links: NavLink[];
};

export const primaryNavLinks: NavLink[] = [
  { href: toLandingSectionHref("what-we-do"), label: "What we do" },
  { href: toLandingSectionHref("experience"), label: "Portal" },
  { href: toLandingSectionHref("about"), label: "About us" },
  { href: toLandingSectionHref("contact"), label: "Contact us" },
];

export const landingSectionIds = primaryNavLinks
  .map((link) => getHashId(link.href))
  .filter((id): id is string => id !== null);

export const footerProductLinks = primaryNavLinks.filter((link) => {
  const id = getHashId(link.href);
  return id === "what-we-do" || id === "experience";
});

export const footerCompanyLinks = primaryNavLinks.filter((link) => {
  const id = getHashId(link.href);
  return id === "about" || id === "contact";
});

export const legalNavLinks: NavLink[] = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/accessibility", label: "Accessibility" },
];

export const footerNavGroups: FooterNavGroup[] = [
  { title: "Product", links: footerProductLinks },
  { title: "Company", links: footerCompanyLinks },
  { title: "Legal", links: legalNavLinks },
];

export const contactEmail = "hello@icare.app";
export const contactPhone = "+1 (415) 555-0100";

export const headquartersAddress = {
  name: "Headquarters",
  street: "548 Market Street, Suite 35410",
  city: "San Francisco",
  state: "CA",
  postalCode: "94104",
  country: "United States",
} as const;

export const headquartersAddressLines = [
  headquartersAddress.street,
  `${headquartersAddress.city}, ${headquartersAddress.state} ${headquartersAddress.postalCode}`,
  headquartersAddress.country,
] as const;
