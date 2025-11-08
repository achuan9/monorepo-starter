import type { App } from "vue"
import VvButton from "./components/button"
import VvInput from "./components/input"

export { VvButton, VvInput }
export default {
  install(app: App) {
    app.component("VvButton", VvButton)
    app.component("VvInput", VvInput)
  }
}
