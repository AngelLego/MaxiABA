# Solución Error 404 en Vercel

## 🔧 Cambios Realizados

### 1. Archivo `api/index.js` (NUEVO)
Punto de entrada para Vercel serverless:
```javascript
const app = require('../src/server');
module.exports = app;
```

### 2. `vercel.json` (ACTUALIZADO)
Configuración simplificada:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

### 3. `src/server.js` (ACTUALIZADO)
Modificado para no iniciar servidor en Vercel:
```javascript
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        // ...
    });
}
```

## 🚀 Pasos para Redesplegar

### 1. Commit los cambios:
```bash
git add .
git commit -m "Fix: Configuración de Vercel para resolver error 404"
git push
```

### 2. Vercel hará deploy automático

O manualmente:
```bash
vercel --prod
```

## 📋 Verificación

Después del deploy, verifica:

1. **Página principal**: `https://tu-dominio.vercel.app/`
2. **API Health**: `https://tu-dominio.vercel.app/api/health`
3. **Precios**: `https://tu-dominio.vercel.app/api/fuel-prices`
4. **Archivos estáticos**: `https://tu-dominio.vercel.app/css/styles.css`

## ⚠️ Importante

### Variables de Entorno
Asegúrate de tener configuradas en Vercel:
```
NODE_ENV=production
JWT_SECRET=tu_secreto_aqui
SESSION_SECRET=otro_secreto_aqui
PORT=3002
```

### Base de Datos
SQLite no funcionará en Vercel. Necesitas:
- Vercel Postgres
- PlanetScale (MySQL)
- Supabase (PostgreSQL)
- MongoDB Atlas

## 🔍 Debugging

Si sigue sin funcionar:

1. **Ver logs en Vercel**:
   - Ve a tu proyecto en Vercel
   - Click en "Deployments"
   - Click en el deployment activo
   - Ve a "Functions" → "Logs"

2. **Verificar build**:
   ```bash
   npm run build
   npm start
   ```

3. **Verificar rutas**:
   - Todas las rutas ahora pasan por `/api/index.js`
   - Express maneja el routing interno

## 📁 Estructura de Archivos

```
proyecto/
├── api/
│   └── index.js          ← Punto de entrada Vercel
├── src/
│   ├── server.js         ← Aplicación Express
│   ├── routes/
│   ├── controllers/
│   └── models/
├── public/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── vercel.json           ← Configuración Vercel
└── package.json
```

## ✅ Checklist

- [x] `api/index.js` creado
- [x] `vercel.json` actualizado
- [x] `src/server.js` modificado
- [ ] Cambios commiteados
- [ ] Push a repositorio
- [ ] Deploy en Vercel
- [ ] Variables de entorno configuradas
- [ ] Verificar que funciona

## 🎯 Resultado Esperado

Después de estos cambios:
- ✅ Página principal carga correctamente
- ✅ API endpoints funcionan
- ✅ Archivos estáticos se sirven
- ✅ No más error 404

---

**Fecha**: 28 de Noviembre, 2025
**Problema**: Error 404 en Vercel
**Solución**: Configuración serverless correcta
