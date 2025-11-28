# Solución Error de Build en Vercel

## 🔧 Problema Identificado

Error: `Cannot read properties of undefined (reading 'fsPath')`

**Causa:** El script `build` intentaba ejecutar `database/init-sqlite.js` que tiene un error o depende de rutas locales.

## ✅ Solución Aplicada

### Script de Build Simplificado

Actualizado `package.json`:
```json
"scripts": {
  "build": "echo 'Build completed'"
}
```

**Razón:** 
- SQLite no funciona en Vercel (sistema de archivos efímero)
- No necesitamos inicializar BD en build time
- La BD debe ser externa (Postgres, MySQL, etc.)

## 🚀 Redesplegar Ahora

```bash
git add package.json
git commit -m "Fix: Simplificar script de build para Vercel"
git push
```

Vercel hará deploy automáticamente.

## ⚙️ Variables de Entorno Configuradas

Ya tienes configuradas:
- ✅ NODE_ENV=production
- ✅ JWT_SECRET
- ✅ SESSION_SECRET
- ✅ PORT=3002

## 🗄️ Base de Datos - IMPORTANTE

### Problema Actual:
SQLite NO funciona en Vercel porque:
- ❌ Sistema de archivos efímero
- ❌ Los datos se borran en cada deploy
- ❌ No es persistente

### Solución: Usar Base de Datos Externa

#### Opción 1: Vercel Postgres (Recomendado) ⭐

**Crear BD:**
```bash
vercel postgres create
```

**Conectar:**
1. Vercel te dará las credenciales automáticamente
2. Las variables se agregan automáticamente a tu proyecto
3. Listo para usar

**Actualizar código:**
```javascript
// src/config/database.js
const config = {
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
};
```

#### Opción 2: PlanetScale (MySQL Gratis)

1. Crea cuenta en [planetscale.com](https://planetscale.com)
2. Crea una base de datos
3. Obtén la connection string
4. Agrega variables en Vercel:
   ```
   DB_HOST=xxx.planetscale.com
   DB_NAME=tu_database
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   ```

#### Opción 3: Supabase (PostgreSQL Gratis)

1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea un proyecto
3. Ve a Settings → Database
4. Copia las credenciales
5. Agrega en Vercel:
   ```
   DB_HOST=db.xxx.supabase.co
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=tu_password
   DB_PORT=5432
   ```

## 📝 Actualizar Configuración de BD

### 1. Instalar Driver de PostgreSQL:
```bash
npm install pg pg-hstore
```

### 2. Actualizar `src/config/database.js`:
```javascript
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST || process.env.POSTGRES_HOST,
    database: process.env.DB_NAME || process.env.POSTGRES_DATABASE,
    username: process.env.DB_USER || process.env.POSTGRES_USER,
    password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};
```

### 3. Actualizar modelos para usar la configuración correcta:
```javascript
// En cada modelo
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const sequelize = new Sequelize(config);
```

## 🔄 Migrar Datos

Si tienes datos en SQLite local que quieres migrar:

### 1. Exportar datos:
```bash
sqlite3 database.sqlite .dump > backup.sql
```

### 2. Convertir a PostgreSQL:
- Usa herramientas como `pgloader`
- O manualmente ajusta el SQL

### 3. Importar a la nueva BD:
```bash
psql -h tu-host -U tu-usuario -d tu-database < backup.sql
```

## ✅ Checklist de Deploy

- [x] Script de build simplificado
- [x] Variables de entorno configuradas
- [ ] Base de datos externa configurada
- [ ] Driver de PostgreSQL instalado (si usas Postgres)
- [ ] Configuración de BD actualizada
- [ ] Cambios commiteados y pusheados
- [ ] Deploy completado
- [ ] Sitio funcionando

## 🔍 Verificar Deploy

Después del deploy:

1. **Página principal**: `https://tu-dominio.vercel.app/`
2. **Health check**: `https://tu-dominio.vercel.app/api/health`
3. **Precios** (requiere BD): `https://tu-dominio.vercel.app/api/fuel-prices`

## 📊 Logs de Vercel

Para ver qué está pasando:
1. Ve a Vercel Dashboard
2. Tu proyecto → Deployments
3. Click en el deployment activo
4. Functions → Logs

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
**Solución:** Verifica las variables de entorno de la BD

### Error: "Module 'pg' not found"
**Solución:** 
```bash
npm install pg pg-hstore
git add package.json package-lock.json
git commit -m "Add PostgreSQL driver"
git push
```

### Error: "SSL connection required"
**Solución:** Agrega `dialectOptions.ssl` en la configuración

## 📞 Próximos Pasos

1. **Ahora mismo**: Push los cambios del script de build
2. **Después**: Configurar base de datos externa
3. **Finalmente**: Migrar datos (si es necesario)

---

**Fecha**: 28 de Noviembre, 2025
**Error**: Build script failure
**Solución**: Script simplificado + BD externa requerida
**Estado**: ✅ LISTO PARA REDESPLEGAR
