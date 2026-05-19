// Copy-to-clipboard for code blocks
document.querySelectorAll("pre").forEach((pre) => {
    const btn = pre.querySelector(".copy");
    if (!btn) return;
    btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        // grab text from pre, minus the button text
        const clone = pre.cloneNode(true);
        const cBtn = clone.querySelector(".copy");
        if (cBtn) cBtn.remove();
        const text = clone.textContent.trim();
        try {
            await navigator.clipboard.writeText(text);
            const old = btn.textContent;
            btn.textContent = "copied!";
            btn.classList.add("ok");
            setTimeout(() => {
                btn.textContent = old;
                btn.classList.remove("ok");
            }, 1200);
        } catch (err) {
            btn.textContent = "err";
        }
    });
});

// Smooth-scroll spy: highlight current TOC link
const tocLinks = document.querySelectorAll("nav.toc a");
const sections = [...document.querySelectorAll("section.block")];
const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const s of sections) {
        if (s.offsetTop <= y) current = s.id;
    }
    tocLinks.forEach((a) => {
        a.style.background =
            a.getAttribute("href") === "#" + current ? "var(--bg)" : "";
        a.style.borderColor =
            a.getAttribute("href") === "#" + current ? "var(--border)" : "transparent";
    });
};
window.addEventListener("scroll", setActive, { passive: true });
setActive();
