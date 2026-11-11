/** Content for the /hire-me page. */
import { contacts } from "./profile";

/** The public address already published on the home page. */
export const hireEmail =
  contacts.find((c) => c.id === "mail")?.value ?? "e5@5ee5.dev";

export const services = [
  {
    id: "websites",
    title: "Landing pages and websites",
    price: "€349",
    unit: "",
    from: true,
    description:
      "Fast, responsive sites built with Next.js, React, TypeScript and modern web technologies.",
  },
  {
    id: "apps",
    title: "Web applications",
    price: "€799",
    unit: "",
    from: true,
    description:
      "Custom functionality and full-stack applications, shaped around what your project needs.",
  },
  {
    id: "linux",
    title: "Linux and deployment assistance",
    price: "€35",
    unit: "/hour",
    from: false,
    description:
      "Linux administration, Docker, hosting and deployment: getting your project online and keeping it running.",
    note: "One-hour minimum per engagement.",
  },
  {
    id: "maintenance",
    title: "Website maintenance",
    price: "€49",
    unit: "/month",
    from: false,
    description:
      "Bug fixes, updates and improvements for an existing site or application.",
    note: "Includes 1 hour of changes per month. Extra hours are billed at €35/hour.",
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
