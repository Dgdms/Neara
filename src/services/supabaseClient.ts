import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wqxhxaasxttdqairvzvu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeGh4YWFzeHR0ZHFhaXJ2enZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzM2MjYsImV4cCI6MjA3NDQ0OTYyNn0.SBtbT2v7xno6dLA0dhQn96UL02kKb0EDhvAys3gfyBQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
