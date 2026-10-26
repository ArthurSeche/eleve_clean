/* =====================================================================
   KOP STORE — choix de l'équipe et habillage aux couleurs du club
   ---------------------------------------------------------------------
   Chargé tout en haut de chaque page (avant l'affichage) pour éviter
   un « flash » de mauvaises couleurs.
   - L'équipe choisie est mémorisée dans le navigateur (kop_team).
   - On peut forcer une équipe par l'adresse : hello.html?team=marseille
   - « Meilleure équipe » (id : best) = la version d'origine du site.
   Aucun logo officiel n'est utilisé : seulement les couleurs et le nom.
   ===================================================================== */
(function () {
  "use strict";

  /* brand = couleur de remplissage (boutons, pastilles)
     text  = couleur des textes et liens sur fond clair
     on    = couleur du texte posé sur brand
     dark  = couleur sombre (bandeau, titres, pied de page)
     body / trim = couleurs du maillot dessiné ; pattern = motif */
  var TEAMS = [
    { id: "best", name: "Meilleure équipe", full: "Kop Store", short: "Kop", words: ["Rouge", "Noir"],
      brand: "#D7141A", text: "#D7141A", on: "#FFFFFF", dark: "#141414", body: "#D7141A", trim: "#141414", pattern: "plain", photos: true },
    { id: "angers", name: "Angers", full: "Angers SCO", short: "Angers", words: ["Noir", "Blanc"],
      brand: "#DCDCDC", text: "#1D1D1B", on: "#111111", dark: "#111111", body: "#111111", trim: "#FFFFFF", pattern: "stripes" },
    { id: "auxerre", name: "Auxerre", full: "AJ Auxerre", short: "Auxerre", words: ["Blanc", "Bleu"],
      brand: "#0057A8", text: "#0057A8", on: "#FFFFFF", dark: "#0B2545", body: "#FFFFFF", trim: "#0057A8", hero: "#6FB3F2", pattern: "plain" },
    { id: "brest", name: "Brest", full: "Stade Brestois 29", short: "Brest", words: ["Rouge", "Blanc"],
      brand: "#E30613", text: "#D10512", on: "#FFFFFF", dark: "#1E1E1E", body: "#E30613", trim: "#FFFFFF", pattern: "plain" },
    { id: "le-havre", name: "Le Havre", full: "Le Havre AC", short: "Le Havre", words: ["Ciel", "Marine"],
      brand: "#6EB4E3", text: "#1F6FA8", on: "#0B2545", dark: "#0B2545", body: "#6EB4E3", trim: "#0B2545", pattern: "half" },
    { id: "le-mans", name: "Le Mans", full: "Le Mans FC", short: "Le Mans", words: ["Rouge", "Jaune"],
      brand: "#D6202A", text: "#C41D26", on: "#FFFFFF", dark: "#1B1B1B", body: "#D6202A", trim: "#F5C400", pattern: "plain" },
    { id: "lens", name: "Lens", full: "RC Lens", short: "Lens", words: ["Sang", "Or"],
      brand: "#FFD200", text: "#B8001F", on: "#2A0A0E", dark: "#2A0A0E", body: "#FFD200", trim: "#C8102E", pattern: "plain" },
    { id: "lille", name: "Lille", full: "LOSC Lille", short: "Lille", words: ["Rouge", "Marine"],
      brand: "#D81F2A", text: "#C61C26", on: "#FFFFFF", dark: "#1B2A4A", body: "#D81F2A", trim: "#1B2A4A", pattern: "plain" },
    { id: "lorient", name: "Lorient", full: "FC Lorient", short: "Lorient", words: ["Orange", "Noir"],
      brand: "#F47B20", text: "#C85A0C", on: "#1A1A1A", dark: "#1A1A1A", body: "#F47B20", trim: "#1A1A1A", pattern: "plain" },
    { id: "lyon", name: "Lyon", full: "Olympique Lyonnais", short: "Lyon", words: ["Blanc", "Bleu", "Rouge"],
      brand: "#1C3F94", text: "#1C3F94", on: "#FFFFFF", dark: "#0E1D47", body: "#FFFFFF", trim: "#1C3F94", accent2: "#DA291C", hero: "#EF4B3F", pattern: "band" },
    { id: "marseille", name: "Marseille", full: "Olympique de Marseille", short: "Marseille", words: ["Blanc", "Azur"],
      brand: "#2FAEE0", text: "#1A7FB0", on: "#0D2C54", dark: "#0D2C54", body: "#FFFFFF", trim: "#2FAEE0", pattern: "plain" },
    { id: "monaco", name: "Monaco", full: "AS Monaco", short: "Monaco", words: ["Rouge", "Blanc"],
      brand: "#E2001A", text: "#CC0018", on: "#FFFFFF", dark: "#1A1A1A", body: "#FFFFFF", trim: "#E2001A", pattern: "diagonal" },
    { id: "nice", name: "Nice", full: "OGC Nice", short: "Nice", words: ["Rouge", "Noir"],
      brand: "#D50032", text: "#C2002D", on: "#FFFFFF", dark: "#111111", body: "#D50032", trim: "#111111", pattern: "stripes" },
    { id: "paris-fc", name: "Paris FC", full: "Paris FC", short: "Paris FC", words: ["Marine", "Ciel"],
      brand: "#4FA3DD", text: "#1F6FA8", on: "#0A1F44", dark: "#0A1F44", body: "#0A1F44", trim: "#4FA3DD", hero: "#4FA3DD", pattern: "plain" },
    { id: "psg", name: "Paris Saint-Germain", full: "Paris Saint-Germain", short: "Paris", words: ["Bleu", "Rouge"],
      brand: "#DA291C", text: "#C42418", on: "#FFFFFF", dark: "#0B1F3F", body: "#0B1F3F", trim: "#DA291C", pattern: "band" },
    { id: "rennes", name: "Rennes", full: "Stade Rennais", short: "Rennes", words: ["Rouge", "Noir"],
      brand: "#D7141A", text: "#D7141A", on: "#FFFFFF", dark: "#141414", body: "#D7141A", trim: "#141414", pattern: "plain", photos: true },
    { id: "strasbourg", name: "Strasbourg", full: "RC Strasbourg Alsace", short: "Strasbourg", words: ["Bleu", "Blanc"],
      brand: "#0063B2", text: "#0063B2", on: "#FFFFFF", dark: "#0A2342", body: "#0063B2", trim: "#FFFFFF", hero: "#5FAEEF", pattern: "plain" },
    { id: "toulouse", name: "Toulouse", full: "Toulouse FC", short: "Toulouse", words: ["Violet", "Blanc"],
      brand: "#6B2C91", text: "#6B2C91", on: "#FFFFFF", dark: "#2A0F3D", body: "#6B2C91", trim: "#FFFFFF", hero: "#C39BE0", pattern: "plain" },
    { id: "troyes", name: "Troyes", full: "ESTAC Troyes", short: "Troyes", words: ["Bleu", "Blanc"],
      brand: "#0055A4", text: "#0055A4", on: "#FFFFFF", dark: "#0B1E3D", body: "#0055A4", trim: "#FFFFFF", hero: "#6FB3F2", pattern: "hoops" }
  ];

  var KEY = "kop_team";
  function find(id) { for (var i = 0; i < TEAMS.length; i++) if (TEAMS[i].id === id) return TEAMS[i]; return null; }
  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(id) { try { localStorage.setItem(KEY, id); } catch (e) { /* stockage indisponible */ } }

  var fromUrl = new URLSearchParams(location.search).get("team");
  if (fromUrl && find(fromUrl)) save(fromUrl);
  var chosenId = (fromUrl && find(fromUrl)) ? fromUrl : load();
  var team = find(chosenId) || TEAMS[0];

  /* ---------------- dessins SVG aux couleurs du club ---------------- */
  var BG = '<rect width="400" height="400" fill="#F2F0ED"/>';
  var JERSEY = "M132 62 L172 46 Q200 72 228 46 L268 62 L338 112 L308 168 L280 152 L280 348 Q200 358 120 348 L120 152 L92 168 L62 112 Z";
  function wrap(body) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' + BG + body + "</svg>"; }
  function uri(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function pattern(t, main, trim) {
    switch (t.pattern) {
      case "stripes": return [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return i % 2 ? '<rect x="' + (60 + i * 36) + '" y="40" width="36" height="320" fill="' + trim + '"/>' : ""; }).join("");
      case "hoops": return [0, 1, 2, 3, 4].map(function (i) { return '<rect x="60" y="' + (130 + i * 48) + '" width="300" height="20" fill="' + trim + '"/>'; }).join("");
      case "band": return '<rect x="172" y="40" width="56" height="320" fill="' + trim + '"/>' + (t.accent2 ? '<rect x="164" y="40" width="8" height="320" fill="' + t.accent2 + '"/><rect x="228" y="40" width="8" height="320" fill="' + t.accent2 + '"/>' : "");
      case "diagonal": return '<path d="M60 40 L360 40 L60 340 Z" fill="' + trim + '"/>';
      case "half": return '<rect x="200" y="40" width="160" height="320" fill="' + trim + '" opacity=".9"/>';
      default: return "";
    }
  }
  function jersey(main, trim, t, away) {
    return wrap('<defs><clipPath id="j"><path d="' + JERSEY + '"/></clipPath></defs>' +
      '<path d="' + JERSEY + '" fill="' + main + '"/>' +
      '<g clip-path="url(#j)">' + (away ? '<rect x="60" y="200" width="300" height="16" fill="' + t.brand + '"/>' : pattern(t, main, trim)) + "</g>" +
      '<path d="' + JERSEY + '" fill="none" stroke="' + t.dark + '" stroke-width="3"/>' +
      '<path d="M172 46 Q200 72 228 46" fill="none" stroke="' + trim + '" stroke-width="9"/>' +
      '<path d="M62 112 L92 168 M338 112 L308 168" stroke="' + trim + '" stroke-width="10"/>' +
      '<circle cx="240" cy="110" r="13" fill="' + (main === trim ? t.dark : trim) + '" stroke="' + t.dark + '" stroke-width="2"/>');
  }
  function short_(t) {
    return wrap('<path d="M110 90 H290 L320 320 H222 L200 190 L178 320 H80 Z" fill="' + t.dark + '"/>' +
      '<rect x="110" y="90" width="180" height="24" fill="' + t.trim + '" opacity=".35"/>' +
      '<path d="M90 250 L84 300 M310 250 L316 300" stroke="' + t.brand + '" stroke-width="8"/>');
  }
  function scarf(t) {
    var a = t.body === "#FFFFFF" ? t.trim : t.body, b = t.body === "#FFFFFF" ? t.dark : t.trim;
    if (a.toUpperCase() === b.toUpperCase()) b = t.dark;
    var stripes = ""; for (var i = 0; i < 8; i++) stripes += '<rect x="150" y="' + (40 + i * 40) + '" width="100" height="20" fill="' + b + '"/>';
    var fringe = ""; for (var k = 0; k < 10; k++) fringe += '<line x1="' + (156 + k * 9) + '" y1="360" x2="' + (156 + k * 9) + '" y2="385"/>';
    return wrap('<defs><clipPath id="s"><rect x="150" y="30" width="100" height="330" rx="6"/></clipPath></defs>' +
      '<g transform="rotate(-18 200 200)"><rect x="150" y="30" width="100" height="330" rx="6" fill="' + a + '" stroke="' + t.dark + '" stroke-width="2"/>' +
      '<g clip-path="url(#s)">' + stripes + '</g><g stroke="' + a + '" stroke-width="4">' + fringe + "</g></g>");
  }
  function sweat(t) {
    return wrap('<path d="M140 80 Q200 20 260 80 L330 120 L350 300 L310 305 L292 170 L285 345 H115 L108 170 L90 305 L50 300 L70 120 Z" fill="' + t.dark + '"/>' +
      '<path d="M185 110 L182 170 M215 110 L218 170" stroke="#EEE" stroke-width="4"/>' +
      '<rect x="150" y="250" width="100" height="50" rx="6" fill="#000" opacity=".15"/>' +
      '<rect x="115" y="330" width="170" height="15" fill="' + t.brand + '"/>');
  }
  function ball(t) {
    return wrap('<circle cx="200" cy="200" r="130" fill="#FFF" stroke="#1A1A1A" stroke-width="4"/>' +
      '<polygon points="200,150 243,181 227,232 173,232 157,181" fill="' + t.brand + '" stroke="#1A1A1A" stroke-width="3"/>' +
      '<g stroke="#1A1A1A" stroke-width="4"><path d="M200 150 V78 M243 181 L312 158 M227 232 L270 292 M173 232 L130 292 M157 181 L88 158"/></g>');
  }

  var images = team.photos ? null : {
    "maillot-domicile": uri(jersey(team.body, team.trim, team, false)),
    "maillot-exterieur": uri(jersey("#FAFAFA", team.brand, team, true)),
    "short-domicile": uri(short_(team)),
    "sweat-supporter": uri(sweat(team)),
    "echarpe": uri(scarf(team)),
    "ballon": uri(ball(team))
  };

  /* ---------------- couleurs appliquées tout de suite ---------------- */
  var root = document.documentElement;
  root.setAttribute("data-team", team.id);
  root.style.setProperty("--red", team.text);
  root.style.setProperty("--red-dark", team.dark === "#111111" || team.dark === "#141414" ? "#000" : team.dark);
  root.style.setProperty("--brand", team.brand);
  root.style.setProperty("--on-brand", team.on);
  root.style.setProperty("--black", team.dark);
  root.style.setProperty("--hero-accent", team.hero || team.brand);

  window.KOP_TEAM = {
    id: team.id, name: team.name, full: team.full, short: team.short, words: team.words,
    isDefault: team.id === "best", photos: !!team.photos, images: images, chosen: !!find(chosenId),
    list: TEAMS.map(function (t) { return { id: t.id, name: t.name, brand: t.brand, dark: t.dark, body: t.body, trim: t.trim }; })
  };

  /* ---------------- écran de choix ---------------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function swatch(t) {
    return '<span class="team-swatch" style="background:linear-gradient(135deg,' + t.body + ' 0 50%,' + (t.body === t.trim ? t.dark : t.trim) + ' 50% 100%)"></span>';
  }
  function choose(id) {
    var previous = load();
    save(id);
    try {
      sessionStorage.setItem("kop_team_selected", JSON.stringify({ team: id, previous: previous }));
      if (previous && previous !== id) ["kop_cart", "kop_coupon", "kop_wishlist", "kop_last_order"].forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) { /* stockage indisponible */ }
    var u = new URL(location.href); u.searchParams.delete("team");
    location.href = u.pathname + u.search + u.hash;
  }
  function openPicker(closable) {
    if (document.getElementById("team-picker")) return;
    var best = TEAMS[0], clubs = TEAMS.slice(1);
    var el = document.createElement("div");
    el.id = "team-picker"; el.className = "team-picker"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-labelledby", "team-picker-title");
    el.innerHTML =
      '<div class="team-picker-inner">' +
      (closable ? '<button type="button" class="team-picker-close" aria-label="Fermer">✕</button>' : "") +
      '<span class="team-picker-eyebrow">Kop Store · Ligue 1 2026-2027</span>' +
      '<h2 id="team-picker-title">Choisissez votre équipe</h2>' +
      '<p class="team-picker-lead">La boutique s\'habille aux couleurs de votre club. Vous pourrez changer à tout moment.</p>' +
      '<button type="button" class="team-card team-card-best" data-team="best">' + swatch(best) +
      '<span><strong>Meilleure équipe</strong><small>La boutique Kop Store, version d\'origine</small></span></button>' +
      '<div class="team-grid">' + clubs.map(function (t) {
        return '<button type="button" class="team-card" data-team="' + t.id + '">' + swatch(t) + "<span><strong>" + esc(t.name) + "</strong></span></button>";
      }).join("") + "</div>" +
      '<p class="team-picker-note">Site d\'entraînement fictif, sans lien avec les clubs ni la Ligue. Aucun logo officiel.</p></div>';
    document.body.appendChild(el);
    document.body.classList.add("team-picker-open");
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-team]");
      if (b) return choose(b.getAttribute("data-team"));
      if (e.target.closest(".team-picker-close") || (closable && e.target === el)) closePicker();
    });
    if (closable) document.addEventListener("keydown", function onKey(e) { if (e.key === "Escape") { closePicker(); document.removeEventListener("keydown", onKey); } });
    var first = el.querySelector(".team-card"); if (first) first.focus();
  }
  function closePicker() {
    var el = document.getElementById("team-picker");
    if (el) el.remove();
    document.body.classList.remove("team-picker-open");
  }
  window.KOP_TEAM.open = function () { openPicker(true); };

  function addHeaderChip() {
    var actions = document.querySelector(".header-actions");
    if (!actions || document.getElementById("team-chip")) return;
    var b = document.createElement("button");
    b.type = "button"; b.id = "team-chip"; b.className = "team-chip";
    b.innerHTML = swatch(team) + '<span class="team-chip-label">' + esc(team.name) + "</span>";
    b.title = "Changer d'équipe";
    b.addEventListener("click", function () { openPicker(true); });
    actions.insertBefore(b, actions.firstChild);
  }

  function start() {
    addHeaderChip();
    if (!window.KOP_TEAM.chosen && !document.body.hasAttribute("data-no-team-picker")) openPicker(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
