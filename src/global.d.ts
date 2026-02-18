export {};

declare global {
  interface Window {
    api: {
      loadWorkspaces: () => Promise<any>;
      saveWorkspaces: (data: any) => Promise<void>;
    };
  }
}
