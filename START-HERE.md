# 🚀 Inicio Rápido - MAXI SERVICIOS ABA

## ✅ Instalación en 3 Pasos

### Paso 1: Instalar Dependencias

```bash
npm install
```

### Paso 2: Inicializar Base de Datos (SQLite)

```bash
npm run db:init
```

Esto creará automáticamente:
- ✅ Base de datos SQLite local (database.sqlite)
- ✅ Todas las tablas necesarias
- ✅ Usuario administrador por defecto
- ✅ Precios de combustible de ejemplo
- ✅ Una promoción de muestra

### Paso 3: Ejecutar el Servidor

```bash
npm run dev
```

## 🎉 ¡Listo!

El servidor estará ejecutándose en: **http://localhost:3000**

### Verificar que Funciona

1. **Health Check:** http://localhost:3000/api/health
2. **Página Principal:** http://localhost:3000

## 🔐 Credenciales por Defecto

- **Usuario:** `admin`
- **Contraseña:** `Admin123!`
- **Email:** `buzon@maxiserviciosaba.com`

⚠️ **Cambia estas credenciales en producción**

## 🧪 Probar el Login

### Usando curl (Windows PowerShell):

```powershell
$body = @{
    username = "admin"
    password = "Admin123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/admin/login" -Method POST -Body $body -ContentType "application/json"
```

### Usando Postman o Thunder Client:

```
POST http://localhost:3000/api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin123!"
}
```

Deberías recibir un token JWT en la respuesta.

## 📊 Datos de Ejemplo Incluidos

Después de `npm run db:init`, tendrás:

### Precios de Combustible:
- Magna: $21.50
- Premium: $23.80
- Diésel: $22.30

### Promoción de Ejemplo:
- Título: "Promoción de Bienvenida"
- Válida por 1 mes

### Estadísticas Inicializadas:
- page_view: 0
- whatsapp_click: 0
- price_view: 0

## 🔧 Comandos Disponibles

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start

# Tests
npm test

# Tests en modo watch
npm run test:watch

# Reinicializar base de datos (⚠️ borra todos los datos)
npm run db:init
```

## 📁 Archivos Importantes

- `.env` - Configuración (ya creado)
- `database.sqlite` - Base de datos (se crea automáticamente)
- `src/server.js` - Servidor principal
- `src/models/` - Modelos de datos
- `src/controllers/` - Lógica de negocio
- `src/routes/` - Endpoints API

## 🌐 Base de Datos en Línea (Opcional)

Si quieres usar MySQL en línea en lugar de SQLite:

1. **Crea una cuenta gratuita en:**
   - https://www.freemysqlhosting.net/
   - O https://db4free.net/

2. **Edita `.env`:**
   ```env
   DB_DIALECT=mysql
   DB_HOST=tu-host.db4free.net
   DB_PORT=3306
   DB_NAME=tu_database
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   ```

3. **Ejecuta:**
   ```bash
   npm run db:setup
   npm run db:seed
   ```

## 🎯 Próximos Pasos

1. ✅ Servidor funcionando
2. ✅ Base de datos inicializada
3. ✅ Autenticación lista

**Ahora puedes:**
- Explorar el código en `src/`
- Ver las tareas pendientes en `.kiro/specs/gasolinera-website/tasks.md`
- Revisar el progreso en `PROGRESS.md`
- Continuar con el desarrollo del frontend

## 🆘 Solución de Problemas

### Error: "Cannot find module 'sqlite3'"

**Solución:**
```bash
npm install
```

### Error: "Port 3000 already in use"

**Solución:**
Edita `.env` y cambia el puerto:
```env
PORT=3001
```

### Quiero empezar de cero

**Solución:**
```bash
# Elimina la base de datos
del database.sqlite

# Reinicializa
npm run db:init
```

## 📚 Documentación Adicional

- `QUICKSTART.md` - Guía rápida
- `INSTALLATION.md` - Instalación detallada
- `PROGRESS.md` - Estado del proyecto
- `README.md` - Documentación completa

## 💡 Consejos

1. **SQLite es perfecto para desarrollo** - No necesitas instalar MySQL
2. **Los cambios se guardan automáticamente** - Usa `npm run dev` para auto-reload
3. **Los tests funcionan con SQLite** - Ejecuta `npm test` cuando quieras
4. **Cambia a MySQL cuando despliegues** - Solo edita `.env`

---

**¿Todo funcionando?** 🎉

Ahora puedes empezar a desarrollar. El backend está listo con:
- ✅ Autenticación JWT
- ✅ Base de datos configurada
- ✅ Modelos y validaciones
- ✅ Tests automatizados
- ✅ API REST base

**Siguiente paso:** Implementar las APIs de precios, promociones y contacto (ver `tasks.md`)
