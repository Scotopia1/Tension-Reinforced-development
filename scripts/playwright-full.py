"""Capture screenshots at multiple scroll positions to inspect every section."""
from playwright.sync_api import sync_playwright

URL = "http://localhost:3018/"
OUT = "C:/Users/johnn/Documents/Private-work/The Elites/Clients/TRD/TRD/TRD-Website-New/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()

    errors = []
    page.on("pageerror", lambda exc: errors.append(str(exc)))

    page.goto(URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(4000)  # let loader finish

    # Scroll height to compute checkpoints
    total = page.evaluate("document.documentElement.scrollHeight")
    print(f"Page total height: {total}")

    # Take screenshots at 8 evenly-spaced positions
    positions = [int(total * i / 8) for i in range(9)]
    for i, y in enumerate(positions):
        page.evaluate(f"window.scrollTo({{top: {y}, behavior: 'instant'}})")
        page.wait_for_timeout(900)  # let GSAP scrub catch up
        page.screenshot(path=f"{OUT}_full-{i:02d}-y{y}.png", full_page=False)
        print(f"  Captured _full-{i:02d}-y{y}.png")

    print(f"Page errors: {len(errors)}")
    for e in errors:
        print(f"  {e}")

    browser.close()
