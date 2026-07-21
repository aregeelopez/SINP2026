import type { Metadata } from "next";
import LegalDocument, { H2, P, Ul, Li, Note } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Refund Policy — SINP",
};

export default function RefundPolicyPage() {
  return (
    <LegalDocument title="Refund Policy" lastUpdated="July 21, 2026">
      <H2>Digital Product Notice</H2>
      <P>
        SINP is a <strong>digital product</strong> delivered instantly upon
        purchase via Gumroad. Because access is granted immediately and the
        product can be used right away, refund eligibility is limited as
        described below.
      </P>

      <H2>Refund Eligibility</H2>
      <P>
        We offer refunds within <strong>14 days</strong> of purchase if:
      </P>
      <Ul>
        <Li>
          SINP fails to function as described due to a technical defect on
          our end, and we&apos;re unable to resolve the issue within a
          reasonable time after you report it.
        </Li>
        <Li>You were charged in error (e.g., duplicate charge).</Li>
      </Ul>
      <P>We generally <strong>do not offer refunds</strong> for:</P>
      <Ul>
        <Li>Change of mind after purchase.</Li>
        <Li>Not reading the product description before buying.</Li>
        <Li>
          Issues caused by your own device, browser, or network environment
          that are outside SINP&apos;s control.
        </Li>
        <Li>Requests made after the 14-day window above has passed.</Li>
      </Ul>

      <H2>How to Request a Refund</H2>
      <P>
        Contact{" "}
        <a href="mailto:aregeelopez@outlook.com" style={{ color: "var(--accent)" }}>
          aregeelopez@outlook.com
        </a>{" "}
        with your Gumroad order number and a description of the issue.
        We&apos;ll respond within 2 business days.
      </P>

      <H2>Gumroad&apos;s Role</H2>
      <P>
        Purchases are processed through Gumroad. Gumroad&apos;s own buyer
        policies may also apply — see{" "}
        <a href="https://gumroad.com/refund-policy" style={{ color: "var(--accent)" }}>
          gumroad.com/refund-policy
        </a>{" "}
        for their platform-level terms.
      </P>

      <Note>
        This is a template, not legal advice — have it reviewed if you want
        it airtight.
      </Note>
    </LegalDocument>
  );
}
