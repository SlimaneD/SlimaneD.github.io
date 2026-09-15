(function () {
  "use strict";

  function prepareExternalLinks() {
    document.querySelectorAll("a[href]").forEach(function (link) {
      var destination;

      try {
        destination = new URL(link.getAttribute("href"), window.location.href);
      } catch (error) {
        return;
      }

      if (
        (destination.protocol !== "http:" && destination.protocol !== "https:") ||
        destination.origin === window.location.origin
      ) {
        return;
      }

      link.target = "_blank";
      link.relList.add("noopener", "noreferrer");

      if (!link.querySelector(".new-tab-notice")) {
        var notice = document.createElement("span");
        notice.className = "sr-only new-tab-notice";
        notice.textContent = " (opens in a new tab)";
        link.appendChild(notice);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepareExternalLinks);
  } else {
    prepareExternalLinks();
  }
})();
