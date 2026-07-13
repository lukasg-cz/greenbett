-- GREENBETT Initial Schema
-- Run in Supabase SQL Editor or via supabase db push

-- Profiles
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'premium', 'analyst', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('trial', 'monthly', 'quarterly', 'yearly')),
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired', 'past_due')),
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Signals
CREATE TABLE public.signals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    analyst_id UUID REFERENCES public.profiles(id),
    sport TEXT NOT NULL,
    league TEXT NOT NULL,
    match_home TEXT NOT NULL,
    match_away TEXT NOT NULL,
    market TEXT NOT NULL,
    odds DECIMAL(5,2) NOT NULL,
    confidence DECIMAL(3,1) NOT NULL CHECK (confidence >= 0 AND confidence <= 10),
    unit_size DECIMAL(3,1) DEFAULT 1.0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'win', 'loss', 'void', 'push')),
    api_match_id TEXT,
    kickoff_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User tips
CREATE TABLE public.user_tips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    sport TEXT NOT NULL,
    league TEXT NOT NULL,
    match_home TEXT NOT NULL,
    match_away TEXT NOT NULL,
    market TEXT NOT NULL,
    odds DECIMAL(5,2) NOT NULL,
    stake DECIMAL(10,2) DEFAULT 1.0,
    result TEXT CHECK (result IN ('pending', 'win', 'loss', 'void', 'push')),
    profit DECIMAL(10,2),
    api_match_id TEXT,
    kickoff_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches cache
CREATE TABLE public.matches_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    api_id TEXT UNIQUE NOT NULL,
    sport TEXT NOT NULL,
    league TEXT NOT NULL,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    home_score INTEGER,
    away_score INTEGER,
    status TEXT NOT NULL,
    kickoff_at TIMESTAMPTZ NOT NULL,
    odds_home DECIMAL(5,2),
    odds_draw DECIMAL(5,2),
    odds_away DECIMAL(5,2),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Odds cache
CREATE TABLE public.odds_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    match_id UUID REFERENCES public.matches_cache(id),
    bookmaker TEXT NOT NULL,
    market TEXT NOT NULL,
    value DECIMAL(6,2) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(match_id, bookmaker, market)
);

-- League stats
CREATE TABLE public.league_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sport TEXT NOT NULL,
    league TEXT NOT NULL,
    season TEXT NOT NULL,
    avg_goals DECIMAL(4,2),
    over25_pct DECIMAL(5,2),
    btts_pct DECIMAL(5,2),
    home_win_pct DECIMAL(5,2),
    draw_pct DECIMAL(5,2),
    away_win_pct DECIMAL(5,2),
    total_matches INTEGER,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(sport, league, season)
);

-- Forum categories
CREATE TABLE public.forum_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum threads
CREATE TABLE public.forum_threads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.forum_categories(id) NOT NULL,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    title TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    reply_count INTEGER DEFAULT 0,
    last_reply_at TIMESTAMPTZ,
    last_reply_user_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum posts
CREATE TABLE public.forum_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    thread_id UUID REFERENCES public.forum_threads(id) NOT NULL,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_signals_sport ON public.signals(sport);
CREATE INDEX idx_signals_status ON public.signals(status);
CREATE INDEX idx_signals_created_at ON public.signals(created_at DESC);
CREATE INDEX idx_user_tips_user_id ON public.user_tips(user_id);
CREATE INDEX idx_matches_cache_sport ON public.matches_cache(sport);
CREATE INDEX idx_forum_threads_category_id ON public.forum_threads(category_id);
CREATE INDEX idx_forum_posts_thread_id ON public.forum_posts(thread_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.odds_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.league_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Profiles
CREATE POLICY "Profiles are viewable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies: Signals
CREATE POLICY "Signals are viewable by everyone"
    ON public.signals FOR SELECT USING (true);

CREATE POLICY "Analysts and admins can insert signals"
    ON public.signals FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('analyst', 'admin')
        )
    );

CREATE POLICY "Analysts and admins can update signals"
    ON public.signals FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('analyst', 'admin')
        )
    );

-- RLS Policies: User tips
CREATE POLICY "User tips are viewable by everyone"
    ON public.user_tips FOR SELECT USING (true);

CREATE POLICY "Users can insert own tips"
    ON public.user_tips FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tips"
    ON public.user_tips FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies: Forum
CREATE POLICY "Forum categories viewable by everyone"
    ON public.forum_categories FOR SELECT USING (true);

CREATE POLICY "Forum threads viewable by everyone"
    ON public.forum_threads FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create threads"
    ON public.forum_threads FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Forum posts viewable by everyone"
    ON public.forum_posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts"
    ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Public read for cache/stats
CREATE POLICY "Matches cache viewable by everyone"
    ON public.matches_cache FOR SELECT USING (true);

CREATE POLICY "Odds cache viewable by everyone"
    ON public.odds_cache FOR SELECT USING (true);

CREATE POLICY "League stats viewable by everyone"
    ON public.league_stats FOR SELECT USING (true);

CREATE POLICY "Subscriptions viewable by owner"
    ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
