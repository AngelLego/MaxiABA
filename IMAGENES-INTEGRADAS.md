# 🎨 Imágenes y Logos Integrados

## ✅ Imágenes Incluidas

Se han integrado exitosamente todas las imágenes de la carpeta `src/imgs/` al sitio web:

### 📁 Ubicación de Imágenes
Las imágenes se copiaron de `src/imgs/` a `public/images/` para que sean accesibles desde el navegador.

---

## 🖼️ Imágenes Integradas

### 1. **Logo Principal** - `logo.png`
**Ubicaciones:**
- ✅ Navbar (esquina superior izquierda)
- ✅ Footer (parte inferior)
- ✅ Favicon (pestaña del navegador)
- ✅ Página de privacidad

**Características:**
- Tamaño en navbar: 40px de altura
- Tamaño en footer: 50px de altura
- Animación hover: escala 1.1x
- Transiciones suaves

---

### 2. **Logo Pemex** - `Logo Pemex.png`
**Ubicaciones:**
- ✅ Hero slider (primer slide, lado derecho)
- ✅ Sección de servicios (encabezado)
- ✅ Sección de marcas aliadas
- ✅ Footer (centro)

**Características:**
- Animación flotante en hero
- Efecto grayscale con hover
- Máximo 150-200px de ancho

---

### 3. **Logo HAM** - `Logo-Ham.jpg`
**Ubicaciones:**
- ✅ Sección de marcas aliadas

**Características:**
- Efecto grayscale con hover
- Transición suave al pasar el mouse

---

### 4. **Imagen Hero 1** - `473569613_122185377902058192_937113667778911083_n.jpg`
**Ubicación:**
- ✅ Primer slide del hero slider

**Características:**
- Imagen de fondo con overlay oscuro
- Gradiente de izquierda a derecha
- Texto blanco sobre la imagen

---

### 5. **Imagen Hero 2** - `587940724_735574636235494_963360301578433820_n.jpg`
**Ubicación:**
- ✅ Segundo slide del hero slider

**Características:**
- Imagen de fondo con overlay oscuro
- Auto-play cada 5 segundos
- Transición fade entre slides

---

## 🎨 Efectos y Animaciones

### Logo en Navbar
```css
- Hover: escala 1.1x
- Transición: 0.3s ease
- Altura: 40px
```

### Logo en Hero
```css
- Animación: flotante (3s infinite)
- Drop shadow para destacar
- Movimiento vertical suave
```

### Logos de Marcas
```css
- Grayscale: 20% (normal)
- Grayscale: 0% (hover)
- Escala: 1.1x (hover)
- Opacidad: 0.9 → 1.0
```

### Imágenes de Fondo Hero
```css
- Background-size: cover
- Background-position: center
- Overlay: gradiente oscuro
- Transición: fade effect
```

---

## 📱 Responsive Design

### Móvil (< 768px)
- Logo navbar: 35px
- Logo Pemex en hero: oculto
- Marcas: 2 columnas

### Tablet (768px - 1023px)
- Logo navbar: 40px
- Marcas: 2 columnas

### Desktop (> 1024px)
- Logo navbar: 40px
- Logo Pemex visible en hero
- Marcas: 4 columnas

---

## 🔧 Archivos Modificados

### HTML
- ✅ `public/index.html` - Página principal
- ✅ `public/privacidad.html` - Página de privacidad

### CSS
- ✅ `public/css/styles.css` - Estilos personalizados

### Imágenes
- ✅ `public/images/logo.png`
- ✅ `public/images/Logo Pemex.png`
- ✅ `public/images/Logo-Ham.jpg`
- ✅ `public/images/473569613_122185377902058192_937113667778911083_n.jpg`
- ✅ `public/images/587940724_735574636235494_963360301578433820_n.jpg`

---

## 🌐 Ver los Cambios

1. **Abre tu navegador en:** http://localhost:3002

2. **Verás:**
   - Logo en el navbar (arriba)
   - Imágenes reales en el slider hero
   - Logo Pemex flotando en el primer slide
   - Logo Pemex en la sección de servicios
   - Sección de marcas aliadas (Pemex + HAM)
   - Logo en el footer

3. **Prueba los efectos hover:**
   - Pasa el mouse sobre el logo del navbar
   - Pasa el mouse sobre los logos de marcas
   - Observa la animación flotante del logo Pemex

---

## 🎯 Secciones con Imágenes

### 1. Navbar
```html
<img src="/images/logo.png" alt="MAXI SERVICIOS ABA" class="navbar-logo">
```

### 2. Hero Slider
```html
<div class="swiper-slide" style="background-image: url('/images/473569613_...');">
    <img src="/images/Logo Pemex.png" class="hero-logo">
</div>
```

### 3. Servicios
```html
<img src="/images/Logo Pemex.png" alt="Pemex">
```

### 4. Marcas Aliadas
```html
<img src="/images/Logo Pemex.png" class="brand-logo">
<img src="/images/Logo-Ham.jpg" class="brand-logo">
```

### 5. Footer
```html
<img src="/images/logo.png" class="footer-logo">
<img src="/images/Logo Pemex.png">
```

---

## 💡 Personalización Adicional

### Cambiar Tamaño del Logo
Edita en `public/css/styles.css`:
```css
.navbar-logo {
    height: 40px; /* Cambia este valor */
}
```

### Cambiar Velocidad de Animación
Edita en `public/css/styles.css`:
```css
@keyframes float {
    /* Ajusta la duración en la línea animation: float 3s */
}
```

### Agregar Más Imágenes al Slider
Edita `public/index.html` y agrega más slides:
```html
<div class="swiper-slide" style="background-image: url('/images/tu-imagen.jpg');">
    <!-- Contenido -->
</div>
```

---

## 📊 Optimización de Imágenes

### Recomendaciones:
1. **Convertir a WebP** para mejor rendimiento
2. **Comprimir imágenes** sin perder calidad
3. **Usar lazy loading** para imágenes below-fold
4. **Crear versiones responsive** (móvil, tablet, desktop)

### Herramientas Sugeridas:
- TinyPNG - https://tinypng.com/
- Squoosh - https://squoosh.app/
- ImageOptim (Mac)
- RIOT (Windows)

---

## ✅ Checklist de Integración

- [x] Logo principal en navbar
- [x] Logo en favicon
- [x] Logo en footer
- [x] Logo Pemex en hero
- [x] Logo Pemex en servicios
- [x] Logo Pemex en footer
- [x] Logo HAM en marcas
- [x] Imagen 1 en hero slider
- [x] Imagen 2 en hero slider
- [x] Efectos hover en logos
- [x] Animaciones en hero
- [x] Responsive design
- [x] Página de privacidad actualizada

---

## 🎉 ¡Todo Listo!

Las imágenes están completamente integradas y funcionando. El sitio ahora tiene:
- ✅ Identidad visual completa
- ✅ Logos de marca visibles
- ✅ Imágenes reales en el slider
- ✅ Efectos y animaciones profesionales
- ✅ Diseño responsive

**Recarga la página:** http://localhost:3002
