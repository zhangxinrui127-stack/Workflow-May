(function () {
  function attachCopyHandlers(root) {
    (root || document).querySelectorAll('[data-copy]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        if (!text) return;
        function done() {
          var prev = btn.textContent;
          btn.textContent = '✓ 已复制';
          setTimeout(function () { btn.textContent = prev; }, 1400);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(legacy);
        } else { legacy(); }
        function legacy() {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (_) {}
          document.body.removeChild(ta);
          done();
        }
      });
    });
  }

  function attachImageZoom(root) {
    (root || document).querySelectorAll('.click-zoom').forEach(function (img) {
      if (img.dataset.bound) return;
      img.dataset.bound = '1';
      img.addEventListener('click', function () {
        var lb = document.createElement('div');
        lb.className = 'lightbox';
        var big = document.createElement('img');
        big.src = img.src;
        lb.appendChild(big);
        lb.addEventListener('click', function () { lb.remove(); });
        document.body.appendChild(lb);
      });
    });
  }

  function bindXlsxTabs() {
    document.querySelectorAll('.xlsx-wrap').forEach(function (wrap) {
      var tabs = wrap.querySelectorAll('[data-xlsx-tab]');
      var panels = wrap.querySelectorAll('[data-xlsx-panel]');
      tabs.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.getAttribute('data-xlsx-tab');
          tabs.forEach(function (b) { b.classList.toggle('active', b === btn); });
          panels.forEach(function (p) {
            p.classList.toggle('active', p.getAttribute('data-xlsx-panel') === k);
          });
        });
      });
    });
  }

  function bindWorkflowScrollHint() {
    document.querySelectorAll('.workflow-viewport').forEach(function (vp) {
      var hint = vp.parentElement.querySelector('.wf-scroll-hint');
      if (!hint) return;
      function check() {
        var canScroll = vp.scrollHeight > vp.clientHeight + 4;
        hint.style.display = canScroll ? '' : 'none';
      }
      check();
      vp.addEventListener('scroll', function () {
        if (vp.scrollTop > 40) hint.classList.add('hidden');
      });
      window.addEventListener('resize', check);
    });
  }

  function bindFaqAccordion() {
    document.querySelectorAll('.faq-list').forEach(function (list) {
      list.querySelectorAll('.faq-item > summary').forEach(function (sum) {
        sum.addEventListener('click', function () {});
      });
    });
  }

  // ⑤ Persist workflow <details> open-state across navigations.
  // Uses sessionStorage so returning from a subpage restores the expanded
  // workflow without the user clicking ▸ again.
  function bindWorkflowPersist() {
    document.querySelectorAll('section.case details').forEach(function (d) {
      var host = d.closest('.case');
      var key = 'wf-open-' + ((host && host.id) || 'default');
      try {
        if (sessionStorage.getItem(key) === '1') {
          d.open = true;
        }
      } catch (_) {}
      d.addEventListener('toggle', function () {
        try { sessionStorage.setItem(key, d.open ? '1' : '0'); } catch (_) {}
      });
    });
  }

  // When arriving on the main page via an anchor (e.g. #mapping) we also
  // want the corresponding workflow to be expanded automatically — saves a
  // click after pressing Back from a subpage.
  function expandFromHash() {
    var hash = (location.hash || '').replace('#', '');
    if (!hash) return;
    var host = document.getElementById(hash);
    if (!host || !host.classList.contains('case')) return;
    var d = host.querySelector('details');
    if (d) d.open = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    attachCopyHandlers();
    attachImageZoom();
    bindXlsxTabs();
    bindWorkflowScrollHint();
    bindFaqAccordion();
    bindWorkflowPersist();
    expandFromHash();
  });

  window.appUtils = { attachCopyHandlers: attachCopyHandlers, attachImageZoom: attachImageZoom };
})();
