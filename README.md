# ☕ Luna Café - Web Profesional de Ejemplo

Este proyecto es una plantilla de sitio web moderna, limpia y responsive para una pequeña empresa de hostelería (**Luna Café**).

---

## 📁 Estructura del Proyecto

```text
mis-webs/
├── index.html        # Estructura semántica, accesibilidad y contenidos
├── styles.css        # Sistema de diseño, tokens CSS, responsive design y animaciones
├── script.js         # Interactividad (menú móvil, validación, modal y notificaciones)
└── images/           # Imágenes de alta resolución optimizadas
    ├── hero.jpg      # Fotografía del interior de la cafetería
    ├── about.jpg     # Fotografía del barista preparando café de filtro
    ├── latte.jpg     # Producto 1: Flat White con latte art
    ├── croissant.jpg # Producto 2: Croissant artesano francés
    └── coldbrew.jpg  # Producto 3: Nitro Cold Brew cítrico
```

---

## 🌟 Buenas Prácticas Aplicadas para Pequeñas Empresas

1. **Jerarquía Visual Clara y Directa**:
   - Hero atractivo con llamada a la acción clara (*"Ver menú destacado"*).
   - Datos clave visibles de inmediato (horario, propuesta de valor, especialidades).

2. **Diseño Responsive (Móvil Primero)**:
   - Navegación adaptada con menú hamburguesa para pantallas táctiles.
   - Grid flexible que pasa de 3 columnas en escritorio a 1 columna en móvil de manera fluida.

3. **Interactividad Ligera sin Dependencias**:
   - Menú de navegación que cambia con el scroll (Sticky con efecto glassmorphism).
   - Modal interactivo con pestañas de la carta completa.
   - Formulario de contacto con validación en tiempo real y mensaje de confirmación amigable.

4. **Accesibilidad y SEO Semántico**:
   - Etiquetas HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Jerarquía única de títulos (`<h1>` principal y `<h2>`/`<h3>` anidados).
   - Atributos `aria-label`, `aria-expanded` y contraste de color accesible.

---

## 🚀 Cómo Visualizar la Web

Puedes abrir directamente el archivo `index.html` en tu navegador favorito, o iniciar un servidor local rápido con Python:

```bash
python3 -m http.server 8000
```
Luego abre en tu navegador: `http://localhost:8000`
