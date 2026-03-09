CREATE TABLE IF NOT EXISTS organization_units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK( type IN ('municipality', 'administration', 'company', 'shared_service') ) NOT NULL,
    parent_id INTEGER,
    short_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(parent_id) REFERENCES organization_units(id)
);

CREATE TABLE IF NOT EXISTS business_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT CHECK( category IN ('elderly_care', 'schooling', 'social_care', 'infrastructure', 'finance_admin', 'other') ) NOT NULL,
    lifecycle_stage TEXT CHECK( lifecycle_stage IN ('early_childhood', 'schooling', 'working_age', 'elderly_care', 'cross_cutting') ) NOT NULL,
    owner_unit_id INTEGER NOT NULL,
    public_value_dimension TEXT CHECK( public_value_dimension IN ('equality', 'access', 'speed', 'transparency', 'cost_efficiency') ) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(owner_unit_id) REFERENCES organization_units(id)
);

CREATE TABLE IF NOT EXISTS application_systems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    short_code TEXT,
    description TEXT,
    lifecycle_status TEXT CHECK( lifecycle_status IN ('planned', 'active', 'sunset', 'retired') ) NOT NULL,
    criticality INTEGER CHECK( criticality BETWEEN 1 AND 3 ) NOT NULL,
    owner_unit_id INTEGER NOT NULL,
    business_value_score INTEGER CHECK( business_value_score BETWEEN 1 AND 10 ) NOT NULL,
    risk_score INTEGER CHECK( risk_score BETWEEN 1 AND 10 ) NOT NULL,
    technology_stack TEXT,
    data_sensitivity TEXT CHECK( data_sensitivity IN ('low', 'medium', 'high') ) NOT NULL,
    is_key_platform BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(owner_unit_id) REFERENCES organization_units(id)
);

CREATE TABLE IF NOT EXISTS app_business_service_link (
    application_id INTEGER NOT NULL,
    business_service_id INTEGER NOT NULL,
    primary_flag BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (application_id, business_service_id),
    FOREIGN KEY(application_id) REFERENCES application_systems(id),
    FOREIGN KEY(business_service_id) REFERENCES business_services(id)
);

CREATE TABLE IF NOT EXISTS technical_components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK( type IN ('database', 'vm', 'container_platform', 'api_gateway', 'storage', 'network', 'other') ) NOT NULL,
    vendor TEXT,
    lifecycle_status TEXT CHECK( lifecycle_status IN ('planned', 'active', 'sunset', 'retired') ) NOT NULL,
    location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS app_tech_component_link (
    application_id INTEGER NOT NULL,
    tech_component_id INTEGER NOT NULL,
    relationship_type TEXT CHECK( relationship_type IN ('runs_on', 'stores_data_in', 'uses') ) NOT NULL,
    PRIMARY KEY (application_id, tech_component_id, relationship_type),
    FOREIGN KEY(application_id) REFERENCES application_systems(id),
    FOREIGN KEY(tech_component_id) REFERENCES technical_components(id)
);

CREATE TABLE IF NOT EXISTS interfaces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT CHECK( type IN ('REST', 'SOAP', 'message_queue', 'file_drop', 'database_link', 'logical') ) NOT NULL,
    direction TEXT CHECK( direction IN ('inbound', 'outbound', 'bidirectional') ) NOT NULL,
    data_domain TEXT CHECK( data_domain IN ('citizen_data', 'financial_data', 'hr_data', 'education_data', 'infra_monitoring', 'other') ) NOT NULL,
    availability_slo DECIMAL(5,2),
    sensitivity TEXT CHECK( sensitivity IN ('low', 'medium', 'high') ) NOT NULL,
    documentation_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(application_id) REFERENCES application_systems(id)
);

CREATE TABLE IF NOT EXISTS integrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_interface_id INTEGER NOT NULL,
    target_interface_id INTEGER NOT NULL,
    transfer_method TEXT CHECK( transfer_method IN ('api_call', 'csv_file', 'sftp', 'message_bus', 'webhook', 'manual') ) NOT NULL,
    frequency TEXT CHECK( frequency IN ('real_time', 'hourly', 'daily', 'weekly', 'ad_hoc') ) NOT NULL,
    status TEXT CHECK( status IN ('planned', 'active', 'deprecated', 'retired') ) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(source_interface_id) REFERENCES interfaces(id),
    FOREIGN KEY(target_interface_id) REFERENCES interfaces(id)
);

CREATE TABLE IF NOT EXISTS usage_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    date DATE NOT NULL,
    active_users INTEGER NOT NULL DEFAULT 0,
    api_calls INTEGER NOT NULL DEFAULT 0,
    avg_response_ms INTEGER NOT NULL DEFAULT 0,
    error_rate DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    cpu_pct DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    memory_pct DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(application_id) REFERENCES application_systems(id)
);

CREATE TABLE IF NOT EXISTS api_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    interface_id INTEGER NOT NULL,
    date DATE NOT NULL,
    requests INTEGER NOT NULL DEFAULT 0,
    avg_latency_ms INTEGER NOT NULL DEFAULT 0,
    p95_latency_ms INTEGER NOT NULL DEFAULT 0,
    errors_5xx INTEGER NOT NULL DEFAULT 0,
    errors_4xx INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(interface_id) REFERENCES interfaces(id)
);

CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    integration_id INTEGER,
    severity INTEGER CHECK( severity IN (1, 2, 3) ) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    cause_category TEXT CHECK( cause_category IN ('vendor_issue', 'internal_change', 'infra_failure', 'external_dependency', 'unknown') ) NOT NULL,
    description TEXT,
    user_impact_estimate INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(application_id) REFERENCES application_systems(id),
    FOREIGN KEY(integration_id) REFERENCES integrations(id)
);

CREATE TABLE IF NOT EXISTS user_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS app_user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    user_group_id INTEGER NOT NULL,
    period DATE NOT NULL,
    user_count INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(application_id) REFERENCES application_systems(id),
    FOREIGN KEY(user_group_id) REFERENCES user_groups(id)
);

CREATE TABLE IF NOT EXISTS sourcing_setups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    vendor_name TEXT,
    sourcing_model TEXT CHECK( sourcing_model IN ('on_prem', 'saas', 'outsourced', 'insourced_dev', 'mixed') ) NOT NULL,
    contract_start DATE,
    contract_end DATE,
    annual_cost_eur DECIMAL(10,2),
    supports_encapsulation BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(application_id) REFERENCES application_systems(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_metrics_date ON usage_metrics(date);
CREATE INDEX IF NOT EXISTS idx_usage_metrics_app ON usage_metrics(application_id);
CREATE INDEX IF NOT EXISTS idx_api_metrics_date ON api_metrics(date);
CREATE INDEX IF NOT EXISTS idx_api_metrics_iface ON api_metrics(interface_id);
CREATE INDEX IF NOT EXISTS idx_incidents_app ON incidents(application_id);
