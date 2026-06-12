   { label: pL.labels.coherenciaBiocampo,   pct: gPct([3,6,9].includes(voltajeA) ? 82 : 70, 14) },
          { label: pL.labels.gaugeNodoPfx + indNextNd + pL.labels.gaugePrecision, pct: gPct(78 + (voltajeA % 3) * 4, 12) },
        ], GOLD);
        foot();
      }

      if (!silent) doc.save(`MECF_${curMod}_${operatorCode}.pdf`);
      lastPdfDataUri = doc.output('datauristring');
    }

    // Auto-verify when Stripe redirects back with session_id
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    if (sessionId && sessionId.startsWith("cs_")) {
      window.history.replaceState({}, "", "/protocolo");
      fetch(`/api/stripe/verify-payment?session_id=${sessionId}`)
        .then(r => r.json())
        .then((data: { paid?: boolean }) => {
          if (data.paid) {
            showCertificate();
            generatePDF();
          }
        })
        .catch(() => {});
    }

    async function sendReportByEmail() {
      const emailInput = ($("emailInput") as HTMLInputElement).value.trim();
      if (!emailInput) { alert("Introduce tu email."); return; }
      const name = ($("opName") as HTMLInputElement).value || "Operador";
      const statusEl = $("emailStatus") as HTMLElement;
      const btn = $("btnSendEmail") as HTMLButtonElement;
      if (!lastPdfDataUri) { alert("Genera el informe primero."); return; }
      btn.disabled = true; btn.innerText = "ENVIANDO...";
      statusEl.style.display = "block"; statusEl.style.color = "#888"; statusEl.innerText = "Procesando envío...";
      try {
        const resp = await fetch("/api/send-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput, pdfDataUri: lastPdfDataUri, name, module: curMod }),
        });
        const data = await resp.json();
        if (data.ok) {
          statusEl.style.color = "#00ff88"; statusEl.innerText = "Informe enviado correctamente a " + emailInput;
          btn.innerText = "ENVIADO";
        } else {
          throw new Error(data.error || "Error desconocido");
        }
      } catch (err: any) {
        statusEl.style.color = "#ff6644"; statusEl.innerText = err.message || "Error al enviar. Inténtalo de nuevo.";
        btn.disabled = false; btn.innerText = "ENVIAR INFORME POR EMAIL";
      }
    }

    function upsellClick() {
      const upsellPrices: Record<string, number> = { "ÁRBOL": 49.99, "SYNERGY": 34.99, "INDIVIDUAL": 24.99 };
      const upsellColors: Record<string, string> = { "ÁRBOL": "#bc00ff", "SYNERGY": "#00ff88", "INDIVIDUAL": "#00f2ff" };
      curMod = upsellMod;
      curPrice = upsellPrices[upsellMod] || 49.99;
      curColor = upsellColors[upsellMod] || "#bc00ff";
      const terminal = $("terminalBox") as HTMLElement;
      terminal.style.setProperty("--glow-color", curColor);
      $("termHeader").innerText = "TERMINAL MECF: " + curMod;
      $("certificateArea").style.display = "none";
      $("upsellBanner").style.display = "none";
      $("formSection").style.display = "block";
      $("terminalArea").style.display = "block";
      $("modulesSelect").style.display = "none";
      ($("partnerField") as HTMLElement).style.display = curMod === "SYNERGY" ? "block" : "none";
      ($("arbolFields") as HTMLElement).style.display = curMod === "ÁRBOL" ? "block" : "none";
      window.scrollTo({ top: ($("terminalArea") as HTMLElement).offsetTop - 40, behavior: "smooth" });
    }

    function dateChange(id: string, part: string, delta: number) {
      const hidden = document.getElementById(id) as HTMLInputElement;
      if (!hidden) return;
      const parts = hidden.value.split("-");
      let y = parseInt(parts[0]), m = parseInt(parts[1]), d = parseInt(parts[2]);
      if (part === "y") y += delta;
      if (part === "m") { m += delta; if (m < 1) m = 12; if (m > 12) m = 1; }
      if (part === "d") { d += delta; if (d < 1) d = 31; if (d > 31) d = 1; }
      hidden.value = `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      const yd = document.getElementById(id + "_y"); if (yd) yd.innerText = String(y);
      const md = document.getElementById(id + "_m"); if (md) md.innerText = String(m).padStart(2,"0");
      const dd = document.getElementById(id + "_d"); if (dd) dd.innerText = String(d).padStart(2,"0");
      if (part === "y" && (id === "opDate" || id === "opDateSocio")) {
        const warnEl = document.getElementById("yearWarning");
        if (warnEl && id === "opDate") {
          if (y < 1900 || y > 2006) {
            warnEl.style.display = "block";
            warnEl.innerText = y < 1900 ? "AVISO: AÑO INFERIOR AL RANGO VALIDO (1900-2006)" : "AVISO: EL AÑO DE NACIMIENTO DEBE SER ANTERIOR A 2006";
          } else { warnEl.style.display = "none"; }
        }
      }
    }

    function applyLang(lang: string) {
      const T: Record<string, string> = (translations as any)[lang] ?? translations['es'];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = (el as HTMLElement).getAttribute('data-i18n');
        if (key && T[key]) (el as HTMLElement).textContent = T[key];
      });
      document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = (el as HTMLElement).getAttribute('data-i18n-ph');
        if (key && T[key]) (el as HTMLInputElement).placeholder = T[key];
      });
      const root = document.querySelector('.protocolo-root') as HTMLElement | null;
      if (root) root.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', (btn as HTMLElement).getAttribute('data-lang') === lang);
      });
      const note = document.getElementById('reportsNote');
      if (note) note.style.display = lang === 'ar' ? 'block' : 'none';
      try { localStorage.setItem('mecf-lang', lang); } catch (_) {}
    }

    function setLang(lang: string) {
      curLang = (['es','en','fr'].includes(lang) ? lang : 'es') as PdfLang;
      applyLang(lang);
    }

    (window as any)._mecf = { selectModule, goBack, runEngine, sealAndPay, proceedToPayment, cancelSummary, confirmPayAndDownload, retryPayment, generatePDF, dateChange, sendReportByEmail, upsellClick, setLang };

    const savedLang = (() => { try { return localStorage.getItem('mecf-lang') || 'es'; } catch (_) { return 'es'; } })();
    if (savedLang !== 'es') {
      curLang = (['es','en','fr'].includes(savedLang) ? savedLang : 'es') as PdfLang;
      applyLang(savedLang);
    }

    const autoModMap: Record<string, { price: number; color: string }> = {
      'INDIVIDUAL': { price: 24.99, color: '#00f2ff' },
      'ÁRBOL':      { price: 49.99, color: '#bc00ff' },
      'SYNERGY':    { price: 34.99, color: '#00ff88' },
    };
    const autoMod = new URLSearchParams(window.location.search).get('modulo');
    if (autoMod && autoModMap[autoMod]) {
      const { price, color } = autoModMap[autoMod];
      const bridgeTexts: Record<string, string> = {
        'INDIVIDUAL': 'Tu diagnóstico ha detectado un perfil de Operador Individual — el Módulo Individual es el primer paso para identificar los nodos de interferencia en tu sistema biográfico.',
        'ÁRBOL': 'Tu diagnóstico ha detectado un patrón de origen transgeneracional — el Módulo Árbol Genealógico decodifica las lealtades invisibles que lo sostienen.',
        'SYNERGY': 'Tu diagnóstico ha detectado dinámicas relacionales activas — el Módulo Socios & Parejas mapea el sistema sinérgico completo.',
      };
      setTimeout(() => {
        selectModule(autoMod, price, color);
        const bridge = document.getElementById('diagBridge');
        const bridgeText = document.getElementById('diagBridgeText');
        if (bridge) bridge.style.display = 'block';
        if (bridgeText && bridgeTexts[autoMod]) bridgeText.textContent = bridgeTexts[autoMod];
      }, 300);
    }

    // ── Countdown to midnight ──
    function updateCountdown() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      const hh = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      const display = `${hh}:${mm}:${ss}`;
      const el = document.getElementById('urgencyDigits');
      const el2 = document.getElementById('urgencyMini');
      if (el) el.textContent = display;
      if (el2) el2.textContent = display;
    }
    updateCountdown();
    const _countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(_countdownInterval);
      delete (window as any)._mecf;
    };
  }, []);

  return (
    <>
      <SeoHead
        title="Los Módulos MECF — Elige tu análisis | Método MECF"
        description="Elige el módulo MECF que necesitas: Individual, Árbol Genealógico o Socios & Parejas. Análisis técnico de ciclos biográficos desde 24,99€. PDF personalizado en minutos."
        canonical="/protocolo"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Módulos del Método MECF",
          "url": "https://metodomecf.com/protocolo",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Análisis Individual MECF", "url": "https://metodomecf.com/protocolo" },
            { "@type": "ListItem", "position": 2, "name": "Árbol Genealógico MECF", "url": "https://metodomecf.com/protocolo" },
            { "@type": "ListItem", "position": 3, "name": "Socios & Parejas MECF", "url": "https://metodomecf.com/protocolo" }
          ]
        }}
      />
      <div className="protocolo-root">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div dangerouslySetInnerHTML={{ __html: HTML }} />
      </div>
    </>
  );
}
