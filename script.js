/* ============================================================
   VENDEDOR IA — página de vendas
   JavaScript mínimo (sem dependências).
   ============================================================ */

/* ------------------------------------------------------------------
   URL DO CHECKOUT (Kiwify)
   Troque o valor abaixo pelo link do seu checkout quando estiver pronto.
   Exemplo real: "https://pay.kiwify.com.br/SUA_CHAVE"
   Enquanto for "#", os botões não levam a nenhum destino.
------------------------------------------------------------------ */
var KIWIFY_CHECKOUT_URL = "#";

(function () {
  "use strict";

  /* ---------- CTA: aplica o link do checkout em todos os botões ---------- */
  var ctas = document.querySelectorAll(".js-cta");
  Array.prototype.forEach.call(ctas, function (btn) {
    btn.setAttribute("href", KIWIFY_CHECKOUT_URL);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });
  if (KIWIFY_CHECKOUT_URL === "#") {
    console.info("[VENDEDOR IA] KIWIFY_CHECKOUT_URL ainda é placeholder. Defina o link do checkout em script.js.");
  }

  /* ---------- Copiar prompt (com fallback offline) ---------- */
  var copyBtns = document.querySelectorAll(".copy-btn");
  var tmp = null;

  function fallbackCopy(text, done) {
    if (!tmp) {
      tmp = document.createElement("textarea");
      tmp.setAttribute("readonly", "");
      tmp.style.position = "fixed";
      tmp.style.opacity = "0";
      document.body.appendChild(tmp);
    }
    tmp.value = text;
    tmp.select();
    try {
      document.execCommand("copy");
      done(true);
    } catch (e) {
      done(false);
    }
  }

  Array.prototype.forEach.call(copyBtns, function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      var done = function (ok) {
        if (!ok) return;
        var old = btn.textContent;
        btn.textContent = "Copiado!";
        btn.classList.add("copied");
        window.setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove("copied");
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  /* ---------- Reveal suave ao rolar ---------- */
  var revealTargets = document.querySelectorAll(".section > .container > *");
  Array.prototype.forEach.call(revealTargets, function (el) { el.setAttribute("data-reveal", ""); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(revealTargets, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealTargets, function (el) { el.classList.add("in"); });
  }
})();