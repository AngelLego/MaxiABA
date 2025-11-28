# Vercel - Inicio Rápido

## ⚡ Despliegue Rápido

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Desplegar
```bash
vercel --prod
```

## 🔑 Variables de Entorno (IMPORTANTE)

Configura estas variables en Vercel Dashboard:

```
NODE_ENV=production
PORT=3002
JWT_SECRET=tu_secreto_super_seguro_aqui
SESSION_SECRET=otro_secreto_super_seguro_aqui
```

## ⚠️ Sobre los Warnings

Los warnings que ves son **NORMALES** y **NO SON ERRORES**:

- ✅ El sitio funcionará correctamente
- ✅ Son solo avisos de versiones antiguas
- ✅ No afectan el despliegue
- ✅ Puedes ignorarlos de momento

## 🗄️ Base de Datos

**IMPORTANTE:** SQLite no es persistente en Vercel.

### Opciones:
1. **Vercel Postgres** (Recomendado)
2. **PlanetScale** (MySQL gratis)
3. **Supabase** (PostgreSQL gratis)

## 📁 Archivos Creados

- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.vercelignore` - Archivos a ignorar
- ✅ `package.json` - Script build agregado

## 🚀 Listo!

Tu sitio está configurado para Vercel. Solo ejecuta:

```bash
vercel --prod
```

---

**Más información:** Ver `DESPLIEGUE-VERCEL.md`
