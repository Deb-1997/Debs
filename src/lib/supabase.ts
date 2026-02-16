import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuditSession {
  id: string;
  session_name: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  raw_data_count: number;
  results_count: number;
  ai_prompt?: string;
  created_at: string;
  completed_at?: string;
  error_message?: string;
}

export interface AuditResult {
  id: string;
  session_id: string;
  eto_ofr_display_id: string;
  fk_glcat_mcat_id: string;
  category_name: string;
  quantity: number;
  quantity_unit: string;
  bl_segment: string;
  indiamart_audit_outcome: string;
  threshold_available: boolean;
  indiamart_category: string;
  indiamart_reason: string;
  llm_bl_type: string;
  llm_threshold_value: number;
  llm_threshold_reason: string;
  created_at: string;
}
