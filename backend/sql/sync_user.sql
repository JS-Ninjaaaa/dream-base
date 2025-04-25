--- Function to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.sync_auth_users_to_public_users()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.users (id, email, created_at, updated_at)
        VALUES (NEW.id, NEW.email, NEW.created_at, NEW.updated_at);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE public.users
        SET email = NEW.email,
            updated_at = NEW.updated_at
        WHERE id = OLD.id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        DELETE FROM public.users
        WHERE id = OLD.id;
        RETURN OLD;
    END IF;
END;
$$;

-- Trigger to call the above function
CREATE TRIGGER sync_auth_users
    AFTER INSERT OR UPDATE OR DELETE ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.sync_auth_users_to_public_users();
