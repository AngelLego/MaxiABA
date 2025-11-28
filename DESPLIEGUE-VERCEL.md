# Guía de Despliegue en Vercel - MAXI SERVICIOS ABA

## 📋 Archivos de Configuración Creados

### 1. `vercel.json`
Configuración principal de Vercel con:
- Build configuration para Node.js
- Rutas estáticas para archivos públicos
- Rutas dinámicas para API y admin
- Variables de entorno

### 2. `.vercelignore`
Archivos excluidos del despliegue:
- node_modules
- Tests y coverage
- Archivos de desarrollo
- Documentación

### 3. `package.json` (actualizado)
- Script `build` agregado para inicializar la BD

## 🚀 Pasos para Desplegar

### Opción 1: Desde la CLI de Vercel

1. **Instalar Vercel CLI** (si no lo tienes):
```bash
npm install -g vercel
```

2. **Login en Vercel**:
```bash
vercel login
```

3. **Desplegar**:
```bash
vercel
```

4. **Desplegar a producción**:
```bash
vercel --prod
```

### Opción 2: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente la configuración
5. Click en "Deploy"

## ⚙️ Variables de Entorno en Vercel

Debes configurar estas variables en el dashboard de Vercel:

### Variables Requeridas:
```
NODE_ENV=production
PORT=3002
JWT_SECRET=tu_secreto_jwt_aqui
SESSION_SECRET=tu_secreto_session_aqui
```

### Variables Opcionales:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=maxi_servicios_aba
DB_DIALECT=sqlite
```

### Cómo agregar variables:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable con su valor
4. Guarda y redeploy

## 📦 Estructura de Despliegue

```
vercel.json
├── builds
│   ├── Node.js (src/server.js)
│   └── Static (public/**)
└── routes
    ├── /css/* → public/css/*
    ├── /js/* → public/js/*
    ├── /images/* → public/images/*
    ├── /api/* → server.js
    ├── /admin* → server.js
    └── /* → server.js
```

## ⚠️ Warnings de Dependencias

Los warnings que ves son normales y no afectan el despliegue:

### Deprecation Warnings:
- `@npmcli/move-file@1.1.2` - Funcionalidad movida
- `rimraf@3.0.2` - Versión antigua
- `glob@7.2.3` - Versión antigua
- `supertest@6.3.4` - Solo para desarrollo
- `csurf@1.11.0` - Archivado pero funcional
- `multer@1.4.5` - Vulnerabilidades en 1.x

### Solución (Opcional):
Si quieres eliminar los warnings, actualiza las dependencias:

```bash
npm update
npm install multer@latest
npm install supertest@latest
```

## 🔧 Solución de Problemas

### Error: "Build failed"
**Solución:**
```bash
# Verifica que el build funcione localmente
npm run build
npm start
```

### Error: "Module not found"
**Solución:**
- Verifica que todas las dependencias estén en `dependencies` (no en `devDependencies`)
- Ejecuta `npm install` localmente

### Error: "Database connection failed"
**Solución:**
- Vercel usa sistema de archivos efímero
- SQLite funciona pero los datos se pierden en cada deploy
- **Recomendación:** Usar base de datos externa (PostgreSQL, MySQL, MongoDB)

## 🗄️ Base de Datos en Producción

### Problema con SQLite en Vercel:
- ❌ Los archivos se borran en cada deploy
- ❌ No es persistente
- ❌ No recomendado para producción

### Soluciones Recomendadas:

#### 1. **Vercel Postgres** (Recomendado)
```bash
vercel postgres create
```

#### 2. **PlanetScale** (MySQL)
- Gratis hasta 5GB
- Compatible con Sequelize
- [planetscale.com](https://planetscale.com)

#### 3. **Supabase** (PostgreSQL)
- Gratis hasta 500MB
- Compatible con Sequelize
- [supabase.com](https://supabase.com)

#### 4. **MongoDB Atlas**
- Gratis hasta 512MB
- Requiere cambiar a Mongoose
- [mongodb.com/atlas](https://mongodb.com/atlas)

### Migrar a PostgreSQL:

1. **Actualizar package.json**:
```json
"dependencies": {
  "pg": "^8.11.3",
  "pg-hstore": "^2.3.4"
}
```

2. **Actualizar config/database.js**:
```javascript
dialect: 'postgres',
host: process.env.DB_HOST,
database: process.env.DB_NAME,
username: process.env.DB_USER,
password: process.env.DB_PASSWORD,
```

3. **Variables de entorno en Vercel**:
```
DB_HOST=tu-host.postgres.vercel-storage.com
DB_NAME=verceldb
DB_USER=default
DB_PASSWORD=tu-password
```

## 📊 Monitoreo

### Logs en Vercel:
1. Ve a tu proyecto
2. Click en "Deployments"
3. Click en el deployment activo
4. Ve a "Functions" → "Logs"

### Analytics:
- Vercel Analytics está disponible en el plan Pro
- Muestra métricas de rendimiento y uso

## 🔄 Actualización Continua

### Deploy Automático:
Vercel hace deploy automático cuando:
- Haces push a la rama principal (main/master)
- Creas un pull request (preview deployment)

### Deploy Manual:
```bash
vercel --prod
```

## ✅ Checklist de Despliegue

- [ ] `vercel.json` creado
- [ ] `.vercelignore` creado
- [ ] Script `build` en package.json
- [ ] Variables de entorno configuradas
- [ ] Base de datos configurada (externa recomendada)
- [ ] Archivos estáticos en `/public`
- [ ] Rutas API funcionando
- [ ] Tests pasando localmente
- [ ] Build exitoso localmente

## 🎯 Comandos Útiles

```bash
# Ver logs en tiempo real
vercel logs

# Ver información del proyecto
vercel inspect

# Eliminar deployment
vercel remove [deployment-url]

# Ver lista de deployments
vercel ls

# Promover deployment a producción
vercel promote [deployment-url]
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica las variables de entorno
3. Consulta la documentación: [vercel.com/docs](https://vercel.com/docs)
4. Comunidad: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Nota Importante:** Los warnings de dependencias deprecadas no afectan el funcionamiento del sitio. Son solo avisos de que existen versiones más nuevas disponibles.

**Fecha**: 28 de Noviembre, 2025
**Desarrollado por**: Kiro AI Assistant
