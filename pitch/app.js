const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = event.clientX + 'px';
  glow.style.top = event.clientY + 'px';
});

let lenis;
if (window.Lenis) {
  lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9 });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.utils.toArray('.reveal').forEach((item) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 82%' }
    });
  });

  gsap.utils.toArray('.pain-card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 70,
      rotateX: -8,
      duration: 0.8,
      delay: index * 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.flow-card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.75,
      delay: index * 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('[data-count]').forEach((number) => {
    const target = Number(number.dataset.count);
    const proxy = { value: 0 };
    gsap.to(proxy, {
      value: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: number, start: 'top 85%' },
      onUpdate: () => { number.textContent = Math.round(proxy.value); }
    });
  });

  gsap.from('.hero-product', { opacity: 0, y: 40, rotateX: -8, duration: 1.1, ease: 'power3.out', delay: 0.25 });
  gsap.from('.floating-note', { opacity: 0, x: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.8 });
}

const views = [
  ['Landing a registro', 'Resumen inteligente', '$550k', '8', 'F29', 'Tus ventas subieron, pero el margen bajó. Revisa proveedores y productos con baja rotación.'],
  ['Registro en 5 minutos', 'Negocio configurado', 'Minimarket', 'Productos', 'Gastos', 'El usuario no necesita entender contabilidad. Solo responde qué vende, qué gastos tiene y qué quiere controlar.'],
  ['Dashboard operativo', 'Claridad del negocio', '87%', '61,1%', '53,7%', 'El sistema prioriza lo que la validación pidió: ingresos, gastos, inventario y recordatorios.'],
  ['Asistente IA', 'Decisiones explicadas', 'Margen', 'Stock', 'SII', 'La IA transforma datos en lenguaje simple: qué pasó, por qué importa y qué acción conviene hacer ahora.']
];

document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const data = views[Number(button.dataset.view)];
    document.getElementById('app-state').textContent = data[0];
    document.getElementById('app-title').textContent = data[1];
    document.getElementById('kpi-a').textContent = data[2];
    document.getElementById('kpi-b').textContent = data[3];
    document.getElementById('kpi-c').textContent = data[4];
    document.getElementById('ai-text').textContent = data[5];
  });
});