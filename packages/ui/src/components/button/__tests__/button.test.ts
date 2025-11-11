import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Button from "../button.vue"

// Note: This test requires @vue/test-utils and jsdom
// Install with: pnpm add -D @vue/test-utils @vitest/ui jsdom

describe("Button", () => {
  it("should render correctly", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me"
      }
    })

    expect(wrapper.text()).toBe("Click me")
    expect(wrapper.classes()).toContain("vv-button")
  })

  it("should apply type class", () => {
    const wrapper = mount(Button, {
      props: {
        type: "primary"
      },
      slots: {
        default: "Button"
      }
    })

    expect(wrapper.classes()).toContain("primary")
  })

  it("should apply size attribute", () => {
    const wrapper = mount(Button, {
      props: {
        size: "large"
      },
      slots: {
        default: "Button"
      }
    })

    expect(wrapper.attributes("size")).toBe("large")
  })

  it("should be disabled when disabled prop is true", () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: "Button"
      }
    })

    expect(wrapper.attributes("disabled")).toBeDefined()
    expect(wrapper.classes()).toContain("vv-button")
  })

  it("should emit click event when clicked", async () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me"
      }
    })

    await wrapper.trigger("click")
    expect(wrapper.emitted("click")).toBeTruthy()
    expect(wrapper.emitted("click")).toHaveLength(1)
  })

  it("should not emit click event when disabled", async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: "Click me"
      }
    })

    await wrapper.trigger("click")
    expect(wrapper.emitted("click")).toBeFalsy()
  })

  it("should have default props", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Button"
      }
    })

    expect(wrapper.props("type")).toBe("primary")
    expect(wrapper.props("size")).toBe("medium")
    expect(wrapper.props("disabled")).toBe(false)
  })
})
