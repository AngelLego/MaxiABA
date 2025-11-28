# Implementation Plan

- [x] 1. Set up project structure and dependencies



  - Create directory structure: `/public`, `/src`, `/api`, `/database`, `/tests`
  - Initialize package.json and install frontend dependencies (Bootstrap/Tailwind, AOS, Swiper)
  - Set up backend framework (Laravel or Express.js)
  - Configure database connection and environment variables
  - Set up Git repository with .gitignore
  - _Requirements: All_



- [ ] 2. Create database schema and models
  - [ ] 2.1 Design and create database tables
    - Create `administrators` table with id, username, email, password_hash, timestamps
    - Create `fuel_prices` table with id, fuel_type, price, updated_at, updated_by
    - Create `promotions` table with id, title, description, image_url, valid_from, valid_until, is_active, timestamps, created_by
    - Create `contact_messages` table with id, name, email, phone, message, privacy_consent, marketing_consent, ip_address, created_at, is_read


    - Create `site_statistics` table with id, metric_name, metric_value, date, timestamps
    - Add foreign key constraints and indexes
    - _Requirements: 7.1, 7.2, 8.1, 12.1, 9.1_

  - [ ] 2.2 Create ORM models and relationships
    - Implement Administrator model with password hashing
    - Implement FuelPrice model with fuel type enum validation


    - Implement Promotion model with date validation
    - Implement ContactMessage model with email validation


    - Implement SiteStatistic model
    - Define model relationships (foreign keys)
    - _Requirements: 7.1, 7.2, 8.1, 12.1, 9.1_



  - [ ] 2.3 Write property test for password hashing
    - **Feature: gasolinera-website, Property 18: Password hashing**
    - **Validates: Requirements 11.2**

  - [x] 2.4 Write property test for promotion date filtering


    - **Feature: gasolinera-website, Property 7: Active promotions filtering**
    - **Validates: Requirements 6.1**




- [x] 3. Implement authentication system



  - [ ] 3.1 Create authentication middleware
    - Implement login endpoint with credential validation
    - Generate and validate JWT tokens or session cookies
    - Create authentication middleware to protect admin routes
    - Implement logout functionality
    - Add rate limiting to prevent brute force attacks
    - _Requirements: 7.1, 11.5_

  - [ ] 3.2 Write property test for authentication requirement
    - **Feature: gasolinera-website, Property 9: Authentication requirement**
    - **Validates: Requirements 7.1**

  - [ ] 3.3 Write property test for secure cookie attributes
    - **Feature: gasolinera-website, Property 21: Secure cookie attributes**
    - **Validates: Requirements 11.5**

- [ ] 4. Build backend API endpoints
  - [ ] 4.1 Implement fuel prices API
    - Create GET `/api/fuel-prices` endpoint (public)
    - Create PUT `/api/admin/fuel-prices` endpoint (authenticated)
    - Add timestamp recording on price updates
    - Implement input validation for price values
    - _Requirements: 3.1, 3.4, 7.2, 7.3_

  - [ ] 4.2 Write property test for current prices retrieval
    - **Feature: gasolinera-website, Property 5: Current prices retrieval**
    - **Validates: Requirements 3.4**

  - [ ] 4.3 Write property test for timestamp on price updates
    - **Feature: gasolinera-website, Property 11: Timestamp on price updates**
    - **Validates: Requirements 7.3**

  - [ ] 4.4 Implement promotions API
    - Create GET `/api/promotions` endpoint with active filtering (public)
    - Create GET `/api/admin/promotions` endpoint (authenticated)
    - Create POST `/api/admin/promotions` endpoint with validation (authenticated)
    - Create PUT `/api/admin/promotions/:id` endpoint (authenticated)
    - Create DELETE `/api/admin/promotions/:id` endpoint (authenticated)
    - Implement image upload handling
    - _Requirements: 6.1, 8.1, 8.2_

  - [ ] 4.5 Write property test for promotion CRUD operations
    - **Feature: gasolinera-website, Property 12: Promotion CRUD operations**
    - **Validates: Requirements 8.1**

  - [ ] 4.6 Write property test for promotion creation validation
    - **Feature: gasolinera-website, Property 13: Promotion creation validation**
    - **Validates: Requirements 8.2**

  - [ ] 4.7 Implement contact form API
    - Create POST `/api/contact` endpoint with validation
    - Validate email format, required fields, and privacy consent
    - Store contact messages in database
    - Send email notification to admin (optional)
    - _Requirements: 5.3, 12.1, 12.5, 13.3_

  - [ ] 4.8 Write property test for email format validation
    - **Feature: gasolinera-website, Property 22: Email format validation**
    - **Validates: Requirements 12.1**

  - [ ] 4.9 Write property test for required field validation
    - **Feature: gasolinera-website, Property 23: Required field validation**
    - **Validates: Requirements 12.5**

  - [ ] 4.10 Write property test for privacy consent requirement
    - **Feature: gasolinera-website, Property 24: Privacy consent requirement**
    - **Validates: Requirements 13.3**

  - [ ] 4.11 Implement statistics API
    - Create GET `/api/admin/statistics` endpoint (authenticated)
    - Implement tracking for page views, WhatsApp clicks, price views
    - Create helper functions to increment statistics
    - _Requirements: 9.1, 9.2, 9.3_

- [ ] 5. Implement security measures
  - [ ] 5.1 Configure SSL/HTTPS
    - Set up SSL certificate (Let's Encrypt)
    - Configure web server to redirect HTTP to HTTPS
    - _Requirements: 11.1_

  - [ ] 5.2 Write property test for HTTPS enforcement
    - **Feature: gasolinera-website, Property 17: HTTPS enforcement**
    - **Validates: Requirements 11.1**

  - [ ] 5.3 Implement CSRF protection
    - Generate CSRF tokens for all forms
    - Validate CSRF tokens on form submissions
    - Configure CSRF middleware


    - _Requirements: 11.3_

  - [ ] 5.4 Write property test for CSRF token validation
    - **Feature: gasolinera-website, Property 19: CSRF token validation**
    - **Validates: Requirements 11.3**

  - [ ] 5.5 Implement XSS protection
    - Sanitize all user inputs before storage
    - Escape outputs in templates
    - Configure Content Security Policy headers
    - _Requirements: 11.4_

  - [ ] 5.6 Write property test for XSS input sanitization
    - **Feature: gasolinera-website, Property 20: XSS input sanitization**
    - **Validates: Requirements 11.4**

- [ ] 6. Build frontend HTML structure
  - [ ] 6.1 Create base HTML template
    - Set up HTML5 boilerplate with semantic structure
    - Include meta tags for SEO and responsive design
    - Link CSS frameworks and custom stylesheets
    - Include JavaScript libraries (AOS, Swiper)
    - _Requirements: 1.1, 10.4_

  - [ ] 6.2 Build navigation component
    - Create responsive navigation menu with logo
    - Implement hamburger menu for mobile
    - Add smooth scroll to sections
    - _Requirements: 1.1_

  - [ ] 6.3 Build home page sections
    - Create hero banner/slider section
    - Build fuel prices display section
    - Create operating hours and contact info section
    - Build promotions preview section
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 6.4 Build services page
    - Create services grid layout
    - Add service cards with images and descriptions
    - List all services: fuel loading, lubricants, air/water, vacuum, fleet attention
    - _Requirements: 4.1, 4.2_

  - [ ] 6.5 Build promotions page
    - Create promotions grid layout
    - Build promotion cards with title, description, dates, and images
    - _Requirements: 6.1, 6.4_

  - [ ] 6.6 Build contact and location page
    - Embed Google Maps with station location
    - Create contact information section
    - Build contact form with name, email, phone, message fields
    - Add privacy consent checkbox (required)
    - Add marketing consent checkbox (optional)
    - Add WhatsApp contact button
    - _Requirements: 5.1, 5.2, 5.3, 13.3_

  - [ ] 6.7 Build privacy policy page
    - Create structured privacy policy content
    - Include company information (MAXI SERVICIOS ABA)
    - List data collection purposes and personal data types
    - Explain ARCO rights and procedures
    - Display contact information for data protection officer
    - _Requirements: 13.1, 13.2, 13.4, 13.5_

- [ ] 7. Implement frontend styling and micro-interactions
  - [ ] 7.1 Style navigation and hero section
    - Apply responsive styles with Bootstrap/Tailwind
    - Implement button hover effects (color, shadow, scale)
    - Add active menu indicator animation
    - Configure Swiper.js for hero slider
    - _Requirements: 1.1, 1.2, 2.1, 2.4_

  - [ ] 7.2 Write property test for button hover effects
    - **Feature: gasolinera-website, Property 1: Button hover effects consistency**
    - **Validates: Requirements 2.1**

  - [ ] 7.3 Write property test for active menu indicator
    - **Feature: gasolinera-website, Property 3: Active menu indicator**
    - **Validates: Requirements 2.4**

  - [ ] 7.4 Style fuel prices section
    - Create responsive price table layout
    - Add tooltip on hover for fuel type explanations
    - Implement last update timestamp display
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ] 7.5 Write property test for fuel type tooltip
    - **Feature: gasolinera-website, Property 4: Fuel type tooltip display**
    - **Validates: Requirements 3.3**

  - [ ] 7.6 Style services section
    - Apply card elevation on hover
    - Add image zoom/parallax effects
    - Animate service icons on hover
    - _Requirements: 4.1, 2.3_

  - [ ] 7.7 Write property test for card elevation
    - **Feature: gasolinera-website, Property 2: Card elevation on hover**
    - **Validates: Requirements 2.3**

  - [ ] 7.8 Style promotions section
    - Implement card pop entrance animation with AOS
    - Add brightness/contrast transition on hover
    - _Requirements: 6.1, 2.3_

  - [ ] 7.9 Style contact section
    - Add WhatsApp button with bounce animation
    - Implement form field focus effects (border color change)
    - Style validation feedback (green check, red error)
    - _Requirements: 5.2, 5.5, 5.6_

  - [ ] 7.10 Implement page entrance animations
    - Configure AOS library for fade-in/slide effects
    - Apply animations to main content sections
    - _Requirements: 2.2_

- [ ] 8. Implement frontend JavaScript functionality
  - [ ] 8.1 Create API client module
    - Write functions to fetch fuel prices from API
    - Write functions to fetch promotions from API
    - Write function to submit contact form
    - Implement error handling for network failures
    - _Requirements: 3.4, 6.1, 12.4_

  - [ ] 8.2 Implement fuel prices display
    - Fetch and display current prices on page load
    - Update last update timestamp
    - Handle loading states and errors
    - _Requirements: 1.3, 3.1, 3.2, 3.4_

  - [ ] 8.3 Implement promotions display
    - Fetch and display active promotions
    - Filter promotions by current date
    - Handle empty state (no promotions)
    - _Requirements: 1.5, 6.1, 6.4_

  - [ ] 8.4 Write property test for promotion display completeness
    - **Feature: gasolinera-website, Property 8: Promotion display completeness**
    - **Validates: Requirements 6.4**

  - [ ] 8.5 Implement contact form validation
    - Add real-time email format validation
    - Validate required fields before submission
    - Check privacy consent checkbox is checked
    - Display validation feedback with animations
    - _Requirements: 5.6, 12.1, 12.2, 12.3, 12.5, 13.3_

  - [ ] 8.6 Write property test for form validation behavior
    - **Feature: gasolinera-website, Property 6: Form validation behavior**
    - **Validates: Requirements 5.6**

  - [ ] 8.7 Implement contact form submission
    - Submit form data to API endpoint
    - Handle success and error responses
    - Display success confirmation message
    - Clear form after successful submission
    - _Requirements: 12.4_

  - [ ] 8.8 Implement statistics tracking
    - Track page views on load
    - Track WhatsApp button clicks
    - Track price section views
    - Send tracking data to API
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 8.9 Initialize micro-interaction libraries
    - Initialize AOS (Animate On Scroll)
    - Initialize Swiper.js for sliders
    - Configure Google Maps embed
    - _Requirements: 1.2, 2.2, 5.1_

- [ ] 9. Build admin panel interface
  - [ ] 9.1 Create admin login page
    - Build login form with username/email and password
    - Implement login form submission
    - Handle authentication errors
    - Redirect to dashboard on success
    - _Requirements: 7.1_

  - [ ] 9.2 Create admin dashboard
    - Display statistics: page views, WhatsApp clicks, price views
    - Show recent contact messages
    - Add navigation to management sections
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 9.3 Create fuel prices management interface
    - Display current prices in editable form
    - Implement price update functionality
    - Show toast notification on save
    - Highlight active field being edited
    - _Requirements: 7.2, 7.3, 7.4, 7.5_

  - [ ] 9.4 Write property test for CRUD operations availability
    - **Feature: gasolinera-website, Property 10: CRUD operations availability**
    - **Validates: Requirements 7.2**

  - [ ] 9.5 Create promotions management interface
    - Display promotions list in data table
    - Implement create promotion form
    - Implement edit promotion functionality
    - Implement delete promotion with confirmation
    - Add image upload for promotions
    - Show toast notifications for all actions
    - Animate table updates
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 9.6 Implement admin panel authentication
    - Protect all admin routes with authentication check
    - Redirect to login if not authenticated
    - Implement logout functionality
    - _Requirements: 7.1_

- [ ] 10. Optimize performance and images
  - [ ] 10.1 Optimize images
    - Convert images to WebP format with fallbacks
    - Implement lazy loading for below-fold images
    - Compress all images
    - _Requirements: 10.2_

  - [ ] 10.2 Write property test for image format optimization
    - **Feature: gasolinera-website, Property 14: Image format optimization**
    - **Validates: Requirements 10.2**

  - [ ] 10.3 Minify and bundle assets
    - Minify CSS and JavaScript files
    - Bundle scripts to reduce HTTP requests
    - Configure browser caching headers
    - _Requirements: 10.1, 10.3_

  - [ ] 10.4 Implement responsive design testing
    - Test layout on mobile devices (320px, 375px, 414px)
    - Test on tablets (768px, 1024px)
    - Test on desktop (1280px, 1920px)
    - Fix any layout issues or horizontal scrolling
    - _Requirements: 10.4_

  - [ ] 10.5 Write property test for responsive layout
    - **Feature: gasolinera-website, Property 15: Responsive layout adaptation**
    - **Validates: Requirements 10.4**

- [ ] 11. Implement accessibility features
  - [ ] 11.1 Ensure keyboard navigation
    - Test all interactive elements are keyboard accessible
    - Add visible focus indicators
    - Implement skip navigation link
    - _Requirements: 10.5_

  - [ ] 11.2 Verify color contrast
    - Check all text meets WCAG AA contrast ratios
    - Fix any contrast issues
    - _Requirements: 10.5_

  - [ ] 11.3 Write property test for accessibility contrast
    - **Feature: gasolinera-website, Property 16: Accessibility contrast compliance**
    - **Validates: Requirements 10.5**

  - [ ] 11.3 Add semantic HTML and ARIA labels
    - Use proper heading hierarchy
    - Add alt text to all images
    - Add ARIA labels where needed
    - Associate form labels with inputs
    - _Requirements: 10.5_

- [ ] 12. Final testing and deployment preparation
  - [ ] 12.1 Run all property-based tests
    - Execute all property tests with 100+ iterations
    - Fix any failing tests
    - Document test coverage

  - [ ] 12.2 Run integration tests
    - Test complete user flows
    - Test admin workflows
    - Verify API integrations

  - [ ] 12.3 Security audit
    - Verify HTTPS is enforced
    - Test CSRF protection
    - Test XSS prevention
    - Verify password hashing
    - Check secure cookie configuration
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 12.4 Performance testing
    - Measure page load times
    - Run Lighthouse audit
    - Optimize any bottlenecks
    - _Requirements: 10.1_

  - [ ] 12.5 Cross-browser testing
    - Test on Chrome, Firefox, Safari, Edge
    - Fix any browser-specific issues
    - _Requirements: 10.4_

  - [ ] 12.6 Prepare deployment configuration
    - Configure production environment variables
    - Set up database backups
    - Configure web server (Nginx/Apache)
    - Set up error logging
    - _Requirements: All_

- [ ] 13. Deploy to production
  - Deploy application to hosting server
  - Configure domain and DNS
  - Verify SSL certificate is active
  - Test production site functionality
  - Monitor for errors
  - _Requirements: All_
