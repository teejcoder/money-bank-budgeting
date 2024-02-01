import { createClient } from "@supabase/supabase-js";

// Create a Supabase client with your Supabase URL and API key
const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_API_KEY
);

// Export the Supabase client for use in other parts of Money Bank
export { supabase };
