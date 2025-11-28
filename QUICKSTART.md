# Inicio Rápido - MAXI SERVICIOS ABA

## ✅ Paso 1: Dependencias Instaladas

Ya ejecutaste `npm install` exitosamente.

## 📝 Paso 2: Configurar Base de Datos

### Opción A: Tienes MySQL instalado

1. **Asegúrate de que MySQL esté ejecutándose**

2. **Edita el archivo `.env`** (ya creado) y configura tu contraseña de MySQL:
   ```env
   DB_PASSWORD=tu_password_mysql_aqui
   ```

3. **Crea la base de datos:**
   ```bash
   npm run db:setup
   ```

4. **Inserta datos iniciales:**
   ```bash
   npm run db:seed
   ```

### Opción B: NO tienes MySQL instalado

**Instalar MySQL:**

1. Descarga MySQL Community Server desde: https://dev.mysql.com/downloads/mysql/
2. Durante la instalación, configura una contraseña para el usuario `root`
3. Asegúrate de que el servicio MySQL esté ejecutándose
4. Luego sigue los pasos de la Opción A

## 🚀 Paso 3: Ejecutar el Servidor

```bash
npm run dev
```

El servidor estará disponible en: http://localhost:3000

## 🧪 Paso 4: Ejecutar Tests (Opcional)

**IMPORTANTE:** Los tests requieren que la base de datos esté configurada.

```bash
npm test
```

## 🔍 Verificar que Funciona

### 1. Health Check
Abre en tu navegador: http://localhost:3000/api/health

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "service": "MAXI SERVICIOS ABA API"
}
```

### 2. Página Principal
Abre: http://localhost:3000

Deberías ver la página básica del sitio.

## 📋 Credenciales por Defecto

Después de ejecutar `npm run db:seed`:

- **Usuario:** admin
- **Contraseña:** Admin123!
- **Email:** buzon@maxiserviciosaba.com

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción.

## 🔧 Solución de Problemas

### Error: "Cannot connect to MySQL"

**Solución:**
1. Verifica que MySQL esté ejecutándose
2. Verifica las credenciales en `.env`
3. Asegúrate de que el puerto 3306 esté disponible

### Error: "Port 3000 already in use"

**Solución:**
Cambia el puerto en `.env`:
```env
PORT=3001
```

### Error: "Database does not exist"

**Solución:**
Ejecuta:
```bash
npm run db:setup
```

## 📚 Próximos Pasos

Una vez que el servidor esté funcionando:

1. **Probar el login:**
   ```bash
   # Usando curl o Postman
   POST http://localhost:3000/api/admin/login
   Body: {
     "username": "admin",
     "password": "Admin123!"
   }
   ```

2. **Explorar el código:**
   - `src/models/` - Modelos de datos
   - `src/controllers/` - Lógica de negocio
   - `src/routes/` - Endpoints API
   - `tests/` - Tests automatizados

3. **Continuar desarrollo:**
   - Ver `PROGRESS.md` para el estado actual
   - Ver `tasks.md` para las tareas pendientes

## 🆘 Ayuda

Si tienes problemas:
1. Revisa los logs en la consola
2. Verifica el archivo `.env`
3. Asegúrate de que MySQL esté ejecutándose
4. Consulta `INSTALLATION.md` para más detalles

## 🎯 Estado Actual del Proyecto

✅ Backend base implementado (40%)
✅ Autenticación JWT completa
✅ Modelos de base de datos
✅ Property-based tests
⏳ APIs REST (pendiente)
⏳ Frontend HTML/CSS/JS (pendiente)
⏳ Panel administrativo (pendiente)

Ver `PROGRESS.md` para más detalles.
