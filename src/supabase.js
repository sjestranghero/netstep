import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://phyxijygfoufnixqwocf.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_fYcPwX50-qOBuQsYygErnQ_iv1As8S2'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)