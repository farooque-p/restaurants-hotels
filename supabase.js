import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ewpcuunesmeukyjaglxh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cGN1dW5lc21ldWt5amFnbHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMTc5MjEsImV4cCI6MjAyMTY5MzkyMX0.FraHAN0Zbe3tvBoHe7rBPJxZjnzLVJiyPJtq7F9YnGE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
