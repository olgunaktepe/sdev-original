-- SDEV Original Platform - Complete Database Schema
-- Generated from analysis of PHP codebase

-- ========================================
-- CORE AUTHENTICATION & USERS
-- ========================================

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  type_id INT DEFAULT 2,
  parent_id INT,
  status INT DEFAULT 1,
  last_login TIMESTAMP NULL,
  ip VARCHAR(45),
  ip_timestamp TIMESTAMP NULL,
  ip_whitelist TEXT,
  phone VARCHAR(20),
  billing INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_status (status),
  INDEX idx_parent_id (parent_id),
  INDEX idx_type_id (type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  INDEX idx_id (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) UNIQUE,
  title VARCHAR(255),
  INDEX idx_key (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users_permissions_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  permission_id INT,
  INDEX idx_user_id (user_id),
  INDEX idx_permission_id (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  value LONGTEXT,
  INDEX idx_user_id (user_id),
  INDEX idx_name (name),
  UNIQUE KEY unique_user_setting (user_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- ADMIN & SETTINGS
-- ========================================

CREATE TABLE IF NOT EXISTS admin_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  value LONGTEXT,
  type VARCHAR(50),
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS category_mapper (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255),
  category VARCHAR(255),
  INDEX idx_label (label)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- LISTINGS (Core)
-- ========================================

CREATE TABLE IF NOT EXISTS listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source VARCHAR(255),
  remote_id VARCHAR(255),
  public_id VARCHAR(255),
  url TEXT,
  listing_url TEXT,
  title VARCHAR(500),
  type VARCHAR(50),
  category VARCHAR(100),
  subtype VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  expired INT DEFAULT 0,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(10),
  county VARCHAR(100),
  price DECIMAL(15,2),
  price_per_sqft DECIMAL(10,2),
  price_per_acres DECIMAL(10,2),
  sqft DECIMAL(15,2),
  acres DECIMAL(15,2),
  buildings_sqft DECIMAL(15,2),
  building_price_per_sqft DECIMAL(10,2),
  lease_exp FLOAT,
  noi DECIMAL(15,2),
  cap_rate FLOAT,
  far FLOAT,
  description LONGTEXT,
  data LONGTEXT COMMENT 'JSON data',
  images LONGTEXT COMMENT 'JSON array of image URLs',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_seen TIMESTAMP NULL,
  last_seen_check TIMESTAMP NULL,
  last_login TIMESTAMP NULL,
  last_deal_cache TIMESTAMP NULL,
  last_dups_cache TIMESTAMP NULL,
  last_update_check TIMESTAMP NULL,
  site VARCHAR(255),
  site_id VARCHAR(255),
  INDEX idx_source (source),
  INDEX idx_remote_id (remote_id),
  INDEX idx_status (status),
  INDEX idx_expired (expired),
  INDEX idx_timestamp (timestamp),
  INDEX idx_last_seen_check (last_seen_check),
  INDEX idx_last_deal_cache (last_deal_cache),
  INDEX idx_city_state (city, state),
  INDEX idx_zip (zip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS listings_updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id VARCHAR(255),
  source VARCHAR(255),
  old_data LONGTEXT,
  patch LONGTEXT COMMENT 'JSON patch',
  diff_count INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_source (source),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS listings_updates_operations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patch_id INT,
  operation VARCHAR(50),
  path VARCHAR(500),
  value LONGTEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_patch_id (patch_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS listings_flags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  flag_1 INT DEFAULT 0,
  flag_2 INT DEFAULT 0,
  flag_3 INT DEFAULT 0,
  INDEX idx_listing_id (listing_id),
  UNIQUE KEY unique_listing_flags (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS listings_phone_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  settings LONGTEXT COMMENT 'JSON settings',
  INDEX idx_listing_id (listing_id),
  UNIQUE KEY unique_listing_phone (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS listings_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lng DECIMAL(11,8),
  lat DECIMAL(10,8),
  res TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_score (lng, lat)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- DEALS & CACHING
-- ========================================

CREATE TABLE IF NOT EXISTS deals_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  status VARCHAR(50),
  default_versions LONGTEXT COMMENT 'JSON versions',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  UNIQUE KEY unique_deals_data (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_cache (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  type VARCHAR(100),
  data LONGTEXT COMMENT 'JSON data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_cache2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  data LONGTEXT COMMENT 'JSON cache data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  UNIQUE KEY unique_deals_cache2 (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_versions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  user_id INT,
  data LONGTEXT COMMENT 'JSON version data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- DEALS CONTACTS & ENTRIES
-- ========================================

CREATE TABLE IF NOT EXISTS deals_contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  source VARCHAR(255),
  remote_id VARCHAR(255),
  type VARCHAR(100),
  name VARCHAR(255),
  company VARCHAR(255),
  title VARCHAR(255),
  data LONGTEXT COMMENT 'JSON contact data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_source (source),
  INDEX idx_remote_id (remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_contacts_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT,
  type VARCHAR(50),
  value VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_id (contact_id),
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  user_id INT,
  update_id INT,
  folder VARCHAR(255),
  filename VARCHAR(255),
  path TEXT,
  parent INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_user_id (user_id),
  INDEX idx_update_id (update_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_folders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  data LONGTEXT COMMENT 'JSON folder data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  UNIQUE KEY unique_deals_folders (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  todo_id INT,
  title VARCHAR(255),
  description LONGTEXT,
  assigned_to INT,
  status VARCHAR(50),
  due_date DATETIME,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS deals_updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  user_id INT,
  type VARCHAR(100),
  title VARCHAR(255),
  description LONGTEXT,
  data LONGTEXT COMMENT 'JSON update data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_user_id (user_id),
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- DUPLICATES DETECTION
-- ========================================

CREATE TABLE IF NOT EXISTS dups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id1 INT,
  listing_id2 INT,
  listing2_timestamp TIMESTAMP NULL,
  listing2_type VARCHAR(50),
  dup VARCHAR(50),
  score FLOAT,
  reason VARCHAR(255),
  distance FLOAT,
  data LONGTEXT COMMENT 'JSON dup info',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id1 (listing_id1),
  INDEX idx_listing_id2 (listing_id2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- FILTERS & SEARCHES
-- ========================================

CREATE TABLE IF NOT EXISTS filters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  data LONGTEXT COMMENT 'JSON filter configuration',
  user_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS filters2 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  data LONGTEXT COMMENT 'JSON filter configuration',
  user_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS searches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  status VARCHAR(50),
  start TIMESTAMP NULL,
  end TIMESTAMP NULL,
  pid INT,
  cmd TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- ZIPCODES & GEOGRAPHIC DATA
-- ========================================

CREATE TABLE IF NOT EXISTS zipcodes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ZipCode VARCHAR(10),
  City VARCHAR(100),
  State VARCHAR(50),
  County VARCHAR(100),
  Latitude DECIMAL(10,8),
  Longitude DECIMAL(11,8),
  INDEX idx_zipcode (ZipCode),
  INDEX idx_city_state (City, State),
  INDEX idx_county (County),
  UNIQUE KEY unique_zipcode (ZipCode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- GEOGRAPHIC & MARKET DATA
-- ========================================

CREATE TABLE IF NOT EXISTS poi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  type VARCHAR(100),
  subtype VARCHAR(100),
  stories INT,
  year_built INT,
  name VARCHAR(255),
  address VARCHAR(500),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_lat_lng (lat, lng),
  INDEX idx_subtype (subtype)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS greatschools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  rating FLOAT,
  name VARCHAR(255),
  address VARCHAR(500),
  type VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_lat_lng (lat, lng)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cs_markets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remote_id VARCHAR(255),
  type VARCHAR(100),
  name VARCHAR(255),
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  data LONGTEXT COMMENT 'JSON market data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_remote_id (remote_id),
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cs_markets_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  market_remote_id VARCHAR(255),
  type VARCHAR(100),
  data LONGTEXT COMMENT 'JSON data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_market_remote_id (market_remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cs_markets_layers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  market_remote_id VARCHAR(255),
  type VARCHAR(100),
  layer_data LONGTEXT COMMENT 'GeoJSON',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_market_remote_id (market_remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cs_submarkets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remote_id VARCHAR(255),
  type VARCHAR(100),
  name VARCHAR(255),
  market_remote_id VARCHAR(255),
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  data LONGTEXT COMMENT 'JSON submarket data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_remote_id (remote_id),
  INDEX idx_type (type),
  INDEX idx_market_remote_id (market_remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cs_submarkets_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submarket_remote_id VARCHAR(255),
  type VARCHAR(100),
  data LONGTEXT COMMENT 'JSON data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_submarket_remote_id (submarket_remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS cs_submarkets_layers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  submarket_remote_id VARCHAR(255),
  type VARCHAR(100),
  layer_data LONGTEXT COMMENT 'GeoJSON',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_submarket_remote_id (submarket_remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS submarkets_layers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data LONGTEXT COMMENT 'GeoJSON',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS oa_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(10),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_lat_lng (lat, lng)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- CENSUS DATA
-- ========================================

CREATE TABLE IF NOT EXISTS census_income (
  id INT AUTO_INCREMENT PRIMARY KEY,
  zip VARCHAR(10),
  value DECIMAL(15,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_census_income (zip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS census_population (
  id INT AUTO_INCREMENT PRIMARY KEY,
  zip VARCHAR(10),
  value INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_census_population (zip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- ZILLOW DATA
-- ========================================

CREATE TABLE IF NOT EXISTS zillow_zhvi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  region_name VARCHAR(255),
  region_type VARCHAR(50),
  city VARCHAR(100),
  state VARCHAR(50),
  county VARCHAR(100),
  metro VARCHAR(255),
  zip VARCHAR(10),
  value DECIMAL(15,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_zip (zip),
  INDEX idx_city_state (city, state),
  INDEX idx_county (county)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS zillow_zori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  region_name VARCHAR(255),
  region_type VARCHAR(50),
  msa_name VARCHAR(255),
  value DECIMAL(15,2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- WALKSCORES & LOCATION DATA
-- ========================================

CREATE TABLE IF NOT EXISTS walkscores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  data LONGTEXT COMMENT 'JSON walkscore data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_walkscore (lat, lng)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS gmaps_geocoding_cache (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(500),
  latlng VARCHAR(50),
  data LONGTEXT COMMENT 'JSON geocoding result',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_address (address(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS geocoding_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ident VARCHAR(50),
  address VARCHAR(500),
  res LONGTEXT COMMENT 'JSON response',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ident (ident)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_lookup_cache (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(20),
  data LONGTEXT COMMENT 'JSON lookup data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_number (number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- TWILIO & COMMUNICATIONS
-- ========================================

CREATE TABLE IF NOT EXISTS twilio_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sid VARCHAR(255),
  auth_token VARCHAR(255),
  title VARCHAR(255),
  active INT DEFAULT 1,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sid (sid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_numbers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remote_id VARCHAR(255),
  user_id INT,
  account_sid VARCHAR(255),
  number VARCHAR(20),
  title VARCHAR(255),
  type_id INT,
  active INT DEFAULT 1,
  voicemail TEXT,
  recording INT DEFAULT 0,
  transcribe INT DEFAULT 0,
  straight_to_voicemail INT DEFAULT 0,
  status INT DEFAULT 1,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_number (number),
  INDEX idx_user_id (user_id),
  INDEX idx_remote_id (remote_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_numbers_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remote_id VARCHAR(255),
  conf_id VARCHAR(255),
  conf_sid VARCHAR(255),
  user_id INT,
  listing_id INT,
  direction VARCHAR(20),
  sender VARCHAR(20),
  target VARCHAR(20),
  duration INT,
  recording_sid VARCHAR(255),
  status VARCHAR(50),
  auto_tagged INT DEFAULT 0,
  autotag_listingIds TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_remote_id (remote_id),
  INDEX idx_user_id (user_id),
  INDEX idx_listing_id (listing_id),
  INDEX idx_direction (direction),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_log_read (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  log_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_log_id (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_log_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  log_id INT,
  tags LONGTEXT COMMENT 'JSON tags',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_log_tags (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_numbers_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number_id INT,
  user_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_number_id (number_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_sms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  log_id INT,
  from_number VARCHAR(20),
  to_number VARCHAR(20),
  body TEXT,
  direction VARCHAR(20),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_log_id (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_calls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  log_id INT,
  recording_url TEXT,
  duration INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_log_id (log_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS twilio_calls_transcriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  call_id INT,
  transcription TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_call_id (call_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- EMAILS & NOTIFICATIONS
-- ========================================

CREATE TABLE IF NOT EXISTS emails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  remote_id VARCHAR(255),
  subject VARCHAR(500),
  from_address VARCHAR(255),
  to_address VARCHAR(255),
  body LONGTEXT,
  mturk_id VARCHAR(255),
  mturk_status VARCHAR(50),
  mturk_completed TIMESTAMP NULL,
  mturk_details LONGTEXT COMMENT 'JSON details',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_remote_id (remote_id),
  INDEX idx_subject (subject(255)),
  INDEX idx_mturk_status (mturk_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT,
  user_id INT,
  type VARCHAR(100),
  message TEXT,
  sent INT DEFAULT 0,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_listing_id (listing_id),
  INDEX idx_user_id (user_id),
  INDEX idx_sent (sent)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- ACTIVITY & LOGGING
-- ========================================

CREATE TABLE IF NOT EXISTS traffic_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  page VARCHAR(255),
  action VARCHAR(100),
  data LONGTEXT COMMENT 'JSON request data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS log_errors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT,
  file VARCHAR(500),
  line INT,
  trace LONGTEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- BUSINESS/BIZ TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS biz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(10),
  data LONGTEXT COMMENT 'JSON business data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- EVENTS & ALERTS
-- ========================================

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source VARCHAR(255),
  data LONGTEXT COMMENT 'JSON event data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_source (source)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS event (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data LONGTEXT COMMENT 'JSON event data',
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type_id INT,
  event_id INT,
  order_id INT,
  message TEXT,
  deleted INT DEFAULT 0,
  unread INT DEFAULT 1,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_id (event_id),
  INDEX idx_order_id (order_id),
  INDEX idx_deleted (deleted),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS alerts_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alert_id INT,
  user_id INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_alert_id (alert_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT,
  closed INT DEFAULT 0,
  notes LONGTEXT,
  refunded INT DEFAULT 0,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sale_id (sale_id),
  INDEX idx_closed (closed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS mturk_blocked (
  id INT AUTO_INCREMENT PRIMARY KEY,
  worker_id VARCHAR(255),
  reason VARCHAR(500),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_worker (worker_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS proxies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip VARCHAR(45),
  port INT,
  type VARCHAR(20),
  active INT DEFAULT 1,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- CREATE ESSENTIAL LOOKUP DATA
-- ========================================

INSERT IGNORE INTO users_types (id, title) VALUES
  (1, 'Admin'),
  (2, 'Manager'),
  (3, 'Agent'),
  (4, 'User');

INSERT IGNORE INTO admin_settings (name, value) VALUES
  ('panic_mode', '0'),
  ('dups_config', '{}');

INSERT IGNORE INTO users_permissions (`key`, title) VALUES
  ('view_listings', 'View Listings'),
  ('edit_listings', 'Edit Listings'),
  ('manage_team', 'Manage Team'),
  ('view_reports', 'View Reports');

-- Create a test admin user (password: admin123)
INSERT IGNORE INTO users (id, username, password, email, type_id, status) VALUES
  (1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@sdev.local', 1, 1);
