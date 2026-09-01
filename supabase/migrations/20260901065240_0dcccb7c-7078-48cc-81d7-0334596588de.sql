CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- first registered user becomes admin
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_bootstrap_admin
AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- gamemodes
CREATE TABLE public.categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories admin write" ON public.categories FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- points per tier per gamemode
CREATE TABLE public.tier_points (
  category_id text NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  tier text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  PRIMARY KEY (category_id, tier)
);
GRANT SELECT ON public.tier_points TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tier_points TO authenticated;
GRANT ALL ON public.tier_points TO service_role;
ALTER TABLE public.tier_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tier_points public read" ON public.tier_points FOR SELECT USING (true);
CREATE POLICY "tier_points admin write" ON public.tier_points FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- players
CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ign text NOT NULL UNIQUE,
  region text NOT NULL DEFAULT 'EU',
  tested_by text NOT NULL DEFAULT '',
  last_tested date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.players TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.players TO authenticated;
GRANT ALL ON public.players TO service_role;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "players public read" ON public.players FOR SELECT USING (true);
CREATE POLICY "players admin write" ON public.players FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- placements
CREATE TABLE public.placements (
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  category_id text NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  tier text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (player_id, category_id)
);
GRANT SELECT ON public.placements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.placements TO authenticated;
GRANT ALL ON public.placements TO service_role;
ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "placements public read" ON public.placements FOR SELECT USING (true);
CREATE POLICY "placements admin write" ON public.placements FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- seed gamemodes
INSERT INTO public.categories (id, name, sort_order) VALUES
  ('sword','Sword',1),
  ('cart','Cart',2),
  ('lightspeed','Lightspeed',3),
  ('mace','Mace',4),
  ('spearmace','Spearmace',5),
  ('diasmp','Diasmp',6),
  ('smp','Smp',7),
  ('ogv','Ogv',8),
  ('uhc','UHC',9);

-- seed default points for each gamemode/tier
INSERT INTO public.tier_points (category_id, tier, points)
SELECT c.id, t.tier, t.points
FROM public.categories c
CROSS JOIN (VALUES
  ('HT1',60),('LT1',45),('HT2',30),('LT2',20),('HT3',10),
  ('LT3',6),('HT4',4),('LT4',3),('HT5',2),('LT5',1)
) AS t(tier, points);