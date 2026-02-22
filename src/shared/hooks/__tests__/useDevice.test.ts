import { vi, beforeEach } from "vitest"
import { renderHook, act, waitFor } from "@testing-library/react"
import { useDevice } from "../useDevice"
import { BREAKPOINTS } from "../../config/breakpoints"

function setViewportWidth(width: number) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    const maxWidth = parseInt(query.match(/max-width:\s*(\d+)/)?.[1] ?? "0", 10)
    return {
      matches: width <= maxWidth,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    } satisfies MediaQueryList
  })
}

describe("useDevice", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it(`returns mobile when width = ${BREAKPOINTS.mobile} (boundary)`, () => {
    setViewportWidth(BREAKPOINTS.mobile)
    const { result } = renderHook(() => useDevice())
    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it(`returns tablet when width = ${BREAKPOINTS.mobile + 1} (just above mobile)`, () => {
    setViewportWidth(BREAKPOINTS.mobile + 1)
    const { result } = renderHook(() => useDevice())
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it(`returns tablet when width = ${BREAKPOINTS.tablet} (boundary)`, () => {
    setViewportWidth(BREAKPOINTS.tablet)
    const { result } = renderHook(() => useDevice())
    expect(result.current.isTablet).toBe(true)
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isDesktop).toBe(false)
  })

  it(`returns desktop when width = ${BREAKPOINTS.tablet + 1} (just above tablet)`, () => {
    setViewportWidth(BREAKPOINTS.tablet + 1)
    const { result } = renderHook(() => useDevice())
    expect(result.current.isDesktop).toBe(true)
    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
  })

  it("updates device when window is resized", () => {
    setViewportWidth(BREAKPOINTS.mobile)
    const { result } = renderHook(() => useDevice())
    expect(result.current.isMobile).toBe(true)

    setViewportWidth(BREAKPOINTS.tablet + 1)
    act(() => {
      window.dispatchEvent(new Event("resize"))
    })
    expect(result.current.isDesktop).toBe(true)
  })

  it("resolves device after effect runs (waitFor)", async () => {
    setViewportWidth(BREAKPOINTS.mobile)
    const { result } = renderHook(() => useDevice())
    await waitFor(() => expect(result.current.isMobile).toBe(true))
  })

  it("registers resize listener on mount", () => {
    setViewportWidth(BREAKPOINTS.tablet + 1)
    const addSpy = vi.spyOn(window, "addEventListener")
    renderHook(() => useDevice())
    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function))
  })

  it("cleans up the exact resize handler on unmount", () => {
    setViewportWidth(BREAKPOINTS.tablet + 1)
    const addSpy = vi.spyOn(window, "addEventListener")
    const removeSpy = vi.spyOn(window, "removeEventListener")

    const { unmount } = renderHook(() => useDevice())
    const handler = addSpy.mock.calls.find(([evt]) => evt === "resize")?.[1]
    unmount()

    expect(removeSpy).toHaveBeenCalledWith("resize", handler)
  })
})
