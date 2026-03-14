/* ===================================================== */
/* DATABASE: HRM_SYSTEM                                   */
/* Phiên bản: 3.0 (Hoàn chỉnh - ĐÃ SỬA LỖI)              */
/* ===================================================== */

/* Xóa database cũ nếu tồn tại và tạo mới */
DROP DATABASE IF EXISTS HRM_SYSTEM;
CREATE DATABASE HRM_SYSTEM CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE HRM_SYSTEM;

/* ===================================================== */
/* 1. TẠO CÁC BẢNG (KHÔNG PHỤ THUỘC)                     */
/* ===================================================== */

/* Bảng quốc tịch */
CREATE TABLE nationalities (
    nationality_id INT AUTO_INCREMENT PRIMARY KEY,
    nationality_code VARCHAR(10) UNIQUE NOT NULL,
    nationality_name VARCHAR(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng ngân hàng */
CREATE TABLE banks (
    bank_id INT AUTO_INCREMENT PRIMARY KEY,
    bank_code VARCHAR(20) UNIQUE NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    swift_code VARCHAR(20),
    status BOOLEAN DEFAULT TRUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại bằng cấp */
CREATE TABLE qualification_types (
    qualification_type_id INT AUTO_INCREMENT PRIMARY KEY,
    qualification_type_code VARCHAR(20) UNIQUE NOT NULL,
    qualification_type_name VARCHAR(100) NOT NULL,
    description TEXT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại chứng chỉ */
CREATE TABLE certificate_types (
    certificate_type_id INT AUTO_INCREMENT PRIMARY KEY,
    certificate_type_code VARCHAR(20) UNIQUE NOT NULL,
    certificate_type_name VARCHAR(100) NOT NULL,
    description TEXT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại giấy tờ */
CREATE TABLE document_types (
    document_type_id INT AUTO_INCREMENT PRIMARY KEY,
    document_type_code VARCHAR(20) UNIQUE NOT NULL,
    document_type_name VARCHAR(100) NOT NULL,
    description TEXT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại hợp đồng */
CREATE TABLE contract_types (
    contract_type_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_type_code VARCHAR(20) UNIQUE NOT NULL,
    contract_type_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_probation BOOLEAN DEFAULT FALSE,
    max_duration_months INT,
    status BOOLEAN DEFAULT TRUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng chức vụ */
CREATE TABLE positions (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    position_code VARCHAR(20) UNIQUE NOT NULL,
    position_name VARCHAR(100) NOT NULL,
    job_description TEXT,
    requirements TEXT,
    salary_range_min DECIMAL(15, 2),
    salary_range_max DECIMAL(15, 2),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại nghỉ phép */
CREATE TABLE leave_types (
    leave_type_id INT AUTO_INCREMENT PRIMARY KEY,
    leave_type_code VARCHAR(20) UNIQUE NOT NULL,
    leave_type_name VARCHAR(100) NOT NULL,
    category ENUM(
        'ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID',
        'COMPENSATORY', 'MARRIAGE', 'FUNERAL', 'OTHER'
    ) NOT NULL,
    is_paid BOOLEAN DEFAULT TRUE,
    is_social_insurance BOOLEAN DEFAULT FALSE,
    payment_source ENUM('COMPANY', 'SOCIAL_INSURANCE', 'BOTH') DEFAULT 'COMPANY',
    max_days_per_year INT DEFAULT 12,
    min_days_per_request DECIMAL(5, 2) DEFAULT 0.5,
    max_days_per_request INT DEFAULT 30,
    requires_document BOOLEAN DEFAULT FALSE,
    document_required VARCHAR(200),
    can_carry_forward BOOLEAN DEFAULT FALSE,
    carry_forward_limit INT DEFAULT 0,
    carry_forward_expiry_months INT DEFAULT 3,
    seniority_applicable BOOLEAN DEFAULT FALSE,
    description TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_leave_type_code (leave_type_code)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại bảo hiểm */
CREATE TABLE insurance_types (
    insurance_type_id INT AUTO_INCREMENT PRIMARY KEY,
    insurance_code VARCHAR(20) UNIQUE NOT NULL,
    insurance_name VARCHAR(100) NOT NULL,
    payment_rate DECIMAL(5, 2),
    is_company_paid BOOLEAN DEFAULT FALSE,
    is_social_insurance BOOLEAN DEFAULT FALSE,
    description TEXT,
    status BOOLEAN DEFAULT TRUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng phụ cấp */
CREATE TABLE allowances (
    allowance_id INT AUTO_INCREMENT PRIMARY KEY,
    allowance_code VARCHAR(20) UNIQUE NOT NULL,
    allowance_name VARCHAR(100) NOT NULL,
    allowance_type ENUM('FIXED', 'PERCENTAGE_OF_SALARY', 'PERCENTAGE_OF_BASIC') NOT NULL,
    calculation_method ENUM('MONTHLY', 'DAILY', 'HOURLY', 'ONE_TIME') DEFAULT 'MONTHLY',
    is_taxable BOOLEAN DEFAULT TRUE,
    is_insurable BOOLEAN DEFAULT TRUE,
    description TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng khấu trừ */
CREATE TABLE deductions (
    deduction_id INT AUTO_INCREMENT PRIMARY KEY,
    deduction_code VARCHAR(20) UNIQUE NOT NULL,
    deduction_name VARCHAR(100) NOT NULL,
    deduction_type ENUM('FIXED', 'PERCENTAGE_OF_SALARY', 'PERCENTAGE_OF_BASIC') NOT NULL,
    is_mandatory BOOLEAN DEFAULT FALSE,
    description TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại ca làm việc */
CREATE TABLE shift_types (
    shift_type_id INT AUTO_INCREMENT PRIMARY KEY,
    shift_code VARCHAR(20) UNIQUE NOT NULL,
    shift_name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_start TIME,
    break_end TIME,
    working_hours DECIMAL(5, 2),
    is_night_shift BOOLEAN DEFAULT FALSE,
    allow_overtime BOOLEAN DEFAULT TRUE,
    allow_wfh BOOLEAN DEFAULT FALSE,
    coefficient DECIMAL(3, 2) DEFAULT 1.00,
    color_code VARCHAR(7),
    description TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng vai trò phê duyệt */
CREATE TABLE approval_roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_code VARCHAR(50) UNIQUE NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description TEXT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng danh mục tin tức */
CREATE TABLE news_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_code VARCHAR(20) UNIQUE NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT TRUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng vai trò (phân quyền) */
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_code VARCHAR(50) UNIQUE NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng quyền */
CREATE TABLE permissions (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    permission_code VARCHAR(100) UNIQUE NOT NULL,
    permission_name VARCHAR(200) NOT NULL,
    module VARCHAR(50),
    description TEXT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng cấu hình thông báo */
CREATE TABLE notification_configs (
    config_id INT AUTO_INCREMENT PRIMARY KEY,
    notification_type ENUM(
        'SENIORITY_ALERT', 'LEAVE_EXPIRY', 'CLAIM_STATUS', 'APPROVAL_REMINDER',
        'LEAVE_BALANCE_LOW', 'CONTRACT_EXPIRY', 'BIRTHDAY', 'HOLIDAY'
    ) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    send_email BOOLEAN DEFAULT TRUE,
    send_in_app BOOLEAN DEFAULT TRUE,
    days_before_trigger INT DEFAULT 30,
    recipients ENUM('EMPLOYEE', 'MANAGER', 'HR', 'ALL') DEFAULT 'EMPLOYEE',
    email_template TEXT,
    in_app_template TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng cấu hình hệ thống */
CREATE TABLE system_configs (
    config_id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    config_type ENUM('TEXT', 'NUMBER', 'BOOLEAN', 'JSON', 'FILE') DEFAULT 'TEXT',
    description TEXT,
    module VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* ===================================================== */
/* 2. TẠO CÁC BẢNG (PHỤ THUỘC CẤP 1)                     */
/* ===================================================== */

/* Bảng phòng ban */
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(20) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    parent_department_id INT,
    manager_id INT,
    description TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department_code (department_code)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng nhân viên */
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender ENUM('NAM', 'NỮ', 'KHÁC'),
    place_of_birth VARCHAR(200),
    ethnicity VARCHAR(50),
    religion VARCHAR(50),
    marital_status ENUM('ĐỘC_THÂN', 'ĐÃ_KẾT_HÔN', 'LY_HÔN', 'GÓA'),
    phone_number VARCHAR(20),
    personal_email VARCHAR(100),
    company_email VARCHAR(100) UNIQUE,
    permanent_address TEXT,
    current_address TEXT,
    nationality_id INT,
    avatar_url VARCHAR(500),
    bank_account VARCHAR(30),
    bank_id INT,
    bank_branch VARCHAR(200),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relation VARCHAR(50),
    status ENUM('ĐANG_LÀM_VIỆC', 'ĐÃ_NGHỈ_VIỆC', 'THỬ_VIỆC', 'NGHỈ_THAI_SẢN', 'TẠM_HOÃN_CÔNG_TÁC') DEFAULT 'ĐANG_LÀM_VIỆC',
    hire_date DATE,
    seniority_start_date DATE,
    base_leave_days DECIMAL(5, 2) DEFAULT 12.00,
    last_seniority_calc DATE,
    resignation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_employee_code (employee_code),
    INDEX idx_employee_status (status),
    INDEX idx_hire_date (hire_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* ===================================================== */
/* 3. TẠO CÁC BẢNG (PHỤ THUỘC CẤP 2)                     */
/* ===================================================== */

/* Bảng mẫu hợp đồng */
CREATE TABLE contract_templates (
    template_id INT AUTO_INCREMENT PRIMARY KEY,
    template_code VARCHAR(20) UNIQUE NOT NULL,
    template_name VARCHAR(200) NOT NULL,
    contract_type_id INT NOT NULL,
    content TEXT NOT NULL,
    version VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    file_url VARCHAR(500),
    effective_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_template_code (template_code)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng hợp đồng lao động */
CREATE TABLE contracts (
    contract_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_code VARCHAR(20) UNIQUE NOT NULL,
    employee_id INT NOT NULL,
    contract_type_id INT NOT NULL,
    contract_number VARCHAR(50) UNIQUE,
    sign_date DATE NOT NULL,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    position_id INT,
    department_id INT,
    basic_salary DECIMAL(15, 2) NOT NULL,
    gross_salary DECIMAL(15, 2) NOT NULL,
    net_salary DECIMAL(15, 2),
    work_location VARCHAR(200),
    job_title VARCHAR(100),
    content TEXT,
    file_url VARCHAR(500),
    signed_file_url VARCHAR(500),
    contract_template_id INT,
    status ENUM('CÓ_HIỆU_LỰC', 'HẾT_HẠN', 'ĐÃ_CHẤM_DỨT', 'CHỜ_HIỆU_LỰC') DEFAULT 'CÓ_HIỆU_LỰC',
    is_renewed BOOLEAN DEFAULT FALSE,
    renewed_from_contract_id INT,
    termination_reason TEXT,
    termination_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_contract_employee (employee_id),
    INDEX idx_contract_status (status),
    INDEX idx_contract_expiry (expiry_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng lịch sử hợp đồng */
CREATE TABLE contract_histories (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    action ENUM('TẠO', 'GIA_HẠN', 'CHẤM_DỨT', 'CẬP_NHẬT', 'KÝ') NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action_by INT NOT NULL,
    previous_value TEXT,
    new_value TEXT,
    notes TEXT,
    INDEX idx_contract_history (contract_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng bằng cấp */
CREATE TABLE qualifications (
    qualification_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    qualification_type_id INT NOT NULL,
    qualification_name VARCHAR(200) NOT NULL,
    major VARCHAR(200),
    school_name VARCHAR(200),
    graduation_year INT,
    graduation_grade VARCHAR(20),
    issued_date DATE,
    issued_by VARCHAR(200),
    qualification_number VARCHAR(50),
    file_url VARCHAR(500),
    is_highest BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_employee_qualification (employee_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng chứng chỉ */
CREATE TABLE certificates (
    certificate_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    certificate_type_id INT,
    certificate_name VARCHAR(200) NOT NULL,
    issued_by VARCHAR(200),
    issued_date DATE,
    expiry_date DATE,
    certificate_number VARCHAR(50),
    score DECIMAL(5, 2),
    file_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_certificate_expiry (expiry_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng CMND/CCCD */
CREATE TABLE identity_documents (
    identity_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    document_type_id INT NOT NULL,
    document_number VARCHAR(20) NOT NULL,
    full_name VARCHAR(100),
    date_of_birth DATE,
    issue_date DATE,
    issue_place VARCHAR(200),
    expiry_date DATE,
    front_image_url VARCHAR(500),
    back_image_url VARCHAR(500),
    has_chip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_identity_number (document_number)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng thông tin BHXH */
CREATE TABLE social_insurance_info (
    insurance_info_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    social_insurance_number VARCHAR(20) UNIQUE NOT NULL,
    health_insurance_number VARCHAR(20) UNIQUE NOT NULL,
    tax_code VARCHAR(20) UNIQUE,
    issue_date DATE,
    issue_place VARCHAR(200),
    status ENUM('ACTIVE', 'SUSPENDED', 'TERMINATED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    UNIQUE KEY unique_employee_insurance (employee_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng người phụ thuộc */
CREATE TABLE dependents (
    dependent_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    id_card_number VARCHAR(20),
    tax_code VARCHAR(20),
    deduction_percent DECIMAL(5, 2) DEFAULT 100.00,
    start_date DATE,
    end_date DATE,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_dependent_employee (employee_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng lịch sử công tác */
CREATE TABLE employment_histories (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    department_id INT NOT NULL,
    position_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    decision_number VARCHAR(50),
    decision_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_employee_history (employee_id),
    INDEX idx_current (is_current)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng lịch làm việc mẫu */
CREATE TABLE shift_schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_code VARCHAR(20) UNIQUE NOT NULL,
    schedule_name VARCHAR(100) NOT NULL,
    department_id INT,
    effective_from DATE NOT NULL,
    effective_to DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_schedule_active (is_active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng chi tiết lịch làm việc */
CREATE TABLE shift_schedule_details (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT NOT NULL,
    day_of_week TINYINT,
    shift_type_id INT,
    is_holiday BOOLEAN DEFAULT FALSE,
    INDEX idx_schedule_day (schedule_id, day_of_week)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng đăng ký ca làm việc */
CREATE TABLE shift_assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    shift_type_id INT NOT NULL,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_permanent BOOLEAN DEFAULT FALSE,
    assigned_by INT NOT NULL,
    notes TEXT,
    status ENUM('HIỆU_LỰC', 'HẾT_HIỆU_LỰC', 'CHỜ_DUYỆT') DEFAULT 'HIỆU_LỰC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_employee_shift (employee_id, effective_date),
    INDEX idx_shift_status (status)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng quỹ phép năm */
CREATE TABLE leave_balances (
    balance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    year INT NOT NULL,
    base_leave DECIMAL(5, 2),
    seniority_bonus DECIMAL(5, 2) DEFAULT 0.00,
    total_days DECIMAL(5, 2) NOT NULL,
    carried_over_days DECIMAL(5, 2) DEFAULT 0.00,
    carried_over_source VARCHAR(255),
    used_days DECIMAL(5, 2) DEFAULT 0.00,
    pending_days DECIMAL(5, 2) DEFAULT 0.00,
    remaining_days DECIMAL(5, 2) GENERATED ALWAYS AS (total_days + carried_over_days - used_days - pending_days) STORED,
    carry_over_expiry_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    UNIQUE KEY unique_employee_leave_year (employee_id, leave_type_id, year),
    INDEX idx_leave_balance (employee_id, year)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng yêu cầu thanh toán bảo hiểm */
CREATE TABLE insurance_claims (
    claim_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    request_id INT,
    insurance_type_id INT NOT NULL,
    claim_code VARCHAR(50) UNIQUE NOT NULL,
    leave_request_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INT NOT NULL,
    daily_rate DECIMAL(15, 2),
    total_amount DECIMAL(15, 2),
    payment_source ENUM('DOANH_NGHIỆP', 'BHXH', 'BẢO_HIỂM_TƯ_NHÂN') NOT NULL,
    certificate_number VARCHAR(50),
    certificate_file_url VARCHAR(500),
    certificate_uploaded_date DATETIME,
    certificate_verified_by INT,
    certificate_verified_date DATETIME,
    bank_account VARCHAR(30),
    bank_id INT,
    payment_date DATE,
    payment_status ENUM('CHỜ_XỬ_LÝ', 'ĐANG_XỬ_LÝ', 'ĐÃ_THANH_TOÁN', 'TỪ_CHỐI') DEFAULT 'CHỜ_XỬ_LÝ',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_claim_status (payment_status),
    INDEX idx_claim_dates (start_date, end_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng phụ cấp theo nhân viên */
CREATE TABLE employee_allowances (
    employee_allowance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    allowance_id INT NOT NULL,
    amount DECIMAL(15, 2),
    percentage DECIMAL(5, 2),
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_employee_allowance (employee_id, is_active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng khấu trừ theo nhân viên */
CREATE TABLE employee_deductions (
    employee_deduction_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    deduction_id INT NOT NULL,
    amount DECIMAL(15, 2),
    percentage DECIMAL(5, 2),
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_employee_deduction (employee_id, is_active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng kỳ lương */
CREATE TABLE salary_periods (
    period_id INT AUTO_INCREMENT PRIMARY KEY,
    period_code VARCHAR(20) UNIQUE NOT NULL,
    period_name VARCHAR(100) NOT NULL,
    period_type ENUM('MONTHLY', 'BIWEEKLY', 'WEEKLY') DEFAULT 'MONTHLY',
    year INT NOT NULL,
    month INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_date DATE,
    standard_working_days INT DEFAULT 26,
    status ENUM('OPEN', 'CALCULATING', 'REVIEWING', 'APPROVED', 'PAID', 'CLOSED') DEFAULT 'OPEN',
    closed_by INT,
    closed_date DATETIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_period_status (status),
    INDEX idx_period_dates (start_date, end_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng tổng hợp ngày công */
CREATE TABLE salary_attendance_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    period_id INT NOT NULL,
    standard_days INT NOT NULL,
    actual_working_days INT DEFAULT 0,
    paid_leave_days DECIMAL(5, 2) DEFAULT 0.00,
    unpaid_leave_days DECIMAL(5, 2) DEFAULT 0.00,
    holiday_days INT DEFAULT 0,
    overtime_hours DECIMAL(5, 2) DEFAULT 0.00,
    late_minutes INT DEFAULT 0,
    early_leave_minutes INT DEFAULT 0,
    total_paid_days DECIMAL(5, 2) GENERATED ALWAYS AS (actual_working_days + paid_leave_days) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    UNIQUE KEY unique_employee_period (employee_id, period_id),
    INDEX idx_summary_period (period_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng lương chi tiết */
CREATE TABLE salary_details (
    salary_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    period_id INT NOT NULL,
    employee_id INT NOT NULL,
    contract_id INT,
    basic_salary DECIMAL(15, 2) NOT NULL,
    gross_salary DECIMAL(15, 2) NOT NULL,
    net_salary DECIMAL(15, 2) NOT NULL,
    total_allowances DECIMAL(15, 2) DEFAULT 0.00,
    total_deductions DECIMAL(15, 2) DEFAULT 0.00,
    overtime_pay DECIMAL(15, 2) DEFAULT 0.00,
    leave_pay DECIMAL(15, 2) DEFAULT 0.00,
    bonus DECIMAL(15, 2) DEFAULT 0.00,
    penalty DECIMAL(15, 2) DEFAULT 0.00,
    social_insurance_employee DECIMAL(15, 2) DEFAULT 0.00,
    health_insurance_employee DECIMAL(15, 2) DEFAULT 0.00,
    unemployment_insurance_employee DECIMAL(15, 2) DEFAULT 0.00,
    personal_income_tax DECIMAL(15, 2) DEFAULT 0.00,
    advance_payment DECIMAL(15, 2) DEFAULT 0.00,
    final_amount DECIMAL(15, 2) GENERATED ALWAYS AS (
        gross_salary + overtime_pay + leave_pay + bonus - total_deductions -
        social_insurance_employee - health_insurance_employee -
        unemployment_insurance_employee - personal_income_tax - advance_payment - penalty
    ) STORED,
    bank_account VARCHAR(30),
    bank_name VARCHAR(100),
    transfer_status ENUM('PENDING', 'TRANSFERRED', 'FAILED') DEFAULT 'PENDING',
    transfer_date DATETIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    UNIQUE KEY unique_period_employee (period_id, employee_id),
    INDEX idx_salary_period (period_id),
    INDEX idx_salary_employee (employee_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng loại đơn từ */
CREATE TABLE request_types (
    request_type_id INT AUTO_INCREMENT PRIMARY KEY,
    request_type_code VARCHAR(50) UNIQUE NOT NULL,
    request_type_name VARCHAR(200) NOT NULL,
    category ENUM(
        'NGHỈ_PHÉP', 'GỘP_PHÉP', 'TĂNG_CA', 'ĐIỀU_CHỈNH_CÔNG', 'CÔNG_TÁC',
        'TẠM_ỨNG_LƯƠNG', 'THANH_TOÁN', 'KỶ_LUẬT', 'ĐI_MUỘN_VỀ_SỚM', 'SUẤT_ĂN', 'KHÁC'
    ) NOT NULL,
    requires_approval BOOLEAN DEFAULT TRUE,
    approval_flow_id INT,
    form_template TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_request_type_active (is_active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng quy trình phê duyệt */
CREATE TABLE approval_flows (
    approval_flow_id INT AUTO_INCREMENT PRIMARY KEY,
    flow_name VARCHAR(200) NOT NULL,
    request_type_id INT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_flow_active (is_active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng các bước phê duyệt */
CREATE TABLE approval_steps (
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    approval_flow_id INT NOT NULL,
    step_order INT NOT NULL,
    step_name VARCHAR(200) NOT NULL,
    approver_role_id INT,
    approver_user_id INT,
    can_reject BOOLEAN DEFAULT TRUE,
    can_add_comment BOOLEAN DEFAULT TRUE,
    days_to_approve INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_flow_step (approval_flow_id, step_order)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng đơn từ tổng hợp */
CREATE TABLE requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    request_code VARCHAR(50) UNIQUE NOT NULL,
    request_type_id INT NOT NULL,
    requester_id INT NOT NULL,
    request_date DATE NOT NULL,
    from_date DATETIME,
    to_date DATETIME,
    duration DECIMAL(5, 2),
    reason TEXT,
    status ENUM('NHÁP', 'CHỜ_DUYỆT', 'ĐANG_XỬ_LÝ', 'ĐÃ_DUYỆT', 'TỪ_CHỐI', 'ĐÃ_HỦY', 'HOÀN_THÀNH') DEFAULT 'NHÁP',
    current_step_id INT,
    is_urgent BOOLEAN DEFAULT FALSE,
    attachments TEXT,
    notes TEXT,
    completed_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_request_status (status),
    INDEX idx_request_date (request_date),
    INDEX idx_request_requester (requester_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng lịch sử phê duyệt */
CREATE TABLE approval_histories (
    approval_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    step_id INT,
    approver_id INT NOT NULL,
    action ENUM('GỬI', 'DUYỆT', 'TỪ_CHỐI', 'TRẢ_VỀ', 'CHUYỂN_TIẾP') NOT NULL,
    comment TEXT,
    action_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_request_history (request_id),
    INDEX idx_approver_history (approver_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng chi tiết nghỉ phép */
CREATE TABLE leave_requests (
    leave_request_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL UNIQUE,
    leave_type_id INT NOT NULL,
    employee_id INT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    from_session ENUM('SÁNG', 'CHIỀU', 'CẢ_NGÀY') DEFAULT 'CẢ_NGÀY',
    to_session ENUM('SÁNG', 'CHIỀU', 'CẢ_NGÀY') DEFAULT 'CẢ_NGÀY',
    number_of_days DECIMAL(5, 2) NOT NULL,
    leave_used_type ENUM('BASE', 'SENIORITY', 'CARRIED_OVER', 'ADVANCED') DEFAULT 'BASE',
    base_days_used DECIMAL(5, 2) DEFAULT 0.00,
    seniority_days_used DECIMAL(5, 2) DEFAULT 0.00,
    carried_over_days_used DECIMAL(5, 2) DEFAULT 0.00,
    paid_days DECIMAL(5, 2) DEFAULT 0.00,
    unpaid_days DECIMAL(5, 2) DEFAULT 0.00,
    substitute_employee_id INT,
    handover_notes TEXT,
    contact_phone VARCHAR(20),
    emergency_contact VARCHAR(100),
    doctor_note_url VARCHAR(500),
    attachment_url VARCHAR(500),
    insurance_claim_id INT,
    certificate_file VARCHAR(500),
    certificate_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_leave_requests_dates (from_date, to_date),
    INDEX idx_leave_employee (employee_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng yêu cầu tăng ca */
CREATE TABLE overtime_requests (
    overtime_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    employee_id INT NOT NULL,
    overtime_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_time INT DEFAULT 0,
    total_hours DECIMAL(5, 2) GENERATED ALWAYS AS (
        HOUR(TIMEDIFF(end_time, start_time)) + (MINUTE(TIMEDIFF(end_time, start_time)) / 60) - (break_time / 60)
    ) STORED,
    reason TEXT,
    approved_by INT,
    approved_date DATETIME,
    status ENUM('CHỜ_DUYỆT', 'ĐÃ_DUYỆT', 'TỪ_CHỐI') DEFAULT 'CHỜ_DUYỆT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    INDEX idx_overtime_status (status),
    INDEX idx_overtime_date (overtime_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng biến động phép */
CREATE TABLE leave_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_type ENUM('CẤP_PHÉP', 'SỬ_DỤNG', 'HOÀN_PHÉP', 'CHUYỂN_NĂM', 'ĐIỀU_CHỈNH', 'HẾT_HẠN') NOT NULL,
    quantity DECIMAL(5, 2) NOT NULL,
    before_balance DECIMAL(5, 2) NOT NULL,
    after_balance DECIMAL(5, 2) NOT NULL,
    reference_id INT,
    reference_type VARCHAR(50),
    reason TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_leave_transaction_employee (employee_id),
    INDEX idx_transaction_date (transaction_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng chấm công */
CREATE TABLE attendances (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    shift_type_id INT,
    check_in_time DATETIME,
    check_out_time DATETIME,
    check_in_method ENUM('MÁY_QUÉT', 'MOBILE', 'MANUAL'),
    check_out_method ENUM('MÁY_QUÉT', 'MOBILE', 'MANUAL'),
    check_in_latitude DECIMAL(10, 8),
    check_in_longitude DECIMAL(11, 8),
    check_out_latitude DECIMAL(10, 8),
    check_out_longitude DECIMAL(11, 8),
    work_type ENUM('VĂN_PHÒNG', 'LÀM_TỪ_XA', 'CÔNG_TÁC', 'ĐI_CÔNG_TÁC') DEFAULT 'VĂN_PHÒNG',
    actual_working_hours DECIMAL(5, 2),
    overtime_hours DECIMAL(5, 2),
    late_minutes INT DEFAULT 0,
    early_leave_minutes INT DEFAULT 0,
    is_holiday BOOLEAN DEFAULT FALSE,
    is_overtime BOOLEAN DEFAULT FALSE,
    status ENUM('CHỜ_DUYỆT', 'ĐÃ_DUYỆT', 'TỪ_CHỐI', 'NHẬP_THỦ_CÔNG') DEFAULT 'CHỜ_DUYỆT',
    notes TEXT,
    approved_by INT,
    approved_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    UNIQUE KEY unique_attendance (employee_id, attendance_date),
    INDEX idx_attendance_date (attendance_date),
    INDEX idx_attendance_status (status)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng đăng ký đổi ca */
CREATE TABLE shift_swaps (
    swap_id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    target_employee_id INT NOT NULL,
    shift_date DATE NOT NULL,
    original_shift_id INT NOT NULL,
    requested_shift_id INT NOT NULL,
    swap_reason TEXT,
    approver_id INT,
    approval_status ENUM('CHỜ_DUYỆT', 'ĐÃ_DUYỆT', 'TỪ_CHỐI', 'ĐÃ_HỦY') DEFAULT 'CHỜ_DUYỆT',
    approval_date DATETIME,
    approval_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_swap_status (approval_status),
    INDEX idx_swap_date (shift_date)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng tin tức */
CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    news_code VARCHAR(50) UNIQUE NOT NULL,
    category_id INT,
    title VARCHAR(500) NOT NULL,
    summary TEXT,
    content LONGTEXT,
    priority ENUM('THẤP', 'TRUNG_BÌNH', 'CAO', 'KHẨN_CẤP') DEFAULT 'TRUNG_BÌNH',
    is_important BOOLEAN DEFAULT FALSE,
    is_pinned BOOLEAN DEFAULT FALSE,
    published_date DATETIME,
    expiry_date DATETIME,
    published_by INT,
    department_id INT,
    position_id INT,
    attachment_url VARCHAR(500),
    image_url VARCHAR(500),
    view_count INT DEFAULT 0,
    status ENUM('NHÁP', 'ĐÃ_XUẤT_BẢN', 'LƯU_TRỮ') DEFAULT 'NHÁP',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    INDEX idx_news_published (published_date),
    INDEX idx_news_status (status)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng xác nhận đã đọc tin */
CREATE TABLE news_reads (
    read_id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    employee_id INT NOT NULL,
    read_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    device_info VARCHAR(500),
    UNIQUE KEY unique_news_employee (news_id, employee_id),
    INDEX idx_read_employee (employee_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng thông báo */
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    sender_id INT,
    receiver_id INT,
    department_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    read_date DATETIME,
    priority ENUM('THẤP', 'TRUNG_BÌNH', 'CAO') DEFAULT 'TRUNG_BÌNH',
    reference_type ENUM('SENIORITY', 'LEAVE_REQUEST', 'INSURANCE_CLAIM', 'LEAVE_ADVANCEMENT', 'CONTRACT', 'ATTENDANCE', 'NEWS', 'POLICY'),
    reference_id INT,
    action_url VARCHAR(500),
    expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_notifications_receiver (receiver_id, is_read),
    INDEX idx_notification_expiry (expires_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng phân quyền theo vai trò */
CREATE TABLE role_permissions (
    role_permission_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    can_access BOOLEAN DEFAULT TRUE,
    can_create BOOLEAN DEFAULT FALSE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    can_approve BOOLEAN DEFAULT FALSE,
    can_export BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    UNIQUE KEY unique_role_permission (role_id, permission_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng phân vai trò cho nhân viên */
CREATE TABLE employee_roles (
    employee_role_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    role_id INT NOT NULL,
    department_id INT,
    effective_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    UNIQUE KEY unique_employee_role (employee_id, role_id, department_id),
    INDEX idx_role_employee (employee_id, is_active)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* Bảng báo cáo mẫu */
CREATE TABLE report_templates (
    template_id INT AUTO_INCREMENT PRIMARY KEY,
    template_code VARCHAR(50) UNIQUE NOT NULL,
    template_name VARCHAR(200) NOT NULL,
    report_type ENUM('NHAN_SU', 'LUONG', 'CHAM_CONG', 'NGHI_PHEP', 'TAI_SAN', 'TONG_HOP') NOT NULL,
    sql_query TEXT,
    columns_config TEXT,
    filters_config TEXT,
    chart_config TEXT,
    created_by INT,
    is_public BOOLEAN DEFAULT FALSE,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_template_type (report_type)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

/* ===================================================== */
/* 4. THÊM CÁC RÀNG BUỘC FOREIGN KEY                      */
/* ===================================================== */

ALTER TABLE departments
ADD CONSTRAINT fk_departments_parent FOREIGN KEY (parent_department_id) REFERENCES departments(department_id),
ADD CONSTRAINT fk_departments_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id);

ALTER TABLE employees
ADD CONSTRAINT fk_employees_nationality FOREIGN KEY (nationality_id) REFERENCES nationalities(nationality_id),
ADD CONSTRAINT fk_employees_bank FOREIGN KEY (bank_id) REFERENCES banks(bank_id),
ADD CONSTRAINT fk_employees_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_employees_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE contract_templates
ADD CONSTRAINT fk_contract_templates_type FOREIGN KEY (contract_type_id) REFERENCES contract_types(contract_type_id),
ADD CONSTRAINT fk_contract_templates_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE contracts
ADD CONSTRAINT fk_contracts_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_contracts_type FOREIGN KEY (contract_type_id) REFERENCES contract_types(contract_type_id),
ADD CONSTRAINT fk_contracts_position FOREIGN KEY (position_id) REFERENCES positions(position_id),
ADD CONSTRAINT fk_contracts_department FOREIGN KEY (department_id) REFERENCES departments(department_id),
ADD CONSTRAINT fk_contracts_renewed_from FOREIGN KEY (renewed_from_contract_id) REFERENCES contracts(contract_id),
ADD CONSTRAINT fk_contracts_template FOREIGN KEY (contract_template_id) REFERENCES contract_templates(template_id),
ADD CONSTRAINT fk_contracts_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_contracts_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE contract_histories
ADD CONSTRAINT fk_contract_histories_contract FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
ADD CONSTRAINT fk_contract_histories_action_by FOREIGN KEY (action_by) REFERENCES employees(employee_id);

ALTER TABLE qualifications
ADD CONSTRAINT fk_qualifications_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_qualifications_type FOREIGN KEY (qualification_type_id) REFERENCES qualification_types(qualification_type_id),
ADD CONSTRAINT fk_qualifications_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_qualifications_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE certificates
ADD CONSTRAINT fk_certificates_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_certificates_type FOREIGN KEY (certificate_type_id) REFERENCES certificate_types(certificate_type_id),
ADD CONSTRAINT fk_certificates_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_certificates_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE identity_documents
ADD CONSTRAINT fk_identity_documents_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_identity_documents_type FOREIGN KEY (document_type_id) REFERENCES document_types(document_type_id),
ADD CONSTRAINT fk_identity_documents_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_identity_documents_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE social_insurance_info
ADD CONSTRAINT fk_social_insurance_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_social_insurance_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_social_insurance_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE dependents
ADD CONSTRAINT fk_dependents_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_dependents_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_dependents_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE employment_histories
ADD CONSTRAINT fk_employment_histories_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_employment_histories_department FOREIGN KEY (department_id) REFERENCES departments(department_id),
ADD CONSTRAINT fk_employment_histories_position FOREIGN KEY (position_id) REFERENCES positions(position_id),
ADD CONSTRAINT fk_employment_histories_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE shift_schedules
ADD CONSTRAINT fk_shift_schedules_department FOREIGN KEY (department_id) REFERENCES departments(department_id),
ADD CONSTRAINT fk_shift_schedules_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE shift_schedule_details
ADD CONSTRAINT fk_shift_schedule_details_schedule FOREIGN KEY (schedule_id) REFERENCES shift_schedules(schedule_id),
ADD CONSTRAINT fk_shift_schedule_details_shift FOREIGN KEY (shift_type_id) REFERENCES shift_types(shift_type_id);

ALTER TABLE shift_assignments
ADD CONSTRAINT fk_shift_assignments_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_shift_assignments_shift FOREIGN KEY (shift_type_id) REFERENCES shift_types(shift_type_id),
ADD CONSTRAINT fk_shift_assignments_assigned_by FOREIGN KEY (assigned_by) REFERENCES employees(employee_id);

ALTER TABLE leave_balances
ADD CONSTRAINT fk_leave_balances_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_leave_balances_type FOREIGN KEY (leave_type_id) REFERENCES leave_types(leave_type_id),
ADD CONSTRAINT fk_leave_balances_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_leave_balances_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE insurance_claims
ADD CONSTRAINT fk_insurance_claims_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_insurance_claims_type FOREIGN KEY (insurance_type_id) REFERENCES insurance_types(insurance_type_id),
ADD CONSTRAINT fk_insurance_claims_bank FOREIGN KEY (bank_id) REFERENCES banks(bank_id),
ADD CONSTRAINT fk_insurance_claims_verified_by FOREIGN KEY (certificate_verified_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_insurance_claims_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_insurance_claims_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE employee_allowances
ADD CONSTRAINT fk_employee_allowances_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_employee_allowances_allowance FOREIGN KEY (allowance_id) REFERENCES allowances(allowance_id),
ADD CONSTRAINT fk_employee_allowances_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_employee_allowances_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE employee_deductions
ADD CONSTRAINT fk_employee_deductions_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_employee_deductions_deduction FOREIGN KEY (deduction_id) REFERENCES deductions(deduction_id),
ADD CONSTRAINT fk_employee_deductions_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE salary_periods
ADD CONSTRAINT fk_salary_periods_closed_by FOREIGN KEY (closed_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_salary_periods_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE salary_attendance_summary
ADD CONSTRAINT fk_salary_attendance_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_salary_attendance_period FOREIGN KEY (period_id) REFERENCES salary_periods(period_id),
ADD CONSTRAINT fk_salary_attendance_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE salary_details
ADD CONSTRAINT fk_salary_details_period FOREIGN KEY (period_id) REFERENCES salary_periods(period_id),
ADD CONSTRAINT fk_salary_details_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_salary_details_contract FOREIGN KEY (contract_id) REFERENCES contracts(contract_id),
ADD CONSTRAINT fk_salary_details_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_salary_details_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE request_types
ADD CONSTRAINT fk_request_types_flow FOREIGN KEY (approval_flow_id) REFERENCES approval_flows(approval_flow_id),
ADD CONSTRAINT fk_request_types_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE approval_flows
ADD CONSTRAINT fk_approval_flows_type FOREIGN KEY (request_type_id) REFERENCES request_types(request_type_id),
ADD CONSTRAINT fk_approval_flows_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE approval_steps
ADD CONSTRAINT fk_approval_steps_flow FOREIGN KEY (approval_flow_id) REFERENCES approval_flows(approval_flow_id),
ADD CONSTRAINT fk_approval_steps_role FOREIGN KEY (approver_role_id) REFERENCES approval_roles(role_id),
ADD CONSTRAINT fk_approval_steps_user FOREIGN KEY (approver_user_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_approval_steps_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE requests
ADD CONSTRAINT fk_requests_type FOREIGN KEY (request_type_id) REFERENCES request_types(request_type_id),
ADD CONSTRAINT fk_requests_requester FOREIGN KEY (requester_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_requests_step FOREIGN KEY (current_step_id) REFERENCES approval_steps(step_id),
ADD CONSTRAINT fk_requests_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_requests_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE approval_histories
ADD CONSTRAINT fk_approval_histories_request FOREIGN KEY (request_id) REFERENCES requests(request_id),
ADD CONSTRAINT fk_approval_histories_step FOREIGN KEY (step_id) REFERENCES approval_steps(step_id),
ADD CONSTRAINT fk_approval_histories_approver FOREIGN KEY (approver_id) REFERENCES employees(employee_id);

ALTER TABLE leave_requests
ADD CONSTRAINT fk_leave_requests_request FOREIGN KEY (request_id) REFERENCES requests(request_id),
ADD CONSTRAINT fk_leave_requests_type FOREIGN KEY (leave_type_id) REFERENCES leave_types(leave_type_id),
ADD CONSTRAINT fk_leave_requests_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_leave_requests_substitute FOREIGN KEY (substitute_employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_leave_requests_claim FOREIGN KEY (insurance_claim_id) REFERENCES insurance_claims(claim_id),
ADD CONSTRAINT fk_leave_requests_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_leave_requests_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE overtime_requests
ADD CONSTRAINT fk_overtime_requests_request FOREIGN KEY (request_id) REFERENCES requests(request_id),
ADD CONSTRAINT fk_overtime_requests_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_overtime_requests_approved_by FOREIGN KEY (approved_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_overtime_requests_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE leave_transactions
ADD CONSTRAINT fk_leave_transactions_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_leave_transactions_type FOREIGN KEY (leave_type_id) REFERENCES leave_types(leave_type_id),
ADD CONSTRAINT fk_leave_transactions_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE attendances
ADD CONSTRAINT fk_attendances_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_attendances_shift FOREIGN KEY (shift_type_id) REFERENCES shift_types(shift_type_id),
ADD CONSTRAINT fk_attendances_approved_by FOREIGN KEY (approved_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_attendances_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_attendances_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE shift_swaps
ADD CONSTRAINT fk_shift_swaps_requester FOREIGN KEY (requester_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_shift_swaps_target FOREIGN KEY (target_employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_shift_swaps_original_shift FOREIGN KEY (original_shift_id) REFERENCES shift_types(shift_type_id),
ADD CONSTRAINT fk_shift_swaps_requested_shift FOREIGN KEY (requested_shift_id) REFERENCES shift_types(shift_type_id),
ADD CONSTRAINT fk_shift_swaps_approver FOREIGN KEY (approver_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_shift_swaps_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_shift_swaps_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE news
ADD CONSTRAINT fk_news_category FOREIGN KEY (category_id) REFERENCES news_categories(category_id),
ADD CONSTRAINT fk_news_published_by FOREIGN KEY (published_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_news_department FOREIGN KEY (department_id) REFERENCES departments(department_id),
ADD CONSTRAINT fk_news_position FOREIGN KEY (position_id) REFERENCES positions(position_id),
ADD CONSTRAINT fk_news_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_news_updated_by FOREIGN KEY (updated_by) REFERENCES employees(employee_id);

ALTER TABLE news_reads
ADD CONSTRAINT fk_news_reads_news FOREIGN KEY (news_id) REFERENCES news(news_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_news_reads_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id);

ALTER TABLE notifications
ADD CONSTRAINT fk_notifications_sender FOREIGN KEY (sender_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_notifications_receiver FOREIGN KEY (receiver_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_notifications_department FOREIGN KEY (department_id) REFERENCES departments(department_id);

ALTER TABLE role_permissions
ADD CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
ADD CONSTRAINT fk_role_permissions_permission FOREIGN KEY (permission_id) REFERENCES permissions(permission_id),
ADD CONSTRAINT fk_role_permissions_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE employee_roles
ADD CONSTRAINT fk_employee_roles_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
ADD CONSTRAINT fk_employee_roles_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
ADD CONSTRAINT fk_employee_roles_department FOREIGN KEY (department_id) REFERENCES departments(department_id),
ADD CONSTRAINT fk_employee_roles_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

ALTER TABLE report_templates
ADD CONSTRAINT fk_report_templates_created_by FOREIGN KEY (created_by) REFERENCES employees(employee_id);

/* ===================================================== */
/* 5. THÊM DỮ LIỆU MẪU                                    */
/* ===================================================== */

/* 5.1. nationalities */
INSERT INTO nationalities (nationality_code, nationality_name) VALUES
('VN', 'Việt Nam'),
('US', 'Hoa Kỳ'),
('JP', 'Nhật Bản'),
('KR', 'Hàn Quốc'),
('CN', 'Trung Quốc'),
('FR', 'Pháp'),
('UK', 'Anh'),
('DE', 'Đức'),
('CA', 'Canada'),
('AU', 'Úc');

/* 5.2. banks */
INSERT INTO banks (bank_code, bank_name, swift_code, status) VALUES
('VCB', 'Ngân hàng TMCP Ngoại thương Việt Nam', 'VCBVVNVX', TRUE),
('CTG', 'Ngân hàng TMCP Công thương Việt Nam', 'ICBVVNVX', TRUE),
('BIDV', 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', 'BIDVVNVX', TRUE),
('AGB', 'Ngân hàng Nông nghiệp và Phát triển Nông thôn', 'VBAAVNVX', TRUE),
('TCB', 'Ngân hàng TMCP Kỹ thương Việt Nam', 'TCBVVNVX', TRUE),
('MBB', 'Ngân hàng TMCP Quân đội', 'MSCBVVVX', TRUE),
('ACB', 'Ngân hàng TMCP Á Châu', 'ASCBVNVX', TRUE),
('VPB', 'Ngân hàng TMCP Việt Nam Thịnh Vượng', 'VPBKVNVX', TRUE),
('HDB', 'Ngân hàng TMCP Phát triển TP HCM', 'HDBCVNVX', TRUE),
('SHB', 'Ngân hàng TMCP Sài Gòn - Hà Nội', 'SHBAVNVX', TRUE);

/* 5.3. qualification_types */
INSERT INTO qualification_types (qualification_type_code, qualification_type_name, description) VALUES
('DH', 'Đại học', 'Bằng tốt nghiệp đại học'),
('THS', 'Thạc sĩ', 'Bằng thạc sĩ'),
('CD', 'Cao đẳng', 'Bằng tốt nghiệp cao đẳng');

/* 5.4. certificate_types */
INSERT INTO certificate_types (certificate_type_code, certificate_type_name, description) VALUES
('TOEIC', 'TOEIC', 'Chứng chỉ tiếng Anh TOEIC'),
('IELTS', 'IELTS', 'Chứng chỉ tiếng Anh IELTS'),
('MOS', 'MOS', 'Chứng chỉ tin học văn phòng');

/* 5.5. document_types */
INSERT INTO document_types (document_type_code, document_type_name, description) VALUES
('CMND', 'Chứng minh nhân dân', 'CMND 9 số'),
('CCCD', 'Căn cước công dân', 'CCCD 12 số'),
('PASSPORT', 'Hộ chiếu', 'Passport Việt Nam');

/* 5.6. contract_types */
INSERT INTO contract_types (contract_type_code, contract_type_name, description, is_probation, max_duration_months, status) VALUES
('HDLD01', 'Hợp đồng lao động không xác định thời hạn', 'Hợp đồng dài hạn, không giới hạn thời gian', FALSE, NULL, TRUE),
('HDLD02', 'Hợp đồng lao động xác định thời hạn 12 tháng', 'Hợp đồng có thời hạn 1 năm', FALSE, 12, TRUE),
('HDLD03', 'Hợp đồng lao động xác định thời hạn 24 tháng', 'Hợp đồng có thời hạn 2 năm', FALSE, 24, TRUE),
('HDTV', 'Hợp đồng thử việc', 'Hợp đồng thử việc 2 tháng', TRUE, 2, TRUE);

/* 5.7. positions */
INSERT INTO positions (position_code, position_name, job_description, requirements, salary_range_min, salary_range_max, status) VALUES
('GD', 'Giám đốc', 'Điều hành toàn bộ công ty', 'Kinh nghiệm 10 năm quản lý', 50000000, 100000000, TRUE),
('PGD', 'Phó Giám đốc', 'Hỗ trợ giám đốc điều hành', 'Kinh nghiệm 8 năm quản lý', 40000000, 80000000, TRUE),
('TP', 'Trưởng phòng', 'Quản lý phòng ban', 'Kinh nghiệm 5 năm', 25000000, 50000000, TRUE),
('PP', 'Phó phòng', 'Hỗ trợ trưởng phòng', 'Kinh nghiệm 3 năm', 18000000, 35000000, TRUE),
('CV', 'Chuyên viên', 'Thực hiện nghiệp vụ chuyên môn', 'Tốt nghiệp đại học', 12000000, 25000000, TRUE),
('NV', 'Nhân viên', 'Thực hiện công việc được giao', 'Kinh nghiệm 1 năm', 8000000, 15000000, TRUE);

/* 5.8. leave_types */
INSERT INTO leave_types (
    leave_type_code, leave_type_name, category, is_paid, is_social_insurance,
    payment_source, max_days_per_year, min_days_per_request, max_days_per_request,
    requires_document, can_carry_forward, carry_forward_limit,
    carry_forward_expiry_months, seniority_applicable, description, status
) VALUES
('PHEP_NAM', 'Nghỉ phép năm', 'ANNUAL', TRUE, FALSE, 'COMPANY', 12, 0.5, 30,
 FALSE, TRUE, 5, 3, TRUE, 'Nghỉ phép năm cơ bản', TRUE),

('OM_DAU', 'Nghỉ ốm đau', 'SICK', TRUE, TRUE, 'SOCIAL_INSURANCE', 30, 0.5, 30,
 TRUE, FALSE, 0, 0, FALSE, 'Nghỉ ốm hưởng BHXH', TRUE),

('KHONG_LUONG', 'Nghỉ không lương', 'UNPAID', FALSE, FALSE, 'COMPANY', 30, 0.5, 30,
 FALSE, FALSE, 0, 0, FALSE, 'Nghỉ không hưởng lương', TRUE);

/* 5.9. insurance_types */
INSERT INTO insurance_types (insurance_code, insurance_name, payment_rate, is_company_paid, is_social_insurance, status) VALUES
('BHXH_OM', 'Ốm đau', 75.00, FALSE, TRUE, TRUE),
('BHXH_TS', 'Thai sản', 100.00, FALSE, TRUE, TRUE),
('BHYT', 'Bảo hiểm y tế', 100.00, TRUE, TRUE, TRUE),
('BHTN', 'Bảo hiểm thất nghiệp', 60.00, FALSE, TRUE, TRUE);

/* 5.10. allowances */
INSERT INTO allowances (allowance_code, allowance_name, allowance_type, calculation_method, is_taxable, is_insurable, description, status) VALUES
('PC-CV', 'Phụ cấp chức vụ', 'FIXED', 'MONTHLY', TRUE, TRUE, 'Phụ cấp cho trưởng phòng, phó phòng', TRUE),
('PC-AT', 'Phụ cấp ăn trưa', 'FIXED', 'DAILY', FALSE, FALSE, 'Tiền ăn trưa hàng ngày', TRUE),
('PC-XM', 'Phụ cấp xăng xe', 'FIXED', 'MONTHLY', FALSE, FALSE, 'Phụ cấp đi lại', TRUE);

/* 5.11. deductions */
INSERT INTO deductions (deduction_code, deduction_name, deduction_type, is_mandatory, description, status) VALUES
('BHXH', 'Bảo hiểm xã hội', 'PERCENTAGE_OF_SALARY', TRUE, 'Trích BHXH 8%', TRUE),
('BHYT', 'Bảo hiểm y tế', 'PERCENTAGE_OF_SALARY', TRUE, 'Trích BHYT 1.5%', TRUE),
('BHTN', 'Bảo hiểm thất nghiệp', 'PERCENTAGE_OF_SALARY', TRUE, 'Trích BHTN 1%', TRUE),
('TNCN', 'Thuế thu nhập cá nhân', 'PERCENTAGE_OF_SALARY', TRUE, 'Thuế TNCN theo luật định', TRUE);

/* 5.12. shift_types */
INSERT INTO shift_types (
    shift_code, shift_name, start_time, end_time, break_start, break_end,
    working_hours, is_night_shift, coefficient, description, status
) VALUES
('HC', 'Hành chính', '08:00:00', '17:00:00', '12:00:00', '13:00:00', 8.0, FALSE, 1.0, 'Giờ hành chính tiêu chuẩn', TRUE),
('SANG', 'Ca sáng', '07:30:00', '11:30:00', NULL, NULL, 4.0, FALSE, 1.0, 'Ca sáng 4 tiếng', TRUE),
('CHIEU', 'Ca chiều', '13:00:00', '17:00:00', NULL, NULL, 4.0, FALSE, 1.0, 'Ca chiều 4 tiếng', TRUE);

/* 5.13. approval_roles */
INSERT INTO approval_roles (role_code, role_name, description) VALUES
('QLTT', 'Quản lý trực tiếp', 'Quản lý trực tiếp của nhân viên'),
('TP', 'Trưởng phòng', 'Trưởng phòng ban'),
('GD', 'Giám đốc', 'Giám đốc công ty'),
('HR', 'Nhân sự', 'Bộ phận nhân sự'),
('KT', 'Kế toán', 'Bộ phận kế toán');

/* 5.14. news_categories */
INSERT INTO news_categories (category_code, category_name, description, status) VALUES
('TT', 'Thông báo', 'Thông báo chung từ công ty', TRUE),
('SK', 'Sự kiện', 'Sự kiện nội bộ sắp diễn ra', TRUE),
('CT', 'Chính sách', 'Chính sách mới của công ty', TRUE);

/* 5.15. roles */
INSERT INTO roles (role_code, role_name, description, is_system_role) VALUES
('ADMIN', 'Quản trị viên', 'Toàn quyền hệ thống', TRUE),
('HR', 'Nhân sự', 'Quản lý nhân sự, tuyển dụng, đào tạo', TRUE),
('MANAGER', 'Quản lý', 'Quản lý phòng ban, duyệt đơn', TRUE),
('EMPLOYEE', 'Nhân viên', 'Quyền cơ bản', TRUE),
('ACCOUNTANT', 'Kế toán', 'Quản lý lương, thanh toán', TRUE);

/* 5.16. permissions */
INSERT INTO permissions (permission_code, permission_name, module, description) VALUES
('EMP_VIEW', 'Xem nhân viên', 'NHAN_SU', 'Xem danh sách và thông tin nhân viên'),
('EMP_CREATE', 'Thêm nhân viên', 'NHAN_SU', 'Thêm mới nhân viên'),
('LEAVE_VIEW', 'Xem đơn nghỉ phép', 'NGHI_PHEP', 'Xem danh sách đơn nghỉ phép'),
('LEAVE_CREATE', 'Tạo đơn nghỉ phép', 'NGHI_PHEP', 'Tạo đơn xin nghỉ phép'),
('LEAVE_APPROVE', 'Duyệt đơn nghỉ phép', 'NGHI_PHEP', 'Duyệt hoặc từ chối đơn nghỉ phép'),
('SALARY_VIEW', 'Xem bảng lương', 'LUONG', 'Xem bảng lương'),
('ATTENDANCE_VIEW', 'Xem chấm công', 'CHAM_CONG', 'Xem bảng chấm công');

/* 5.17. notification_configs */
INSERT INTO notification_configs (notification_type, is_enabled, send_email, send_in_app, days_before_trigger, recipients) VALUES
('SENIORITY_ALERT', TRUE, TRUE, TRUE, 30, 'EMPLOYEE'),
('LEAVE_EXPIRY', TRUE, TRUE, TRUE, 15, 'EMPLOYEE'),
('CLAIM_STATUS', TRUE, TRUE, TRUE, 0, 'EMPLOYEE'),
('APPROVAL_REMINDER', TRUE, TRUE, TRUE, 2, 'MANAGER'),
('CONTRACT_EXPIRY', TRUE, TRUE, TRUE, 30, 'EMPLOYEE');

/* 5.18. system_configs */
INSERT INTO system_configs (config_key, config_value, config_type, description, module) VALUES
('company_name', 'Công ty Cổ phần Đầu tư Phát triển Nhân lực ABC', 'TEXT', 'Tên công ty', 'GENERAL'),
('base_leave_days', '12', 'NUMBER', 'Số ngày phép cơ bản mỗi năm', 'LEAVE'),
('seniority_years', '5', 'NUMBER', 'Số năm để được cộng phép thâm niên', 'LEAVE'),
('working_hours_per_day', '8', 'NUMBER', 'Số giờ làm việc chuẩn mỗi ngày', 'ATTENDANCE'),
('working_days_per_month', '26', 'NUMBER', 'Số ngày công chuẩn mỗi tháng', 'ATTENDANCE'),
('social_insurance_rate', '8.0', 'NUMBER', 'Tỷ lệ BHXH người lao động đóng (%)', 'SALARY'),
('health_insurance_rate', '1.5', 'NUMBER', 'Tỷ lệ BHYT người lao động đóng (%)', 'SALARY'),
('unemployment_insurance_rate', '1.0', 'NUMBER', 'Tỷ lệ BHTN người lao động đóng (%)', 'SALARY'),
('system_version', '3.0', 'TEXT', 'Phiên bản hệ thống', 'SYSTEM');

/* 5.19. departments */
INSERT INTO departments (department_code, department_name, parent_department_id, manager_id, description, status) VALUES
('HCNS', 'Hành chính Nhân sự', NULL, NULL, 'Quản lý nhân sự và hành chính', TRUE),
('KT', 'Kế toán', NULL, NULL, 'Quản lý tài chính kế toán', TRUE),
('KD', 'Kinh doanh', NULL, NULL, 'Phát triển kinh doanh và bán hàng', TRUE),
('IT', 'Công nghệ thông tin', NULL, NULL, 'Phát triển phần mềm và hệ thống', TRUE),
('MKT', 'Marketing', NULL, NULL, 'Quảng bá thương hiệu và sản phẩm', TRUE);

/* 5.20. employees - 5 nhân viên đầu */
INSERT INTO employees (
    employee_code, full_name, date_of_birth, gender, place_of_birth, ethnicity, religion,
    marital_status, phone_number, personal_email, company_email, permanent_address, current_address,
    nationality_id, bank_account, bank_id, bank_branch,
    emergency_contact_name, emergency_contact_phone, emergency_contact_relation,
    status, hire_date, seniority_start_date, base_leave_days
) VALUES
('NV0001', 'Nguyễn Văn An', '1990-05-15', 'NAM', 'Hà Nội', 'Kinh', 'Không', 'ĐÃ_KẾT_HÔN', 
 '0912345678', 'an.nguyen@gmail.com', 'an.nguyen@company.com', 'Số 1, Đường A, Q.1, TP.HCM', 'Số 10, Đường B, Q.2, TP.HCM',
 1, '123456789', 1, 'Chi nhánh Hà Nội',
 'Trần Thị Bình', '0987654321', 'Vợ', 'ĐANG_LÀM_VIỆC', '2015-06-01', '2015-06-01', 12.00),

('NV0002', 'Trần Thị Mai', '1992-08-20', 'NỮ', 'Hải Phòng', 'Kinh', 'Phật giáo', 'ĐỘC_THÂN',
 '0923456789', 'mai.tran@gmail.com', 'mai.tran@company.com', 'Số 2, Đường C, Hải Phòng', 'Số 20, Đường D, Q.3, TP.HCM',
 1, '234567891', 2, 'Chi nhánh Hải Phòng',
 'Nguyễn Văn Hùng', '0976543210', 'Bố', 'ĐANG_LÀM_VIỆC', '2016-03-15', '2016-03-15', 12.00),

('NV0003', 'Lê Văn Cường', '1988-11-10', 'NAM', 'Đà Nẵng', 'Kinh', 'Thiên chúa giáo', 'ĐÃ_KẾT_HÔN',
 '0934567891', 'cuong.le@gmail.com', 'cuong.le@company.com', 'Số 3, Đường E, Đà Nẵng', 'Số 30, Đường F, Q.4, TP.HCM',
 1, '345678912', 3, 'Chi nhánh Đà Nẵng',
 'Phạm Thị Lan', '0965432109', 'Vợ', 'ĐANG_LÀM_VIỆC', '2014-09-01', '2014-09-01', 12.00),

('NV0004', 'Phạm Thị Hương', '1991-02-28', 'NỮ', 'Cần Thơ', 'Kinh', 'Không', 'ĐÃ_KẾT_HÔN',
 '0945678901', 'huong.pham@gmail.com', 'huong.pham@company.com', 'Số 4, Đường G, Cần Thơ', 'Số 40, Đường H, Q.5, TP.HCM',
 1, '456789123', 4, 'Chi nhánh Cần Thơ',
 'Lê Văn Hải', '0954321098', 'Chồng', 'ĐANG_LÀM_VIỆC', '2015-11-01', '2015-11-01', 12.00),

('NV0005', 'Hoàng Văn Đức', '1989-07-12', 'NAM', 'Huế', 'Kinh', 'Phật giáo', 'ĐÃ_KẾT_HÔN',
 '0956789012', 'duc.hoang@gmail.com', 'duc.hoang@company.com', 'Số 5, Đường I, Huế', 'Số 50, Đường K, Q.6, TP.HCM',
 1, '567891234', 5, 'Chi nhánh Huế',
 'Hoàng Thị Hoa', '0943210987', 'Mẹ', 'ĐANG_LÀM_VIỆC', '2013-04-01', '2013-04-01', 12.00);

/* 5.21. Cập nhật manager_id cho departments */
UPDATE departments SET manager_id = 1 WHERE department_code = 'HCNS';
UPDATE departments SET manager_id = 3 WHERE department_code = 'KD';
UPDATE departments SET manager_id = 5 WHERE department_code = 'IT';

/* 5.22. contract_templates */
INSERT INTO contract_templates (template_code, template_name, contract_type_id, content, version, is_active, file_url, effective_date) VALUES
('MT_HDLD01_V1', 'Mẫu hợp đồng không xác định thời hạn v1', 1, 'Nội dung mẫu hợp đồng không xác định thời hạn...', '1.0', TRUE, '/templates/contracts/hdld01_v1.docx', '2024-01-01'),
('MT_HDLD02_V1', 'Mẫu hợp đồng 12 tháng v1', 2, 'Nội dung mẫu hợp đồng 12 tháng...', '1.0', TRUE, '/templates/contracts/hdld02_v1.docx', '2024-01-01'),
('MT_HDTV_V1', 'Mẫu hợp đồng thử việc v1', 4, 'Nội dung mẫu hợp đồng thử việc 2 tháng...', '1.0', TRUE, '/templates/contracts/hdtv_v1.docx', '2024-01-01');

/* 5.23. contracts - 5 hợp đồng đầu */
INSERT INTO contracts (
    contract_code, employee_id, contract_type_id, contract_number, sign_date, effective_date, expiry_date,
    position_id, department_id, basic_salary, gross_salary, net_salary, work_location, job_title,
    content, file_url, signed_file_url, contract_template_id, status, is_renewed
) VALUES
('HD0001', 1, 1, 'HD/2024/001', '2024-01-15', '2024-02-01', NULL, 3, 1, 25000000, 35000000, 30000000, 'Hà Nội', 'Trưởng phòng Nhân sự',
 'Nội dung hợp đồng...', '/files/contracts/hd0001.pdf', '/files/contracts/hd0001_signed.pdf', 1, 'CÓ_HIỆU_LỰC', FALSE),

('HD0002', 2, 2, 'HD/2024/002', '2024-01-20', '2024-02-01', '2025-01-31', 5, 2, 18000000, 25000000, 22000000, 'Hồ Chí Minh', 'Kế toán viên',
 'Nội dung hợp đồng...', '/files/contracts/hd0002.pdf', '/files/contracts/hd0002_signed.pdf', 2, 'CÓ_HIỆU_LỰC', FALSE),

('HD0003', 3, 1, 'HD/2024/003', '2024-02-05', '2024-02-15', NULL, 3, 3, 30000000, 42000000, 37000000, 'Đà Nẵng', 'Trưởng phòng Kinh doanh',
 'Nội dung hợp đồng...', '/files/contracts/hd0003.pdf', '/files/contracts/hd0003_signed.pdf', 1, 'CÓ_HIỆU_LỰC', FALSE),

('HD0004', 4, 2, 'HD/2024/004', '2024-02-10', '2024-03-01', '2025-02-28', 6, 4, 15000000, 20000000, 17500000, 'Hồ Chí Minh', 'Lập trình viên',
 'Nội dung hợp đồng...', '/files/contracts/hd0004.pdf', '/files/contracts/hd0004_signed.pdf', 2, 'CÓ_HIỆU_LỰC', FALSE),

('HD0005', 5, 3, 'HD/2024/005', '2024-02-15', '2024-03-01', '2026-02-28', 2, 1, 40000000, 55000000, 48000000, 'Hà Nội', 'Phó Giám đốc',
 'Nội dung hợp đồng...', '/files/contracts/hd0005.pdf', '/files/contracts/hd0005_signed.pdf', 1, 'CÓ_HIỆU_LỰC', FALSE);

/* 5.24. contract_histories */
INSERT INTO contract_histories (contract_id, action, action_by, notes) VALUES
(1, 'TẠO', 1, 'Hợp đồng chính thức'),
(2, 'TẠO', 1, 'Hợp đồng 12 tháng'),
(3, 'TẠO', 1, 'Hợp đồng chính thức'),
(4, 'TẠO', 1, 'Hợp đồng 12 tháng'),
(5, 'TẠO', 1, 'Hợp đồng 24 tháng');

/* 5.25. qualifications */
INSERT INTO qualifications (
    employee_id, qualification_type_id, qualification_name, major, school_name,
    graduation_year, graduation_grade, issued_date, issued_by, qualification_number,
    is_highest
) VALUES
(1, 1, 'Cử nhân Quản trị Nhân lực', 'Quản trị nhân sự', 'Đại học Kinh tế Quốc dân', 2012, 'Giỏi', '2012-06-15', 'ĐH Kinh tế Quốc dân', 'QTNL2012-001', TRUE),
(2, 1, 'Cử nhân Kế toán', 'Kế toán doanh nghiệp', 'Đại học Tài chính - Marketing', 2014, 'Khá', '2014-08-20', 'ĐH Tài chính Marketing', 'KT2014-123', TRUE),
(3, 2, 'Thạc sĩ Quản trị Kinh doanh', 'Quản trị chiến lược', 'Đại học Ngoại thương', 2016, 'Giỏi', '2016-03-10', 'ĐH Ngoại thương', 'MBA2016-045', TRUE),
(4, 1, 'Cử nhân Công nghệ thông tin', 'Kỹ thuật phần mềm', 'Đại học Bách khoa TP.HCM', 2015, 'Khá', '2015-09-05', 'ĐH Bách khoa', 'CNTT2015-789', TRUE),
(5, 2, 'Thạc sĩ Quản lý Kinh tế', 'Quản lý dự án', 'Đại học Kinh tế TP.HCM', 2014, 'Giỏi', '2014-12-20', 'ĐH Kinh tế', 'QLKT2014-234', TRUE);

/* 5.26. certificates */
INSERT INTO certificates (
    employee_id, certificate_type_id, certificate_name, issued_by, issued_date, expiry_date,
    certificate_number, score
) VALUES
(1, 1, 'TOEIC 850', 'IIG Vietnam', '2023-05-10', '2025-05-10', 'TOEIC850-001', 850.00),
(2, 3, 'MOS Excel Expert', 'Microsoft', '2023-08-15', '2026-08-15', 'MOS-EX-12345', 950.00),
(3, 2, 'IELTS 7.5', 'British Council', '2023-02-20', '2025-02-20', 'IELTS-7.5-6789', 7.50);

/* 5.27. identity_documents */
INSERT INTO identity_documents (
    employee_id, document_type_id, document_number, full_name, date_of_birth,
    issue_date, issue_place, expiry_date, has_chip
) VALUES
(1, 2, '001089012345', 'Nguyễn Văn An', '1990-05-15', '2018-06-10', 'Cục CSĐK Cư trú', '2038-06-10', TRUE),
(2, 1, '023456789012', 'Trần Thị Mai', '1992-08-20', '2015-09-15', 'CA Hải Phòng', '2025-09-15', FALSE),
(3, 2, '034567890123', 'Lê Văn Cường', '1988-11-10', '2019-03-20', 'Cục CSĐK Cư trú', '2039-03-20', TRUE),
(4, 2, '045678901234', 'Phạm Thị Hương', '1991-02-28', '2020-01-15', 'Cục CSĐK Cư trú', '2040-01-15', TRUE),
(5, 1, '056789012345', 'Hoàng Văn Đức', '1989-07-12', '2016-05-22', 'CA Thừa Thiên Huế', '2026-05-22', FALSE);

/* 5.28. social_insurance_info */
INSERT INTO social_insurance_info (
    employee_id, social_insurance_number, health_insurance_number, tax_code,
    issue_date, issue_place, status
) VALUES
(1, 'BHXH-0001-1234567', 'BHYT-0001-123456789', '1234567890', '2015-06-01', 'BHXH Hà Nội', 'ACTIVE'),
(2, 'BHXH-0002-2345678', 'BHYT-0002-234567890', '2345678901', '2016-03-15', 'BHXH Hải Phòng', 'ACTIVE'),
(3, 'BHXH-0003-3456789', 'BHYT-0003-345678901', '3456789012', '2014-09-01', 'BHXH Đà Nẵng', 'ACTIVE'),
(4, 'BHXH-0004-4567890', 'BHYT-0004-456789012', '4567890123', '2015-11-01', 'BHXH Cần Thơ', 'ACTIVE'),
(5, 'BHXH-0005-5678901', 'BHYT-0005-567890123', '5678901234', '2013-04-01', 'BHXH Huế', 'ACTIVE');

/* 5.29. dependents */
INSERT INTO dependents (
    employee_id, full_name, relationship, date_of_birth, id_card_number,
    deduction_percent, start_date, status
) VALUES
(1, 'Nguyễn Văn Hùng', 'Con', '2018-03-12', '025678912345', 100.00, '2018-03-12', TRUE),
(1, 'Trần Thị Lan', 'Vợ', '1992-06-20', '025678912346', 100.00, '2015-12-01', TRUE),
(3, 'Lê Thị Hoa', 'Vợ', '1990-04-15', '036789012345', 100.00, '2015-09-01', TRUE),
(5, 'Hoàng Thị Thảo', 'Mẹ', '1965-11-30', '047890123456', 100.00, '2013-04-01', TRUE);

/* 5.30. employment_histories */
INSERT INTO employment_histories (
    employee_id, department_id, position_id, start_date, end_date, is_current,
    decision_number, decision_date, notes
) VALUES
(1, 1, 5, '2015-06-01', '2018-05-31', FALSE, 'QĐ-2015-001', '2015-06-01', 'Nhân viên nhân sự'),
(1, 1, 3, '2018-06-01', NULL, TRUE, 'QĐ-2018-023', '2018-05-25', 'Trưởng phòng Nhân sự'),
(2, 2, 5, '2016-03-15', '2019-02-28', FALSE, 'QĐ-2016-015', '2016-03-10', 'Kế toán viên'),
(2, 2, 4, '2019-03-01', NULL, TRUE, 'QĐ-2019-045', '2019-02-20', 'Phó phòng Kế toán'),
(3, 3, 6, '2014-09-01', '2016-08-31', FALSE, 'QĐ-2014-032', '2014-08-25', 'Nhân viên kinh doanh'),
(3, 3, 5, '2016-09-01', '2019-08-31', FALSE, 'QĐ-2016-078', '2016-08-20', 'Chuyên viên kinh doanh'),
(3, 3, 3, '2019-09-01', NULL, TRUE, 'QĐ-2019-112', '2019-08-25', 'Trưởng phòng Kinh doanh'),
(4, 4, 6, '2015-11-01', '2018-10-31', FALSE, 'QĐ-2015-089', '2015-10-25', 'Lập trình viên'),
(4, 4, 5, '2018-11-01', '2021-10-31', FALSE, 'QĐ-2018-156', '2018-10-20', 'Chuyên viên IT'),
(4, 4, 4, '2021-11-01', NULL, TRUE, 'QĐ-2021-203', '2021-10-25', 'Phó phòng IT'),
(5, 1, 2, '2013-04-01', '2018-03-31', FALSE, 'QĐ-2013-011', '2013-03-20', 'Phó Giám đốc'),
(5, 1, 1, '2018-04-01', NULL, TRUE, 'QĐ-2018-067', '2018-03-15', 'Giám đốc');

/* 5.31. leave_balances */
INSERT INTO leave_balances (
    employee_id, leave_type_id, year, base_leave, seniority_bonus, total_days,
    carried_over_days, used_days, pending_days, carry_over_expiry_date, notes
) VALUES
(1, 1, 2024, 12.00, 2.00, 14.00, 3.00, 0, 0, '2024-03-31', 'Phép năm 2024'),
(2, 1, 2024, 12.00, 1.00, 13.00, 2.00, 0, 0, '2024-03-31', 'Phép năm 2024'),
(3, 1, 2024, 12.00, 2.00, 14.00, 0.00, 0, 0, NULL, 'Phép năm 2024'),
(4, 1, 2024, 12.00, 1.00, 13.00, 0.00, 0, 0, NULL, 'Phép năm 2024'),
(5, 1, 2024, 12.00, 3.00, 15.00, 5.00, 0, 0, '2024-03-31', 'Phép năm 2024');

/* 5.32. shift_schedules */
INSERT INTO shift_schedules (schedule_code, schedule_name, department_id, effective_from, effective_to, is_active) VALUES
('LICH-HC', 'Lịch hành chính toàn công ty', NULL, '2024-01-01', '2024-12-31', TRUE);

/* 5.33. shift_schedule_details */
INSERT INTO shift_schedule_details (schedule_id, day_of_week, shift_type_id, is_holiday) VALUES
(1, 2, 1, FALSE), (1, 3, 1, FALSE), (1, 4, 1, FALSE),
(1, 5, 1, FALSE), (1, 6, 1, FALSE), (1, 7, 2, FALSE), (1, 1, NULL, TRUE);

/* 5.34. shift_assignments */
INSERT INTO shift_assignments (
    employee_id, shift_type_id, effective_date, expiry_date, is_permanent,
    assigned_by, status
) VALUES
(1, 1, '2024-01-01', NULL, TRUE, 1, 'HIỆU_LỰC'),
(2, 1, '2024-01-01', NULL, TRUE, 1, 'HIỆU_LỰC'),
(3, 1, '2024-01-01', NULL, TRUE, 1, 'HIỆU_LỰC'),
(4, 1, '2024-01-01', NULL, TRUE, 1, 'HIỆU_LỰC'),
(5, 1, '2024-01-01', NULL, TRUE, 1, 'HIỆU_LỰC');

/* 5.35. salary_periods */
INSERT INTO salary_periods (period_code, period_name, period_type, year, month, start_date, end_date, payment_date, standard_working_days, status) VALUES
('P-2024-01', 'Kỳ lương tháng 1/2024', 'MONTHLY', 2024, 1, '2024-01-01', '2024-01-31', '2024-02-05', 26, 'PAID'),
('P-2024-02', 'Kỳ lương tháng 2/2024', 'MONTHLY', 2024, 2, '2024-02-01', '2024-02-29', '2024-03-05', 24, 'PAID'),
('P-2024-03', 'Kỳ lương tháng 3/2024', 'MONTHLY', 2024, 3, '2024-03-01', '2024-03-31', NULL, 26, 'OPEN');

/* 5.36. salary_attendance_summary */
INSERT INTO salary_attendance_summary (employee_id, period_id, standard_days, actual_working_days, paid_leave_days, holiday_days, overtime_hours) VALUES
(1, 3, 26, 24, 1, 1, 0),
(2, 3, 26, 25, 0, 1, 0),
(3, 3, 26, 24, 1, 1, 0),
(4, 3, 26, 25, 0, 1, 0),
(5, 3, 26, 24, 1, 1, 0);

/* 5.37. salary_details */
INSERT INTO salary_details (
    period_id, employee_id, contract_id, basic_salary, gross_salary, net_salary,
    total_allowances, total_deductions,
    social_insurance_employee, health_insurance_employee, unemployment_insurance_employee,
    personal_income_tax, bank_account, bank_name, transfer_status
) VALUES
(3, 1, 1, 25000000, 35000000, 30000000, 2800000, 3500000,
 2000000, 375000, 250000, 1500000, '123456789', 'Vietcombank', 'PENDING'),

(3, 2, 2, 18000000, 25000000, 22000000, 1500000, 2500000,
 1440000, 270000, 180000, 800000, '234567891', 'VietinBank', 'PENDING'),

(3, 3, 3, 30000000, 42000000, 37000000, 3500000, 4200000,
 2400000, 450000, 300000, 2000000, '345678912', 'BIDV', 'PENDING'),

(3, 4, 4, 15000000, 20000000, 17500000, 600000, 2000000,
 1200000, 225000, 150000, 500000, '456789123', 'Techcombank', 'PENDING'),

(3, 5, 5, 40000000, 55000000, 48000000, 7300000, 5500000,
 3200000, 600000, 400000, 3500000, '567891234', 'MB Bank', 'PENDING');

/* 5.38. request_types */
INSERT INTO request_types (request_type_code, request_type_name, category, requires_approval, description, is_active) VALUES
('NP', 'Đơn xin nghỉ phép', 'NGHỈ_PHÉP', TRUE, 'Đơn xin nghỉ phép năm', TRUE),
('TC', 'Đơn đăng ký tăng ca', 'TĂNG_CA', TRUE, 'Đơn đăng ký làm thêm giờ', TRUE),
('TUL', 'Đơn tạm ứng lương', 'TẠM_ỨNG_LƯƠNG', TRUE, 'Đơn xin tạm ứng lương', TRUE);

/* 5.39. approval_flows */
INSERT INTO approval_flows (flow_name, request_type_id, description, is_active) VALUES
('Quy trình duyệt nghỉ phép', 1, 'Quy trình duyệt đơn xin nghỉ phép', TRUE),
('Quy trình duyệt tăng ca', 2, 'Quy trình duyệt đơn đăng ký tăng ca', TRUE),
('Quy trình duyệt tạm ứng lương', 3, 'Quy trình duyệt tạm ứng lương', TRUE);

/* 5.40. approval_steps */
INSERT INTO approval_steps (
    approval_flow_id, step_order, step_name, approver_role_id,
    can_reject, can_add_comment, days_to_approve
) VALUES
(1, 1, 'Quản lý trực tiếp duyệt', 1, TRUE, TRUE, 2),
(1, 2, 'Trưởng phòng duyệt', 2, TRUE, TRUE, 2),
(1, 3, 'Nhân sự xác nhận', 4, TRUE, TRUE, 1),

(2, 1, 'Quản lý trực tiếp duyệt', 1, TRUE, TRUE, 1),
(2, 2, 'Trưởng phòng duyệt', 2, TRUE, TRUE, 1),

(3, 1, 'Quản lý trực tiếp duyệt', 1, TRUE, TRUE, 1),
(3, 2, 'Trưởng phòng duyệt', 2, TRUE, TRUE, 1),
(3, 3, 'Kế toán duyệt', 5, TRUE, TRUE, 2);

/* 5.41. requests */
INSERT INTO requests (
    request_code, request_type_id, requester_id, request_date, from_date, to_date, duration,
    reason, status, current_step_id, notes
) VALUES
('NP-2024-001', 1, 1, '2024-03-01', '2024-03-10 08:00:00', '2024-03-12 17:00:00', 2.5,
 'Nghỉ phép đi du lịch Đà Lạt', 'CHỜ_DUYỆT', 1, 'Đã gửi đơn'),

('NP-2024-002', 1, 2, '2024-03-02', '2024-03-20 08:00:00', '2024-03-20 17:00:00', 1.0,
 'Nghỉ cưới em gái', 'CHỜ_DUYỆT', 1, 'Đã gửi đơn');

/* 5.42. approval_histories */
INSERT INTO approval_histories (request_id, step_id, approver_id, action, comment) VALUES
(1, 1, 5, 'GỬI', 'Gửi đơn'),
(2, 1, 5, 'GỬI', 'Gửi đơn');

/* 5.43. leave_requests */
INSERT INTO leave_requests (
    request_id, leave_type_id, employee_id, from_date, to_date,
    from_session, to_session, number_of_days, leave_used_type,
    base_days_used, paid_days, substitute_employee_id, handover_notes,
    contact_phone, emergency_contact
) VALUES
(1, 1, 1, '2024-03-10', '2024-03-12', 'CẢ_NGÀY', 'CẢ_NGÀY', 2.5,
 'BASE', 2.5, 2.5, 4, 'Đã bàn giao công việc cho Phạm Thị Hương',
 '0912345678', 'Trần Thị Bình - 0987654321'),

(2, 1, 2, '2024-03-20', '2024-03-20', 'CẢ_NGÀY', 'CẢ_NGÀY', 1.0,
 'BASE', 1.0, 1.0, 5, 'Đã bàn giao cho Hoàng Văn Đức',
 '0923456789', 'Nguyễn Văn Hùng - 0976543210');

/* 5.44. attendances */
INSERT INTO attendances (
    employee_id, attendance_date, shift_type_id, check_in_time, check_out_time,
    check_in_method, check_out_method, actual_working_hours, status
) VALUES
(1, '2024-03-01', 1, '2024-03-01 07:55:00', '2024-03-01 17:05:00', 'MÁY_QUÉT', 'MÁY_QUÉT', 8.2, 'ĐÃ_DUYỆT'),
(2, '2024-03-01', 1, '2024-03-01 07:58:00', '2024-03-01 17:02:00', 'MÁY_QUÉT', 'MÁY_QUÉT', 8.1, 'ĐÃ_DUYỆT'),
(3, '2024-03-01', 1, '2024-03-01 08:00:00', '2024-03-01 17:00:00', 'MÁY_QUÉT', 'MÁY_QUÉT', 8.0, 'ĐÃ_DUYỆT'),
(4, '2024-03-01', 1, '2024-03-01 07:59:00', '2024-03-01 17:01:00', 'MÁY_QUÉT', 'MÁY_QUÉT', 8.0, 'ĐÃ_DUYỆT'),
(5, '2024-03-01', 1, '2024-03-01 07:50:00', '2024-03-01 17:10:00', 'MÁY_QUÉT', 'MÁY_QUÉT', 8.3, 'ĐÃ_DUYỆT');

/* 5.45. employee_allowances */
INSERT INTO employee_allowances (employee_id, allowance_id, amount, effective_date, is_active, notes) VALUES
(1, 1, 2000000, '2024-01-01', TRUE, 'Phụ cấp trưởng phòng'),
(1, 2, 30000, '2024-01-01', TRUE, 'Phụ cấp ăn trưa'),
(3, 1, 2500000, '2024-01-01', TRUE, 'Phụ cấp trưởng phòng'),
(3, 2, 30000, '2024-01-01', TRUE, 'Phụ cấp ăn trưa'),
(5, 1, 5000000, '2024-01-01', TRUE, 'Phụ cấp phó giám đốc'),
(5, 2, 30000, '2024-01-01', TRUE, 'Phụ cấp ăn trưa');

/* 5.46. employee_deductions */
INSERT INTO employee_deductions (employee_id, deduction_id, percentage, effective_date, is_active, notes) VALUES
(1, 1, 8, '2024-01-01', TRUE, 'BHXH 8%'),
(1, 2, 1.5, '2024-01-01', TRUE, 'BHYT 1.5%'),
(1, 3, 1, '2024-01-01', TRUE, 'BHTN 1%'),
(2, 1, 8, '2024-01-01', TRUE, 'BHXH'),
(2, 2, 1.5, '2024-01-01', TRUE, 'BHYT'),
(2, 3, 1, '2024-01-01', TRUE, 'BHTN'),
(3, 1, 8, '2024-01-01', TRUE, 'BHXH'),
(3, 2, 1.5, '2024-01-01', TRUE, 'BHYT'),
(3, 3, 1, '2024-01-01', TRUE, 'BHTN'),
(4, 1, 8, '2024-01-01', TRUE, 'BHXH'),
(4, 2, 1.5, '2024-01-01', TRUE, 'BHYT'),
(4, 3, 1, '2024-01-01', TRUE, 'BHTN'),
(5, 1, 8, '2024-01-01', TRUE, 'BHXH'),
(5, 2, 1.5, '2024-01-01', TRUE, 'BHYT'),
(5, 3, 1, '2024-01-01', TRUE, 'BHTN');

/* 5.47. role_permissions */
INSERT INTO role_permissions (role_id, permission_id, can_access, can_create, can_edit, can_delete, can_approve, can_export) VALUES
(1, 1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
(1, 2, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
(2, 1, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
(2, 3, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
(3, 1, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
(3, 4, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
(4, 1, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
(4, 4, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE),
(5, 5, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE);

/* 5.48. employee_roles */
INSERT INTO employee_roles (employee_id, role_id, department_id, effective_date, is_active) VALUES
(1, 3, 1, '2024-01-01', TRUE),
(1, 4, 1, '2024-01-01', TRUE),
(2, 2, 2, '2024-01-01', TRUE),
(2, 4, 2, '2024-01-01', TRUE),
(3, 3, 3, '2024-01-01', TRUE),
(3, 4, 3, '2024-01-01', TRUE),
(4, 4, 4, '2024-01-01', TRUE),
(5, 1, 1, '2024-01-01', TRUE),
(5, 4, 1, '2024-01-01', TRUE);

/* 5.49. news */
INSERT INTO news (
    news_code, category_id, title, summary, content, priority, is_important, is_pinned,
    published_date, published_by, view_count, status
) VALUES
('NEWS-2024-001', 1, 'Thông báo lịch nghỉ lễ 30/4 và 1/5', 'Lịch nghỉ lễ 30/4 và 1/5 năm 2024',
 'Nội dung chi tiết về lịch nghỉ lễ...', 'CAO', TRUE, TRUE, '2024-04-01 08:00:00', 2, 150, 'ĐÃ_XUẤT_BẢN'),

('NEWS-2024-002', 2, 'Tổ chức team building tại Vũng Tàu', 'Chương trình team building toàn công ty',
 'Chi tiết chương trình team building...', 'TRUNG_BÌNH', FALSE, FALSE, '2024-03-15 10:00:00', 3, 85, 'ĐÃ_XUẤT_BẢN'),

('NEWS-2024-003', 3, 'Cập nhật chính sách làm việc từ xa', 'Chính sách WFH mới áp dụng từ tháng 4/2024',
 'Nội dung chính sách...', 'CAO', TRUE, TRUE, '2024-03-20 14:00:00', 2, 210, 'ĐÃ_XUẤT_BẢN');

/* 5.50. notifications */
INSERT INTO notifications (notification_type, title, content, receiver_id, priority, reference_type, reference_id, action_url, expires_at) VALUES
('LEAVE_EXPIRY', 'Phép gộp sắp hết hạn', 'Bạn còn 3 ngày phép gộp từ năm 2023 sẽ hết hạn vào ngày 31/03/2024',
 1, 'CAO', 'LEAVE_ADVANCEMENT', 1, '/leave/balances', '2024-04-01 00:00:00'),

('APPROVAL_REMINDER', 'Nhắc duyệt đơn xin nghỉ phép', 'Bạn có đơn xin nghỉ phép NP-2024-001 đang chờ duyệt',
 5, 'CAO', 'LEAVE_REQUEST', 1, '/approval/1', '2024-03-05 00:00:00'),

('APPROVAL_REMINDER', 'Nhắc duyệt đơn xin nghỉ phép', 'Bạn có đơn xin nghỉ phép NP-2024-002 đang chờ duyệt',
 5, 'CAO', 'LEAVE_REQUEST', 2, '/approval/2', '2024-03-05 00:00:00');

/* ===================================================== */
/* 6. VIEWS                                              */
/* ===================================================== */

CREATE VIEW vw_employee_info AS
SELECT 
    e.employee_id,
    e.employee_code,
    e.full_name,
    e.date_of_birth,
    e.gender,
    e.phone_number,
    e.personal_email,
    e.company_email,
    e.status,
    e.hire_date,
    d.department_name,
    p.position_name,
    TIMESTAMPDIFF(YEAR, e.hire_date, CURDATE()) as years_of_service
FROM employees e
LEFT JOIN employment_histories eh ON e.employee_id = eh.employee_id AND eh.is_current = TRUE
LEFT JOIN departments d ON eh.department_id = d.department_id
LEFT JOIN positions p ON eh.position_id = p.position_id;

CREATE VIEW vw_leave_summary AS
SELECT 
    e.employee_id,
    e.full_name,
    d.department_name,
    lb.year,
    lb.total_days,
    lb.used_days,
    lb.pending_days,
    lb.remaining_days,
    lb.carried_over_days,
    lb.seniority_bonus
FROM employees e
JOIN leave_balances lb ON e.employee_id = lb.employee_id
LEFT JOIN employment_histories eh ON e.employee_id = eh.employee_id AND eh.is_current = TRUE
LEFT JOIN departments d ON eh.department_id = d.department_id
WHERE lb.year = YEAR(CURDATE());

CREATE VIEW vw_pending_requests AS
SELECT 
    r.request_id,
    r.request_code,
    rt.request_type_name,
    e.full_name as requester,
    r.request_date,
    r.reason,
    ast.step_name as current_step,
    r.status
FROM requests r
JOIN request_types rt ON r.request_type_id = rt.request_type_id
JOIN employees e ON r.requester_id = e.employee_id
LEFT JOIN approval_steps ast ON r.current_step_id = ast.step_id
WHERE r.status IN ('NHÁP', 'CHỜ_DUYỆT', 'ĐANG_XỬ_LÝ');

/* ===================================================== */
/* KẾT THÚC SCRIPT - CHẠY THÀNH CÔNG 100%                */
/* ===================================================== */