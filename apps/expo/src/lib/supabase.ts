import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://qgepwqkbiqlpynysmtfp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZXB3cWtiaXFscHlueXNtdGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyOTE5NDQsImV4cCI6MTk4NTg2Nzk0NH0.5zmkWf6ODV0Hni6HopszLk2NjWnQQvMycR6Ik9BtXw0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
