export type NavLink = {
  href: string;
  label: string;
};

export type FooterNavGroup = {
  title: string;
  links: NavLink[];
};

export const primaryNavLinks: NavLink[] = [
  { href: "#what-we-do", label: "What we do" },
  { href: "#experience", label: "Platform" },
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Contact us" },
];

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { href: "#experience", label: "Platform" },
      { href: "#what-we-do", label: "What we do" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#about", label: "About us" },
      { href: "#contact", label: "Contact us" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/auth/sign-in", label: "Sign in" },
      { href: "/auth/sign-up", label: "Get started" },
    ],
  },
];

export const contactEmail = "hello@icare.app";
