export type VerificationToken = {
  /** Stable per occurrence, so repeated values can each be verified. */
  id: string;
  value: string;
  type: "phone" | "date" | "time" | "height" | "identifier" | "measurement" | "ssn" | "number";
};

// Keep meaningful live-call details together. Order matters: specific formats
// must be matched before the general number fallback.
const TOKEN_PATTERN = new RegExp(
  [
    "(?<phone>\\b(?:\\+?1[-.\\s]?)?(?:\\(?\\d{3}\\)?[-.\\s]?)\\d{3}[-.\\s]\\d{4}\\b)",
    "(?<date>\\b\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}\\b)",
    "(?<time>\\b\\d{1,2}:\\d{2}(?:\\s?[AaPp][Mm])?\\b)",
    "(?<height>\\b\\d{1,2}\\s?(?:'|’|ft\\.?|foot|feet)\\s?\\d{1,2}\\s?(?:\"|”|in\\.?|inch|inches)?)",
    "(?<identifier>\\b(?=[A-Za-z0-9-]*[A-Za-z])(?=[A-Za-z0-9-]*\\d)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\\b)",
    "(?<measurement>\\b\\d+(?:[.,]\\d+)?\\s?(?:mcg|mg|g|kg|lb|lbs|mL|L|mmHg|bpm|units?|u|%|°[CF])\\b)",
    "(?<ssn>\\b\\d{3}-\\d{2}-\\d{4}\\b)",
    "(?<number>\\b\\d+(?:[.,]\\d+)?\\b)",
  ].join("|"),
  "g"
);

export function extractVerificationTokens(text: string): VerificationToken[] {
  const tokens: VerificationToken[] = [];

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    const type = Object.keys(match.groups ?? {}).find(
      (key) => match.groups?.[key] !== undefined
    ) as VerificationToken["type"] | undefined;

    if (!type || match.index === undefined) continue;

    tokens.push({
      id: `${match.index}:${match[0]}`,
      value: match[0],
      type,
    });
  }

  return tokens;
}
