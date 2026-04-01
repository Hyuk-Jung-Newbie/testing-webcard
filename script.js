(function () {
  const card = document.getElementById("card");
  const toast = document.getElementById("toast");
  const copyButtons = document.querySelectorAll(".btn-copy[data-copy]");

  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
      toast.textContent = "";
    }, 2200);
  }

  copyButtons.forEach(function (el) {
    el.addEventListener("click", function () {
      const text = el.getAttribute("data-copy");
      if (!text || !navigator.clipboard) {
        showToast("이 브라우저에서는 복사를 지원하지 않습니다.");
        return;
      }
      navigator.clipboard.writeText(text).then(
        function () {
          showToast("복사했습니다: " + text);
        },
        function () {
          showToast("복사에 실패했습니다.");
        }
      );
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = (y * -6).toFixed(2);
      const ry = (x * 8).toFixed(2);
      card.style.transform =
        "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  }
})();
