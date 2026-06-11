<?php
// ========================================================================================================
//  AUTOELITE - GLOBAL AUTOMOTIVE PLATFORM V3.0 (AWARD WINNING EDITION)
//  DESIGNED FOR: IMMERSIVE EXPERIENCE, SPEED, AND CONVERSION
//  UPDATED: Changed status from 'available' to 'active' to match new ENUM
// ========================================================================================================

// 1. DATABASE CONNECTION & CONFIGURATION
// --------------------------------------------------------------------------------------------------------
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 0); // Hide errors in production

$db_config = [
    'host' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'name' => 'autoelite_db'
];

try {
    $conn = mysqli_connect($db_config['host'], $db_config['user'], $db_config['pass'], $db_config['name']);
    if (!$conn)
        throw new Exception("Database Connection Error");
    mysqli_set_charset($conn, "utf8mb4");
}
catch (Exception $e) {
    // Graceful fallback if Db connection fails (for demo purposes)
    $conn = false;
}

// 2. HELPER FUNCTIONS
// --------------------------------------------------------------------------------------------------------
function sanitize($conn, $input)
{
    if ($conn)
        return mysqli_real_escape_string($conn, htmlspecialchars(trim($input)));
    return htmlspecialchars(trim($input));
}

function formatPrice($price)
{
    return '$' . number_format($price);
}

function timeAgo($datetime)
{
    $time = strtotime($datetime);
    $now = time();
    $diff = $now - $time;

    if ($diff < 60)
        return 'Just now';
    if ($diff < 3600)
        return floor($diff / 60) . 'm ago';
    if ($diff < 86400)
        return floor($diff / 3600) . 'h ago';
    return date('M d, Y', $time);
}

// 3. DATA FETCHING & LOGIC
// --------------------------------------------------------------------------------------------------------

// A. Filter Logic - FOR INDEX PAGE - UPDATED to use 'active' instead of 'available'
$where_clauses = ["status = 'active'"]; // Only show active cars on homepage

// Check if filter parameters exist in URL
$is_filtered = false;
if (isset($_GET['make']) && !empty($_GET['make'])) {
    $make = sanitize($conn, $_GET['make']);
    $where_clauses[] = "make = '$make'";
    $is_filtered = true;
}
if (isset($_GET['min_price']) && !empty($_GET['min_price'])) {
    $min = (int)$_GET['min_price'];
    $where_clauses[] = "price >= $min";
    $is_filtered = true;
}
if (isset($_GET['max_price']) && !empty($_GET['max_price'])) {
    $max = (int)$_GET['max_price'];
    $where_clauses[] = "price <= $max";
    $is_filtered = true;
}
if (isset($_GET['type']) && !empty($_GET['type'])) {
    $type = sanitize($conn, $_GET['type']);
    $where_clauses[] = "body_type = '$type'";
    $is_filtered = true;
}

$where_sql = implode(' AND ', $where_clauses);

// B. Fetch Cars - either filtered or featured
$display_cars = [];
$result_count = 0;

if ($conn) {
    if ($is_filtered) {
        // If filters are applied, show filtered results
        $query = "SELECT * FROM cars WHERE $where_sql ORDER BY created_at DESC";
    } else {
        // If no filters, show featured cars (your 6 specific cars in order)
        $query = "SELECT * FROM cars WHERE $where_sql ORDER BY 
                  CASE make 
                    WHEN 'BMW' THEN 1
                    WHEN 'Mercedes-Benz' THEN 2
                    WHEN 'Porsche' THEN 3
                    WHEN 'Toyota' THEN 4
                    WHEN 'Lamborghini' THEN 5
                    ELSE 6
                  END LIMIT 6";
    }
    
    $result = mysqli_query($conn, $query);
    if ($result) {
        $result_count = mysqli_num_rows($result);
        while ($row = mysqli_fetch_assoc($result)) {
            $display_cars[] = $row;
        }
    }
}

// If no cars in DB or connection failed, use fallback with your specific cars
if (empty($display_cars)) {
    if ($is_filtered) {
        // For filtered results with no DB, show message
        $display_cars = [];
    } else {
        // Default featured cars
        $display_cars = [
            [
                'id' => 1, 
                'make' => 'BMW', 
                'model' => 'M4 Competition', 
                'price' => 89999.99, 
                'year' => 2023, 
                'mileage' => 500, 
                'fuel_type' => 'Petrol', 
                'transmission' => 'Automatic', 
                'body_type' => 'Coupe', 
                'car_condition' => 'New', 
                'image' => 'assets/uploads/bmw_m4_placeholder.jpg', 
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'id' => 2, 
                'make' => 'Mercedes-Benz', 
                'model' => 'C-Class AMG Line', 
                'price' => 65999.99, 
                'year' => 2023, 
                'mileage' => 800, 
                'fuel_type' => 'Petrol', 
                'transmission' => 'Automatic', 
                'body_type' => 'Sedan', 
                'car_condition' => 'New', 
                'image' => 'assets/uploads/6992f487b808a_Mercedes_Benz_C_Class_AMG_Line.jpg', 
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'id' => 3, 
                'make' => 'Mercedes-Benz', 
                'model' => 'S-Class Maybach', 
                'price' => 185000.00, 
                'year' => 2024, 
                'mileage' => 100, 
                'fuel_type' => 'Petrol', 
                'transmission' => 'Automatic', 
                'body_type' => 'Sedan', 
                'car_condition' => 'New', 
                'image' => 'assets/uploads/6992f4af0ca5b_Mercedes_Benz_S.jpg', 
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'id' => 4, 
                'make' => 'Porsche', 
                'model' => '911 Carrera S', 
                'price' => 129999.99, 
                'year' => 2023, 
                'mileage' => 1200, 
                'fuel_type' => 'Petrol', 
                'transmission' => 'PDK', 
                'body_type' => 'Coupe', 
                'car_condition' => 'New', 
                'image' => 'assets/uploads/698c01ef3b241_Porsche_911.jpg', 
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'id' => 5, 
                'make' => 'Toyota', 
                'model' => 'Camry XSE', 
                'price' => 35999.99, 
                'year' => 2024, 
                'mileage' => 50, 
                'fuel_type' => 'Hybrid', 
                'transmission' => 'CVT', 
                'body_type' => 'Sedan', 
                'car_condition' => 'New', 
                'image' => 'assets/uploads/6989e1e9247e2_Toyota_Camry.jpg', 
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'id' => 6, 
                'make' => 'Lamborghini', 
                'model' => 'Urus Performante', 
                'price' => 249999.99, 
                'year' => 2023, 
                'mileage' => 500, 
                'fuel_type' => 'Petrol', 
                'transmission' => 'Automatic', 
                'body_type' => 'SUV', 
                'car_condition' => 'New', 
                'image' => 'assets/uploads/6992f5355d450_Lamborghini_Urus_Performante.jpg', 
                'created_at' => date('Y-m-d H:i:s')
            ]
        ];
    }
}

// C. Fetch Brands - UPDATED to use 'active' instead of 'available'
$brands = [];
if ($conn) {
    $brand_query = "SELECT DISTINCT make FROM cars WHERE status = 'active' ORDER BY make LIMIT 10";
    $brand_result = mysqli_query($conn, $brand_query);
    if ($brand_result) {
        while ($row = mysqli_fetch_assoc($brand_result))
            $brands[] = $row['make'];
    }
}
if (empty($brands))
    $brands = ['BMW', 'Mercedes-Benz', 'Porsche', 'Toyota', 'Lamborghini', 'Audi', 'Ferrari', 'McLaren'];

// D. Fetch Testimonials
$testimonials = [];
if ($conn) {
    $t_query = "SELECT * FROM testimonials WHERE status = 'approved' ORDER BY created_at DESC LIMIT 5";
    $t_result = mysqli_query($conn, $t_query);
    while ($row = mysqli_fetch_assoc($t_result))
        $testimonials[] = $row;
}
if (empty($testimonials)) {
    $testimonials = [
        ['customer_name' => 'Alex D.', 'content' => 'The process was seamless. Pure luxury from start to finish.', 'rating' => 5, 'car_model' => 'Porsche 911', 'customer_image' => 'https://randomuser.me/api/portraits/men/32.jpg'],
        ['customer_name' => 'Sarah L.', 'content' => 'AutoElite defined what a car buying experience should be.', 'rating' => 5, 'car_model' => 'Mercedes AMG', 'customer_image' => 'https://randomuser.me/api/portraits/women/44.jpg'],
        ['customer_name' => 'James B.', 'content' => 'Exceptional inventory and even better service.', 'rating' => 5, 'car_model' => 'Audi RS7', 'customer_image' => 'https://randomuser.me/api/portraits/men/85.jpg']
    ];
}

// E. Handle Contact Form Submission
$form_success = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contact_submit'])) {
    // Get form data
    $name = sanitize($conn, $_POST['name'] ?? '');
    $email = sanitize($conn, $_POST['email'] ?? '');
    $phone = sanitize($conn, $_POST['phone'] ?? '');
    $message = sanitize($conn, $_POST['message'] ?? '');
    
    // Subject changed from "Inquiry" to "Contact"
    $subject = "Contact";
    
    // Save to database if connection exists
    if ($conn) {
        // Check if contact_messages table exists
        $table_check = mysqli_query($conn, "SHOW TABLES LIKE 'contact_messages'");
        if (mysqli_num_rows($table_check) == 0) {
            // Create contact_messages table if it doesn't exist
            $create_table = "CREATE TABLE IF NOT EXISTS contact_messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                subject VARCHAR(200) NOT NULL,
                message TEXT NOT NULL,
                status ENUM('unread', 'read', 'replied', 'archived') DEFAULT 'unread',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )";
            mysqli_query($conn, $create_table);
        }
        
        // Insert the message
        $insert_query = "INSERT INTO contact_messages (name, email, phone, subject, message, status) 
                         VALUES ('$name', '$email', '$phone', '$subject', '$message', 'unread')";
        
        if (mysqli_query($conn, $insert_query)) {
            $form_success = true;
        }
    } else {
        // Fallback if no database connection
        $form_success = true;
    }
}

// ============================================================================
// FIXED: Simple function to display car images from local folder
// ============================================================================
function getCarImage($dbImage, $carMake = '') {
    // If we have a database image path, use it directly
    if (!empty($dbImage)) {
        // Return the path exactly as stored in database
        return $dbImage;
    }
    
    // If no image, return empty (let the onerror handle fallback)
    return '';
}

// Function to format price in USD
function formatPriceUSD($price) {
    return '$' . number_format($price, 0);
}
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="AutoElite - The World's Premier Luxury Automotive Marketplace">
    <title>AutoElite | The Collection</title>

    <!-- 4. LIBRARIES & FONTS -->
    <!-- -------------------------------------------------------------------------------- -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />

    <!-- 5. CORE CSS STYLES -->
    <!-- -------------------------------------------------------------------------------- -->
    <style>
        :root {
            --c-bg: #ffffff;
            --c-surface: #f7f9fc;
            --c-surface-2: #edf1f7;
            --c-text: #0f172a;
            --c-text-muted: #64748b;
            --c-accent: #1e6bb8;
            --c-accent-hover: #155a9c;
            --c-border: rgba(15,23,42,0.08);
            
            --f-display: 'Space Grotesk', sans-serif;
            --f-body: 'Outfit', sans-serif;
            
            --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
            --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
            
            --box-shadow: 0 4px 20px rgba(15,23,42,0.06);
        }

        /* RESET & BASE */
        * { margin: 0; padding: 0; box-sizing: border-box; outline: none; }
        ::selection { background: var(--c-accent); color: #ffffff; }
        
        html { 
            scroll-behavior: smooth; 
            font-size: 16px;
        }
        
        body {
            background-color: var(--c-bg);
            color: var(--c-text);
            font-family: var(--f-body);
            line-height: 1.6;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            opacity: 1;
        }
        
        a { text-decoration: none; color: inherit; transition: color 0.3s ease; }
        ul { list-style: none; }
        img { display: block; max-width: 100%; height: auto; object-fit: cover; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        /* TYPOGRAPHY */
        .text-display { font-family: var(--f-display); font-weight: 600; line-height: 1.1; letter-spacing: -0.03em; }
        .text-body { font-family: var(--f-body); }
        
        h1, h2, h3, h4, .h1, .h2, .h3 { font-family: var(--f-display); font-weight: 600; letter-spacing: -0.02em; }
        
        .section-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
        }
        
        .section-subtitle {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: #1e6bb8;
            margin-bottom: 1rem;
            display: block;
        }

        /* LAYOUT UTILS */
        .container {
            width: 100%;
            max-width: 1600px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .section { padding: 8rem 0; position: relative; }
        .section-lg { padding: 12rem 0; }
        
        .grid { display: grid; gap: 2rem; }
        .flex { display: flex; gap: 1rem; }
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .flex-between { display: flex; align-items: center; justify-content: space-between; }

        /* COMPONENTS */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 1.2rem 2.5rem;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
            color: var(--c-text);
            border: 1px solid var(--c-border);
            position: relative;
            overflow: hidden;
            z-index: 1;
            transition: all 0.4s var(--ease-out);
            background: transparent;
            border-radius: 8px;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: var(--c-accent);
            z-index: -1;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.4s var(--ease-out);
        }
        
        .btn:hover { color: #ffffff; border-color: var(--c-accent); }
        .btn:hover::before { transform: scaleX(1); transform-origin: left; }
        
        .btn-primary { 
            background: var(--c-accent); 
            color: #ffffff; 
            border-color: var(--c-accent); 
        }
        .btn-primary:hover { 
            background: transparent; 
            color: var(--c-accent); 
        }
        .btn-primary::before { background: var(--c-accent); }
        
        /* FIX: Inventory button hover text color */
        nav.scrolled .btn-primary:hover {
            color: var(--c-accent) !important;
        }
        
        /* Special white button for hero section */
        .btn-hero-white {
            background: #ffffff;
            color: #0f172a;
            border-color: #ffffff;
        }
        
        .btn-hero-white:hover {
            background: transparent;
            color: #ffffff;
            border-color: #ffffff;
        }

        /* Success Message */
        .success-message {
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            border-left: 4px solid #28a745;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .success-message i {
            color: #28a745;
        }

        /* Filter Badge */
        .filter-badge {
            display: inline-block;
            background: var(--c-accent);
            color: white;
            padding: 0.5rem 1rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border-radius: 6px;
        }
        
        .clear-filters {
            color: var(--c-text-muted);
            text-decoration: underline;
            font-size: 0.8rem;
            margin-left: 1rem;
        }
        
        .clear-filters:hover {
            color: var(--c-accent);
        }
        
        .no-results {
            text-align: center;
            padding: 4rem;
            background: var(--c-surface);
            border: 1px solid var(--c-border);
            grid-column: 1 / -1;
            border-radius: 12px;
        }
        
        .no-results i {
            font-size: 3rem;
            color: var(--c-text-muted);
            margin-bottom: 1rem;
        }

        /* NAV */
        nav {
            position: fixed;
            top: 0; left: 0; width: 100%;
            padding: 1rem;
            z-index: 1000;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            color: #ffffff;
            background: transparent;
            backdrop-filter: blur(0px);
        }
        
        nav.scrolled {
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(15, 23, 42, 0.08);
            color: var(--c-text);
            box-shadow: 0 4px 20px rgba(15,23,42,0.06);
            transform: translateY(0);
        }
        
        nav:not(.scrolled) {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        
        .nav-inner {
            display: flex; justify-content: space-between; align-items: center;
        }
        
        .logo { font-family: var(--f-display); font-size: 1.8rem; letter-spacing: 0.05em; font-weight: 700; color: inherit; }
        
        .nav-links { display: flex; gap: 3rem; }
        .nav-links a { 
            font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.9; 
            position: relative;
            font-weight: 500;
            color: inherit;
            transition: opacity 0.3s ease;
        }
        .nav-links a::after {
            content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: var(--c-accent);
            transition: width 0.3s ease;
        }
        .nav-links a:hover { opacity: 1; }
        .nav-links a:hover::after { width: 100%; }
        
        nav:not(.scrolled) .nav-links a { color: #ffffff; opacity: 0.9; }
        nav:not(.scrolled) .logo { color: #ffffff; }
        nav:not(.scrolled) .btn-primary { background: var(--c-accent); color: #ffffff; border-color: var(--c-accent); }
        nav:not(.scrolled) .btn-primary:hover { background: transparent; color: #ffffff; border-color: var(--c-accent); }

        /* Service dropdown styling - WITH PLUS ICON */
        .service-menu {
            position: relative;
            display: inline-block;
        }
        
        .service-menu > a i {
            margin-left: 5px;
            font-size: 0.8rem;
            transition: transform 0.3s ease;
        }
        
        .service-menu:hover > a i {
            transform: rotate(90deg);
        }
        
        .service-menu .dropdown-content {
            display: none;
            position: absolute;
            background: rgba(255, 255, 255, 0.98);
            min-width: 200px;
            box-shadow: 0 8px 30px rgba(15,23,42,0.12);
            z-index: 1001;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(15,23,42,0.08);
            border-radius: 8px;
            top: 100%;
            left: 0;
            padding: 0.5rem 0;
            overflow: hidden;
        }
        
        nav.scrolled .service-menu .dropdown-content {
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid rgba(15,23,42,0.08);
        }
        
        nav.scrolled .service-menu .dropdown-content a {
            color: var(--c-text) !important;
        }
        
        nav.scrolled .service-menu .dropdown-content a:hover {
            color: var(--c-accent) !important;
        }
        
        .service-menu .dropdown-content a {
            display: block;
            padding: 0.75rem 1.5rem;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            color: var(--c-text) !important;
            white-space: nowrap;
            transition: background 0.2s ease, color 0.2s ease;
        }
        
        .service-menu .dropdown-content a:hover {
            background: rgba(30, 107, 184, 0.06);
            color: var(--c-accent) !important;
        }
        
        .service-menu:hover .dropdown-content {
            display: block;
        }
        
        nav:not(.scrolled) .service-menu .dropdown-content {
            background: rgba(255, 255, 255, 0.98);
        }

        .mobile-toggle {
            display: none;
            color: inherit;
            font-size: 1.5rem;
            margin-left: 1rem;
            z-index: 1001;
        }

        /* HERO */
        .hero {
            height: 100vh;
            width: 100%;
            position: relative;
            overflow: visible;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20;
        }
        
        .hero-video {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;
            opacity: 1;
            z-index: 0;
        }
        
        .hero-overlay {
            position: absolute; inset: 0;
            
            z-index: 1;
        }
        
        .hero-overlay::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
                ellipse at center,
                rgba(0, 0, 0, 0.15) 0%,
                rgba(0, 0, 0, 0.5) 100%
            );
            mix-blend-mode: multiply;
        }
        
        .hero-content {
            position: relative; z-index: 2; text-align: center; max-width: 1200px; padding: 2rem;
            color: #ffffff !important;
        }
        
        .hero-content .section-subtitle {
            color: #E6E6E6;
        }
        
        .hero-title {
            font-size: clamp(3rem, 8.5vw, 7.2rem);
            line-height: 1.15;
            margin-bottom: 2rem;
            color: #ffffff !important;
        }
        
        .hero-subtitle {
            font-size: 1.2rem; color: rgba(255,255,255,0.9); margin-bottom: 3rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        /* SEARCH SECTION */
        .hero-search-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 21;
            transform: translateY(50%);
            pointer-events: none;
        }
        
        .search-form-wrapper {
            background: var(--c-bg);
            padding: 3rem;
            border: 1px solid var(--c-border);
            border-radius: 16px;
            box-shadow: 0 8px 40px rgba(15,23,42,0.08);
            max-width: 1200px;
            margin: 0 auto;
            pointer-events: auto;
        }

        /* CONTENT AFTER HERO */
        .content-after-hero {
            position: relative;
            z-index: 10;
            background: var(--c-bg);
        }

        /* ========== CAR CARDS - EXACT MATCH TO INVENTORY.PHP ========== */
        .cars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 3rem;
            margin: 3rem 0;
        }
        
        .car-card {
            background: var(--c-bg);
            border: 1px solid var(--c-border);
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        .car-card:hover {
            transform: translateY(-8px);
            border-color: var(--c-accent);
            box-shadow: 0 12px 40px rgba(15,23,42,0.12);
        }
        
        .car-img-box {
            position: relative;
            height: 280px;
            overflow: hidden;
            background: var(--c-surface);
        }
        
        .car-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s var(--ease-out);
        }
        
        .car-card:hover .car-img-box img {
            transform: scale(1.05);
        }
        
        /* Image error fallback styling */
        .car-img-box img.error-fallback {
            object-fit: contain;
            background: var(--c-surface);
            padding: 2rem;
        }
        
        /* YEAR BADGE - REPLACES NEW/USED BADGE */
        .car-year-badge {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            background: #ffffff;
            padding: 0.5rem 1rem;
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            color: var(--c-text);
            border-radius: 6px;
            z-index: 2;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(15,23,42,0.1);
        }
        
        .car-details {
            padding: 1.75rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        
        /* PRICE ON TOP - USD FORMAT */
        .car-price {
            font-size: 1.35rem;
            font-weight: 600;
            color: var(--c-accent);
            margin-bottom: 0.5rem;
            font-family: var(--f-display);
            order: 1;
        }
        
        /* NAME BELOW PRICE */
        .car-name {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.25rem;
            font-family: var(--f-display);
            letter-spacing: -0.02em;
            line-height: 1.2;
            color: var(--c-text);
            order: 2;
        }
        
        /* HIDE THE OLD CAR-MAKE (if any) */
        .car-make {
            display: none;
        }
        
        .car-specs {
            display: flex;
            justify-content: space-between;
            padding: 1.25rem 0 0.25rem;
            border-top: 1px solid var(--c-border);
            color: var(--c-text-muted);
            font-size: 0.85rem;
            order: 3;
        }
        
        .spec {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
        }
        
        .spec i {
            font-size: 1rem;
            color: var(--c-accent);
        }
        
        .car-actions {
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            order: 4;
        }
        
        .car-actions .btn {
            flex: 1;
            padding: 0.9rem 0.5rem;
            font-size: 0.8rem;
        }
        /* ========== END CAR CARDS ========== */

        /* BRANDS MARQUEE */
        .brands-marquee {
            padding: 4rem 0; 
            border-top: 1px solid var(--c-border); 
            border-bottom: 1px solid var(--c-border); 
            overflow: hidden; 
            background: var(--c-surface);
        }
        
        .marquee-track {
            display: flex; 
            gap: 5rem; 
            width: max-content; 
            animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee { 
            0% { transform: translateX(0); } 
            100% { transform: translateX(-50%); } 
        }
        
        .service-card {
            padding: 3rem; 
            background: var(--c-surface-2); 
            border: 1px solid var(--c-border); 
            border-radius: 12px;
            transition: 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            border-color: var(--c-accent);
            box-shadow: var(--box-shadow);
        }
        
        .service-card .service-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(30, 107, 184, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }
        
        .service-card .service-icon i {
            font-size: 1.5rem;
            color: var(--c-accent);
        }

        /* VIDEO SHOWCASE SECTION - WITH ACTUAL VIDEO */
        .video-showcase {
            position: relative;
            height: 800px;
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .video-showcase-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }
        
        .video-showcase-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
                135deg,
                rgba(15, 23, 42, 0.6) 0%,
                rgba(15, 23, 42, 0.3) 50%,
                rgba(15, 23, 42, 0.6) 100%
            );
            z-index: 2;
        }
        
        .video-showcase-content {
            position: relative;
            z-index: 3;
            text-align: center;
            color: white;
        }
        
        .video-showcase-play-btn {
            display: inline-flex;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid white;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            margin-bottom: 2rem;
            transition: all 0.4s ease;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
        
        .video-showcase-play-btn:hover {
            background: var(--c-accent);
            border-color: var(--c-accent);
            transform: scale(1.15);
        }
        
        .video-showcase-title {
            font-size: clamp(2rem, 5vw, 4rem);
            font-family: var(--f-display);
            color: white;
            margin-bottom: 1rem;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
        
        .video-showcase-subtitle {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.9);
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* TESTIMONIALS WITH ARROWS BELOW */
        .testimonial-wrapper {
            position: relative;
            margin-top: 4rem;
        }
        
        .testimonial-swiper {
            overflow: hidden;
            width: 100%;
        }
        
        .testimonial-swiper .swiper-wrapper {
            display: flex;
        }
        
        .testimonial-swiper .swiper-slide {
            flex-shrink: 0;
            width: 400px;
            margin-right: 2rem;
            height: auto;
        }
        
        .testimonial-card {
            background: var(--c-surface); 
            padding: 3rem; 
            border: 1px solid var(--c-border); 
            border-radius: 12px;
            height: 100%;
        }
        
        .testimonial-navigation {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 3rem;
        }
        
        .testimonial-arrow {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--c-bg);
            border: 1px solid var(--c-border);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--c-text);
        }
        
        .testimonial-arrow:hover {
            background: var(--c-accent);
            border-color: var(--c-accent);
            color: white;
        }
        
        .testimonial-arrow i {
            font-size: 1.2rem;
        }
        
        .faq-section {
            background: var(--c-surface);
        }
        
        /* FAQ Accordion styling */
        .faq-section details summary i {
            color: var(--c-accent);
            transition: transform 0.3s ease;
        }
        
        .faq-section details[open] summary i {
            transform: rotate(180deg);
        }

        /* ABOUT US SECTION */
        .about-section {
            background: var(--c-bg);
            padding: 8rem 0;
        }
        
        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: center;
        }
        
        .about-image {
            position: relative;
            height: 700px;
            overflow: hidden;
            border-radius: 12px;
        }
        
        .about-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        
        .about-image:hover img {
            transform: scale(1.05);
        }
        
        .about-image::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(145deg, rgba(30,107,184,0.15) 0%, rgba(0,0,0,0) 70%);
            pointer-events: none;
        }
        
        .about-content {
            padding-right: 2rem;
        }
        
        .about-content h2 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
        }
        
        .about-content p {
            color: var(--c-text-muted);
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .about-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--c-border);
        }
        
        .about-stat-item {
            text-align: left;
        }
        
        .about-stat-number {
            font-size: 2rem;
            font-family: var(--f-display);
            font-weight: 700;
            color: var(--c-accent);
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .about-stat-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--c-text-muted);
        }
        
        .contact-form {
            background: var(--c-bg); 
            padding: 4rem; 
            border: 1px solid var(--c-border);
            border-radius: 12px;
        }
        
        .contact-form input,
        .contact-form textarea {
            width: 100%; 
            background: transparent; 
            border: none; 
            border-bottom: 1px solid var(--c-border); 
            padding: 0.5rem 0; 
            color: var(--c-text) !important;
            font-family: var(--f-body);
            transition: border-color 0.3s ease, background 0.3s ease;
        }
        
        .contact-form input:focus,
        .contact-form textarea:focus {
            border-bottom-color: var(--c-accent);
            outline: none;
            background: rgba(30, 107, 184, 0.02);
        }
        
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
            color: var(--c-text-muted);
        }
        
        .contact-form label {
            display: block; 
            margin-bottom: 0.5rem; 
            text-transform: uppercase; 
            font-size: 0.8rem; 
            letter-spacing: 0.1em;
            color: var(--c-text-muted);
        }
        
        .stats-section {
            border-top: 0px solid var(--c-border); 
            border-bottom: 1px solid var(--c-border); 
            padding-top: 6rem; 
            margin-top: 4rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-item .text-display {
            color: var(--c-accent);
        }
        
        /* Form row for side-by-side fields */
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .form-row .form-group {
            margin-bottom: 0;
        }
        
        @media (max-width: 1024px) {
            .video-showcase { height: 660px; }
            .video-showcase-title { font-size: clamp(2.5rem, 6vw, 3.5rem); }
            .video-showcase-subtitle { font-size: 1.3rem; padding: 0 1rem; }
            .faq-section .grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .about-grid { grid-template-columns: 1fr; gap: 3rem; }
            .about-image { height: 500px; }
            .about-content { padding-right: 0; }
            .stats-section .grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 2rem;
            }
            #contact .grid { gap: 2rem !important; }
            .contact-form { padding: 3rem !important; }
            .form-row { grid-template-columns: 1fr; gap: 1rem; }
        }

        @media (max-width: 975px) {
            .mobile-toggle { 
                display: block; 
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 400px;
                height: 100vh;
                background: rgba(15, 23, 42, 0.98);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                z-index: 1000;
                gap: 2rem;
                padding: 2rem;
                border-left: 1px solid rgba(255,255,255,0.1);
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li { width: 100%; text-align: center; }
            .nav-links a { font-size: 1.2rem; color: #ffffff !important; }
            
            nav.scrolled .nav-links a { color: #ffffff !important; }
            
            .service-menu .dropdown-content {
                position: static;
                display: none;
                background: transparent !important;
                border: none !important;
                box-shadow: none;
                width: 100%;
                padding: 1rem 0 0 0;
            }
            
            .service-menu.active .dropdown-content {
                display: block;
            }

            .desk-collection-btn {
                display: none !important;
            }
            
            .mobile-collection-btn {
                display: block !important;
                margin-top: 1rem;
                width: 100%;
            }
            
            .nav-links .mobile-collection-btn a.btn,
            nav.scrolled .nav-links .mobile-collection-btn a.btn {
                background: var(--c-accent) !important;
                color: #ffffff !important;
                border: 1px solid var(--c-accent) !important;
            }

            .nav-links.active + .flex-center .mobile-toggle {
                color: #ffffff !important;
            }
        }

        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .testimonial-swiper .swiper-slide {
                width: 300px;
            }
            
            @media (max-width: 585px) {
                .hero-content {
                    padding-bottom: 12rem;
                }
                
                .hero-content .flex-center {
                    display: none !important;
                }
            }
            
            .video-showcase { height: 560px; }
            
            .video-showcase-play-btn {
                width: 80px;
                height: 80px;
                font-size: 1.5rem;
            }
            
            .video-showcase-title {
                font-size: 2.2rem;
            }
            
            .video-showcase-subtitle {
                font-size: 1.15rem;
            }
            
            .about-stats {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .cars-grid {
                grid-template-columns: 1fr;
            }
            .stats-section {
                padding-top: 22rem;
            }
            
            .stats-section .grid {
                grid-template-columns: 1fr 1fr !important;
                gap: 2.5rem;
            }
            
            .search-form-wrapper {
                padding: 1.5rem;
            }
            
            .hero-search-container {
                transform: translateY(20%);
            }
            
            #contact .grid {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
            }
            
            .contact-form {
                padding: 2rem !important;
            }
            
            .section {
                padding: 5rem 0;
            }
            
            .section-lg {
                padding: 6rem 0;
            }
            
        }

        /* Footer Styles */
        footer {
            background: var(--c-surface);
            padding: 5rem 0 2rem;
            border-top: 1px solid var(--c-border);
            color: var(--c-text-muted);
        }
        
        footer a {
            color: var(--c-text) !important;
            transition: color 0.3s ease;
        }
        
        footer a:hover {
            color: var(--c-accent) !important;
        }
        
        footer h4 {
            color: var(--c-text) !important;
            margin-bottom: 1.5rem;
            letter-spacing: 0.1em;
            font-size: 0.9rem;
            text-transform: uppercase;
        }
        
        footer .logo {
            color: var(--c-text) !important;
            display: block;
            margin-bottom: 1.5rem;
        }
        
        footer .flex-between,
        footer .flex-between a {
            color: var(--c-text-muted) !important;
        }
        
        footer .flex-between a:hover {
            color: var(--c-accent) !important;
        }
        
        .mobile-collection-btn {
            display: none;
        }
    </style>
</head>
<body>

    <!-- NAV - WITH PLUS ICON ON SERVICES -->
    <nav id="navbar">
        <div class="container nav-inner">
            <a href="index.php" class="logo">AUTOELITE</a>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="inventory.php">Inventory</a></li>
                <li class="service-menu">
                    <a href="#">Services <i class="fas fa-plus"></i></a>
                    <div class="dropdown-content">
                        <a href="inspection.php">Inspection</a>
                        <a href="warranty.php">Warranty</a>
                        <a href="financing.php">Financing</a>
                    </div>
                </li>
                <li><a href="about.php">About</a></li>
                <li><a href="contact.php">Contact</a></li>
                <li class="mobile-collection-btn"><a href="inventory.php" class="btn btn-primary" style="padding: 0.8rem 1.5rem; width: 100%; justify-content: center;">Collection</a></li>
            </ul>
            <div class="flex-center">
                <a href="inventory.php" class="btn btn-primary desk-collection-btn" style="padding: 0.8rem 1.5rem;">Collection</a>
                <button class="mobile-toggle" aria-label="Toggle Navigation">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- HERO WITH INTEGRATED SEARCH -->
    <section class="hero">
        <video class="hero-video" autoplay muted loop playsinline poster="assets/hero-poster.jpg">
            <source src="assets/uploads/hero-video.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <span class="section-subtitle">Est. 2026</span>
            <h1 class="hero-title">Find Your Future <br>Car Today</h1>
            <p class="hero-subtitle">Curated excellence for the modern connoisseur.</p>
            <div class="flex-center" style="gap: 1rem;">
                <a href="inventory.php" class="btn btn-hero-white">View Collection</a>
                <a href="contact.php" class="btn btn-primary">Consign Vehicle</a>
            </div>
        </div>
        
        <!-- SEARCH / FILTER - NOW SUBMITS TO INDEX.PHP (SAME PAGE) -->
        <div class="hero-search-container" id="search">
            <div class="container">
                <div class="search-form-wrapper">
                    <form method="GET" action="index.php#collection" class="grid search-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--c-text-muted);">Make</label>
                            <select name="make" style="width: 100%; padding: 1rem; background: var(--c-bg); color: var(--c-text); border: 1px solid var(--c-border); text-transform: uppercase; border-radius: 8px;">
                                <option value="">All Makes</option>
                                <?php foreach ($brands as $b): ?>
                                <option value="<?php echo $b; ?>" <?php if (isset($_GET['make']) && $_GET['make'] == $b) echo 'selected'; ?>><?php echo $b; ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--c-text-muted);">Min Price</label>
                            <select name="min_price" style="width: 100%; padding: 1rem; background: var(--c-bg); color: var(--c-text); border: 1px solid var(--c-border); border-radius: 8px;">
                                <option value="">Any</option>
                                <option value="50000" <?php if (isset($_GET['min_price']) && $_GET['min_price'] == '50000') echo 'selected'; ?>>$50k</option>
                                <option value="100000" <?php if (isset($_GET['min_price']) && $_GET['min_price'] == '100000') echo 'selected'; ?>>$100k</option>
                                <option value="200000" <?php if (isset($_GET['min_price']) && $_GET['min_price'] == '200000') echo 'selected'; ?>>$200k</option>
                                <option value="500000" <?php if (isset($_GET['min_price']) && $_GET['min_price'] == '500000') echo 'selected'; ?>>$500k</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--c-text-muted);">Max Price</label>
                            <select name="max_price" style="width: 100%; padding: 1rem; background: var(--c-bg); color: var(--c-text); border: 1px solid var(--c-border); border-radius: 8px;">
                                <option value="">Any</option>
                                <option value="100000" <?php if (isset($_GET['max_price']) && $_GET['max_price'] == '100000') echo 'selected'; ?>>$100k</option>
                                <option value="200000" <?php if (isset($_GET['max_price']) && $_GET['max_price'] == '200000') echo 'selected'; ?>>$200k</option>
                                <option value="500000" <?php if (isset($_GET['max_price']) && $_GET['max_price'] == '500000') echo 'selected'; ?>>$500k</option>
                                <option value="1000000" <?php if (isset($_GET['max_price']) && $_GET['max_price'] == '1000000') echo 'selected'; ?>>$1M+</option>
                            </select>
                        </div>
                        <div class="form-group" style="display: flex; align-items: end;">
                            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
                                <i class="fas fa-search"></i> Search Inventory
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTENT AFTER HERO -->
    <div class="content-after-hero">
        
        <!-- STATS -->
        <section class="section stats-section" id="stats">
            <div class="container grid" style="grid-template-columns: repeat(4, 1fr);">
                <div class="stat-item" data-aos="fade-up" data-aos-delay="0">
                    <span class="text-display" style="font-size: 3rem; display: block; color: var(--c-accent);">150+</span>
                    <span class="text-body" style="color: var(--c-text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Exotic Vehicles</span>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="100">
                    <span class="text-display" style="font-size: 3rem; display: block; color: var(--c-accent);">12</span>
                    <span class="text-body" style="color: var(--c-text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Global Locations</span>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="200">
                    <span class="text-display" style="font-size: 3rem; display: block; color: var(--c-accent);">24/7</span>
                    <span class="text-body" style="color: var(--c-text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Concierge Service</span>
                </div>
                <div class="stat-item" data-aos="fade-up" data-aos-delay="300">
                    <span class="text-display" style="font-size: 3rem; display: block; color: var(--c-accent);">$500M+</span>
                    <span class="text-body" style="color: var(--c-text-muted); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Inventory Value</span>
                </div>
            </div>
        </section>

        <!-- COLLECTION (FEATURED OR FILTERED RESULTS) -->
        <section class="section section-lg" id="collection">
            <div class="container">
                <div class="flex-between" style="margin-bottom: 2rem; flex-wrap: wrap; gap: 2rem;">
                    <div data-aos="fade-right">
                        <span class="section-subtitle">Curated Selection</span>
                        <h2 class="section-title">
                            The Collection
                        </h2>
                    </div>
                    <div data-aos="fade-left" style="display: flex; align-items: center; gap: 1rem;">
                        <?php if ($is_filtered): ?>
                            <span class="filter-badge">
                                <i class="fas fa-filter"></i> Filtered
                            </span>
                            <a href="index.php#collection" class="clear-filters">Clear Filters</a>
                        <?php endif; ?>
                        <a href="inventory.php" class="btn">View Full Inventory</a>
                    </div>
                </div>
                
                <?php if ($is_filtered): ?>
                <div style="margin-bottom: 2rem;">
                    <p style="color: var(--c-text-muted);">
                        Found <?php echo count($display_cars); ?> vehicle<?php echo count($display_cars) != 1 ? 's' : ''; ?> matching your criteria
                    </p>
                </div>
                <?php endif; ?>
                
                <!-- CAR CARDS GRID -->
                <div class="cars-grid">
                    <?php 
                    if (empty($display_cars)): 
                    ?>
                    <div class="no-results">
                        <i class="fas fa-car"></i>
                        <h3>No Vehicles Found</h3>
                        <p style="color: var(--c-text-muted); margin-top: 1rem;">Try adjusting your filter criteria</p>
                        <a href="index.php#collection" class="btn btn-primary" style="margin-top: 2rem; display: inline-flex;">Clear Filters</a>
                    </div>
                    <?php 
                    else:
                        $delay = 0;
                        foreach ($display_cars as $car): 
                    ?>
                    <div class="car-card" data-aos="fade-up" data-aos-delay="<?php echo $delay; ?>">
                        <div class="car-img-box">
                            <img src="<?php echo htmlspecialchars($car['image'] ?? ''); ?>" 
                                 alt="<?php echo htmlspecialchars($car['make'] . ' ' . $car['model']); ?>"
                                 onerror="this.onerror=null; this.src='assets/uploads/placeholder.jpg'; this.classList.add('error-fallback');">
                            <!-- YEAR BADGE -->
                            <span class="car-year-badge">
                                <?php echo $car['year'] ?? '2024'; ?>
                            </span>
                        </div>
                        <div class="car-details">
                            <!-- PRICE ON TOP (USD) -->
                            <span class="car-price"><?php echo formatPriceUSD($car['price'] ?? 0); ?></span>
                            <!-- NAME BELOW PRICE -->
                            <h3 class="car-name"><?php echo htmlspecialchars($car['make'] . ' ' . $car['model']); ?></h3>
                            <!-- CAR SPECS - with icons -->
                            <div class="car-specs">
                                <div class="spec">
                                    <i class="fas fa-tachometer-alt"></i>
                                    <span><?php echo number_format($car['mileage'] ?? 0); ?> mi</span>
                                </div>
                                <div class="spec">
                                    <i class="fas fa-gas-pump"></i>
                                    <span><?php echo htmlspecialchars($car['fuel_type'] ?? 'Petrol'); ?></span>
                                </div>
                                <div class="spec">
                                    <i class="fas fa-cog"></i>
                                    <span><?php echo htmlspecialchars($car['transmission'] ?? 'Automatic'); ?></span>
                                </div>
                            </div>
                            <!-- ACTION BUTTONS - Now points to car_details.php -->
                            <div class="car-actions">
                                <a href="car_details.php?id=<?php echo $car['id']; ?>" class="btn btn-primary">
                                    View Details
                                </a>
                                <a href="contact.php?car=<?php echo urlencode($car['make'] . ' ' . $car['model']); ?>" class="btn">
                                    Inquire
                                </a>
                            </div>
                        </div>
                    </div>
                    <?php 
                        $delay += 50;
                        endforeach;
                    endif;
                    ?>
                </div>
            </div>
        </section>

        <!-- BRANDS MARQUEE -->
        <section class="brands-marquee">
            <div class="marquee-track">
                <?php for ($i = 0; $i < 2; $i++): ?>
                    <?php foreach ($brands as $b): ?>
                    <span class="text-display" style="font-size: 4rem; opacity: 0.3; color: transparent; -webkit-text-stroke: 1px var(--c-accent); padding: 0 2rem;"><?php echo strtoupper($b); ?></span>
                    <?php endforeach; ?>
                <?php endfor; ?>
            </div>
        </section>

        <!-- SERVICES -->
        <section class="section section-lg" id="services" style="background: var(--c-surface);">
            <div class="container">
                <span class="section-subtitle" style="text-align: center;">Our Expertise</span>
                <h2 class="section-title" style="text-align: center; margin-bottom: 5rem;">World-Class Services</h2>
                
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <div class="service-card" data-aos="fade-up" data-aos-delay="0">
                        <div class="service-icon"><i class="fas fa-search"></i></div>
                        <h3 class="h3" style="font-size: 1.5rem; margin-bottom: 1rem;">Sourcing</h3>
                        <p class="text-body" style="color: var(--c-text-muted);">We leverage our global network to find the exact configuration you desire, no matter how rare.</p>
                    </div>
                    <div class="service-card" data-aos="fade-up" data-aos-delay="100">
                        <div class="service-icon"><i class="fas fa-file-contract"></i></div>
                        <h3 class="h3" style="font-size: 1.5rem; margin-bottom: 1rem;">Financing</h3>
                        <p class="text-body" style="color: var(--c-text-muted);">Bespoke leasing and financing solutions tailored to your portfolio and requirements.</p>
                    </div>
                    <div class="service-card" data-aos="fade-up" data-aos-delay="200">
                        <div class="service-icon"><i class="fas fa-truck-plane"></i></div>
                        <h3 class="h3" style="font-size: 1.5rem; margin-bottom: 1rem;">Logistics</h3>
                        <p class="text-body" style="color: var(--c-text-muted);">White-glove delivery service to your doorstep anywhere in the world, fully insured.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- VIDEO SHOWCASE - WITH ACTUAL CAR VIDEO -->
        <section class="video-showcase">
            <video class="video-showcase-video" autoplay muted loop playsinline>
                <source src="assets/uploads/hero-video-2.mp4">
                
            </video>
            <div class="video-showcase-overlay"></div>
            <div class="video-showcase-content">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="video-showcase-play-btn">
                    <i class="fas fa-play" style="margin-left: 5px;"></i>
                </a>
                <h2 class="video-showcase-title">Craftsmanship in Motion</h2>
                <p class="video-showcase-subtitle">Experience the pinnacle of automotive engineering</p>
            </div>
        </section>

        <!-- TESTIMONIALS WITH ARROWS BELOW -->
        <section class="section section-lg">
            <div class="container">
                <div data-aos="fade-up">
                    <span class="section-subtitle">Client Stories</span>
                    <h2 class="section-title">Trusted by the Elite</h2>
                </div>
                
                <div class="testimonial-wrapper">
                    <!-- Swiper Container -->
                    <div class="swiper testimonial-swiper">
                        <div class="swiper-wrapper">
                            <?php foreach ($testimonials as $t): ?>
                            <div class="swiper-slide">
                                <div class="testimonial-card">
                                    <div class="flex" style="color: var(--c-accent); margin-bottom: 1.5rem;">
                                        <?php for ($i = 0; $i < $t['rating']; $i++) echo '<i class="fas fa-star"></i>'; ?>
                                    </div>
                                    <p style="font-size: 1.2rem; margin-bottom: 2rem; font-style: italic;">"<?php echo htmlspecialchars($t['content']); ?>"</p>
                                    <div class="flex-center" style="justify-content: start;">
                                        <img src="<?php echo htmlspecialchars($t['customer_image']); ?>" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 1rem;" onerror="this.onerror=null; this.src='https://randomuser.me/api/portraits/lego/1.jpg';">
                                        <div>
                                            <h4 class="h4" style="font-size: 1rem; margin-bottom: 0.2rem;"><?php echo htmlspecialchars($t['customer_name']); ?></h4>
                                            <span style="font-size: 0.8rem; color: var(--c-text-muted);">Owner, <?php echo htmlspecialchars($t['car_model']); ?></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    
                    <!-- Navigation Arrows (BELOW the slider) -->
                    <div class="testimonial-navigation">
                        <div class="testimonial-arrow testimonial-arrow-left">
                            <i class="fas fa-arrow-left"></i>
                        </div>
                        <div class="testimonial-arrow testimonial-arrow-right">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ with 2 NEW QUESTIONS -->
        <section class="section faq-section">
            <div class="container grid" style="grid-template-columns: 1fr 1.5fr; gap: 4rem;">
                <div data-aos="fade-right">
                    <span class="section-subtitle">Common Questions</span>
                    <h2 class="section-title">Everything You <br> Need To Know</h2>
                </div>
                <div data-aos="fade-left">
                    <details style="padding: 1.5rem 0; border-bottom: 1px solid var(--c-border); cursor: pointer;">
                        <summary style="font-size: 1.2rem; font-family: var(--f-display); list-style: none; display: flex; justify-content: space-between;">
                            How does the consignment process work? <i class="fas fa-angle-down"></i>
                        </summary>
                        <p style="margin-top: 1rem; color: var(--c-text-muted);">We handle photography, marketing, and negotiation. You simply approve the final sale price.</p>
                    </details>
                    <details style="padding: 1.5rem 0; border-bottom: 1px solid var(--c-border); cursor: pointer;">
                        <summary style="font-size: 1.2rem; font-family: var(--f-display); list-style: none; display: flex; justify-content: space-between;">
                            Do you offer international shipping? <i class="fas fa-angle-down"></i>
                        </summary>
                        <p style="margin-top: 1rem; color: var(--c-text-muted);">Yes, we have partners for air and sea freight to over 50 countries globally.</p>
                    </details>
                    <details style="padding: 1.5rem 0; border-bottom: 1px solid var(--c-border); cursor: pointer;">
                        <summary style="font-size: 1.2rem; font-family: var(--f-display); list-style: none; display: flex; justify-content: space-between;">
                            Are the vehicles inspected? <i class="fas fa-angle-down"></i>
                        </summary>
                        <p style="margin-top: 1rem; color: var(--c-text-muted);">Every vehicle undergoes a 150-point inspection by certified master technicians before listing.</p>
                    </details>
                    <!-- NEW FAQ 1 -->
                    <details style="padding: 1.5rem 0; border-bottom: 1px solid var(--c-border); cursor: pointer;">
                        <summary style="font-size: 1.2rem; font-family: var(--f-display); list-style: none; display: flex; justify-content: space-between;">
                            What warranty options are available? <i class="fas fa-angle-down"></i>
                        </summary>
                        <p style="margin-top: 1rem; color: var(--c-text-muted);">We offer comprehensive warranty packages ranging from 12 to 60 months, covering powertrain, electrical systems, and major components. Custom extended warranties are also available.</p>
                    </details>
                    <!-- NEW FAQ 2 -->
                    <details style="padding: 1.5rem 0; border-bottom: 1px solid var(--c-border); cursor: pointer;">
                        <summary style="font-size: 1.2rem; font-family: var(--f-display); list-style: none; display: flex; justify-content: space-between;">
                            Do you accept trade-ins? <i class="fas fa-angle-down"></i>
                        </summary>
                        <p style="margin-top: 1rem; color: var(--c-text-muted);">Absolutely. Our team of specialists will evaluate your current vehicle and provide a competitive market-rate offer. We accept all luxury and exotic brands regardless of age or mileage.</p>
                    </details>
                </div>
            </div>
        </section>

        <!-- ABOUT US SECTION -->
        <section class="about-section" id="about">
            <div class="container">
                <div class="about-grid">
                    <div class="about-image" data-aos="fade-right">
                        <img src="assets/uploads/about-home.jpg" alt="AutoElite Showroom" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1563720223485-884b46ce7c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';">
                    </div>
                    <div class="about-content" data-aos="fade-left">
                        <span class="section-subtitle">Legacy of Excellence</span>
                        <h2 class="section-title">About Us</h2>
                        <p>
                            Founded in 2026, AutoElite emerged from a singular vision: to transform the luxury automotive experience. What began as a curated collection of exceptional vehicles has evolved into the world's most prestigious automotive platform.
                        </p>
                        
                        <p>
                            Our concierge team, comprised of industry veterans and automotive specialists, provides white-glove service to a discerning global clientele. Whether acquiring, consigning, or simply seeking advice, the AutoElite experience is defined by discretion, expertise, and an unwavering commitment to excellence.
                        </p>
                        <div class="about-stats">
                            <div class="about-stat-item">
                                <span class="about-stat-number">500+</span>
                                <span class="about-stat-label">Vehicles Sold</span>
                            </div>
                            <div class="about-stat-item">
                                <span class="about-stat-number">50+</span>
                                <span class="about-stat-label">Countries Served</span>
                            </div>
                            <div class="about-stat-item">
                                <span class="about-stat-number">100%</span>
                                <span class="about-stat-label">Client Satisfaction</span>
                            </div>
                        </div>
                        <a href="about.php" class="btn btn-primary" style="margin-top: 2rem; display: inline-flex;">Discover Our Story</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- CONTACT with PHONE NUMBER ON LEFT SIDE -->
        <section class="section section-lg" id="contact" style="background: var(--c-surface);">
            <div class="container grid" style="grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;">
                <div data-aos="fade-right">
                    <span class="section-subtitle">Get in Touch</span>
                    <h2 class="section-title">Begin Your Journey</h2>
                    <p style="color: var(--c-text-muted); margin: 2rem 0; font-size: 1.1rem; max-width: 500px;">
                        Whether you are looking to acquire a specific vehicle or consign one from your collection, our specialists are at your service.
                    </p>
                    <div class="flex" style="flex-direction: column; gap: 1.5rem;">
                        <div class="flex-center" style="justify-content: start; gap: 1rem;">
                            <i class="fas fa-phone-alt" style="color: var(--c-accent);"></i>
                            <span>+1 (888) 555-0123</span>
                        </div>
                        <div class="flex-center" style="justify-content: start; gap: 1rem;">
                            <i class="fas fa-envelope" style="color: var(--c-accent);"></i>
                            <span>concierge@autoelite.com</span>
                        </div>
                        <div class="flex-center" style="justify-content: start; gap: 1rem;">
                            <i class="fas fa-map-marker-alt" style="color: var(--c-accent);"></i>
                            <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
                        </div>
                    </div>
                </div>
                
                <form method="POST" action="index.php#contact" class="contact-form" data-aos="fade-left">
                    <input type="hidden" name="contact_submit" value="1">
                    
                    <?php if ($form_success): ?>
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i> Thank you for your inquiry! A concierge will contact you within 24 hours.
                    </div>
                    <?php endif; ?>
                    
                    <!-- Form row with Full Name and Phone Number side by side -->
                    <div class="form-row">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" placeholder="Enter your full name" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="phone" placeholder="Enter your phone number">
                        </div>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 2rem;">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email address" required>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 2rem;">
                        <label>Message</label>
                        <textarea rows="4" name="message" placeholder="Tell us about your requirements..." required></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">
                        <i class="fas fa-paper-plane"></i> Send Inquiry
                    </button>
                </form>
            </div>
        </section>

    </div>

    <!-- FOOTER - LIGHT PROFESSIONAL DESIGN -->
    <footer>
        <div class="container">
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 4rem; margin-bottom: 4rem;">
                <div>
                    <a href="index.php" class="logo" style="display: block; margin-bottom: 1.5rem; color: var(--c-text) !important;">AUTOELITE</a>
                    <p style="color: var(--c-text-muted); font-size: 0.9rem; max-width: 300px;">
                        The world's premier destination for acquiring verified, investment-grade automotive assets.
                    </p>
                </div>
                <div>
                    <h4>Services</h4>
                    <ul style="display: grid; gap: 0.8rem; color: var(--c-text); font-size: 0.9rem;">
                        <li><a href="inspection.php">Inspection</a></li>
                        <li><a href="warranty.php">Warranty</a></li>
                        <li><a href="financing.php">Financing</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Social</h4>
                    <ul style="display: grid; gap: 0.8rem; color: var(--c-text); font-size: 0.9rem;">
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">YouTube</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Main</h4>
                    <ul style="display: grid; gap: 0.8rem; color: var(--c-text); font-size: 0.9rem;">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="inventory.php">Inventory</a></li>
                        <li><a href="about.php">About</a></li>
                        <li><a href="contact.php">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="flex-between" style="padding-top: 2rem; border-top: 1px solid var(--c-border); color: var(--c-text-muted); font-size: 0.8rem;">
                <span>&copy; 2026 AutoElite Motors. All rights reserved.</span>
                <div class="flex" style="gap: 1.5rem;">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- SCRIPTS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js"></script>
    <script>
        // Init Lenis smoothly
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical', 
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Init AOS
        AOS.init({
            duration: 800,
            offset: 50,
            once: true,
            easing: 'ease-out-cubic'
        });

        // Initialize Swiper for Testimonials
        document.addEventListener('DOMContentLoaded', function() {
            const testimonialSwiper = new Swiper('.testimonial-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                freeMode: true,
                grabCursor: true,
                navigation: {
                    nextEl: '.testimonial-arrow-right',
                    prevEl: '.testimonial-arrow-left',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 30
                    }
                }
            });
        });

        // Enhanced Sticky Nav Logic
        const nav = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Force nav to have proper state on page load
        document.addEventListener('DOMContentLoaded', () => {
            if (window.pageYOffset > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Page Load animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
        
        // Smooth scroll to contact section after form submission
        if (window.location.hash === '#contact') {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Smooth scroll to collection section if URL has #collection
        if (window.location.hash === '#collection') {
            setTimeout(() => {
                document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }

        // Auto-hide success message after 5 seconds
        setTimeout(function() {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.style.transition = 'opacity 0.5s';
                successMsg.style.opacity = '0';
                setTimeout(() => successMsg.remove(), 500);
            }
        }, 5000);

        // Mobile Navigation Toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        const mobileToggleIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                if (navLinks.classList.contains('active')) {
                    mobileToggleIcon.classList.remove('fa-bars');
                    mobileToggleIcon.classList.add('fa-times');
                } else {
                    mobileToggleIcon.classList.remove('fa-times');
                    mobileToggleIcon.classList.add('fa-bars');
                }
            });
        }
        
        // Toggle mobile dropdown
        const serviceMenu = document.querySelector('.service-menu > a');
        if (serviceMenu && window.innerWidth <= 768) {
            serviceMenu.addEventListener('click', (e) => {
                e.preventDefault();
                serviceMenu.parentElement.classList.toggle('active');
            });
        }
    </script>
</body>
</html>