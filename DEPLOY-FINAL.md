# 🚀 Deploy Final - Pasos Simples

## ✅ Problema Resuelto

El error de build está solucionado. Script simplificado en `package.json`.

## 📝 Deploy Ahora

```bash
git add .
git commit -m "Fix: Build script para Vercel"
git push
```

## ⚠️ IMPORTANTE - Base de Datos

**SQLite NO funciona en Vercel.**

Necesitas configurar una base de datos externa:

### Opción Más Fácil: Vercel Postgres

```bash
vercel postgres create
```

Esto:
- ✅ Crea la BD automáticamente
- ✅ Configura las variables de entorno
- ✅ Se integra con tu proyecto

### Después de crear la BD:

1. **Instala el driver**:
```bash
npm install pg pg-hstore
git add package.json package-lock.json
git commit -m "Add PostgreSQL driver"
git push
```

2. **Actualiza `src/config/database.js`**:
```javascript
production: {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
```

3. **Push los cambios**:
```bash
git add .
git commit -m "Configure PostgreSQL for production"
git push
```

## 🔍 Verificar

Después del deploy:
- `https://tu-dominio.vercel.app/` → Página principal
- `https://tu-dominio.vercel.app/api/health` → Health check

## 📊 Estado Actual

- ✅ Configuración de Vercel correcta
- ✅ Variables de entorno configuradas
- ✅ Script de build arreglado
- ⚠️ Base de datos externa pendiente

## 🎯 Resultado

El sitio cargará, pero las funciones que usan BD (precios, contacto, etc.) no funcionarán hasta que configures la BD externa.

---

**Siguiente paso:** Configurar Vercel Postgres
