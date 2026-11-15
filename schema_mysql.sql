-- ========================================================================
-- National Packers & Movers — Complete MySQL 8.0 Production Schema
-- Designed for Hostinger MySQL Database (u373069423_npm_db)
-- ========================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `image_url` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_blogs_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Leads CRM Table
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `from_city` VARCHAR(100) DEFAULT NULL,
  `to_city` VARCHAR(100) DEFAULT NULL,
  `moving_date` VARCHAR(100) DEFAULT NULL,
  `move_type` VARCHAR(100) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `inventory` TEXT DEFAULT NULL,
  `matched_vehicle` VARCHAR(100) DEFAULT NULL,
  `total_cft` INT DEFAULT 0,
  `source` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'New',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_leads_status` (`status`),
  KEY `idx_leads_created_at` (`created_at` DESC),
  KEY `idx_leads_phone` (`phone`),
  KEY `idx_leads_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Analytics Events Table
CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id` VARCHAR(36) NOT NULL,
  `event_type` VARCHAR(50) NOT NULL,
  `event_name` VARCHAR(255) DEFAULT NULL,
  `page_path` VARCHAR(255) NOT NULL,
  `session_id` VARCHAR(100) NOT NULL,
  `referrer` TEXT DEFAULT NULL,
  `device_type` VARCHAR(50) DEFAULT 'desktop',
  `ip_address` VARCHAR(100) DEFAULT NULL,
  `visitor_location` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_analytics_created_at` (`created_at` DESC),
  KEY `idx_analytics_event_type` (`event_type`),
  KEY `idx_analytics_session_id` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Shipments Tracking Table
CREATE TABLE IF NOT EXISTS `shipments` (
  `id` VARCHAR(36) NOT NULL,
  `consignment_number` VARCHAR(100) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(50) DEFAULT NULL,
  `origin` VARCHAR(100) NOT NULL,
  `destination` VARCHAR(100) NOT NULL,
  `booking_date` DATE DEFAULT NULL,
  `current_status` VARCHAR(50) NOT NULL DEFAULT 'Booked',
  `current_location` VARCHAR(255) DEFAULT NULL,
  `vehicle_number` VARCHAR(100) DEFAULT NULL,
  `driver_name` VARCHAR(100) DEFAULT NULL,
  `driver_phone` VARCHAR(50) DEFAULT NULL,
  `status_history` JSON DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_shipments_cn` (`consignment_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Gallery Images Table
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` VARCHAR(36) NOT NULL,
  `src` TEXT NOT NULL,
  `alt` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `display_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_gallery_order` (`display_order` ASC, `created_at` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Site Metadata (SEO) Table
CREATE TABLE IF NOT EXISTS `site_metadata` (
  `id` VARCHAR(36) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `meta_title` TEXT NOT NULL,
  `meta_description` TEXT NOT NULL,
  `meta_keywords` TEXT DEFAULT NULL,
  `is_noindex` TINYINT(1) DEFAULT 0,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_site_metadata_path` (`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` VARCHAR(36) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(100) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'staff',
  `permissions` JSON DEFAULT NULL,
  `full_name` VARCHAR(255) DEFAULT NULL,
  `raw_password` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_admin_users_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Customer Reviews Table
CREATE TABLE IF NOT EXISTS `customer_reviews` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `state_slug` VARCHAR(100) NOT NULL,
  `state_name` VARCHAR(100) NOT NULL,
  `city_slug` VARCHAR(100) NOT NULL,
  `city_name` VARCHAR(100) NOT NULL,
  `rating` INT NOT NULL,
  `review_text` TEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'approved',
  `display_target` VARCHAR(50) DEFAULT 'both',
  `source` VARCHAR(100) DEFAULT 'Website Review Form',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customer_reviews_city` (`city_slug`),
  KEY `idx_customer_reviews_state` (`state_slug`),
  KEY `idx_customer_reviews_status` (`status`),
  KEY `idx_customer_reviews_created` (`created_at` DESC),
  KEY `idx_customer_reviews_display_target` (`display_target`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
