function init() {
  new SmoothScroll(document, 150, 10);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body;

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target;

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  // Resync pos quand un scroll externe (ex: scrollTo) change la position
  window.addEventListener("scroll", function () {
    if (!moving) pos = target.scrollTop;
  });

  function scrolled(e) {
    // Ne pas intercepter si on scrolle à l'intérieur d'un dropdown ou élément scrollable interne
    var el = e.target;
    while (el && el !== target) {
      if (
        el.classList &&
        (el.classList.contains("quiz__dropdown-list") ||
          el.classList.contains("quiz__dropdown") ||
          el.scrollHeight > el.clientHeight + 1)
      ) {
        return;
      }
      el = el.parentNode;
    }

    e.preventDefault();

    var delta = normalizeWheelDelta(e);
    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight));

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      else return -e.detail / 3;
    } else return e.wheelDelta / 120;
  }

  function update() {
    moving = true;
    var delta = (pos - target.scrollTop) / smooth;
    target.scrollTop += delta;
    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}

window.addEventListener("DOMContentLoaded", init);
