import type { Metadata } from "next";
import LegalDocument, { H2, P, Ul, Li, Note } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy — SINP",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="July 21, 2026">
      <P>
        This Privacy Policy explains what information SINP collects, how it&apos;s
        handled, and what stays entirely on your device. It&apos;s written to
        describe exactly what the application does — not aspirational or
        industry-standard language.
      </P>

      <H2>1. Notes Content</H2>
      <P>Everything you type into the notes editor:</P>
      <Ul>
        <Li>
          Is <strong>never saved to a server</strong>. SINP has no backend
          database and no account system.
        </Li>
        <Li>
          <strong>Exists only in your browser&apos;s memory</strong> for the
          duration of your session.
        </Li>
        <Li>
          Is permanently and immediately erased when you click{" "}
          <strong>SHRED SESSION</strong>, close the browser tab, or refresh the
          page.
        </Li>
        <Li>
          Is <strong>not</strong> stored in <code>localStorage</code>,{" "}
          <code>sessionStorage</code>, or any browser-persistent storage.
        </Li>
      </Ul>
      <P>
        We (aregee insights) have no access to anything you type into SINP.
        There is no mechanism by which your interpretation notes could reach
        us, be logged, or be recovered after your session ends.
      </P>

      <H2>2. Information Stored Locally On Your Device</H2>
      <P>
        SINP stores the following in your browser&apos;s <code>localStorage</code>,{" "}
        <strong>on your device only</strong>:
      </P>
      <Ul>
        <Li>
          Your first name and interpreter ID number, entered once during
          onboarding, so the app can greet you and personalize the Opening
          Protocol script on future visits.
        </Li>
      </Ul>
      <P>
        This information is never transmitted to us or to any third party. It
        stays on the specific browser/device where you entered it. You can
        clear it at any time by clearing your browser&apos;s site data for this
        app.
      </P>

      <H2>3. Analytics</H2>
      <P>
        SINP uses <strong>Vercel Analytics</strong> to collect anonymous,
        aggregate usage data (e.g., page views, general traffic patterns).
        This:
      </P>
      <Ul>
        <Li>
          Does <strong>not</strong> include any notes content, interpreter
          names, or ID numbers.
        </Li>
        <Li>Does <strong>not</strong> use cookies for cross-site tracking.</Li>
        <Li>
          Is used solely to understand overall app usage so we can improve the
          product.
        </Li>
      </Ul>
      <P>
        See Vercel&apos;s own privacy documentation for details on how they
        process this data:{" "}
        <a href="https://vercel.com/legal/privacy-policy" style={{ color: "var(--accent)" }}>
          vercel.com/legal/privacy-policy
        </a>
      </P>

      <H2>4. No Account, No Login, No PHI Transmission</H2>
      <P>
        SINP does not require you to create an account. It does not ask for,
        collect, or transmit any patient information, protected health
        information (PHI), or personally identifiable information belonging
        to third parties (e.g., the patients or clients you&apos;re
        interpreting for). Any such information that ends up in your session
        notes is handled exactly as described in Section 1 — never saved,
        never transmitted, erased on shred/close/refresh.
      </P>

      <H2>5. Your Responsibility as the User</H2>
      <P>Because SINP is a local, in-browser tool:</P>
      <Ul>
        <Li>
          If you copy notes to your clipboard using <strong>COPY NOTES</strong>,
          that content is placed in your device&apos;s operating-system
          clipboard, which may persist and remain accessible to other
          applications until you overwrite or clear it. SINP displays a
          reminder about this each time you copy.
        </Li>
        <Li>
          If your device itself is lost, stolen, or accessed by someone else
          while a session is active and unshredded, the notes on screen or in
          clipboard could be exposed. Practicing good session hygiene —
          shredding at the end of every session, locking your device, and not
          leaving it unattended — is your responsibility as the user.
        </Li>
      </Ul>

      <H2>6. Changes to This Policy</H2>
      <P>
        If this policy changes, the &quot;Last updated&quot; date at the top will be
        revised. Continued use of SINP after changes constitutes acceptance
        of the updated policy.
      </P>

      <H2>7. Contact</H2>
      <P>
        Questions about this policy:{" "}
        <a href="mailto:aregeelopez@outlook.com" style={{ color: "var(--accent)" }}>
          aregeelopez@outlook.com
        </a>
      </P>

      <Note>
        This document describes SINP&apos;s actual technical behavior as of the
        date above. It is not a substitute for your own organization&apos;s
        compliance policies, and SINP is not represented as a HIPAA-compliant
        or certified product — see the Terms of Service for the full
        disclaimer.
      </Note>
    </LegalDocument>
  );
}
