import os

from dotenv import load_dotenv
from supabase import Client, ClientOptions, create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


def get_supabase_client(options=ClientOptions()) -> Client:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY, options)
    return supabase
