"""Quick visual check + console log capture of the TRD site."""
from playwright.sync_api import sync_playwright

URL = "http://localhost:3018/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()

    console_logs = []
    errors = []
    page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda exc: errors.append(str(exc)))

    page.goto(URL, wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(4000)  # let loader finish

    # Screenshot top of page
    page.screenshot(path="C:/Users/johnn/Documents/Private-work/The Elites/Clients/TRD/TRD/TRD-Website-New/_dbg-top.png", full_page=False)

    # Scroll to mid and screenshot
    page.evaluate("window.scrollTo(0, 1500)")
    page.wait_for_timeout(800)
    page.screenshot(path="C:/Users/johnn/Documents/Private-work/The Elites/Clients/TRD/TRD/TRD-Website-New/_dbg-mid.png", full_page=False)

    # Scroll further
    page.evaluate("window.scrollTo(0, 4500)")
    page.wait_for_timeout(800)
    page.screenshot(path="C:/Users/johnn/Documents/Private-work/The Elites/Clients/TRD/TRD/TRD-Website-New/_dbg-deep.png", full_page=False)

    # Inspect computed styles
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)
    body_bg = page.evaluate("getComputedStyle(document.body).backgroundColor")
    body_color = page.evaluate("getComputedStyle(document.body).color")
    body_font = page.evaluate("getComputedStyle(document.body).fontFamily")
    h1_font = page.evaluate("""
        () => {
            const h1 = document.querySelector('h1');
            return h1 ? getComputedStyle(h1).fontFamily : 'no h1';
        }
    """)
    h1_color = page.evaluate("""
        () => {
            const h1 = document.querySelector('h1');
            return h1 ? getComputedStyle(h1).color : 'no h1';
        }
    """)
    amber_test = page.evaluate("""
        () => {
            const el = document.querySelector('.text-amber, .bg-amber');
            return el ? getComputedStyle(el).backgroundColor + ' / ' + getComputedStyle(el).color : 'no amber el';
        }
    """)
    loader_visible = page.evaluate("""
        () => {
            const loader = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\\\[100\\\\]');
            return !!loader;
        }
    """)
    fonts_loaded = page.evaluate("document.fonts.ready.then(()=>document.fonts.size).then(n=>n)")

    print("=" * 60)
    print(f"BODY background-color : {body_bg}")
    print(f"BODY color            : {body_color}")
    print(f"BODY font-family      : {body_font}")
    print(f"H1   font-family      : {h1_font}")
    print(f"H1   color            : {h1_color}")
    print(f"AMBER el styles       : {amber_test}")
    print(f"LOADER still visible  : {loader_visible}")
    print(f"FONTS loaded count    : {fonts_loaded}")
    print("=" * 60)
    print(f"Console logs ({len(console_logs)}):")
    for log in console_logs[-20:]:
        print(f"  {log}")
    print(f"Page errors ({len(errors)}):")
    for err in errors[:10]:
        print(f"  {err}")

    browser.close()
