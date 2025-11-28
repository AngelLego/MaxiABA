# Design Document

## Overview

El sitio web de la gasolinera será una aplicación web moderna de arquitectura cliente-servidor que combina un frontend responsivo con micro-interacciones fluidas y un backend robusto con panel administrativo. El sistema priorizará rendimiento, seguridad y experiencia de usuario, utilizando tecnologías web estándar optimizadas para carga rápida y accesibilidad.

La arquitectura seguirá el patrón MVC (Model-View-Controller) con separación clara entre presentación, lógica de negocio y datos. El frontend será una SPA (Single Page Application) ligera con navegación fluida, mientras el backend expondrá una API RESTful para operaciones CRUD y consultas.

### Business Information

**Empresa:** MAXI SERVICIOS ABA, S. DE R.L. DE C.V.  
**Nombre Comercial:** MAXI SERVICIOS ABA  
**Dirección:** Calzada Morelos No. 4805 Col. Santa Matilde C.P. 94533 Córdoba, Veracruz, México  
**Sitio Web:** https://maxiserviciosaba.com/  
**Teléfono:** (271) 736-9105  
**Email de Contacto:** buzon@maxiserviciosaba.com  
**Responsable de Datos Personales:** Verónica Garrido Martínez

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Client)                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │  HTML5 + CSS3 + Vanilla JavaScript                 │ │
│  │  - Bootstrap 5 / Tailwind CSS                      │ │
│  │  - AOS (Animate On Scroll)                         │ │
│  │  - Swiper.js (Sliders)                             │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS / REST API
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Server)                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │  PHP (Laravel) / Node.js (Express)                 │ │
│  │  - Authentication Middleware                       │ │
│  │  - API Controllers                                 │ │
│  │  - Business Logic Services                         │ │
│  │  - Data Validation Layer                           │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                DATABASE (MySQL/PostgreSQL)               │
│  - fuel_prices                                          │
│  - promotions                                           │
│  - administrators                                       │
│  - contact_messages                                     │
│  - site_statistics                                      │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- CSS Framework: Bootstrap 5 o Tailwind CSS
- Micro-interactions: AOS.js, Animate.css, CSS Transitions
- Slider: Swiper.js
- Maps: Google Maps JavaScript API
- Icons: Font Awesome o Bootstrap Icons

**Backend:**
- PHP 8+ con Laravel 10+ (opción recomendada)
- Alternativa: Node.js 18+ con Express.js
- Authentication: Laravel Sanctum / JWT
- Validation: Laravel Validator / Express-validator

**Database:**
- MySQL 8+ o PostgreSQL 14+
- ORM: Eloquent (Laravel) / Sequelize (Node.js)

**Security:**
- SSL/TLS Certificate (Let's Encrypt)
- Password Hashing: bcrypt
- CSRF Protection: Laravel built-in / csurf middleware
- XSS Prevention: Input sanitization, Content Security Policy

**Deployment:**
- Web Server: Nginx o Apache
- Hosting: VPS (DigitalOcean, Linode) o Shared Hosting
- CDN: Cloudflare (opcional para assets estáticos)

## Components and Interfaces

### Frontend Components

#### 1. Navigation Component
- **Responsibility:** Menú principal con enlaces a secciones
- **Features:** Responsive hamburger menu, active state indicator, smooth scroll
- **Micro-interactions:** Hover effects, active indicator animation

#### 2. Hero/Banner Component
- **Responsibility:** Slider principal con imágenes promocionales
- **Features:** Auto-play, navigation dots, swipe support
- **Library:** Swiper.js
- **Micro-interactions:** Fade/slide transitions

#### 3. Fuel Prices Component
- **Responsibility:** Mostrar precios actuales de combustibles
- **Data Source:** API endpoint `/api/fuel-prices`
- **Features:** Auto-refresh, last update timestamp
- **Micro-interactions:** Price change highlight animation, tooltip on hover

#### 4. Services Grid Component
- **Responsibility:** Catálogo de servicios con imágenes
- **Layout:** CSS Grid o Flexbox responsive
- **Micro-interactions:** Card elevation on hover, image zoom, icon animation

#### 5. Promotions Component
- **Responsibility:** Lista de promociones vigentes
- **Data Source:** API endpoint `/api/promotions`
- **Features:** Filter by active dates
- **Micro-interactions:** Card pop entrance, brightness transition on hover

#### 6. Location & Contact Component
- **Responsibility:** Mapa, información de contacto y formulario
- **Features:** Google Maps embed, WhatsApp link, contact form
- **Micro-interactions:** WhatsApp button bounce, form field focus effects, validation animations

#### 7. Contact Form Component
- **Responsibility:** Captura de mensajes de usuarios
- **Validation:** Real-time email/phone format validation
- **API Endpoint:** POST `/api/contact`
- **Features:** Privacy consent checkbox (required), marketing consent checkbox (optional)
- **Micro-interactions:** Border color change, success/error icons with animation

#### 8. Privacy Policy Component
- **Responsibility:** Mostrar aviso de privacidad completo
- **Content:** Company information, data collection purposes, ARCO rights, contact information
- **Features:** Structured sections, downloadable PDF version (optional)
- **Legal Compliance:** Mexican data protection law (LFPDPPP)

### Backend Components

#### 1. Authentication Controller
- **Endpoints:**
  - POST `/api/admin/login` - Administrator login
  - POST `/api/admin/logout` - Session termination
  - GET `/api/admin/verify` - Token verification
- **Security:** Rate limiting, session management

#### 2. Fuel Prices Controller
- **Endpoints:**
  - GET `/api/fuel-prices` - Retrieve current prices (public)
  - PUT `/api/admin/fuel-prices` - Update prices (authenticated)
- **Validation:** Numeric values, positive numbers

#### 3. Promotions Controller
- **Endpoints:**
  - GET `/api/promotions` - List active promotions (public)
  - GET `/api/admin/promotions` - List all promotions (authenticated)
  - POST `/api/admin/promotions` - Create promotion (authenticated)
  - PUT `/api/admin/promotions/:id` - Update promotion (authenticated)
  - DELETE `/api/admin/promotions/:id` - Delete promotion (authenticated)
- **Validation:** Required fields, date ranges, image upload

#### 4. Contact Controller
- **Endpoints:**
  - POST `/api/contact` - Submit contact form (public)
- **Validation:** Email format, required fields, message length
- **Features:** Email notification to admin, spam protection

#### 5. Statistics Controller
- **Endpoints:**
  - GET `/api/admin/statistics` - Retrieve site metrics (authenticated)
- **Metrics:** Page views, WhatsApp clicks, price views

#### 6. Admin Panel Views
- **Pages:**
  - Dashboard with statistics
  - Fuel prices management
  - Promotions management (CRUD interface)
- **Features:** Toast notifications, form validation, data tables

## Data Models

### 1. Administrator Model

```javascript
{
  id: Integer (Primary Key),
  username: String (Unique, Required),
  email: String (Unique, Required),
  password_hash: String (Required),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### 2. FuelPrice Model

```javascript
{
  id: Integer (Primary Key),
  fuel_type: Enum['magna', 'premium', 'diesel'] (Required),
  price: Decimal(10,2) (Required),
  updated_at: Timestamp,
  updated_by: Integer (Foreign Key -> administrators.id)
}
```

### 3. Promotion Model

```javascript
{
  id: Integer (Primary Key),
  title: String (Required, Max: 200),
  description: Text (Required),
  image_url: String (Optional),
  valid_from: Date (Required),
  valid_until: Date (Required),
  is_active: Boolean (Default: true),
  created_at: Timestamp,
  updated_at: Timestamp,
  created_by: Integer (Foreign Key -> administrators.id)
}
```

### 4. ContactMessage Model

```javascript
{
  id: Integer (Primary Key),
  name: String (Required, Max: 100),
  email: String (Required, Max: 150),
  phone: String (Optional, Max: 20),
  message: Text (Required, Max: 1000),
  privacy_consent: Boolean (Required, Default: false),
  marketing_consent: Boolean (Default: false),
  ip_address: String (Optional),
  created_at: Timestamp,
  is_read: Boolean (Default: false)
}
```

### 5. SiteStatistic Model

```javascript
{
  id: Integer (Primary Key),
  metric_name: String (Required), // 'page_view', 'whatsapp_click', 'price_view'
  metric_value: Integer (Default: 0),
  date: Date (Required),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Database Relationships

- `fuel_prices.updated_by` → `administrators.id` (Many-to-One)
- `promotions.created_by` → `administrators.id` (Many-to-One)

### Indexes

- `fuel_prices`: Index on `fuel_type` for fast lookups
- `promotions`: Index on `is_active`, `valid_from`, `valid_until` for filtering
- `site_statistics`: Composite index on `metric_name` and `date`



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Button hover effects consistency
*For any* button element in the system, when a user hovers over it, the element should apply CSS transitions for color, shadow, and scale transformation.
**Validates: Requirements 2.1**

### Property 2: Card elevation on hover
*For any* service or promotion card, when a user hovers over it, the card should apply an elevation transform with smooth transition.
**Validates: Requirements 2.3**

### Property 3: Active menu indicator
*For any* navigation menu item that is marked as active, the system should display a visual indicator.
**Validates: Requirements 2.4**

### Property 4: Fuel type tooltip display
*For any* fuel type element, when a user hovers over it, a tooltip with explanation should be displayed.
**Validates: Requirements 3.3**

### Property 5: Current prices retrieval
*For any* request to the prices endpoint, the system should return the most recently updated fuel prices from the database.
**Validates: Requirements 3.4**

### Property 6: Form validation behavior
*For any* form input with validation rules, when a user submits invalid data, the system should reject the submission and display error feedback, and when valid data is submitted, the system should accept it.
**Validates: Requirements 5.6**

### Property 7: Active promotions filtering
*For any* set of promotions in the database, when the promotions endpoint is called, only promotions where the current date falls between valid_from and valid_until and is_active is true should be returned.
**Validates: Requirements 6.1**

### Property 8: Promotion display completeness
*For any* promotion displayed to users, the rendered output should include title, description, validity period, and image (if present).
**Validates: Requirements 6.4**

### Property 9: Authentication requirement
*For any* request to admin panel endpoints without valid authentication credentials, the system should deny access and return an unauthorized error.
**Validates: Requirements 7.1**

### Property 10: CRUD operations availability
*For any* authenticated administrator, the system should provide create, read, update, and delete operations for fuel prices.
**Validates: Requirements 7.2**

### Property 11: Timestamp on price updates
*For any* fuel price update operation, the system should record the current timestamp in the updated_at field.
**Validates: Requirements 7.3**

### Property 12: Promotion CRUD operations
*For any* authenticated administrator, the system should provide create, read, update, and delete operations for promotions.
**Validates: Requirements 8.1**

### Property 13: Promotion creation validation
*For any* promotion creation request, if title, description, or validity dates are missing, the system should reject the request with a validation error.
**Validates: Requirements 8.2**

### Property 14: Image format optimization
*For any* image served by the system, it should be in an optimized format such as WebP, JPEG, or PNG with appropriate compression.
**Validates: Requirements 10.2**

### Property 15: Responsive layout adaptation
*For any* viewport size, the system should render a layout that adapts appropriately to the screen dimensions without horizontal scrolling or broken layouts.
**Validates: Requirements 10.4**

### Property 16: Accessibility contrast compliance
*For any* interactive element, the color contrast ratio between text and background should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).
**Validates: Requirements 10.5**

### Property 17: HTTPS enforcement
*For any* page request, the system should serve content over HTTPS protocol with a valid SSL certificate.
**Validates: Requirements 11.1**

### Property 18: Password hashing
*For any* administrator password stored in the database, it should be hashed using bcrypt or equivalent secure algorithm, never stored in plaintext.
**Validates: Requirements 11.2**

### Property 19: CSRF token validation
*For any* form submission, the system should validate the presence and correctness of a CSRF token, rejecting requests without valid tokens.
**Validates: Requirements 11.3**

### Property 20: XSS input sanitization
*For any* user input processed by the system, dangerous script tags and executable code should be sanitized or escaped before storage or display.
**Validates: Requirements 11.4**

### Property 21: Secure cookie attributes
*For any* authentication cookie set by the system, it should have the Secure, HttpOnly, and SameSite attributes properly configured.
**Validates: Requirements 11.5**

### Property 22: Email format validation
*For any* email address entered in a form field, the system should validate it against standard email format patterns (RFC 5322) and provide real-time feedback.
**Validates: Requirements 12.1**

### Property 23: Required field validation
*For any* form with required fields, when a user attempts to submit with empty required fields, the system should prevent submission and highlight the missing fields.
**Validates: Requirements 12.5**

### Property 24: Privacy consent requirement
*For any* contact form submission, the system should require that the privacy consent checkbox is checked, rejecting submissions without explicit consent.
**Validates: Requirements 13.3**

### Property 25: ARCO rights information display
*For any* privacy policy page view, the system should display complete information about data collection purposes, personal data types, and ARCO rights procedures.
**Validates: Requirements 13.2, 13.4, 13.5**

## Error Handling

### Frontend Error Handling

**Network Errors:**
- Display user-friendly messages when API calls fail
- Implement retry logic for transient failures
- Show offline indicator when network is unavailable
- Cache last known fuel prices for offline viewing

**Validation Errors:**
- Display inline error messages near invalid fields
- Use color coding (red) and icons for visual feedback
- Prevent form submission until all errors are resolved
- Clear errors when user corrects input

**Loading States:**
- Show skeleton loaders or spinners during data fetching
- Disable buttons during submission to prevent double-clicks
- Provide feedback for long-running operations

### Backend Error Handling

**API Error Responses:**
```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": ["Email format is invalid"],
      "price": ["Price must be a positive number"]
    }
  }
}
```

**Error Categories:**
- `400 Bad Request` - Validation errors, malformed requests
- `401 Unauthorized` - Authentication required or failed
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Business logic validation failed
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Unexpected server errors

**Error Logging:**
- Log all errors with timestamp, user context, and stack trace
- Use structured logging (JSON format)
- Implement log levels: ERROR, WARN, INFO, DEBUG
- Store logs in files or external service (e.g., Sentry, LogRocket)

**Database Error Handling:**
- Wrap database operations in try-catch blocks
- Handle connection failures gracefully
- Implement transaction rollback for failed operations
- Validate data before database insertion

**Security Error Handling:**
- Never expose sensitive information in error messages
- Log security events (failed login attempts, CSRF violations)
- Implement rate limiting on authentication endpoints
- Return generic messages for authentication failures

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples, edge cases, and individual component behavior:

**Frontend Unit Tests:**
- Form validation logic with valid/invalid inputs
- API client functions with mocked responses
- Utility functions (date formatting, price formatting)
- Component rendering with specific props

**Backend Unit Tests:**
- Controller methods with various request payloads
- Validation rules with edge cases
- Authentication middleware with valid/invalid tokens
- Database query builders and ORM methods

**Tools:**
- Frontend: Jest + Testing Library
- Backend: PHPUnit (Laravel) / Jest (Node.js)

**Example Unit Tests:**
- Test email validation rejects invalid formats
- Test price update requires authentication
- Test promotion filtering excludes expired promotions
- Test CSRF token validation rejects missing tokens

### Property-Based Testing

Property-based tests will verify universal properties across many randomly generated inputs. The system will use:
- **Frontend:** fast-check (JavaScript)
- **Backend:** PHPUnit with faker (Laravel) / fast-check (Node.js)

**Configuration:**
- Each property test MUST run a minimum of 100 iterations
- Each test MUST be tagged with: `**Feature: gasolinera-website, Property {number}: {property_text}**`
- Each correctness property MUST be implemented by a SINGLE property-based test

**Property Test Examples:**

1. **Button hover effects** - Generate random button elements, verify all have hover transitions
2. **Active promotions filtering** - Generate random promotion sets with various dates, verify only active ones are returned
3. **Authentication requirement** - Generate random unauthenticated requests, verify all are rejected
4. **Email validation** - Generate random email strings, verify validation correctly identifies valid/invalid formats
5. **Password hashing** - Generate random passwords, verify all are hashed before storage
6. **CSRF validation** - Generate random form submissions, verify those without tokens are rejected
7. **XSS sanitization** - Generate random inputs with script tags, verify all are sanitized

### Integration Testing

Integration tests will verify component interactions and end-to-end flows:

**Test Scenarios:**
- Complete user journey: view prices → view promotions → submit contact form
- Admin workflow: login → update prices → create promotion → logout
- API integration: frontend calls → backend processing → database updates
- Authentication flow: login → access protected resource → token refresh → logout

**Tools:**
- Cypress or Playwright for E2E tests
- Postman/Newman for API testing

### Performance Testing

**Metrics to Monitor:**
- Page load time (target: < 3 seconds)
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- API response times (target: < 500ms)

**Tools:**
- Lighthouse for frontend performance
- Apache Bench or k6 for backend load testing

### Security Testing

**Security Checks:**
- Penetration testing for common vulnerabilities (OWASP Top 10)
- SQL injection attempts on all input fields
- XSS payload testing
- CSRF token bypass attempts
- Authentication bypass testing
- Rate limiting verification

**Tools:**
- OWASP ZAP for automated security scanning
- Manual testing with Burp Suite

## Deployment Strategy

### Development Environment
- Local development with hot-reload
- SQLite or local MySQL/PostgreSQL
- Debug mode enabled
- Detailed error messages

### Staging Environment
- Mirror of production configuration
- Test database with sample data
- SSL certificate (Let's Encrypt)
- Performance monitoring enabled

### Production Environment
- Optimized assets (minified CSS/JS)
- CDN for static assets (optional)
- Database backups (daily)
- Error logging to external service
- SSL certificate with auto-renewal
- Rate limiting enabled
- Security headers configured

### CI/CD Pipeline
1. Code push to repository (Git)
2. Run automated tests (unit + integration)
3. Build and optimize assets
4. Deploy to staging for manual testing
5. Deploy to production after approval
6. Run smoke tests post-deployment

### Monitoring
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Analytics (Google Analytics, Plausible)
- Server metrics (CPU, memory, disk usage)

## Performance Optimization

### Frontend Optimization
- Lazy load images below the fold
- Use WebP format with fallbacks
- Minify and bundle CSS/JavaScript
- Implement browser caching headers
- Use CSS animations over JavaScript when possible
- Defer non-critical JavaScript
- Optimize font loading (font-display: swap)

### Backend Optimization
- Database query optimization with indexes
- Implement caching for fuel prices (Redis/Memcached)
- Use database connection pooling
- Compress API responses (gzip)
- Implement API response caching
- Optimize image uploads (resize, compress)

### Database Optimization
- Add indexes on frequently queried columns
- Use prepared statements to prevent SQL injection
- Implement query result caching
- Regular database maintenance (VACUUM, ANALYZE)
- Monitor slow queries and optimize

## Accessibility Considerations

### WCAG AA Compliance
- Color contrast ratios meet minimum standards
- All interactive elements keyboard accessible
- Focus indicators visible on all focusable elements
- Form labels properly associated with inputs
- Error messages announced to screen readers
- Semantic HTML structure (headings, landmarks)
- Alt text for all images
- Skip navigation link for keyboard users

### Responsive Design
- Mobile-first approach
- Touch targets minimum 44x44 pixels
- Readable font sizes (minimum 16px)
- No horizontal scrolling on any device
- Test on multiple devices and browsers

## Future Enhancements

### Phase 2 Features (Optional)
- User accounts for loyalty program
- Online payment integration
- Fuel price history charts
- Mobile app (React Native / Flutter)
- Push notifications for promotions
- Multi-language support (Spanish/English)
- Dark mode theme
- Advanced analytics dashboard
- Customer reviews and ratings
- Appointment scheduling for services

### Scalability Considerations
- Implement caching layer (Redis)
- Use CDN for global distribution
- Database replication for read scaling
- Load balancer for multiple servers
- Microservices architecture for complex features
