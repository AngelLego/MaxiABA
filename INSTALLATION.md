# Guía de Instalación - MAXI SERVICIOS ABA

## Requisitos Previos

- Node.js 18+ instalado
- MySQL 8+ instalado y ejecutándose
- Git (opcional)

## Pasos de Instalación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Copiar el archivo de ejemplo y editarlo:

```bash
copy .env.example .env
```

Editar `.env` con tus configuraciones:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=maxi_servicios_aba
DB_USER=root
DB_PASSWORD=tu_password_mysql

# JWT
JWT_SECRET=cambia-esto-por-un-secreto-seguro-aleatorio
JWT_EXPIRES_IN=24h

# CSRF
CSRF_SECRET=cambia-esto-por-otro-secreto-seguro

# Email (Opcional)
ADMIN_EMAIL=buzon@maxiserviciosaba.com
```

### 3. Crear y Configurar Base de Datos

```bash
# Crear base de datos y tablas
npm run db:setup

# Insertar datos iniciales (administrador por defecto)
npm run db:seed
```

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `Admin123!`
- ⚠️ **IMPORTANTE:** Cambiar esta contraseña inmediatamente en producción

### 4. Ejecutar el Servidor

**Modo Desarrollo:**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

### 5. Verificar Instalación

Abrir en el navegador:
- Frontend: `http://localhost:3000`
- Health Check: `http://localhost:3000/api/health`

### 6. Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch
```

## Estructura de Archivos Creados

```
✅ Backend Completo:
├── src/
│   ├── server.js                    # Servidor Express
│   ├── config/database.js           # Configuración DB
│   ├── models/                      # Modelos Sequelize
│   │   ├── Administrator.js         # ✅ Con hashing bcrypt
│   │   ├── FuelPrice.js            # ✅ Con validaciones
│   │   ├── Promotion.js            # ✅ Con filtrado de fechas
│   │   ├── ContactMessage.js       # ✅ Con validación de email
│   │   ├── SiteStatistic.js        # ✅ Con métodos de incremento
│   │   └── index.js                # Relaciones
│   ├── controllers/
│   │   └── authController.js       # ✅ Login/Logout/Verify
│   ├── middleware/
│   │   ├── auth.js                 # ✅ JWT authentication
│   │   └── rateLimiter.js          # ✅ Protección brute force
│   ├── routes/
│   │   └── authRoutes.js           # ✅ Rutas de autenticación
│   └── utils/
│       └── jwt.js                  # ✅ Generación/verificación tokens

✅ Base de Datos:
├── database/
│   ├── migrations/                  # ✅ 5 tablas SQL
│   ├── setup.js                    # ✅ Script de instalación
│   └── seed.js                     # ✅ Datos iniciales

✅ Tests (Property-Based):
├── tests/
│   ├── models/
│   │   ├── Administrator.property.test.js  # ✅ Password hashing
│   │   └── Promotion.property.test.js      # ✅ Date filtering
│   ├── middleware/
│   │   └── auth.property.test.js           # ✅ Authentication
│   └── controllers/
│       └── authController.property.test.js # ✅ Secure cookies

✅ Frontend Base:
├── public/
│   ├── index.html                  # ✅ HTML base
│   ├── css/styles.css              # ✅ CSS base
│   ├── js/app.js                   # ✅ JS base
│   └── uploads/                    # Directorio para imágenes

✅ Configuración:
├── package.json                    # ✅ Dependencias
├── .env.example                    # ✅ Variables de entorno
├── .gitignore                      # ✅ Git ignore
├── jest.config.js                  # ✅ Configuración tests
└── README.md                       # ✅ Documentación
```

## Próximos Pasos

El proyecto tiene la base completa. Para continuar el desarrollo:

1. **Implementar APIs de Precios y Promociones** (Tarea 4)
2. **Agregar Seguridad CSRF y XSS** (Tarea 5)
3. **Construir Frontend HTML** (Tarea 6)
4. **Agregar Estilos y Micro-interacciones** (Tarea 7)
5. **Implementar JavaScript Frontend** (Tarea 8)
6. **Crear Panel Administrativo** (Tarea 9)

## Solución de Problemas

### Error de Conexión a MySQL
```
Error: ER_ACCESS_DENIED_ERROR
```
**Solución:** Verificar credenciales en `.env`

### Puerto 3000 en Uso
```
Error: EADDRINUSE
```
**Solución:** Cambiar `PORT` en `.env` o cerrar la aplicación que usa el puerto

### Tests Fallan
```
Error: Cannot find module
```
**Solución:** Ejecutar `npm install` nuevamente

## Soporte

Para problemas o preguntas:
- Email: buzon@maxiserviciosaba.com
- Teléfono: (271) 736-9105
