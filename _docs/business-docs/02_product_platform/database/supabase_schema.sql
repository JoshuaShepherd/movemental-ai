# Movemental Platform - Complete Supabase Schema
## Comprehensive Database Schema for Global Ministry Multiplication Platform

---

## 🔐 **AUTHENTICATION & USER MANAGEMENT**

```sql
-- =============================================
-- CORE USER AUTHENTICATION & PROFILES
-- =============================================

-- User profiles extending Supabase auth.users
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    
    -- Basic Information
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(150),
    avatar_url TEXT,
    phone VARCHAR(20),
    
    -- Geographic Information
    country VARCHAR(100),
    state_province VARCHAR(100),
    city VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language_preference VARCHAR(10) DEFAULT 'en',
    
    -- Ministry Context
    ministry_role ministry_role_enum NOT NULL,
    organization_name VARCHAR(200),
    denomination VARCHAR(100),
    years_in_ministry INTEGER,
    church_size church_size_enum,
    
    -- Platform Engagement
    subscription_tier subscription_tier_enum DEFAULT 'free',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    ai_interaction_count INTEGER DEFAULT 0,
    community_participation_level participation_level_enum DEFAULT 'observer',
    
    -- Preferences
    content_preferences JSONB DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{"email": true, "push": false, "sms": false}',
    privacy_settings JSONB DEFAULT '{"profile_visible": true, "allow_direct_messages": true}',
    
    -- Tracking
    last_active_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom enums for user classification
CREATE TYPE ministry_role_enum AS ENUM (
    'senior_pastor',
    'associate_pastor', 
    'church_planter',
    'denominational_leader',
    'seminary_professor',
    'seminary_student',
    'ministry_staff',
    'missionary',
    'marketplace_minister',
    'nonprofit_leader',
    'consultant',
    'academic_researcher',
    'emerging_leader',
    'other'
);

CREATE TYPE church_size_enum AS ENUM (
    'planting',
    'small_0_50',
    'medium_51_200', 
    'large_201_500',
    'very_large_501_1000',
    'mega_1000_plus',
    'network_multiple'
);

CREATE TYPE subscription_tier_enum AS ENUM (
    'free',
    'basic',
    'professional', 
    'enterprise',
    'academic',
    'international'
);

CREATE TYPE participation_level_enum AS ENUM (
    'observer',
    'participant',
    'contributor', 
    'leader',
    'moderator'
);

-- User settings and extended preferences
CREATE TABLE public.user_settings (
    user_id UUID REFERENCES public.user_profiles(id) PRIMARY KEY,
    
    -- AI Interaction Preferences
    ai_conversation_style ai_style_enum DEFAULT 'balanced',
    theological_depth_preference depth_preference_enum DEFAULT 'intermediate',
    practical_application_focus BOOLEAN DEFAULT TRUE,
    
    -- Content Preferences
    preferred_content_types TEXT[] DEFAULT ARRAY['articles', 'videos', 'podcasts'],
    content_difficulty_level difficulty_enum DEFAULT 'intermediate',
    topics_of_interest TEXT[] DEFAULT ARRAY[],
    
    -- Communication Preferences
    email_frequency frequency_enum DEFAULT 'weekly',
    community_digest BOOLEAN DEFAULT TRUE,
    ministry_updates BOOLEAN DEFAULT TRUE,
    product_announcements BOOLEAN DEFAULT FALSE,
    
    -- Privacy & Security
    profile_visibility visibility_enum DEFAULT 'community',
    allow_ai_learning BOOLEAN DEFAULT TRUE,
    data_retention_period INTEGER DEFAULT 730, -- days
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE ai_style_enum AS ENUM ('concise', 'detailed', 'balanced', 'conversational');
CREATE TYPE depth_preference_enum AS ENUM ('basic', 'intermediate', 'advanced', 'scholarly');
CREATE TYPE difficulty_enum AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE frequency_enum AS ENUM ('daily', 'weekly', 'biweekly', 'monthly', 'quarterly');
CREATE TYPE visibility_enum AS ENUM ('private', 'community', 'public');
```

---

## 🤖 **AI AGENT INTERACTION SYSTEM**

```sql
-- =============================================
-- AI CONVERSATION MANAGEMENT
-- =============================================

-- AI conversation sessions
CREATE TABLE public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    
    -- Session Information
    session_title VARCHAR(200),
    session_type conversation_type_enum NOT NULL,
    conversation_context JSONB DEFAULT '{}',
    
    -- Content Classification
    primary_topic VARCHAR(100),
    theological_themes TEXT[],
    practical_applications TEXT[],
    ministry_focus_areas TEXT[],
    
    -- Quality Metrics
    user_satisfaction_rating INTEGER CHECK (user_satisfaction_rating >= 1 AND user_satisfaction_rating <= 5),
    conversation_quality_score DECIMAL(3,2),
    theological_accuracy_verified BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    total_messages INTEGER DEFAULT 0,
    conversation_duration_minutes INTEGER,
    language VARCHAR(10) DEFAULT 'en',
    
    -- Status
    status conversation_status_enum DEFAULT 'active',
    archived_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE conversation_type_enum AS ENUM (
    'general_inquiry',
    'theological_discussion',
    'strategic_consultation',
    'leadership_coaching',
    'church_planting_advice',
    'organizational_development',
    'crisis_management',
    'resource_recommendation',
    'community_question'
);

CREATE TYPE conversation_status_enum AS ENUM ('active', 'paused', 'completed', 'archived');

-- Individual messages within conversations
CREATE TABLE public.ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
    
    -- Message Content
    role message_role_enum NOT NULL,
    content TEXT NOT NULL,
    content_type content_type_enum DEFAULT 'text',
    
    -- AI Processing Metadata
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    processing_time_ms INTEGER,
    ai_model_version VARCHAR(50),
    
    -- Quality & Classification
    theological_topics TEXT[],
    practical_elements TEXT[],
    scripture_references TEXT[],
    resource_recommendations TEXT[],
    
    -- Feedback
    user_feedback feedback_enum,
    accuracy_verified BOOLEAN DEFAULT FALSE,
    flagged_for_review BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    edited_at TIMESTAMPTZ,
    message_order INTEGER NOT NULL
);

CREATE TYPE message_role_enum AS ENUM ('user', 'assistant', 'system');
CREATE TYPE content_type_enum AS ENUM ('text', 'markdown', 'structured');
CREATE TYPE feedback_enum AS ENUM ('helpful', 'not_helpful', 'inaccurate', 'excellent');

-- AI conversation analytics and insights
CREATE TABLE public.ai_conversation_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.ai_conversations(id) UNIQUE,
    
    -- Engagement Metrics
    total_user_messages INTEGER DEFAULT 0,
    total_ai_messages INTEGER DEFAULT 0,
    average_response_time_seconds DECIMAL(8,2),
    user_engagement_score DECIMAL(4,2),
    
    -- Content Analysis
    theological_depth_level depth_preference_enum,
    practical_application_ratio DECIMAL(3,2),
    scripture_reference_count INTEGER DEFAULT 0,
    resource_recommendation_count INTEGER DEFAULT 0,
    
    -- Outcome Tracking
    action_items_generated TEXT[],
    follow_up_resources_provided TEXT[],
    ministry_applications_discussed TEXT[],
    
    -- Quality Metrics
    theological_accuracy_score DECIMAL(3,2),
    practical_relevance_score DECIMAL(3,2),
    user_satisfaction_trend DECIMAL(3,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📚 **CONTENT MANAGEMENT SYSTEM**

```sql
-- =============================================
-- CONTENT & RESOURCE MANAGEMENT
-- =============================================

-- Main content repository
CREATE TABLE public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content_type content_item_type_enum NOT NULL,
    status content_status_enum DEFAULT 'draft',
    
    -- Content Details
    summary TEXT,
    content_body TEXT,
    word_count INTEGER,
    reading_time_minutes INTEGER,
    
    -- Categorization
    primary_category VARCHAR(100),
    secondary_categories TEXT[],
    theological_themes TEXT[],
    practical_applications TEXT[],
    target_audience TEXT[],
    ministry_context TEXT[],
    
    -- SEO & Discovery
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    keywords TEXT[],
    featured_image_url TEXT,
    
    -- AI Integration
    ai_summary TEXT,
    key_insights TEXT[],
    discussion_questions TEXT[],
    action_items TEXT[],
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2),
    
    -- Publishing
    author_id UUID REFERENCES public.user_profiles(id),
    published_at TIMESTAMPTZ,
    featured_until TIMESTAMPTZ,
    
    -- Versioning
    version INTEGER DEFAULT 1,
    parent_content_id UUID REFERENCES public.content_items(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE content_item_type_enum AS ENUM (
    'article',
    'video',
    'podcast',
    'book_chapter',
    'white_paper',
    'case_study',
    'framework',
    'toolkit',
    'template',
    'assessment',
    'course_lesson',
    'webinar',
    'infographic',
    'quote'
);

CREATE TYPE content_status_enum AS ENUM ('draft', 'review', 'approved', 'published', 'archived');

-- Content series and collections
CREATE TABLE public.content_series (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    title VARCHAR(200) NOT NULL,
    description TEXT,
    series_type series_type_enum NOT NULL,
    
    -- Organization
    total_items INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2),
    estimated_duration_hours INTEGER,
    
    -- Access Control
    access_level access_level_enum DEFAULT 'free',
    prerequisite_series UUID REFERENCES public.content_series(id),
    
    -- Metadata
    featured_image_url TEXT,
    tags TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE series_type_enum AS ENUM ('course', 'book', 'video_series', 'podcast_series', 'framework_collection');
CREATE TYPE access_level_enum AS ENUM ('free', 'basic', 'premium', 'enterprise');

-- Content series relationships
CREATE TABLE public.content_series_items (
    series_id UUID REFERENCES public.content_series(id) ON DELETE CASCADE,
    content_id UUID REFERENCES public.content_items(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    
    PRIMARY KEY (series_id, content_id)
);

-- User content interactions
CREATE TABLE public.user_content_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    content_id UUID REFERENCES public.content_items(id) NOT NULL,
    
    -- Interaction Details
    interaction_type interaction_type_enum NOT NULL,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    time_spent_minutes INTEGER DEFAULT 0,
    
    -- Engagement
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    bookmarked BOOLEAN DEFAULT FALSE,
    notes TEXT,
    
    -- Implementation Tracking
    action_items_completed TEXT[],
    implementation_status implementation_status_enum DEFAULT 'not_started',
    
    first_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TYPE interaction_type_enum AS ENUM ('view', 'download', 'bookmark', 'share', 'rate', 'comment', 'complete');
CREATE TYPE implementation_status_enum AS ENUM ('not_started', 'in_progress', 'implemented', 'adapted', 'abandoned');
```

---

## 👥 **COMMUNITY & NETWORKING SYSTEM**

```sql
-- =============================================
-- COMMUNITY MANAGEMENT & NETWORKING
-- =============================================

-- Community groups and networks
CREATE TABLE public.communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    community_type community_type_enum NOT NULL,
    
    -- Organization
    visibility visibility_enum DEFAULT 'public',
    join_policy join_policy_enum DEFAULT 'open',
    max_members INTEGER,
    current_member_count INTEGER DEFAULT 0,
    
    -- Geographic/Cultural Context
    geographic_focus TEXT[],
    language_primary VARCHAR(10) DEFAULT 'en',
    languages_supported TEXT[],
    cultural_context TEXT[],
    
    -- Ministry Focus
    ministry_focus TEXT[],
    denominational_affiliation TEXT[],
    target_audience TEXT[],
    
    -- Management
    created_by UUID REFERENCES public.user_profiles(id) NOT NULL,
    moderators UUID[] DEFAULT ARRAY[]::UUID[],
    community_guidelines TEXT,
    
    -- Engagement
    activity_level activity_level_enum DEFAULT 'low',
    last_activity_at TIMESTAMPTZ,
    
    -- Features
    features_enabled JSONB DEFAULT '{"discussions": true, "events": false, "resources": true}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE community_type_enum AS ENUM (
    'general_discussion',
    'denominational_network', 
    'regional_network',
    'church_planting_cohort',
    'leadership_development',
    'academic_research',
    'missionary_network',
    'marketplace_ministry',
    'special_interest'
);

CREATE TYPE join_policy_enum AS ENUM ('open', 'request', 'invitation_only', 'closed');
CREATE TYPE activity_level_enum AS ENUM ('low', 'moderate', 'high', 'very_high');

-- Community memberships
CREATE TABLE public.community_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    -- Membership Details
    role community_role_enum DEFAULT 'member',
    status membership_status_enum DEFAULT 'active',
    join_date TIMESTAMPTZ DEFAULT NOW(),
    
    -- Engagement
    participation_score INTEGER DEFAULT 0,
    last_active_at TIMESTAMPTZ,
    contributions_count INTEGER DEFAULT 0,
    
    -- Permissions
    can_post BOOLEAN DEFAULT TRUE,
    can_moderate BOOLEAN DEFAULT FALSE,
    can_invite BOOLEAN DEFAULT FALSE,
    
    UNIQUE(community_id, user_id)
);

CREATE TYPE community_role_enum AS ENUM ('member', 'contributor', 'moderator', 'admin', 'founder');
CREATE TYPE membership_status_enum AS ENUM ('pending', 'active', 'inactive', 'suspended', 'banned');

-- Community discussions and posts
CREATE TABLE public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    
    -- Content
    title VARCHAR(300),
    content TEXT NOT NULL,
    post_type post_type_enum DEFAULT 'discussion',
    
    -- Categorization
    tags TEXT[] DEFAULT ARRAY[],
    theological_topics TEXT[] DEFAULT ARRAY[],
    ministry_applications TEXT[] DEFAULT ARRAY[],
    
    -- Engagement
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- Moderation
    status post_status_enum DEFAULT 'published',
    flagged_count INTEGER DEFAULT 0,
    moderated_by UUID REFERENCES public.user_profiles(id),
    moderation_notes TEXT,
    
    -- Threading
    parent_post_id UUID REFERENCES public.community_posts(id),
    thread_depth INTEGER DEFAULT 0,
    
    -- Metadata
    pinned BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    allows_replies BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE post_type_enum AS ENUM (
    'discussion',
    'question',
    'resource_share',
    'prayer_request',
    'announcement',
    'event',
    'testimony',
    'case_study'
);

CREATE TYPE post_status_enum AS ENUM ('draft', 'published', 'hidden', 'flagged', 'removed');

-- Networking connections between users
CREATE TABLE public.user_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    addressee_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    
    -- Connection Details
    status connection_status_enum DEFAULT 'pending',
    connection_type connection_type_enum DEFAULT 'professional',
    
    -- Context
    connection_context TEXT,
    mutual_interests TEXT[],
    collaboration_interests TEXT[],
    
    -- Communication
    last_interaction_at TIMESTAMPTZ,
    message_count INTEGER DEFAULT 0,
    
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    connected_at TIMESTAMPTZ,
    
    UNIQUE(requester_id, addressee_id),
    CHECK (requester_id != addressee_id)
);

CREATE TYPE connection_status_enum AS ENUM ('pending', 'accepted', 'blocked', 'ignored');
CREATE TYPE connection_type_enum AS ENUM ('professional', 'ministry_partner', 'mentorship', 'collaboration', 'friendship');
```

---

## 💼 **BUSINESS OPERATIONS & FINANCIAL MANAGEMENT**

```sql
-- =============================================
-- SUBSCRIPTION & FINANCIAL MANAGEMENT
-- =============================================

-- Subscription plans and pricing
CREATE TABLE public.subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Plan Details
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    plan_type plan_type_enum NOT NULL,
    
    -- Pricing
    price_monthly DECIMAL(10,2),
    price_annual DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Features
    features JSONB NOT NULL DEFAULT '{}',
    ai_interactions_limit INTEGER, -- null means unlimited
    community_access_level access_level_enum DEFAULT 'basic',
    content_access_level access_level_enum DEFAULT 'basic',
    
    -- Availability
    available_countries TEXT[],
    target_segments TEXT[],
    
    -- Status
    active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE plan_type_enum AS ENUM ('free', 'individual', 'organization', 'academic', 'enterprise');

-- User subscriptions
CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    plan_id UUID REFERENCES public.subscription_plans(id) NOT NULL,
    
    -- Subscription Details
    status subscription_status_enum DEFAULT 'active',
    billing_cycle billing_cycle_enum DEFAULT 'monthly',
    
    -- Payment Information
    stripe_subscription_id VARCHAR(100),
    stripe_customer_id VARCHAR(100),
    payment_method_last4 VARCHAR(4),
    
    -- Dates
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    trial_start TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    canceled_at TIMESTAMPTZ,
    
    -- Usage Tracking
    ai_interactions_used INTEGER DEFAULT 0,
    ai_interactions_limit INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE subscription_status_enum AS ENUM (
    'trialing',
    'active', 
    'past_due',
    'canceled',
    'unpaid',
    'incomplete',
    'incomplete_expired'
);

CREATE TYPE billing_cycle_enum AS ENUM ('monthly', 'annual');

-- Payment transactions
CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    subscription_id UUID REFERENCES public.user_subscriptions(id),
    
    -- Transaction Details
    stripe_payment_intent_id VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status payment_status_enum NOT NULL,
    
    -- Payment Method
    payment_method VARCHAR(50),
    payment_method_details JSONB,
    
    -- Metadata
    description TEXT,
    invoice_url TEXT,
    receipt_url TEXT,
    
    processed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE payment_status_enum AS ENUM ('pending', 'succeeded', 'failed', 'canceled', 'refunded');

-- Organization accounts for enterprise subscriptions
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Organization Details
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    organization_type org_type_enum NOT NULL,
    
    -- Contact Information
    website_url TEXT,
    primary_email VARCHAR(255),
    phone VARCHAR(20),
    
    -- Address
    address_line1 VARCHAR(200),
    address_line2 VARCHAR(200),
    city VARCHAR(100),
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    
    -- Ministry Context
    denomination VARCHAR(100),
    ministry_focus TEXT[],
    size_category org_size_enum,
    
    -- Account Management
    account_owner_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    billing_contact_id UUID REFERENCES public.user_profiles(id),
    max_seats INTEGER,
    current_seats INTEGER DEFAULT 0,
    
    -- Settings
    settings JSONB DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE org_type_enum AS ENUM (
    'church',
    'denomination',
    'seminary',
    'nonprofit',
    'missions_agency',
    'ministry_network',
    'consulting_firm',
    'academic_institution'
);

CREATE TYPE org_size_enum AS ENUM ('small', 'medium', 'large', 'enterprise');

-- Organization memberships
CREATE TABLE public.organization_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    role org_role_enum DEFAULT 'member',
    status membership_status_enum DEFAULT 'active',
    
    -- Permissions
    can_manage_billing BOOLEAN DEFAULT FALSE,
    can_invite_users BOOLEAN DEFAULT FALSE,
    can_manage_settings BOOLEAN DEFAULT FALSE,
    
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(organization_id, user_id)
);

CREATE TYPE org_role_enum AS ENUM ('member', 'admin', 'owner', 'billing_manager');
```

---

## 🤝 **PARTNERSHIP & COLLABORATION SYSTEM**

```sql
-- =============================================
-- PARTNERSHIPS & STRATEGIC RELATIONSHIPS
-- =============================================

-- Strategic partnerships
CREATE TABLE public.partnerships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Partner Information
    partner_name VARCHAR(200) NOT NULL,
    partner_type partner_type_enum NOT NULL,
    partner_website TEXT,
    
    -- Partnership Details
    partnership_type partnership_type_enum NOT NULL,
    status partnership_status_enum DEFAULT 'proposed',
    
    -- Terms & Agreements
    start_date DATE,
    end_date DATE,
    renewal_terms TEXT,
    
    -- Financial Terms
    revenue_share_percentage DECIMAL(5,2),
    minimum_commitment DECIMAL(10,2),
    payment_terms TEXT,
    
    -- Collaboration Areas
    collaboration_areas TEXT[],
    shared_resources TEXT[],
    integration_requirements TEXT[],
    
    -- Management
    primary_contact_name VARCHAR(150),
    primary_contact_email VARCHAR(255),
    internal_manager_id UUID REFERENCES public.user_profiles(id),
    
    -- Performance
    performance_metrics JSONB DEFAULT '{}',
    success_criteria TEXT[],
    
    -- Documentation
    contract_url TEXT,
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE partner_type_enum AS ENUM (
    'academic_institution',
    'denomination',
    'publishing_house',
    'technology_provider',
    'missions_organization',
    'consulting_firm',
    'content_creator',
    'platform_integration',
    'distribution_partner'
);

CREATE TYPE partnership_type_enum AS ENUM (
    'content_syndication',
    'technology_integration',
    'co_marketing',
    'revenue_sharing',
    'academic_collaboration',
    'distribution_agreement',
    'white_label_solution',
    'strategic_alliance'
);

CREATE TYPE partnership_status_enum AS ENUM (
    'proposed',
    'negotiating',
    'active',
    'paused',
    'terminated',
    'expired'
);

-- Client consulting projects (premium services)
CREATE TABLE public.consulting_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Client Information
    client_organization_id UUID REFERENCES public.organizations(id),
    client_contact_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    
    -- Project Details
    project_name VARCHAR(200) NOT NULL,
    project_type consulting_type_enum NOT NULL,
    description TEXT,
    
    -- Scope & Timeline
    scope_of_work TEXT,
    deliverables TEXT[],
    start_date DATE,
    end_date DATE,
    estimated_hours INTEGER,
    
    -- Financial
    total_value DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'USD',
    payment_schedule payment_schedule_enum DEFAULT 'milestone',
    
    -- Status
    status project_status_enum DEFAULT 'proposed',
    completion_percentage INTEGER DEFAULT 0,
    
    -- Team Assignment
    lead_consultant_id UUID REFERENCES public.user_profiles(id),
    team_members UUID[],
    
    -- Documentation
    proposal_url TEXT,
    contract_url TEXT,
    final_report_url TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE consulting_type_enum AS ENUM (
    'organizational_assessment',
    'strategic_planning',
    'leadership_development',
    'church_planting_strategy',
    'denominational_renewal',
    'crisis_management',
    'change_management',
    'team_development',
    'succession_planning'
);

CREATE TYPE payment_schedule_enum AS ENUM ('upfront', 'milestone', 'monthly', 'completion');
CREATE TYPE project_status_enum AS ENUM (
    'proposed',
    'approved',
    'in_progress',
    'on_hold',
    'completed',
    'canceled'
);

-- Event management for conferences, webinars, workshops
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Event Details
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    event_type event_type_enum NOT NULL,
    
    -- Scheduling
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    timezone VARCHAR(50) NOT NULL,
    
    -- Location
    location_type location_type_enum NOT NULL,
    venue_name VARCHAR(200),
    address TEXT,
    virtual_platform VARCHAR(100),
    access_url TEXT,
    
    -- Capacity & Registration
    max_attendees INTEGER,
    current_registrations INTEGER DEFAULT 0,
    registration_required BOOLEAN DEFAULT TRUE,
    registration_deadline TIMESTAMPTZ,
    
    -- Pricing
    is_free BOOLEAN DEFAULT TRUE,
    price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Access Control
    access_level access_level_enum DEFAULT 'public',
    required_subscription_tier subscription_tier_enum,
    
    -- Content
    featured_image_url TEXT,
    agenda JSONB,
    speakers UUID[],
    resources TEXT[],
    
    -- Management
    organizer_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    status event_status_enum DEFAULT 'draft',
    
    -- Recording & Follow-up
    recording_url TEXT,
    follow_up_resources TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE event_type_enum AS ENUM (
    'webinar',
    'workshop',
    'conference',
    'masterclass',
    'q_and_a_session',
    'community_call',
    'book_launch',
    'panel_discussion'
);

CREATE TYPE location_type_enum AS ENUM ('virtual', 'in_person', 'hybrid');
CREATE TYPE event_status_enum AS ENUM ('draft', 'published', 'registration_closed', 'live', 'completed', 'canceled');

-- Event registrations
CREATE TABLE public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    -- Registration Details
    registration_date TIMESTAMPTZ DEFAULT NOW(),
    attendance_status attendance_status_enum DEFAULT 'registered',
    
    -- Payment (if applicable)
    payment_transaction_id UUID REFERENCES public.payment_transactions(id),
    
    -- Follow-up
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_text TEXT,
    follow_up_interest TEXT[],
    
    UNIQUE(event_id, user_id)
);

CREATE TYPE attendance_status_enum AS ENUM ('registered', 'attended', 'no_show', 'canceled');
```

---

## 📊 **ANALYTICS & PERFORMANCE TRACKING**

```sql
-- =============================================
-- ANALYTICS & PERFORMANCE MEASUREMENT
-- =============================================

-- User activity tracking
CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id),
    
    -- Activity Details
    activity_type activity_type_enum NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    
    -- Context
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    duration_seconds INTEGER,
    
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE activity_type_enum AS ENUM (
    'login',
    'logout',
    'page_view',
    'content_access',
    'ai_interaction',
    'community_post',
    'event_registration',
    'subscription_change',
    'profile_update',
    'resource_download'
);

-- Ministry impact metrics
CREATE TABLE public.ministry_impact_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    
    -- Ministry Growth Metrics
    church_size_before INTEGER,
    church_size_current INTEGER,
    churches_planted INTEGER DEFAULT 0,
    leaders_developed INTEGER DEFAULT 0,
    
    -- Engagement Metrics
    platform_engagement_score DECIMAL(5,2),
    content_implementation_rate DECIMAL(5,2),
    community_contribution_level INTEGER DEFAULT 1,
    
    -- Outcome Metrics
    ministry_effectiveness_self_rating INTEGER CHECK (ministry_effectiveness_self_rating >= 1 AND ministry_effectiveness_self_rating <= 10),
    leadership_development_progress TEXT[],
    strategic_initiatives_implemented TEXT[],
    
    -- Testimony & Success Stories
    success_stories TEXT[],
    testimonials TEXT[],
    transformation_indicators TEXT[],
    
    -- Verification
    verified_by_peer BOOLEAN DEFAULT FALSE,
    verification_source VARCHAR(100),
    
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform analytics aggregations
CREATE TABLE public.platform_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Time Period
    date_period DATE NOT NULL,
    period_type period_type_enum NOT NULL,
    
    -- User Metrics
    total_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    churned_users INTEGER DEFAULT 0,
    
    -- Engagement Metrics
    total_ai_conversations INTEGER DEFAULT 0,
    total_ai_messages INTEGER DEFAULT 0,
    average_conversation_length DECIMAL(6,2),
    user_satisfaction_avg DECIMAL(3,2),
    
    -- Content Metrics
    content_views INTEGER DEFAULT 0,
    content_downloads INTEGER DEFAULT 0,
    most_popular_content UUID[],
    
    -- Community Metrics
    community_posts INTEGER DEFAULT 0,
    community_active_users INTEGER DEFAULT 0,
    
    -- Financial Metrics
    total_revenue DECIMAL(12,2) DEFAULT 0,
    new_subscriptions INTEGER DEFAULT 0,
    subscription_cancellations INTEGER DEFAULT 0,
    average_revenue_per_user DECIMAL(10,2),
    
    -- Ministry Impact
    reported_church_plants INTEGER DEFAULT 0,
    leaders_in_training INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(date_period, period_type)
);

CREATE TYPE period_type_enum AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'yearly');

-- Performance benchmarks and goals
CREATE TABLE public.performance_benchmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Benchmark Details
    metric_name VARCHAR(100) NOT NULL,
    metric_category benchmark_category_enum NOT NULL,
    
    -- Targets
    current_value DECIMAL(12,2),
    target_value DECIMAL(12,2),
    target_date DATE,
    
    -- Context
    measurement_unit VARCHAR(50),
    calculation_method TEXT,
    
    -- Status
    status benchmark_status_enum DEFAULT 'active',
    progress_percentage DECIMAL(5,2),
    
    -- Tracking
    last_measured_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE benchmark_category_enum AS ENUM (
    'user_growth',
    'engagement',
    'revenue',
    'ministry_impact',
    'content_performance',
    'community_health',
    'operational_efficiency'
);

CREATE TYPE benchmark_status_enum AS ENUM ('active', 'achieved', 'paused', 'discontinued');
```

---

## 🔐 **SECURITY & COMPLIANCE**

```sql
-- =============================================
-- SECURITY, AUDIT TRAILS & COMPLIANCE
-- =============================================

-- Comprehensive audit trail
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Actor Information
    user_id UUID REFERENCES public.user_profiles(id),
    actor_type actor_type_enum NOT NULL,
    actor_identifier VARCHAR(100),
    
    -- Action Details
    action action_type_enum NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    
    -- Change Details
    old_values JSONB,
    new_values JSONB,
    changed_fields TEXT[],
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(100),
    request_id VARCHAR(100),
    
    -- Metadata
    description TEXT,
    additional_context JSONB DEFAULT '{}',
    
    -- Security
    risk_level risk_level_enum DEFAULT 'low',
    flagged_for_review BOOLEAN DEFAULT FALSE,
    
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE actor_type_enum AS ENUM ('user', 'system', 'api', 'admin', 'service');
CREATE TYPE action_type_enum AS ENUM (
    'create',
    'read', 
    'update',
    'delete',
    'login',
    'logout',
    'permission_change',
    'subscription_change',
    'payment_processed',
    'data_export',
    'password_reset'
);

CREATE TYPE risk_level_enum AS ENUM ('low', 'medium', 'high', 'critical');

-- Data retention and privacy compliance
CREATE TABLE public.data_retention_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Policy Details
    policy_name VARCHAR(100) NOT NULL UNIQUE,
    data_category data_category_enum NOT NULL,
    
    -- Retention Rules
    retention_period_days INTEGER NOT NULL,
    auto_delete_enabled BOOLEAN DEFAULT FALSE,
    
    -- Legal Basis
    legal_basis legal_basis_enum NOT NULL,
    regulatory_requirements TEXT[],
    
    -- Implementation
    last_cleanup_at TIMESTAMPTZ,
    next_cleanup_at TIMESTAMPTZ,
    
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE data_category_enum AS ENUM (
    'user_profile',
    'ai_conversations',
    'payment_data',
    'activity_logs',
    'community_content',
    'analytics_data',
    'support_tickets',
    'marketing_data'
);

CREATE TYPE legal_basis_enum AS ENUM (
    'consent',
    'contract',
    'legal_obligation',
    'vital_interests',
    'public_task',
    'legitimate_interests'
);

-- User consent management
CREATE TABLE public.user_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    -- Consent Details
    consent_type consent_type_enum NOT NULL,
    consent_given BOOLEAN NOT NULL,
    consent_version VARCHAR(20) NOT NULL,
    
    -- Context
    consent_source VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    
    -- Metadata
    expires_at TIMESTAMPTZ,
    withdrawn_at TIMESTAMPTZ,
    
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, consent_type, consent_version)
);

CREATE TYPE consent_type_enum AS ENUM (
    'data_processing',
    'marketing_emails',
    'analytics_tracking',
    'ai_learning',
    'third_party_sharing',
    'cookies'
);
```

---

## 🚀 **PLATFORM OPTIMIZATION & EXTENSIONS**

```sql
-- =============================================
-- SYSTEM OPTIMIZATION & FUTURE EXTENSIONS
-- =============================================

-- Feature flags for A/B testing and gradual rollouts
CREATE TABLE public.feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Flag Details
    flag_key VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- Configuration
    enabled BOOLEAN DEFAULT FALSE,
    rollout_percentage INTEGER DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
    target_audience TEXT[],
    
    -- A/B Testing
    experiment_name VARCHAR(100),
    variant_configs JSONB DEFAULT '{}',
    
    -- Lifecycle
    created_by UUID REFERENCES public.user_profiles(id),
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User feature flag assignments
CREATE TABLE public.user_feature_flags (
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    flag_key VARCHAR(100) REFERENCES public.feature_flags(flag_key) ON DELETE CASCADE,
    
    enabled BOOLEAN NOT NULL,
    variant VARCHAR(50),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (user_id, flag_key)
);

-- API usage tracking and rate limiting
CREATE TABLE public.api_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Request Details
    user_id UUID REFERENCES public.user_profiles(id),
    api_key_id UUID,
    endpoint VARCHAR(200) NOT NULL,
    method VARCHAR(10) NOT NULL,
    
    -- Response
    status_code INTEGER NOT NULL,
    response_time_ms INTEGER,
    
    -- Rate Limiting
    rate_limit_remaining INTEGER,
    rate_limit_reset_at TIMESTAMPTZ,
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    request_size_bytes INTEGER,
    response_size_bytes INTEGER,
    
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Notification system
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Recipient
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    -- Notification Details
    type notification_type_enum NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    
    -- Delivery
    channels delivery_channel_enum[] DEFAULT ARRAY['in_app'],
    priority priority_enum DEFAULT 'normal',
    
    -- Status
    status notification_status_enum DEFAULT 'pending',
    read_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    
    -- Context
    entity_type VARCHAR(50),
    entity_id UUID,
    action_url TEXT,
    
    -- Scheduling
    scheduled_for TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE notification_type_enum AS ENUM (
    'ai_conversation_summary',
    'content_recommendation',
    'community_activity',
    'subscription_update',
    'event_reminder',
    'partnership_update',
    'system_announcement',
    'ministry_milestone'
);

CREATE TYPE delivery_channel_enum AS ENUM ('in_app', 'email', 'push', 'sms');
CREATE TYPE priority_enum AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE notification_status_enum AS ENUM ('pending', 'delivered', 'failed', 'canceled');

-- System configuration and settings
CREATE TABLE public.system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    category VARCHAR(50),
    
    -- Access Control
    is_public BOOLEAN DEFAULT FALSE,
    required_role VARCHAR(50),
    
    -- Metadata
    data_type setting_data_type_enum DEFAULT 'string',
    validation_rules JSONB,
    
    updated_by UUID REFERENCES public.user_profiles(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE setting_data_type_enum AS ENUM ('string', 'number', 'boolean', 'json', 'array');
```

---

## 📚 **INDEXES & PERFORMANCE OPTIMIZATION**

```sql
-- =============================================
-- PERFORMANCE INDEXES
-- =============================================

-- User profile indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_ministry_role ON public.user_profiles(ministry_role);
CREATE INDEX idx_user_profiles_subscription_tier ON public.user_profiles(subscription_tier);
CREATE INDEX idx_user_profiles_country ON public.user_profiles(country);
CREATE INDEX idx_user_profiles_last_active ON public.user_profiles(last_active_at DESC);

-- AI conversation indexes
CREATE INDEX idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_session_type ON public.ai_conversations(session_type);
CREATE INDEX idx_ai_conversations_status ON public.ai_conversations(status);
CREATE INDEX idx_ai_conversations_created_at ON public.ai_conversations(created_at DESC);
CREATE INDEX idx_ai_conversations_primary_topic ON public.ai_conversations(primary_topic);

-- AI messages indexes
CREATE INDEX idx_ai_messages_conversation_id ON public.ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_role ON public.ai_messages(role);
CREATE INDEX idx_ai_messages_timestamp ON public.ai_messages(timestamp DESC);
CREATE INDEX idx_ai_messages_theological_topics ON public.ai_messages USING GIN(theological_topics);

-- Content indexes
CREATE INDEX idx_content_items_status ON public.content_items(status);
CREATE INDEX idx_content_items_content_type ON public.content_items(content_type);
CREATE INDEX idx_content_items_published_at ON public.content_items(published_at DESC);
CREATE INDEX idx_content_items_primary_category ON public.content_items(primary_category);
CREATE INDEX idx_content_items_keywords ON public.content_items USING GIN(keywords);
CREATE INDEX idx_content_items_target_audience ON public.content_items USING GIN(target_audience);

-- Community indexes
CREATE INDEX idx_communities_community_type ON public.communities(community_type);
CREATE INDEX idx_communities_visibility ON public.communities(visibility);
CREATE INDEX idx_community_memberships_user_id ON public.community_memberships(user_id);
CREATE INDEX idx_community_memberships_community_id ON public.community_memberships(community_id);
CREATE INDEX idx_community_posts_community_id ON public.community_posts(community_id);
CREATE INDEX idx_community_posts_author_id ON public.community_posts(author_id);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);

-- Subscription and payment indexes
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_current_period_end ON public.user_subscriptions(current_period_end);
CREATE INDEX idx_payment_transactions_user_id ON public.payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_status ON public.payment_transactions(status);

-- Analytics indexes  
CREATE INDEX idx_user_activity_logs_user_id ON public.user_activity_logs(user_id);
CREATE INDEX idx_user_activity_logs_activity_type ON public.user_activity_logs(activity_type);
CREATE INDEX idx_user_activity_logs_timestamp ON public.user_activity_logs(timestamp DESC);
CREATE INDEX idx_platform_analytics_date_period ON public.platform_analytics(date_period DESC);

-- Audit and security indexes
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_timestamp ON public.audit_logs(timestamp DESC);
CREATE INDEX idx_audit_logs_risk_level ON public.audit_logs(risk_level);
```

---

## 🔐 **ROW LEVEL SECURITY POLICIES**

```sql
-- =============================================
-- ROW LEVEL SECURITY SETUP
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_content_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_impact_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- User profile policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- AI conversation policies
CREATE POLICY "Users can access own conversations" ON public.ai_conversations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own messages" ON public.ai_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.ai_conversations 
            WHERE ai_conversations.id = ai_messages.conversation_id 
            AND ai_conversations.user_id = auth.uid()
        )
    );

-- Community access policies
CREATE POLICY "Community members can view posts" ON public.community_posts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.community_memberships cm
            JOIN public.communities c ON c.id = cm.community_id
            WHERE cm.user_id = auth.uid() 
            AND cm.community_id = community_posts.community_id
            AND cm.status = 'active'
        )
        OR 
        EXISTS (
            SELECT 1 FROM public.communities
            WHERE id = community_posts.community_id
            AND visibility = 'public'
        )
    );

-- Subscription policies
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON public.payment_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Content interaction policies
CREATE POLICY "Users can manage own interactions" ON public.user_content_interactions
    FOR ALL USING (auth.uid() = user_id);

-- Organization policies (members can view organization data)
CREATE POLICY "Organization members can view org data" ON public.organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_memberships
            WHERE organization_id = organizations.id
            AND user_id = auth.uid()
            AND status = 'active'
        )
    );
```

---

## 🔧 **TRIGGERS & FUNCTIONS**

```sql
-- =============================================
-- UTILITY FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER handle_updated_at_user_profiles
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_user_settings
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_ai_conversations
    BEFORE UPDATE ON public.ai_conversations
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to automatically create user settings when profile is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
    AFTER INSERT ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update conversation analytics
CREATE OR REPLACE FUNCTION public.update_conversation_analytics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update message counts and calculate metrics
    INSERT INTO public.ai_conversation_analytics (conversation_id, total_user_messages, total_ai_messages)
    VALUES (
        NEW.conversation_id,
        (SELECT COUNT(*) FROM public.ai_messages WHERE conversation_id = NEW.conversation_id AND role = 'user'),
        (SELECT COUNT(*) FROM public.ai_messages WHERE conversation_id = NEW.conversation_id AND role = 'assistant')
    )
    ON CONFLICT (conversation_id) DO UPDATE SET
        total_user_messages = (SELECT COUNT(*) FROM public.ai_messages WHERE conversation_id = NEW.conversation_id AND role = 'user'),
        total_ai_messages = (SELECT COUNT(*) FROM public.ai_messages WHERE conversation_id = NEW.conversation_id AND role = 'assistant'),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_analytics_trigger
    AFTER INSERT ON public.ai_messages
    FOR EACH ROW EXECUTE FUNCTION public.update_conversation_analytics();

-- Function to track user activity
CREATE OR REPLACE FUNCTION public.log_user_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_activity_logs (user_id, activity_type, entity_type, entity_id)
    VALUES (NEW.user_id, TG_ARGV[0], TG_TABLE_NAME, NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply activity logging to key tables
CREATE TRIGGER log_ai_conversation_activity
    AFTER INSERT ON public.ai_conversations
    FOR EACH ROW EXECUTE FUNCTION public.log_user_activity('ai_interaction');

CREATE TRIGGER log_community_post_activity
    AFTER INSERT ON public.community_posts
    FOR EACH ROW EXECUTE FUNCTION public.log_user_activity('community_post');
```

---

## 🎯 **SUMMARY & IMPLEMENTATION NOTES**

This comprehensive Supabase schema provides the complete database foundation for the Movemental platform, designed to support:

### **Immediate Launch Requirements**
- ✅ User authentication and detailed profiling
- ✅ AI conversation tracking and analytics
- ✅ Content management and user interactions
- ✅ Community features and networking
- ✅ Subscription management and payments
- ✅ Basic partnership tracking

### **Scale-Ready Architecture**
- 🚀 Optimized indexes for high-volume queries
- 🔐 Comprehensive Row Level Security
- 📊 Built-in analytics and performance tracking
- 🌍 Multi-language and international support
- 🔄 Automated triggers for data consistency
- 📈 Ministry impact measurement systems

### **Business Intelligence Ready**
- 💰 Complete financial tracking and reporting
- 📈 User engagement and retention analytics
- 🎯 Ministry effectiveness measurement
- 🤝 Partnership performance tracking
- 🔍 Comprehensive audit trails
- 📊 Real-time dashboard support

### **Implementation Priority**

**Phase 1 (MVP Launch):**
1. Core user management and authentication
2. AI conversation system
3. Basic content management
4. Simple community features
5. Subscription handling

**Phase 2 (Growth):**
6. Advanced analytics
7. Partnership management
8. Event system
9. Enhanced community features
10. Ministry impact tracking

**Phase 3 (Scale):**
11. Advanced AI analytics
12. Comprehensive reporting
13. International expansion features
14. Enterprise organization features
15. Advanced partnership systems

This schema serves as the technical foundation for transforming Alan Hirsch's individual ministry into a global platform for kingdom advancement through technology-enhanced theological education and strategic ministry development.