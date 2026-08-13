// ---- Malaysian flag (Jalur Gemilang) as an SVG string ----
// 14 horizontal stripes (red/white), blue canton over the top 7 stripes,
// yellow crescent + 14-point star.
function buildFlagSVG() {
  const W = 1200;
  const H = 600;
  const stripes = 14;
  const stripeH = H / stripes;

  // 14 alternating stripes, starting and ending on red.
  let stripeRects = "";
  for (let i = 0; i < stripes; i++) {
    const color = i % 2 === 0 ? "#cc0001" : "#ffffff";
    stripeRects += `<rect x="0" y="${i * stripeH}" width="${W}" height="${stripeH}" fill="${color}"/>`;
  }

  // Blue canton covers the top 7 stripes, hoist half of the flag width.
  const cantonW = W / 2;
  const cantonH = stripeH * 7;

  // 14-point star built from alternating outer/inner radius points.
  const starCX = 395;
  const starCY = cantonH / 2;
  const outer = 100;
  const inner = 46;
  const points = 14;
  let starPts = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / points) * i - Math.PI / 2;
    const x = starCX + r * Math.cos(a);
    const y = starCY + r * Math.sin(a);
    starPts += `${x.toFixed(1)},${y.toFixed(1)} `;
  }

  // Crescent = a full disc with an offset disc punched out (via mask).
  // Thicker moon: bigger disc, and the cut disc is only slightly smaller
  // and pushed right so the opening faces the star.
  const crCX = 250;
  const crCY = cantonH / 2;
  const crR = 110;
  const cutR = 100;     // cut disc radius (closer to crR = thinner crescent)
  const cutDX = 40;     // how far right the cut disc is pushed

  return `
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="crescentMask">
      <rect x="0" y="0" width="${W}" height="${H}" fill="black"/>
      <circle cx="${crCX}" cy="${crCY}" r="${crR}" fill="white"/>
      <circle cx="${crCX + cutDX}" cy="${crCY}" r="${cutR}" fill="black"/>
    </mask>
  </defs>

  <g>${stripeRects}</g>

  <rect x="0" y="0" width="${cantonW}" height="${cantonH}" fill="#010066"/>

  <circle cx="${crCX}" cy="${crCY}" r="${crR}" fill="#ffcc00" mask="url(#crescentMask)"/>

  <polygon points="${starPts.trim()}" fill="#ffcc00"/>
</svg>`;
}

// Inject the flag SVG into both containers.
const svg = buildFlagSVG();
document.getElementById("flagTop").innerHTML = svg;
document.getElementById("flagBottom").innerHTML = svg;

// On Start: slide the top flag in from the left, bottom flag in from the middle.
// Runs ONCE per page load — to replay, reload the page and click Start again.
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("flagTop").classList.add("is-active");
  document.getElementById("flagBottom").classList.add("is-active");
});
