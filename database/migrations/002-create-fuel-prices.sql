-- Create fuel_prices table
CREATE TABLE IF NOT EXISTS fuel_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fuel_type ENUM('magna', 'premium', 'diesel') NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES administrators(id) ON DELETE SET NULL,
    INDEX idx_fuel_type (fuel_type),
    INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default fuel prices
INSERT INTO fuel_prices (fuel_type, price) VALUES
    ('magna', 0.00),
    ('premium', 0.00),
    ('diesel', 0.00)
ON DUPLICATE KEY UPDATE fuel_type = fuel_type;
