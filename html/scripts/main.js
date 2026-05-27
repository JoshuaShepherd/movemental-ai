/* ============================================================
   MOVEMENTAL — Shared Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavScroll();
  initRevealAnimations();
  initDisclosures();
  initPipelineNodes();
  initNotBuildingItems();
  initStepper();
  initConstraintBars();
  initTrackBars();
  initContentOrbit();
  initSignalDiagram();
  initCredibilityChart();
});

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   NAVIGATION SCROLL STATE
   ============================================================ */
function initNavScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  function update() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ============================================================
   INTERSECTION OBSERVER — REVEAL ANIMATIONS
   ============================================================ */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — allow re-triggering is optional
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ============================================================
   DISCLOSURE TOGGLES
   ============================================================ */
function initDisclosures() {
  document.querySelectorAll('.disclosure-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const disclosure = trigger.closest('.disclosure');
      if (!disclosure) return;
      disclosure.classList.toggle('open');
    });
  });
}

/* ============================================================
   PIPELINE NODE ACCORDIONS (How page)
   ============================================================ */
function initPipelineNodes() {
  document.querySelectorAll('.pipeline-node-header').forEach(header => {
    header.addEventListener('click', () => {
      const node = header.closest('.pipeline-node');
      if (!node) return;

      // Close others
      const pipeline = node.closest('.pipeline');
      if (pipeline) {
        pipeline.querySelectorAll('.pipeline-node.open').forEach(openNode => {
          if (openNode !== node) openNode.classList.remove('open');
        });
      }

      node.classList.toggle('open');
    });
  });
}

/* ============================================================
   "NOT BUILDING" ITEMS (How page)
   ============================================================ */
function initNotBuildingItems() {
  document.querySelectorAll('.not-building-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

/* ============================================================
   STEPPER / WIZARD (How page)
   ============================================================ */
function initStepper() {
  const stepper = document.querySelector('.stepper');
  if (!stepper) return;

  const steps = stepper.querySelectorAll('.step');
  const panels = document.querySelectorAll('.wizard-step-panel');
  const connectors = stepper.querySelectorAll('.step-connector');

  steps.forEach((step, idx) => {
    step.addEventListener('click', () => {
      // Update steps
      steps.forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i < idx) s.classList.add('completed');
        if (i === idx) s.classList.add('active');
      });

      // Update connectors
      connectors.forEach((c, i) => {
        c.classList.toggle('completed', i < idx);
      });

      // Update panels
      panels.forEach((p, i) => {
        p.style.display = i === idx ? 'block' : 'none';
      });
    });
  });
}

/* ============================================================
   CONSTRAINT BARS ANIMATION (Why page — Why Now)
   ============================================================ */
function initConstraintBars() {
  const bars = document.querySelectorAll('.constraint-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ============================================================
   TWO-TRACK BAR ANIMATION (Why page — Credibility vs Amplification)
   ============================================================ */
function initTrackBars() {
  const fills = document.querySelectorAll('.track-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

/* ============================================================
   CONTENT ORBIT VISUALIZATION (Why page — stuck content)
   ============================================================ */
function initContentOrbit() {
  const stuckCanvas = document.getElementById('stuck-orbit');
  const movingCanvas = document.getElementById('moving-orbit');

  if (stuckCanvas) drawStuckOrbit(stuckCanvas);
  if (movingCanvas) drawMovingOrbit(movingCanvas);
}

function drawStuckOrbit(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;
  const cx = W / 2;
  const cy = H / 2;

  let angle = 0;
  let animFrame;
  let started = false;

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Draw orbit path (small)
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fill();

    // Orbiting content card
    angle += 0.015;
    const x = cx + Math.cos(angle) * 25;
    const y = cy + Math.sin(angle) * 25;

    // Card shape
    const cardW = 40;
    const cardH = 28;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = 'rgba(203, 52, 55, 0.3)';
    ctx.strokeStyle = 'rgba(203, 52, 55, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 4);
    ctx.fill();
    ctx.stroke();

    // Lines on card
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(-14, -6, 28, 3);
    ctx.fillRect(-14, 0, 20, 3);

    ctx.restore();

    animFrame = requestAnimationFrame(animate);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        animate();
      } else if (!entry.isIntersecting && started) {
        cancelAnimationFrame(animFrame);
        started = false;
      }
    });
  }, { threshold: 0.2 });

  observer.observe(canvas);
}

function drawMovingOrbit(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  // Network nodes
  const networkNodes = [
    { x: W * 0.2, y: H * 0.3 },
    { x: W * 0.5, y: H * 0.2 },
    { x: W * 0.8, y: H * 0.35 },
    { x: W * 0.3, y: H * 0.65 },
    { x: W * 0.65, y: H * 0.7 },
    { x: W * 0.85, y: H * 0.6 },
  ];

  const networkEdges = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [1, 4], [2, 5]];

  let progress = 0;
  let currentEdge = 0;
  let animFrame;
  let started = false;

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Draw edges
    networkEdges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(networkNodes[a].x, networkNodes[a].y);
      ctx.lineTo(networkNodes[b].x, networkNodes[b].y);
      ctx.strokeStyle = 'rgba(110, 145, 110, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw nodes
    networkNodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(110, 145, 110, 0.5)';
      ctx.fill();
    });

    // Animate card moving along edges
    const edge = networkEdges[currentEdge % networkEdges.length];
    const fromNode = networkNodes[edge[0]];
    const toNode = networkNodes[edge[1]];
    const x = fromNode.x + (toNode.x - fromNode.x) * progress;
    const y = fromNode.y + (toNode.y - fromNode.y) * progress;

    // Content card
    const cardW = 40;
    const cardH = 28;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = 'rgba(110, 145, 110, 0.4)';
    ctx.strokeStyle = 'rgba(110, 145, 110, 0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(-14, -6, 28, 3);
    ctx.fillRect(-14, 0, 20, 3);

    ctx.restore();

    // Trail
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(110, 145, 110, 0.06)';
    ctx.fill();

    progress += 0.008;
    if (progress >= 1) {
      progress = 0;
      currentEdge++;
    }

    animFrame = requestAnimationFrame(animate);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        animate();
      } else if (!entry.isIntersecting && started) {
        cancelAnimationFrame(animFrame);
        started = false;
      }
    });
  }, { threshold: 0.2 });

  observer.observe(canvas);
}

/* ============================================================
   SIGNAL FLATTENING ANIMATION (SVG draw-on)
   ============================================================ */
function initSignalDiagram() {
  const paths = document.querySelectorAll('.draw-path');
  if (!paths.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.3 });

  paths.forEach(path => {
    // Set actual path length for dasharray
    if (path.getTotalLength) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }
    observer.observe(path);
  });
}

/* ============================================================
   CREDIBILITY vs AMPLIFICATION CHART (SVG)
   ============================================================ */
function initCredibilityChart() {
  const chartContainer = document.getElementById('cred-amp-chart');
  if (!chartContainer) return;

  const W = 500;
  const H = 280;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.style.width = '100%';
  svg.style.maxWidth = '500px';

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padT + (plotH / 4) * i;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', padL);
    line.setAttribute('y1', y);
    line.setAttribute('x2', W - padR);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', 'rgba(255,255,255,0.06)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }

  // Axes labels
  const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xLabel.setAttribute('x', W / 2);
  xLabel.setAttribute('y', H - 5);
  xLabel.setAttribute('text-anchor', 'middle');
  xLabel.setAttribute('fill', 'rgba(255,255,255,0.4)');
  xLabel.setAttribute('font-size', '12');
  xLabel.setAttribute('font-family', 'Inter, sans-serif');
  xLabel.textContent = 'Time';
  svg.appendChild(xLabel);

  // Credibility line (slow, cumulative — logarithmic curve)
  let credPath = `M ${padL} ${padT + plotH}`;
  const credPoints = 50;
  for (let i = 1; i <= credPoints; i++) {
    const t = i / credPoints;
    const x = padL + t * plotW;
    const y = padT + plotH - (Math.log(1 + t * 4) / Math.log(5)) * plotH;
    credPath += ` L ${x} ${y}`;
  }

  const credLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  credLine.setAttribute('d', credPath);
  credLine.setAttribute('fill', 'none');
  credLine.setAttribute('stroke', '#6e916e');
  credLine.setAttribute('stroke-width', '2.5');
  credLine.setAttribute('stroke-linecap', 'round');
  credLine.classList.add('draw-path');
  svg.appendChild(credLine);

  // Amplification curve (fast, exponential)
  let ampPath = `M ${padL} ${padT + plotH}`;
  for (let i = 1; i <= credPoints; i++) {
    const t = i / credPoints;
    const x = padL + t * plotW;
    const y = padT + plotH - Math.pow(t, 3) * plotH;
    ampPath += ` L ${x} ${y}`;
  }

  const ampLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  ampLine.setAttribute('d', ampPath);
  ampLine.setAttribute('fill', 'none');
  ampLine.setAttribute('stroke', '#cb3437');
  ampLine.setAttribute('stroke-width', '2.5');
  ampLine.setAttribute('stroke-linecap', 'round');
  ampLine.classList.add('draw-path');
  svg.appendChild(ampLine);

  // Legend
  const legendItems = [
    { color: '#6e916e', label: 'Credibility (slow, cumulative)' },
    { color: '#cb3437', label: 'Amplification (fast, exponential)' }
  ];

  legendItems.forEach((item, i) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', padL + i * 220);
    rect.setAttribute('y', padT - 12);
    rect.setAttribute('width', '16');
    rect.setAttribute('height', '3');
    rect.setAttribute('rx', '1.5');
    rect.setAttribute('fill', item.color);
    g.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', padL + i * 220 + 22);
    text.setAttribute('y', padT - 7);
    text.setAttribute('fill', 'rgba(255,255,255,0.5)');
    text.setAttribute('font-size', '11');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.textContent = item.label;
    g.appendChild(text);

    svg.appendChild(g);
  });

  chartContainer.appendChild(svg);

  // Animate when visible
  initSignalDiagram(); // re-init to catch new SVG paths
}
