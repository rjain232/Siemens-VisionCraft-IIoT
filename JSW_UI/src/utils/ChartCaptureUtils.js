// ── Chart capture utilities ───────────────────────────────────────────────────

const _cssPropName = (c) => c.replace(/([A-Z])/g, "-$1").toLowerCase();

const _oklchToRgb = (v) => {
  if (!v || v.includes("transparent")) return null;
  if (v.toLowerCase().includes("oklch")) {
    const m = v.match(
      /oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)\s*\)/,
    );
    if (m) {
      const [L, , H] = [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
      if (H >= 95 && H <= 105 && L >= 60) return "rgb(16, 185, 129)";
      if (H >= 0 && H <= 10 && L >= 50) return "rgb(244, 63, 94)";
      if (H >= 250 && H <= 260 && L >= 55) return "rgb(37, 99, 235)";
      if (L >= 90) return "rgb(255, 255, 255)";
      if (L <= 20) return "rgb(30, 30, 30)";
      return "rgb(200, 200, 200)";
    }
  }
  return null;
};

export function trimWhitespace(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const cvs = document.createElement("canvas");
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, cvs.width, cvs.height);

      let top = 0,
        bottom = cvs.height,
        left = 0,
        right = cvs.width;
      const isWhite = (r, g, b, a) =>
        a === 0 || (r > 250 && g > 250 && b > 250);

      const rowIsWhite = (y) => {
        for (let x = 0; x < cvs.width; x += 4) {
          const i = (y * cvs.width + x) * 4;
          if (!isWhite(data[i], data[i + 1], data[i + 2], data[i + 3]))
            return false;
        }
        return true;
      };
      const colIsWhite = (x) => {
        for (let y = 0; y < cvs.height; y += 4) {
          const i = (y * cvs.width + x) * 4;
          if (!isWhite(data[i], data[i + 1], data[i + 2], data[i + 3]))
            return false;
        }
        return true;
      };

      while (top < bottom && rowIsWhite(top)) top++;
      while (bottom > top && rowIsWhite(bottom - 1)) bottom--;
      while (left < right && colIsWhite(left)) left++;
      while (right > left && colIsWhite(right - 1)) right--;

      const w = Math.max(1, right - left);
      const h = Math.max(1, bottom - top);
      const out = document.createElement("canvas");
      out.width = w;
      out.height = h;
      out.getContext("2d").drawImage(cvs, left, top, w, h, 0, 0, w, h);
      resolve({ dataUrl: out.toDataURL("image/png"), width: w, height: h });
      resolve({ dataUrl: out.toDataURL("image/jpeg", 0.88), width: w, height: h });
    };
    img.onerror = () => resolve({ dataUrl, width: 0, height: 0 });
    img.src = dataUrl;
  });
}

export async function captureChartImage(ref) {
  if (!ref?.current) return null;
  const overrides = [];
  let origBg = "", origParentBg = "";
  try {
    const el = ref.current;
    origBg = el.style.backgroundColor;
    origParentBg = el.parentElement?.style.backgroundColor ?? "";
    el.style.backgroundColor = "#ffffff";
    if (el.parentElement) el.parentElement.style.backgroundColor = "#ffffff";

    const allEls = [el, ...el.querySelectorAll("*")];
    const colorProps = [
      "color", "backgroundColor", "borderTopColor",
      "borderRightColor", "borderBottomColor", "borderLeftColor",
      "fill", "stroke",
    ];
    allEls.forEach((e) => {
      const isSvgEl = e instanceof SVGElement;
      const cs = window.getComputedStyle(e);
      colorProps.forEach((p) => {
        if (isSvgEl && (p === "fill" || p === "stroke") && e.hasAttribute(p)) return;
        const val = cs[p];
        if (val && val.includes("oklch")) {
          const rgb = _oklchToRgb(val);
          if (rgb) {
            const cp = _cssPropName(p);
            overrides.push({ el: e, prop: cp, original: e.style.getPropertyValue(cp) });
            e.style.setProperty(cp, rgb, "important");
          }
        }
      });
    });
    allEls.forEach((e) => {
      const bg = window.getComputedStyle(e).backgroundColor;
      if (bg && bg.includes("rgba")) {
        const m2 = bg.match(/rgba?\((.*?)\)/);
        if (m2) {
          const parts = m2[1].split(",").map((p) => p.trim());
          if (parts.length >= 3) {
            const alpha = parts[3] ? parseFloat(parts[3]) : 1;
            const solid = alpha < 0.3
              ? "rgb(255,255,255)"
              : `rgb(${parts[0]},${parts[1]},${parts[2]})`;
            overrides.push({ el: e, prop: "background-color", original: e.style.getPropertyValue("background-color") });
            e.style.setProperty("background-color", solid, "important");
          }
        }
      }
    });

    const svgs = el.querySelectorAll("svg");
    svgs.forEach((svg) => {
      overrides.push({ el: svg, prop: "overflow", original: svg.style.overflow });
      svg.style.overflow = "visible";
      svg.querySelectorAll("[clip-path]").forEach((node) => {
        overrides.push({ el: node, prop: "clip-path", original: node.getAttribute("clip-path"), isAttr: true });
        node.removeAttribute("clip-path");
      });
    });

    await new Promise((r) => setTimeout(r, 200));

    const rect = el.getBoundingClientRect();
    try {
      const { toPng } = await import("html-to-image");
      return await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        width: rect.width,
        height: rect.height,
      });
    } catch (toPngErr) {
      console.warn("toPng failed, falling back to html2canvas:", toPngErr);
    }

    const { default: html2canvas } = await import("html2canvas-pro");
    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    return canvas.toDataURL("image/png");
  } catch (e) {
    console.warn("Chart capture failed:", e.message);
    return null;
  } finally {
    if (ref.current) {
      ref.current.style.backgroundColor = origBg;
      if (ref.current.parentElement)
        ref.current.parentElement.style.backgroundColor = origParentBg;
    }
    overrides.forEach(({ el, prop, original, isAttr }) => {
      if (isAttr) {
        original ? el.setAttribute(prop, original) : el.removeAttribute(prop);
      } else {
        original ? el.style.setProperty(prop, original) : el.style.removeProperty(prop);
      }
    });
  }
}
