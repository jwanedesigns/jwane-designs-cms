import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
  const { data: tables, error: tError } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public')
  
  console.log('Tables:', tables)
  
  const { data: settings, error: sError } = await supabase
    .from('settings')
    .select('*')
  
  console.log('Settings Keys:', settings?.map(s => s.key))
}

checkSchema()
