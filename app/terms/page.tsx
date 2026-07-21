import type { Metadata } from "next";
import LegalDocument, { H2, P, Ul, Li, Note } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service — SINP",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocument title="Terms of Service / End User License Agreement" lastUpdated="July 21, 2026">
      <P>
        By purchasing, downloading, installing, or using SINP, you agree to
        these terms. If you don&apos;t agree, don&apos;t use the product.
      </P>

      <H2>1. License Grant</H2>
      <P>
        Upon purchase, aregee insights grants you a{" "}
        <strong>non-exclusive, non-transferable, personal license</strong> to
        install and use SINP for your own individual interpretation work.
      </P>
      <P>You may <strong>not</strong>:</P>
      <Ul>
        <Li>
          Resell, sublicense, rent, or redistribute SINP or any part of its
          source code, glossary data, or design.
        </Li>
        <Li>
          Reverse-engineer, decompile, or extract the source code for the
          purpose of creating a competing product.
        </Li>
        <Li>
          Share your copy with others beyond your own personal/professional
          use. Each user needs their own license.
        </Li>
        <Li>Remove or alter copyright notices.</Li>
      </Ul>
      <P>
        This software is proprietary. See the <code>COPYRIGHT</code> file
        included in the product for full details. No open-source license
        (MIT or otherwise) is granted.
      </P>

      <H2>2. What SINP Is (and Is Not)</H2>
      <P>
        SINP is a note-taking and reference tool designed to support
        Spanish-language interpreters during live assignments. It provides:
      </P>
      <Ul>
        <Li>A local, ephemeral notes editor</Li>
        <Li>A number/date/phone/height verification panel</Li>
        <Li>
          Glossaries across medical, insurance, financial, cultural, and
          customer-service domains
        </Li>
        <Li>A personal dictionary and protocol reference</Li>
      </Ul>
      <P><strong>SINP is not:</strong></P>
      <Ul>
        <Li>
          A certified or audited HIPAA-compliant system. We describe its
          actual technical behavior (see Privacy Policy) — local-only
          storage, no server transmission of notes — but we make no formal
          compliance certification, and you are responsible for evaluating
          whether SINP meets your own organization&apos;s or client&apos;s
          compliance requirements.
        </Li>
        <Li>
          A substitute for professional interpreter training, certification,
          or judgment. Glossary entries and protocol scripts are reference
          aids, not authoritative or exhaustive, and may contain errors or
          omissions.
        </Li>
        <Li>Medical, legal, or financial advice, for you or for anyone you interpret for.</Li>
      </Ul>

      <H2>3. No Warranty</H2>
      <P>
        SINP is provided <strong>&quot;as is&quot;</strong> without warranty of any
        kind, express or implied, including but not limited to warranties of
        merchantability, fitness for a particular purpose, or
        non-infringement. We do not guarantee SINP will be error-free,
        uninterrupted, or fit for any specific regulatory or compliance
        requirement.
      </P>

      <H2>4. Limitation of Liability</H2>
      <P>
        To the fullest extent permitted by law, aregee insights will not be
        liable for any indirect, incidental, special, consequential, or
        punitive damages arising from your use of, or inability to use, SINP
        — including but not limited to interpretation errors, data loss,
        missed information during an assignment, or professional/reputational
        harm. Your use of SINP during any professional engagement is at your
        own professional discretion and risk.
      </P>

      <H2>5. User Responsibility</H2>
      <P>You are solely responsible for:</P>
      <Ul>
        <Li>
          The accuracy of your interpretation work; SINP&apos;s glossaries and
          verification tools are aids, not a substitute for your professional
          judgment.
        </Li>
        <Li>
          Following your own employer&apos;s, client&apos;s, or jurisdiction&apos;s
          confidentiality and data-handling requirements.
        </Li>
        <Li>
          Device security (screen locks, not leaving your device unattended
          with an active session, shredding sessions promptly).
        </Li>
      </Ul>

      <H2>6. Payment and Access</H2>
      <P>
        SINP is sold as a one-time purchase through Gumroad. Your right to
        use SINP is tied to a valid purchase. See the separate{" "}
        <a href="/refund" style={{ color: "var(--accent)" }}>Refund Policy</a>{" "}
        for refund terms.
      </P>

      <H2>7. Termination</H2>
      <P>
        We reserve the right to terminate your license if you violate these
        terms, including unauthorized redistribution of the product.
      </P>

      <H2>8. Governing Law</H2>
      <P>
        These terms are governed by the laws of the State of Arizona, United
        States, without regard to conflict-of-law principles.
      </P>

      <H2>9. Changes to These Terms</H2>
      <P>
        We may update these terms from time to time. Continued use after
        changes constitutes acceptance.
      </P>

      <H2>10. Contact</H2>
      <P>
        <a href="mailto:aregeelopez@outlook.com" style={{ color: "var(--accent)" }}>
          aregeelopez@outlook.com
        </a>
      </P>

      <Note>
        This document is a template. It is not legal advice, and it has not
        been reviewed by a licensed attorney — particularly relevant given
        that SINP is marketed toward professionals in a compliance-sensitive
        field.
      </Note>
    </LegalDocument>
  );
}
