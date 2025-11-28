# 🎨 Nueva Paleta de Colores - MAXI SERVICIOS ABA

## ✅ Paleta Actualizada

Se ha actualizado completamente la paleta de colores del sitio web para reflejar mejor la identidad de una gasolinera profesional, inspirada en los colores de Pemex.

---

## 🎨 Colores Principales

### 1. **Azul Pemex (Primary)**
```css
--primary-color: #003DA5
--primary-dark: #002870
```
**Uso:**
- Navbar (gradiente)
- Títulos principales
- Iconos de servicios
- Enlaces
- Botones primarios
- Footer

**Inspiración:** Azul característico de Pemex

---

### 2. **Rojo Pemex (Secondary)**
```css
--secondary-color: #E31E24
--secondary-dark: #B71C1C
```
**Uso:**
- Tarjeta de combustible Premium
- Acentos en títulos
- Iconos destacados
- Hover effects
- Borde de info bar

**Inspiración:** Rojo característico de Pemex

---

### 3. **Verde (Success)**
```css
--success-color: #25d366
```
**Uso:**
- Botón WhatsApp
- Tarjeta de combustible Magna
- Mensajes de éxito

**Inspiración:** Verde WhatsApp y gasolina Magna

---

### 4. **Amarillo (Warning)**
```css
--warning-color: #FFC107
```
**Uso:**
- Alertas
- Destacados especiales

---

### 5. **Oscuro (Dark)**
```css
--dark-color: #212529
```
**Uso:**
- Tarjeta de combustible Diésel
- Textos
- Footer (gradiente)

---

### 6. **Gris (Gray)**
```css
--gray-color: #6c757d
```
**Uso:**
- Textos secundarios
- Bordes sutiles

---

### 7. **Claro (Light)**
```css
--light-color: #f8f9fa
```
**Uso:**
- Fondos de secciones
- Tarjetas

---

## 🎯 Aplicación de Colores

### Navbar
```css
background: linear-gradient(135deg, #003DA5 0%, #002870 100%)
```
- Gradiente azul oscuro
- Sombra más pronunciada
- Logo blanco destacado

### Títulos de Secciones
```css
background: linear-gradient(135deg, #003DA5 0%, #E31E24 100%)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```
- Gradiente azul a rojo
- Efecto de texto degradado
- Iconos en colores sólidos

### Botones Primarios
```css
background: linear-gradient(135deg, #003DA5 0%, #002870 100%)
```
- Gradiente azul
- Sin bordes
- Hover invierte el gradiente

### Tarjetas de Precios

**Magna (Verde):**
```css
background: linear-gradient(135deg, #198754 0%, #146c43 100%)
```

**Premium (Rojo):**
```css
background: linear-gradient(135deg, #E31E24 0%, #B71C1C 100%)
```

**Diésel (Negro):**
```css
background: linear-gradient(135deg, #212529 0%, #495057 100%)
```

### Precio Value
```css
background: linear-gradient(135deg, #003DA5 0%, #E31E24 100%)
-webkit-background-clip: text
```
- Gradiente azul a rojo en el texto del precio
- Efecto visual impactante

### Info Bar
```css
background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)
border-bottom: 3px solid #E31E24
```
- Fondo gris claro con gradiente
- Borde rojo inferior

### Footer
```css
background: linear-gradient(135deg, #002870 0%, #212529 100%)
```
- Gradiente azul oscuro a negro
- Texto blanco

---

## 🎨 Efectos Visuales

### Hover en Tarjetas
```css
border-color: #003DA5
box-shadow: 0 15px 35px rgba(0,0,0,0.2)
```

### Hover en Iconos de Servicios
```css
color: #E31E24
transform: scale(1.1)
```

### Hover en Enlaces
```css
color: #E31E24
```

### Hover en Botones
```css
transform: translateY(-2px)
box-shadow: 0 4px 12px rgba(0,0,0,0.3)
```

---

## 📱 Responsive

Los colores se mantienen consistentes en todos los tamaños de pantalla:
- ✅ Móvil (< 768px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (> 1024px)

---

## 🎯 Elementos Actualizados

### Página Principal
- [x] Navbar con gradiente azul
- [x] Títulos con gradiente azul-rojo
- [x] Info bar con borde rojo
- [x] Tarjetas de precios con colores específicos
- [x] Iconos de servicios en azul
- [x] Hover effects en rojo
- [x] Footer con gradiente oscuro

### Página de Privacidad
- [x] Navbar con gradiente azul
- [x] Título con gradiente
- [x] Botón con gradiente azul
- [x] Footer con gradiente oscuro

---

## 🔧 Cómo Personalizar

### Cambiar Color Principal
Edita en `public/css/styles.css`:
```css
:root {
    --primary-color: #TU_COLOR_AQUI;
}
```

### Cambiar Color Secundario
```css
:root {
    --secondary-color: #TU_COLOR_AQUI;
}
```

### Cambiar Gradientes
Busca en los archivos:
```css
background: linear-gradient(135deg, COLOR1 0%, COLOR2 100%)
```

---

## 🎨 Paleta Completa (Código Hex)

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| Azul Pemex | `#003DA5` | `0, 61, 165` | Principal |
| Azul Oscuro | `#002870` | `0, 40, 112` | Oscuro |
| Rojo Pemex | `#E31E24` | `227, 30, 36` | Secundario |
| Rojo Oscuro | `#B71C1C` | `183, 28, 28` | Oscuro |
| Verde WhatsApp | `#25d366` | `37, 211, 102` | Success |
| Amarillo | `#FFC107` | `255, 193, 7` | Warning |
| Negro | `#212529` | `33, 37, 41` | Dark |
| Gris | `#6c757d` | `108, 117, 125` | Gray |
| Blanco Roto | `#f8f9fa` | `248, 249, 250` | Light |

---

## 🌐 Ver los Cambios

**Abre tu navegador en:** http://localhost:3002

### Verás:
1. ✅ **Navbar azul** con gradiente
2. ✅ **Títulos con gradiente** azul-rojo
3. ✅ **Tarjetas de precios** con colores específicos:
   - Magna: Verde
   - Premium: Rojo
   - Diésel: Negro
4. ✅ **Iconos azules** que cambian a rojo al hover
5. ✅ **Info bar** con borde rojo
6. ✅ **Footer oscuro** con gradiente
7. ✅ **Botones** con gradientes azules

---

## 💡 Inspiración de Diseño

La paleta está inspirada en:
- ✅ **Pemex** - Colores corporativos (azul y rojo)
- ✅ **Profesionalismo** - Azul transmite confianza
- ✅ **Energía** - Rojo transmite dinamismo
- ✅ **Modernidad** - Gradientes y efectos suaves

---

## 🎉 Resultado

El sitio ahora tiene:
- ✅ **Identidad visual fuerte** con colores de Pemex
- ✅ **Contraste adecuado** para legibilidad
- ✅ **Gradientes modernos** en elementos clave
- ✅ **Efectos hover** con cambios de color
- ✅ **Consistencia** en todas las páginas
- ✅ **Accesibilidad** mantenida (WCAG AA)

---

## 📊 Comparación

### Antes:
- Azul Bootstrap genérico (#0d6efd)
- Colores estándar
- Sin gradientes

### Ahora:
- Azul Pemex (#003DA5)
- Rojo Pemex (#E31E24)
- Gradientes en navbar, botones, títulos
- Efectos hover con cambios de color
- Identidad visual única

---

**¡La paleta de colores está completamente actualizada!** 🎨

Recarga la página para ver todos los cambios: http://localhost:3002
