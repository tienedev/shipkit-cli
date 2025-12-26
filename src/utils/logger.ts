// ===========================================
// Logger Utilities
// ===========================================

import pc from "picocolors";

export const logger = {
  info: (msg: string) => console.log(pc.blue("info"), msg),
  success: (msg: string) => console.log(pc.green("✓"), msg),
  warn: (msg: string) => console.log(pc.yellow("warn"), msg),
  error: (msg: string) => console.log(pc.red("error"), msg),
  debug: (msg: string) => {
    if (process.env.DEBUG) {
      console.log(pc.gray("debug"), msg);
    }
  },

  // Styled outputs
  title: (msg: string) => console.log(pc.bold(pc.cyan(msg))),
  dim: (msg: string) => console.log(pc.dim(msg)),
  highlight: (msg: string) => pc.cyan(msg),
  bold: (msg: string) => pc.bold(msg),

  // Blank line
  newline: () => console.log(),
};

/**
 * ASCII art banner for CLI
 */
export function printBanner(): void {
  console.log(
    pc.cyan(`
  ┌─────────────────────────────────────────┐
  │                                         │
  │   ${pc.bold("ShipKit")} - Claude Code Accelerator     │
  │   ${pc.dim("Configure Claude Code for any project")} │
  │                                         │
  └─────────────────────────────────────────┘
`)
  );
}

/**
 * Print a boxed message
 */
export function printBox(title: string, content: string[]): void {
  const maxLen = Math.max(title.length, ...content.map((c) => c.length));
  const border = "─".repeat(maxLen + 4);

  console.log(pc.dim(`┌${border}┐`));
  console.log(pc.dim("│"), pc.bold(title.padEnd(maxLen + 2)), pc.dim("│"));
  console.log(pc.dim(`├${border}┤`));
  for (const line of content) {
    console.log(pc.dim("│"), line.padEnd(maxLen + 2), pc.dim("│"));
  }
  console.log(pc.dim(`└${border}┘`));
}
