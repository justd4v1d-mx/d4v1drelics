/// <reference types="vite/client" />

/** * Custom Environment Variables 
 * Define your env variables here to get IntelliSense
 */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Add other variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}