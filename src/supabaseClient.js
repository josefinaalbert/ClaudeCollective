const supabaseUrl = 'https://kscnlqolyybpqkkpkcde.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzY25scW9seXlicHFra3BrY2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5Njc3NDksImV4cCI6MjA1NDU0Mzc0OX0.sQfBp-tC9hCeLJVdzUIMaHwvi3NHHsMN4qAxuzCrQ3c'

// Use the global supabase object from the CDN
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

export default supabase