import {test, expect} from '@playwright/test'

// Smoke test for the React 19 / R3F v9 / three 0.184 migration. It mounts an
// editable R3F scene with the studio extension and asserts that the canvas and
// the extension toolbar actually render.
test.describe('react19-smoke', () => {
  test('mounts the R3F canvas and studio extension', async ({page}) => {
    test.setTimeout(30000)
    await page.goto('./tests/react19-smoke/')

    // The R3F <Canvas> renders a real <canvas> element once the scene mounts.
    await expect(page.locator('canvas')).toBeVisible()

    // The @theatre/r3f extension registers a global toolbar in the studio UI.
    const toolbar = page.locator(
      '[data-testid="theatre-extensionToolbar-global"]',
    )
    await expect(toolbar).toBeVisible()
  })
})
