
-- Create a function to get all profiles (for admin user management)
CREATE OR REPLACE FUNCTION public.get_all_profiles()
RETURNS TABLE(user_id uuid, name text, email text, is_admin boolean)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.user_id,
    p.name,
    p.email,
    EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = p.user_id AND ur.role = 'admin') as is_admin
  FROM public.profiles p
  ORDER BY p.created_at DESC;
$$;
