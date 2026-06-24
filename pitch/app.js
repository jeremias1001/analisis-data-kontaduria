const panels = Array.from(document.querySelectorAll('.panel'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const stage = entry.target.querySelector('.stage');
      if (stage) stage.classList.add('is-visible');
    }
  });
}, { threshold: 0.35 });
panels.forEach((panel) => observer.observe(panel));

function currentIndex() {
  const middle = window.scrollY + window.innerHeight / 2;
  let index = 0;
  panels.forEach((panel, itemIndex) => {
    if (panel.offsetTop <= middle) index = itemIndex;
  });
  return index;
}

function move(direction) {
  const index = Math.max(0, Math.min(panels.length - 1, currentIndex() + direction));
  panels[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('next').onclick = () => move(1);
document.getElementById('prev').onclick = () => move(-1);

const demoStates = [
  ['Landing a registro', 'Resumen inteligente', '$550k', '8', 'F29', 'Recomendación: tus ventas subieron, pero el margen bajó. Revisa proveedores y productos con baja rotación.'],
  ['Registro en 5 minutos', 'Negocio configurado', 'Minimarket', 'Productos', 'Gastos', 'Paso inicial: el usuario no necesita entender contabilidad. Solo responde qué vende, qué gastos tiene y qué quiere controlar.'],
  ['Dashboard operativo', 'Claridad del negocio', '87%', '61,1%', '53,7%', 'Lectura: el sistema prioriza lo que la validación pidió: ingresos, gastos, inventario y recordatorios.'],
  ['Asistente IA', 'Decisiones explicadas', 'Margen', 'Stock', 'SII', 'IA financiera: transforma datos en lenguaje simple: qué pasó, por qué importa y qué acción conviene hacer ahora.']
];

Array.from(document.querySelectorAll('[data-demo]')).forEach((button) => {
  button.onclick = () => {
    Array.from(document.querySelectorAll('[data-demo]')).forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const data = demoStates[Number(button.dataset.demo)];
    document.getElementById('state').textContent = data[0];
    document.getElementById('title').textContent = data[1];
    document.getElementById('k1').textContent = data[2];
    document.getElementById('k2').textContent = data[3];
    document.getElementById('k3').textContent = data[4];
    document.getElementById('ai').textContent = data[5];
  };
});