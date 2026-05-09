import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import {
  AppContainer,
  Eyebrow,
  Headline,
  PageSection,
  Subhead,
} from "@/components/ui/Primitives";
import { BRAND } from "@/constants/config";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "AMAMRE FAQ for shipping, returns, sizing, payments, materials, and product care.",
  path: "/faq",
});

const faqs = [
  {
    question: "Where is AMAMRE based?",
    answer:
      "AMAMRE is based in Stuttgart, Germany. The brand direction combines European minimalism with subtle African heritage inspiration.",
  },
  {
    question: "How does shipping work?",
    answer:
      "The launch setup supports Germany and EU shipping. Standard Germany delivery is planned at 2-4 business days, with free Germany shipping over EUR 100.",
  },
  {
    question: "Can I return an item?",
    answer:
      "The recommended production policy is a 14-day EU withdrawal period plus a customer-friendly 30-day return window for unworn items with tags attached.",
  },
  {
    question: "How do AMAMRE pieces fit?",
    answer:
      "Most launch pieces use relaxed or oversized streetwear proportions. Product pages include variant, fit, and material notes for each item.",
  },
  {
    question: "What makes the satin-lined pieces different?",
    answer:
      "The satin interior reduces friction and adds a tactile luxury detail, especially useful for hoods and beanies worn frequently.",
  },
  {
    question: "Is checkout live?",
    answer:
      "The storefront includes a Shopify Cart API handoff. Add Shopify Storefront credentials and product variant IDs to redirect directly into Shopify Checkout.",
  },
  {
    question: "How do I contact customer care?",
    answer: `Email ${BRAND.email}. Production deployments should connect the contact action to an email provider or CRM.`,
  },
];

export default function FAQPage() {
  return (
    <PageSection>
      <AppContainer sx={{ maxWidth: 860 }}>
        <Eyebrow>Support</Eyebrow>
        <Headline>Frequently asked questions</Headline>
        <Subhead sx={{ mt: 2.25, mb: 4.5 }}>
          Clear answers for a launch-ready premium ecommerce experience.
        </Subhead>
        <Box sx={{ display: "grid", gap: 1.25 }}>
          {faqs.map((faq) => (
            <Accordion key={faq.question} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {faq.question}
              </AccordionSummary>
              <AccordionDetails>{faq.answer}</AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </AppContainer>
    </PageSection>
  );
}
