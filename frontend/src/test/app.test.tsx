import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../main";

describe("App", () => {
  it("renders command interface header", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /WAR Command Interface/i })).toBeInTheDocument();
    expect(screen.getByText(/Desktop Tactical Card Combat/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Neues Spiel/i })).toBeInTheDocument();
  });

  it("shows empty log state before first action", () => {
    render(<App />);

    expect(screen.getAllByText(/Noch keine Aktionen\./i).length).toBeGreaterThan(0);
  });
});
