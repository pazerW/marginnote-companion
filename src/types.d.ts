import "obsidian";

declare module "obsidian" {
  interface App {
    isMobile: boolean;
  }
  interface Vault {
    getAvailablePathForAttachments(
      basename: string,
      ext: string,
      file: TFile | null,
    ): Promise<string | null>;
  }
}
