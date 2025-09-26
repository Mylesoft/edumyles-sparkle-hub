-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Modules table
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    version VARCHAR(50) NOT NULL,
    price INTEGER DEFAULT 0,
    required_plan VARCHAR(50) CHECK (required_plan IN ('basic', 'professional', 'enterprise')),
    features JSONB DEFAULT '[]',
    developer VARCHAR(255) NOT NULL,
    downloads INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenants table
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscription_plan VARCHAR(50) CHECK (subscription_plan IN ('basic', 'professional', 'enterprise')),
    status VARCHAR(50) CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
    modules_limit INTEGER DEFAULT 10,
    current_modules INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table linking auth.users to tenants
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    role VARCHAR(50) CHECK (role IN ('super_admin', 'tenant_admin', 'teacher', 'student', 'staff', 'alumni')) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenant modules junction table
CREATE TABLE tenant_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    is_installed BOOLEAN DEFAULT FALSE,
    is_enabled BOOLEAN DEFAULT FALSE,
    installed_at TIMESTAMP WITH TIME ZONE,
    configured_at TIMESTAMP WITH TIME ZONE,
    configuration JSONB DEFAULT '{}',
    UNIQUE(tenant_id, module_id)
);

-- Module reviews table
CREATE TABLE module_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    tenant_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(module_id, tenant_id)
);

-- Insert sample modules
INSERT INTO modules (name, description, category, version, price, required_plan, features, developer, downloads, rating, reviews_count) VALUES
('Advanced Reporting Suite', 'Comprehensive reporting and analytics for all school operations', 'analytics', '2.5.0', 3500, 'enterprise', '["Custom Report Builder", "Data Visualization", "Scheduled Reports", "Export Options"]', 'ReportMaster', 2340, 4.7, 34),
('Virtual Classroom', 'Complete online learning platform with video conferencing', 'academic', '1.9.0', 2200, 'professional', '["HD Video Classes", "Screen Sharing", "Recording", "Breakout Rooms"]', 'EduStream', 5670, 4.8, 89),
('Alumni Network', 'Connect and engage with alumni community', 'communication', '1.2.5', 1300, 'professional', '["Alumni Directory", "Event Management", "Donation Tracking", "Job Board"]', 'AlumniConnect', 1890, 4.4, 23),
('Cafeteria Management', 'Complete meal planning and nutrition tracking system', 'administration', '1.5.0', 1100, 'basic', '["Menu Planning", "Nutrition Tracking", "Meal Ordering", "Dietary Restrictions"]', 'NutriTrack', 3450, 4.6, 56);

-- Insert sample tenants
INSERT INTO tenants (name, email, subscription_plan, modules_limit) VALUES
('Greenwood Academy', 'admin@greenwood.edu', 'professional', 15),
('St. Mary''s School', 'admin@stmarys.edu', 'basic', 8),
('Tech Valley International', 'admin@techvalley.edu', 'enterprise', 25),
('Riverside Primary', 'admin@riverside.edu', 'basic', 6);

-- Insert sample tenant modules
INSERT INTO tenant_modules (tenant_id, module_id, is_installed, is_enabled, installed_at) 
SELECT 
    t.id, 
    m.id, 
    true, 
    true, 
    NOW() - INTERVAL '30 days' * random()
FROM tenants t, modules m 
WHERE random() > 0.6;

-- Insert sample reviews
INSERT INTO module_reviews (module_id, tenant_id, tenant_name, rating, comment)
SELECT 
    m.id,
    t.id,
    t.name,
    floor(random() * 5 + 1),
    CASE floor(random() * 3)
        WHEN 0 THEN 'Excellent module! Very user-friendly and feature-rich.'
        WHEN 1 THEN 'Great addition to our school management system. Highly recommended.'
        ELSE 'Good functionality, could use some minor improvements in the UI.'
    END
FROM modules m, tenants t 
WHERE random() > 0.7;

-- Row Level Security (RLS) policies
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow all users to read modules (public store)
CREATE POLICY "Modules are publicly readable" ON modules FOR SELECT USING (true);

-- User profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (
    auth.uid() = id
);

CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (
    auth.uid() = id
);

-- Super admin can manage everything
CREATE POLICY "Super admin full access" ON tenants FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'super_admin'
    )
);

CREATE POLICY "Super admin modules access" ON tenant_modules FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'super_admin'
    )
);

-- Tenants can only access their own data
CREATE POLICY "Tenants can view own data" ON tenants FOR SELECT USING (
    id IN (
        SELECT tenant_id FROM user_profiles 
        WHERE user_profiles.id = auth.uid()
    ) OR EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'super_admin'
    )
);

CREATE POLICY "Tenants can view own modules" ON tenant_modules FOR SELECT USING (
    tenant_id IN (
        SELECT tenant_id FROM user_profiles 
        WHERE user_profiles.id = auth.uid()
    ) OR EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'super_admin'
    )
);

-- Reviews can be read by all, created by tenant owners
CREATE POLICY "Reviews are publicly readable" ON module_reviews FOR SELECT USING (true);

CREATE POLICY "Tenants can create reviews" ON module_reviews FOR INSERT WITH CHECK (
    auth.uid()::text = tenant_id::text
);

-- Update functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE
    ON modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE
    ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE
    ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample user profiles for existing tenants
INSERT INTO user_profiles (id, tenant_id, role, full_name) VALUES
(gen_random_uuid(), (SELECT id FROM tenants WHERE email = 'admin@greenwood.edu'), 'tenant_admin', 'Sarah Johnson'),
(gen_random_uuid(), (SELECT id FROM tenants WHERE email = 'admin@stmarys.edu'), 'tenant_admin', 'Michael Smith'),
(gen_random_uuid(), (SELECT id FROM tenants WHERE email = 'admin@techvalley.edu'), 'tenant_admin', 'Dr. Emily Chen'),
(gen_random_uuid(), (SELECT id FROM tenants WHERE email = 'admin@riverside.edu'), 'tenant_admin', 'David Wilson');