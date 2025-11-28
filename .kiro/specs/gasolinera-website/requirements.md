# Requirements Document

## Introduction

Este documento especifica los requerimientos para un sitio web moderno e informativo para una gasolinera. El sistema permitirá a los usuarios consultar precios de combustible en tiempo real, conocer servicios disponibles, ver promociones vigentes, ubicar la estación y contactar directamente. Incluirá un panel administrativo para gestionar contenido dinámico y micro-interacciones que mejoren la experiencia del usuario sin comprometer el rendimiento.

## Glossary

- **Sistema**: El sitio web completo de la gasolinera incluyendo frontend y backend
- **Usuario**: Visitante del sitio web público
- **Administrador**: Personal autorizado con acceso al panel administrativo
- **Micro-interacción**: Animación o feedback visual sutil que responde a acciones del usuario
- **CRUD**: Operaciones de Crear, Leer, Actualizar y Eliminar datos
- **Panel Administrativo**: Interfaz privada para gestionar contenido del sitio
- **Precio de Combustible**: Costo actual por litro de Magna, Premium o Diésel
- **Promoción**: Oferta temporal o descuento vigente
- **Toast**: Notificación temporal no invasiva que aparece brevemente en pantalla

## Requirements

### Requirement 1

**User Story:** Como usuario, quiero ver información principal de la gasolinera al entrar al sitio, para conocer rápidamente precios, horarios y servicios disponibles.

#### Acceptance Criteria

1. WHEN a user loads the home page, THEN the Sistema SHALL display the logo, tagline, and main navigation menu
2. WHEN the home page renders, THEN the Sistema SHALL display a hero banner or slider with promotional images
3. WHEN the home page loads, THEN the Sistema SHALL display current fuel prices for Magna, Premium, and Diesel
4. WHEN the home page is visible, THEN the Sistema SHALL show operating hours, phone number, and WhatsApp contact
5. WHEN the home page displays, THEN the Sistema SHALL present current active promotions

### Requirement 2

**User Story:** Como usuario, quiero experimentar micro-interacciones visuales al navegar el sitio, para tener una experiencia moderna y agradable.

#### Acceptance Criteria

1. WHEN a user hovers over any button, THEN the Sistema SHALL apply smooth color change, shadow, and scale transformation
2. WHEN the home page loads, THEN the Sistema SHALL animate content entrance with fade-in or slide effects
3. WHEN a user hovers over a service or promotion card, THEN the Sistema SHALL elevate the card slightly with smooth transition
4. WHEN a navigation menu item is active, THEN the Sistema SHALL display an animated indicator
5. WHEN fuel prices update, THEN the Sistema SHALL highlight the changed values with color animation

### Requirement 3

**User Story:** Como usuario, quiero consultar los precios actuales de combustible, para decidir si visitar la gasolinera.

#### Acceptance Criteria

1. WHEN a user views the prices section, THEN the Sistema SHALL display a clear table with prices for Magna, Premium, and Diesel
2. WHEN prices are displayed, THEN the Sistema SHALL show the last update timestamp
3. WHEN a user hovers over a fuel type, THEN the Sistema SHALL display a tooltip with fuel type explanation
4. WHEN the prices page loads, THEN the Sistema SHALL retrieve the most recent prices from the database

### Requirement 4

**User Story:** Como usuario, quiero conocer los servicios disponibles en la gasolinera, para saber qué facilidades ofrece.

#### Acceptance Criteria

1. WHEN a user accesses the services section, THEN the Sistema SHALL list all available services with images and descriptions
2. WHEN services are displayed, THEN the Sistema SHALL include fuel loading, lubricants, air/water, vacuum service, and fleet attention
3. WHEN a user hovers over a service image, THEN the Sistema SHALL apply parallax or slow zoom effect
4. WHEN a user hovers over a service card, THEN the Sistema SHALL add soft shadow and animate the icon
5. IF a service has expandable information, THEN the Sistema SHALL animate the expansion smoothly

### Requirement 5

**User Story:** Como usuario, quiero localizar la gasolinera y contactarla fácilmente, para visitarla o hacer consultas.

#### Acceptance Criteria

1. WHEN a user views the location section, THEN the Sistema SHALL display an interactive Google Maps embed
2. WHEN the contact section loads, THEN the Sistema SHALL show a WhatsApp button for immediate contact
3. WHEN the contact section is visible, THEN the Sistema SHALL provide a contact form with name, email, and message fields
4. WHEN the WhatsApp button is visible, THEN the Sistema SHALL animate it with a bounce effect every 10 seconds
5. WHEN a user types in a form field, THEN the Sistema SHALL change the border color smoothly
6. WHEN a user submits the form, THEN the Sistema SHALL validate inputs in real-time with animated feedback

### Requirement 6

**User Story:** Como usuario, quiero ver las promociones vigentes, para aprovechar ofertas y descuentos disponibles.

#### Acceptance Criteria

1. WHEN a user accesses the promotions section, THEN the Sistema SHALL display all active promotions
2. WHEN promotions load, THEN the Sistema SHALL animate each card entrance with pop effect
3. WHEN a user hovers over a promotion, THEN the Sistema SHALL apply brightness or contrast transition
4. WHEN displaying promotions, THEN the Sistema SHALL show promotion title, description, validity period, and associated image

### Requirement 7

**User Story:** Como administrador, quiero gestionar precios de combustible desde un panel seguro, para mantener la información actualizada.

#### Acceptance Criteria

1. WHEN an administrator accesses the admin panel, THEN the Sistema SHALL require secure login authentication
2. WHEN an administrator is authenticated, THEN the Sistema SHALL provide CRUD operations for fuel prices
3. WHEN an administrator updates a price, THEN the Sistema SHALL save the change with current timestamp
4. WHEN an administrator saves changes, THEN the Sistema SHALL display a toast notification confirming the action
5. WHEN an administrator edits a field, THEN the Sistema SHALL highlight the active field

### Requirement 8

**User Story:** Como administrador, quiero gestionar promociones desde el panel administrativo, para mantener ofertas actualizadas.

#### Acceptance Criteria

1. WHEN an administrator accesses promotions management, THEN the Sistema SHALL provide CRUD operations for promotions
2. WHEN an administrator creates a promotion, THEN the Sistema SHALL require title, description, validity dates, and optional image
3. WHEN an administrator saves or deletes a promotion, THEN the Sistema SHALL display a toast notification
4. WHEN data tables update, THEN the Sistema SHALL animate the refresh smoothly

### Requirement 9

**User Story:** Como administrador, quiero ver estadísticas básicas del sitio, para entender el comportamiento de los usuarios.

#### Acceptance Criteria

1. WHEN an administrator accesses the dashboard, THEN the Sistema SHALL display total page visits
2. WHEN statistics are shown, THEN the Sistema SHALL include WhatsApp button clicks count
3. WHEN the dashboard loads, THEN the Sistema SHALL show fuel prices page views count
4. WHEN statistics update, THEN the Sistema SHALL animate the number changes

### Requirement 10

**User Story:** Como usuario, quiero que el sitio cargue rápidamente y funcione en cualquier dispositivo, para acceder sin frustraciones.

#### Acceptance Criteria

1. WHEN a user loads any page, THEN the Sistema SHALL complete initial render in less than 3 seconds
2. WHEN images are served, THEN the Sistema SHALL use optimized formats such as WebP
3. WHEN micro-interactions execute, THEN the Sistema SHALL use lightweight CSS and minimal JavaScript
4. WHEN a user accesses the site from any device, THEN the Sistema SHALL display a responsive layout adapted to screen size
5. WHEN interactive elements are presented, THEN the Sistema SHALL ensure AA accessibility compliance with proper contrast and clear text

### Requirement 11

**User Story:** Como administrador del sistema, quiero que la aplicación sea segura, para proteger datos sensibles y prevenir ataques.

#### Acceptance Criteria

1. WHEN the site is accessed, THEN the Sistema SHALL serve all pages over HTTPS with valid SSL certificate
2. WHEN administrator passwords are stored, THEN the Sistema SHALL encrypt them using secure hashing algorithms
3. WHEN forms are submitted, THEN the Sistema SHALL implement CSRF token validation
4. WHEN user input is processed, THEN the Sistema SHALL sanitize all inputs to prevent XSS attacks
5. WHEN authentication is required, THEN the Sistema SHALL implement session management with secure cookies

### Requirement 12

**User Story:** Como usuario, quiero que el formulario de contacto valide mis datos, para asegurarme de enviar información correcta.

#### Acceptance Criteria

1. WHEN a user enters an email address, THEN the Sistema SHALL validate the email format in real-time
2. WHEN validation succeeds, THEN the Sistema SHALL display a green check icon with smooth animation
3. WHEN validation fails, THEN the Sistema SHALL display a discrete red error message with animation
4. WHEN all fields are valid and form is submitted, THEN the Sistema SHALL send the message and display success confirmation
5. WHEN required fields are empty on submit, THEN the Sistema SHALL prevent submission and highlight missing fields


### Requirement 13

**User Story:** Como usuario, quiero conocer cómo se manejan mis datos personales, para tener confianza en la privacidad y seguridad de mi información.

#### Acceptance Criteria

1. WHEN a user accesses the privacy policy page, THEN the Sistema SHALL display the complete privacy notice with company information
2. WHEN the privacy policy is shown, THEN the Sistema SHALL include information about data collection purposes, personal data types collected, and ARCO rights
3. WHEN a user submits the contact form, THEN the Sistema SHALL require explicit consent for data processing through a checkbox
4. WHEN the privacy policy displays, THEN the Sistema SHALL show contact information for the data protection officer
5. WHEN a user requests data access, rectification, cancellation or opposition, THEN the Sistema SHALL provide the email address buzon@maxiserviciosaba.com for ARCO rights requests
