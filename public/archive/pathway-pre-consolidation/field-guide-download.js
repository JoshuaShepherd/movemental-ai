/**
 * Mirrors ToolkitDownloadForm behavior for static Safety pathway snapshot.
 * POST /api/toolkit-download — works when this HTML is served from the Movemental Next origin.
 */
(function () {
  var form = document.getElementById("field-guide-download-form");
  if (!form) return;

  var statusEl = document.getElementById("field-guide-form-status");
  var submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var email = String(fd.get("email") || "").trim();
    var organization = String(fd.get("organization") || "").trim();
    var source = form.getAttribute("data-source") || "pathway-safety-field-guide";

    if (!email) {
      setStatus("error", "Email is required.");
      return;
    }
    if (form.querySelector("#field-guide-org") && form.querySelector("#field-guide-org").required && !organization) {
      setStatus("error", "Organization is required.");
      return;
    }

    setBusy(true);
    setStatus("", "");

    try {
      var res = await fetch("/api/toolkit-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, organization: organization || undefined, source: source }),
      });

      if (!res.ok) {
        var payload = await res.json().catch(function () {
          return null;
        });
        var msg =
          payload && payload.error && payload.error.message
            ? payload.error.message
            : "Something went wrong. Please try again.";
        setStatus("error", msg);
        setBusy(false);
        return;
      }

      form.reset();
      form.innerHTML =
        '<p class="fg-success" role="status">' +
        (form.getAttribute("data-success-message") ||
          "Check your email — the field guide is on its way.") +
        "</p>";
    } catch {
      setStatus("error", "Network error. Please try again.");
      setBusy(false);
    }
  });

  function setBusy(busy) {
    if (submitBtn) {
      submitBtn.disabled = busy;
      submitBtn.textContent = busy ? "Sending…" : submitBtn.getAttribute("data-label") || "Read the Field Guide";
    }
  }

  function setStatus(kind, msg) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.className = "fg-status" + (kind ? " fg-status--" + kind : "");
    statusEl.setAttribute("role", kind === "error" ? "alert" : "status");
  }
})();
