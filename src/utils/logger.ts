// ===========================================
// Logger Utilities
// ===========================================

import pc from "picocolors";

// Brand colors
const brand = {
  primary: pc.magenta,
  accent: pc.cyan,
  success: pc.green,
  warning: pc.yellow,
  muted: pc.dim,
};

export const logger = {
  info: (msg: string) => console.log(brand.accent("›"), msg),
  success: (msg: string) => console.log(brand.success("✓"), msg),
  warn: (msg: string) => console.log(brand.warning("⚠"), msg),
  error: (msg: string) => console.log(pc.red("✗"), msg),
  debug: (msg: string) => {
    if (process.env.DEBUG) {
      console.log(pc.gray("·"), pc.dim(msg));
    }
  },

  // Styled outputs
  title: (msg: string) => console.log(pc.bold(brand.accent(msg))),
  subtitle: (msg: string) => console.log(brand.muted(msg)),
  dim: (msg: string) => console.log(brand.muted(msg)),
  highlight: (msg: string) => brand.accent(msg),
  bold: (msg: string) => pc.bold(msg),
  step: (num: number, msg: string) => console.log(brand.muted(`  ${num}.`), msg),

  // Blank line
  newline: () => console.log(),

  // Section divider
  divider: () => console.log(brand.muted("  ─────────────────────────────")),
};

/**
 * Minimal ASCII banner for CLI
 */
export function printBanner(): void {
  console.log();
  console.log(brand.primary("  ╭─────────────────────────────────╮"));
  console.log(brand.primary("  │") + pc.bold("  ⚡ ShipKit                      ") + brand.primary("│"));
  console.log(brand.primary("  │") + brand.muted("  Claude Code Accelerator        ") + brand.primary("│"));
  console.log(brand.primary("  ╰─────────────────────────────────╯"));
  console.log();
}

/**
 * Print success completion message
 */
export function printSuccess(modulesCount: number): void {
  const countStr = String(modulesCount).padEnd(2);
  console.log();
  console.log(brand.success("  ╭─────────────────────────────────╮"));
  console.log(brand.success("  │") + pc.bold("  ✓ ShipKit Ready!               ") + brand.success("│"));
  console.log(brand.success("  │") + brand.muted(`  ${countStr} modules installed          `) + brand.success("│"));
  console.log(brand.success("  ╰─────────────────────────────────╯"));
  console.log();
}

/**
 * Print next steps
 */
export function printNextSteps(): void {
  console.log(brand.muted("  Next steps:"));
  console.log();
  console.log(`  ${brand.accent("1.")} Open Claude Code in this directory`);
  console.log(`  ${brand.accent("2.")} Try ${pc.bold("/fix")} or ${pc.bold("/review")} commands`);
  console.log(`  ${brand.accent("3.")} Run ${brand.accent("npx @tienedev/shipkit add <module>")}`);
  console.log();
}

/**
 * Print section header
 */
export function printSection(title: string, subtitle?: string): void {
  console.log();
  console.log(brand.accent("  ▸"), pc.bold(title));
  if (subtitle) {
    console.log(brand.muted(`    ${subtitle}`));
  }
  console.log();
}

/**
 * Print module item in list
 */
export function printModule(
  name: string,
  description: string,
  options: { installed?: boolean; recommended?: boolean } = {}
): void {
  const icon = options.installed ? brand.success("●") : brand.muted("○");
  const star = options.recommended ? brand.warning(" ★") : "";
  const moduleName = options.installed ? pc.bold(name) : name;

  console.log(`    ${icon} ${moduleName}${star}`);
  console.log(brand.muted(`      ${description}`));
}

/**
 * Print legend for module list
 */
export function printLegend(): void {
  console.log();
  console.log(brand.muted(`    ${brand.success("●")} installed  ○ available  ${brand.warning("★")} recommended`));
}
