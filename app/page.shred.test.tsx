import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InterpreterPad from "./page";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    "sinpInterpreter",
    JSON.stringify({ firstName: "Rulie", interpreterId: "12345" })
  );

  // jsdom doesn't implement matchMedia
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as any;

  // jsdom doesn't implement clipboard by default
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

describe("SHRED SESSION", () => {
  it("wipes notes text and verified-number tokens when confirmed", async () => {
    const user = userEvent.setup();
    render(<InterpreterPad />);

    const textarea = await screen.findByPlaceholderText(/Start typing your interpretation notes/);
    fireEvent.change(textarea, {
      target: { value: "Patient DOB is 05/08/1990, phone 520-555-1234, height 5'8\"" },
    });

    expect((textarea as HTMLTextAreaElement).value).toContain("520-555-1234");

    // sanity check: number verification tab picked up tokens
    const numbersTabBtn = screen.getByRole("button", { name: /numbers/i });
    await user.click(numbersTabBtn);
    const numbersHeading = await screen.findByText(/Number Verification/i);
    const numbersPanel = numbersHeading.closest("div")!;
    expect(within(numbersPanel).getByText(/520-555-1234/)).toBeInTheDocument();

    // trigger shred flow
    const shredSessionBtn = screen.getByRole("button", { name: /shred session/i });
    await user.click(shredSessionBtn);

    const confirmDialog = await screen.findByText(/SHRED & END SESSION\?/i);
    expect(confirmDialog).toBeInTheDocument();

    const shredItBtn = screen.getByRole("button", { name: /shred it/i });
    await user.click(shredItBtn);

    // modal should be gone
    expect(screen.queryByText(/SHRED & END SESSION\?/i)).not.toBeInTheDocument();

    // notes textarea should be empty
    const textareaAfter = await screen.findByPlaceholderText(/Start typing your interpretation notes/);
    expect((textareaAfter as HTMLTextAreaElement).value).toBe("");

    // verified tokens should be cleared too — numbers panel should show
    // no leftover verified/unverified state for the wiped phone number
    expect(within(numbersPanel).queryByText(/520-555-1234/)).not.toBeInTheDocument();
  });

  it("does nothing when CANCEL is clicked", async () => {
    const user = userEvent.setup();
    render(<InterpreterPad />);

    const textarea = await screen.findByPlaceholderText(/Start typing your interpretation notes/);
    fireEvent.change(textarea, { target: { value: "Some confidential notes" } });

    await user.click(screen.getByRole("button", { name: /shred session/i }));
    await screen.findByText(/SHRED & END SESSION\?/i);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByText(/SHRED & END SESSION\?/i)).not.toBeInTheDocument();
    const textareaAfter = await screen.findByPlaceholderText(/Start typing your interpretation notes/);
    expect((textareaAfter as HTMLTextAreaElement).value).toBe(
      "Some confidential notes"
    );
  });
});
