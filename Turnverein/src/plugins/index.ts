/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { createPinia } from "pinia"
import { loadFonts } from "./webfontloader"
import vuetify from "./vuetify"
import router from "../router"

// Types
import type { App } from "vue"


const pinia = createPinia()

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
}
