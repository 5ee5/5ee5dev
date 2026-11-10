/** Content for the /hire-me page. */
import { contacts } from "./profile";

/** The public address already published on the home page. */
export const hireEmail =
  contacts.find((c) => c.id === "mail")?.value ?? "e5@5ee5.dev";

export const services = [
  {
    id: "websites",
    title: "Landing pages and websites",
    price: "€99",
    unit: "",
    description:
      "Fast, responsive sites built with Next.js, React, TypeScript and modern web technologies.",
  },
  {
    id: "apps",
    title: "Web applications",
    price: "€149",
    unit: "",
    description:
      "Custom functionality and full-stack applications, shaped around what your project needs.",
  },
  {
    id: "linux",
    title: "Linux and deployment assistance",
    price: "€30",
    unit: "",
    description:
      "Linux administration, Docker, hosting and deployment: getting your project online and keeping it running.",
  },
  {
    id: "maintenance",
    title: "Website maintenance",
    price: "€29",
    unit: "/month",
    description:
      "Bug fixes, updates and improvements for an existing site or application.",
  },
];

export const steps = [
  {
    title: "Send an enquiry",
    text: "Tell me about your project by email.",
  },
  {
    title: "Discuss requirements and pricing",
    text: "We agree on scope, timeline and a price.",
  },
  {
    title: "Development and testing",
    text: "I build the project and test it along the way.",
  },
  {
    title: "Delivery",
    text: "You receive the finished work, ready to use.",
  },
];

const subject = "Project enquiry — 5ee5dev";

const body = `Hi,

I'd like to discuss a project with you.

Type of project (website, web app, deployment help, maintenance):
 

What I want to build or fix:
 

Existing site or repository (if any):
 

Deadline (if any):
 

Budget (if any):
 

Thanks!`;

export const mailtoHref = `mailto:${hireEmail}?subject=${encodeURIComponent(
  subject,
)}&body=${encodeURIComponent(body)}`;
