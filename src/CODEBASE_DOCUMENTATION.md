# SDEV Codebase Documentation

## 🎯 Project Overview

**SDEV** is a commercial real estate data aggregation and analysis platform that scrapes, processes, and displays property listings from multiple sources including LoopNet, Crexi, and Century 21.

**Primary Purpose**: Automate the collection and organization of commercial real estate listings with intelligent categorization and mapping capabilities.

---

## 📁 Project Structure

```
SDEVCopy-main/
├── index.php              # Entry point - redirects to /site/dashboard
├── dispatch.php           # Main router and request handler
├── settings.php           # Core configuration (DB, paths, email)
├── ipblock.php           # IP blocking functionality
├── php/                  # Server-side business logic
├── template/             # HTML templates (.phtml files)
├── js/                   # Frontend JavaScript
├── css/                  # Stylesheets
├── images/               # Static images
├── fonts/                # Font files
├── phantomjs/            # Browser automation (legacy)
├── playwright/           # Modern browser automation
├── python/               # AI assistant scripts
├── node/                 # Node.js utilities
└── perl/                 # Perl scripts
```

---

## 🔑 Core PHP Files

### `index.php` (Entry Point)
**Location**: `/index.php`
**Purpose**: Application entry point
**Flow**:
1. Includes `ipblock.php` for security
2. Redirects all traffic to `/site/dashboard`

### `dispatch.php` (Router/Controller)
**Location**: `/dispatch.php`
**Purpose**: Main application router that handles all requests
**Key Responsibilities**:
- **User Authentication**: Checks login status, manages sessions
- **Request Routing**: Routes to appropriate templates/scripts based on `_type` and `_request` parameters
- **Access Control**: Checks admin/business permissions
- **Template Loading**: Loads corresponding `.phtml` templates
- **Script Execution**: Includes PHP scripts for page logic

**Request Types**:
- `util` - Utility scripts from `/php/util/`
- `ajax` - AJAX endpoints
- `public` - Public pages
- `store` - Store pages
- `widget` - Widget components
- Default - Standard authenticated pages

**Security Features**:
- Session validation
- Admin/superadmin checks
- Business user restrictions
- IP blocking integration

### `settings.php` (Configuration)
**Location**: `/settings.php`
**Purpose**: Global configuration file
**Key Settings**:

**Database**:
```php
Host: localhost
User: sdev_main
Database: sdev_main
Password: sE{c^]dk_{k]
```

**Site Configuration**:
- Title: 'SDEV'
- URL: https://sdev.ai/
- Default page: 'map'
- Timezone: America/New_York

**System Paths**:
- Base path: `/home/sdev/public_html/`
- JS path: `js/`
- Template path: `template/`
- Script path: `php/`
- Upload path: `uploads/`
- Snapshots: `snapshots/`
- PhantomJS: `phantomjs/`
- Playwright: `playwright/`
- Chrome: `chromium/` and `chrome/`
- Node: `node/`

**Superusers**: Array with user ID 1

---

## 🗂️ PHP Backend Architecture

### `/php/main.php`
**Purpose**: Core authentication functions
**Functions**:
- `login($user)` - Handles user login, updates last_login timestamp
- `logout()` - Destroys user session
- `resetPassword($user)` - Sends password reset email

### `/php/common.php`
**Purpose**: Shared utility functions
**Key Functions**:
- `getFileIcons($file)` - Returns appropriate icon based on file extension
- `formatCurrency($v)` - Formats numbers as currency
- `getKeyValue($obj, $key)` - Extracts nested values from objects
- `getKeyValueV2($obj, $keys)` - Advanced nested value extraction

### Page Controllers (`/php/`)
Each major page has a corresponding PHP controller:
- `deal.php`, `deal2.php`, `deal3.php`, `dealDev.php` - Deal/listing detail pages
- `listings.php`, `listings2.php`, `listingsDev.php` - Listing index pages
- `map.php` - Main map interface (40KB - complex)
- `team.php` - Team management
- `login.php` - Authentication
- `settings.php` - User settings
- `todo.php` - Task management

---

## 🤖 Automation & Scraping

### Utility Scripts (`/php/util/`)
**Purpose**: Background processing and data scraping

**Key Utilities**:

1. **Processors (Data Scrapers)**:
   - `processorCrexi.util.php` - Scrapes Crexi.com
   - `processorCrexiLease.util.php` - Scrapes Crexi lease listings
   - `processorLoopnet.util.php` - Scrapes LoopNet.com
   - `processorCentury.util.php` - Scrapes Century 21
   - `processorCE.util.php` - General commercial real estate processor
   - `processorThread.util.php` - Multi-threaded processing

2. **Data Management**:
   - `dealsCacher.util.php` - Caches deal data for performance
   - `listingChecker.util.php` - Validates listing data
   - `listingCheckerThread.util.php` - Multi-threaded validation
   - `mapper.util.php` - Geographic mapping logic

3. **Maintenance**:
   - `cron.util.php` - Scheduled tasks
   - `cronCleanup.util.php` - Cleanup routines
   - `cleanup.util.php` - Data cleanup
   - `autotag_fix.util.php` - Fixes auto-tagging
   - `autotag_new.util.php` - New auto-tagging logic

4. **Communication**:
   - `emailScraper.util.php` - Scrapes emails from sources
   - `notify.util.php` - Notification system

5. **Export**:
   - `export.util.php` - Data export functionality
   - `api.util.php` - API endpoints

### PhantomJS (`/phantomjs/`)
**Purpose**: Legacy browser automation for scraping JavaScript-heavy sites
**Key Scripts**:
- `rasterize.js` - Converts web pages to images/PDFs
- `html2pdf.js` - HTML to PDF conversion
- `html2png.js` - HTML to PNG conversion
- Includes jQuery for DOM manipulation

### Playwright (`/playwright/`)
**Purpose**: Modern browser automation (replaces PhantomJS)
**Key Scripts**:
- `greatschools.js` - Scrapes GreatSchools.org data
- `isPointInsidePoly.js` - Geographic polygon calculations
- `isPointInsidePolyDEV.js` - Development version
- `zillow.js` - Scrapes Zillow data
- `crexiToken.js` - Handles Crexi authentication tokens

**Dependencies**:
```json
{
  "playwright": "^1.x",
  "@playwright/test": "^1.x"
}
```

### Python Scripts (`/python/`)

**`assitant.py`** (AI Document Analysis)
**Purpose**: OpenAI Assistant integration for analyzing commercial real estate documents
**Key Features**:
- Uses GPT-4 with retrieval and code interpreter
- Analyzes PDF documents (e.g., offering memorandums)
- Session management for multiple conversations
- ArXiv AI paper scraping (may be legacy/test code)

**Configuration**:
```python
OpenAI API Key: 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
Organization: org-jdwAUsVJNCDQpeqXVgKK4mGZ
```

**Functions**:
- `upload_file(assistant_id)` - Uploads documents to OpenAI
- `setup_assistant(client, assistant_name)` - Creates AI assistant
- `send_message()` - Sends queries to assistant
- `run_assistant()` - Executes assistant tasks
- `save_session()` / `get_session_data()` - Session persistence

**`categoryMapper.py`**
**Purpose**: Maps and categorizes listings (details need inspection)

---

## 🎨 Frontend Architecture

### Templates (`/template/`)
**Structure**: Organized by page/feature

**Core Templates**:
- `default/` - Base layout (head, header, footer)
  - `head.phtml` - HTML head
  - `header.phtml` - Site header
  - `foot.phtml` - Footer/scripts
  - `login.phtml` - Login form
- `~frame.phtml` - Main application frame for logged-in users
- `errors/404.phtml` - 404 error page

**Feature Templates**:
- `map/` - Map interface templates
- `deal/`, `deal2/`, `deal3/`, `dealDev/` - Deal detail views
- `listings/`, `listings2/`, `listingsDev/` - Listing views
- `team/` - Team management
- `todo/` - Task management
- `scrapedemails/` - Email scraping interface
- `widgets/` - Reusable UI components
- `controlpanel/` - Admin control panel

### JavaScript (`/js/`)

**Main Application Files**:
- `index.js` - Homepage logic
- `deal.js`, `deal2.js`, `deal3.js`, `dealDev.js` - Deal detail interactions
- `listings.js`, `listingsDev.js` - Listing page logic
- `deal_grid.js` - Grid view for deals
- `team.js` - Team management UI
- `controlpanel/index.js` - Admin panel

**Libraries** (`/js/lib/`):
- CodeMirror - Code editor (with 50+ language modes)
- jQuery jEditable - Inline editing
- Bootstrap Typeahead - Autocomplete

**Widgets** (`/js/class/`):
- `modals.js` - Modal dialog system

---

## 🔄 Data Flow & Relationships

### 1. User Request Flow
```
User → index.php → dispatch.php → Check Auth → Route Request → Load Template + Script → Render
```

### 2. Data Scraping Flow
```
Cron Job → processor*.util.php → Playwright/PhantomJS → External Site → Parse Data → Database → Cache
```

### 3. Listing Display Flow
```
User Request → listings.php → Query DB → listings.phtml → listings.js → Render Grid/List
```

### 4. Map View Flow
```
User → map.php → Load listings → map.phtml → Deal plotting → Geographic calculations
```

### 5. AI Document Analysis Flow
```
Upload PDF → Python assistant.py → OpenAI API → Parse & Analyze → Return Summary
```

---

## 🗄️ Database Schema

**Database**: `sdev_main`
**Host**: localhost

**Key Tables** (inferred from code):
- `users` - User accounts
  - `id`, `last_login`, `loggedin`, `admin`, `type_id`, `parent_id`
- `biz` - Business information
  - `user_id`, `email`
- Listing tables (need DB inspection for full schema)
- Deal/transaction tables
- Session tables

---

## 🔐 Security Considerations

### Current Security Features:
1. **IP Blocking** (`ipblock.php`) - Blocks malicious IPs
2. **Session Management** - PHP sessions for auth
3. **Role-Based Access**:
   - Public users
   - Logged-in users
   - Business users (type_id <= 2)
   - Admins
   - Superadmins (user ID in $GLOBALS['superusers'])
4. **Admin Protection** - Checks `$_SESSION['user']->admin` and `superadmin`

### Security Concerns ⚠️:
1. **SQL Injection Risk**: Uses `mysql_query()` with direct string interpolation
   ```php
   mysql_query("UPDATE users SET last_login=NOW() WHERE id='{$user->id}'");
   ```
   **Recommendation**: Migrate to PDO with prepared statements

2. **Deprecated MySQL Extension**: Using `mysql_*` functions (removed in PHP 7+)
   **Recommendation**: Migrate to `mysqli` or PDO

3. **Hardcoded Credentials**:
   - Database password in `settings.php`
   - OpenAI API key in `assitant.py`
   **Recommendation**: Use environment variables

4. **Password Handling**: Plain text password in reset email
   **Recommendation**: Implement password hashing (bcrypt/Argon2)

5. **Error Display**: `display_errors = 1` in production
   **Recommendation**: Disable in production, use logging

6. **File Inclusion Vulnerabilities**: Direct inclusion based on user input
   ```php
   include $REQUEST->request; // Line 89 in dispatch.php
   ```
   **Recommendation**: Whitelist allowed files

---

## 🚀 Optimization Opportunities

### Performance:
1. **Caching**:
   - ✅ Already has `dealsCacher.util.php`
   - Add Redis/Memcached for session storage
   - Implement page-level caching

2. **Database**:
   - Add indexes on frequently queried columns
   - Implement query optimization
   - Connection pooling

3. **Frontend**:
   - Minify/bundle JavaScript (currently 18+ individual files)
   - Implement lazy loading for listings
   - Optimize images
   - Use CDN for static assets

4. **Scraping**:
   - Migrate fully from PhantomJS → Playwright (faster, maintained)
   - Implement request queuing
   - Add rate limiting

### Code Quality:
1. **PHP Version**: Update to PHP 8.x for performance gains
2. **Framework**: Consider migrating to Laravel/Symfony for:
   - Better structure
   - Built-in security
   - ORM (Eloquent/Doctrine)
   - Modern routing
3. **Dependency Management**: Add Composer for PHP dependencies
4. **Code Organization**: Implement MVC pattern properly
5. **Testing**: Add unit/integration tests

### Scalability:
1. **Microservices**: Separate scraping from web application
2. **Queue System**: RabbitMQ/Redis for background jobs
3. **Horizontal Scaling**: Load balancer with multiple app servers
4. **Database**: Master-slave replication

---

## 🎯 Feature Enhancement Ideas

### Immediate Improvements:
1. **Search & Filters**:
   - Advanced filtering (price range, sq ft, location)
   - Saved searches with alerts
   - Full-text search (Elasticsearch)

2. **User Experience**:
   - Responsive design (mobile-friendly)
   - Dark mode
   - Keyboard shortcuts
   - Export to Excel/PDF

3. **Analytics**:
   - Market trends dashboard
   - Price per sq ft analysis
   - Heat maps
   - Comparative market analysis (CMA)

4. **Collaboration**:
   - Shared deal folders
   - Comments/notes on listings
   - Team notifications
   - Activity log

### Advanced Features:
1. **AI Enhancements**:
   - Expand Python AI assistant for:
     - Automatic listing categorization
     - Price prediction models
     - Market trend analysis
     - Duplicate detection
   - Natural language search
   - OCR for document parsing

2. **Integration**:
   - CRM integration (Salesforce, HubSpot)
   - Email marketing (Mailchimp)
   - Calendar sync
   - Mobile app (React Native)

3. **Automation**:
   - Automatic email alerts for new listings
   - Custom workflow automation
   - Webhook support for external integrations
   - Scheduled reports

4. **Data Visualization**:
   - Interactive charts (Chart.js/D3.js)
   - Property comparison tool
   - Investment calculator
   - ROI projections

---

## 📊 File Dependency Map

```
index.php
  └── ipblock.php
  └── dispatch.php
        └── settings.php
        └── includes/php/main.php
        └── php/main.php
        └── php/common.php
        └── php/{page}.php (dynamic)
        └── template/default/head.phtml
        └── template/default/header.phtml
        └── template/~frame.phtml
        └── template/{page}.phtml (dynamic)
        └── template/default/foot.phtml
        └── js/{page}.js (dynamic)

Utilities (Background):
  php/util/cron.util.php
    └── processor*.util.php
          └── playwright/*.js OR phantomjs/*.js
                └── External Sites (Crexi, LoopNet, etc.)

Python AI:
  python/assitant.py
    └── OpenAI API
    └── PDF Documents
```

---

## 🛠️ Development Setup

### Requirements:
- **PHP**: 7.4+ (currently using older version)
- **MySQL**: 5.7+
- **Node.js**: 14+ (for Playwright)
- **Python**: 3.9+ (for AI assistant)
- **PhantomJS**: 2.1.1 (legacy, can be removed)

### Environment Variables Needed:
```bash
DB_HOST=localhost
DB_USER=sdev_main
DB_PASS=sE{c^]dk_{k]
DB_NAME=sdev_main
OPENAI_API_KEY=sk-xxx
OPENAI_ORG=org-xxx
```

### Installation Steps:
1. Set up MySQL database
2. Configure Apache/Nginx to point to project root
3. Install Node.js dependencies: `cd playwright && npm install`
4. Install Python dependencies: `pip3 install openai pandas`
5. Configure cron jobs for scrapers
6. Update `settings.php` with correct paths

---

## 📝 Next Steps for You

### Phase 1: Documentation & Understanding (Current)
- ✅ Read this documentation
- ⏳ Inspect database schema
- ⏳ Test each major feature in browser
- ⏳ Review individual utility scripts

### Phase 2: Stabilization
- Fix security vulnerabilities
- Migrate to modern PHP
- Add error logging
- Implement backups

### Phase 3: Enhancement
- Improve UI/UX
- Add new features
- Optimize performance
- Add testing

### Phase 4: Growth
- Scale infrastructure
- Mobile app
- API for third-party integrations

---

## 📞 Key Files to Inspect Next

Based on your business needs, prioritize reviewing:
1. **`php/util/processorCrexi.util.php`** - Main data source
2. **`php/map.php`** - Core feature (40KB file)
3. **`template/map/`** - User interface for main feature
4. **`php/deal3.php`** - Deal details logic
5. **`python/assitant.py`** - AI capabilities

---

**Document Created**: November 16, 2025
**Codebase**: SDEV - Commercial Real Estate Platform
**Status**: Initial comprehensive documentation
