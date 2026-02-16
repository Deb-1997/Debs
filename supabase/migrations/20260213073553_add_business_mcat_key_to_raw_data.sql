/*
  # Add Business MCAT Key to Raw Audit Data

  1. Changes to `raw_audit_data` table
    - Add `business_mcat_key` (integer) - Indicates if Business MCAT override applies (1 = override, 0 = standard)

  2. Purpose
    - Allow CSV uploads to include Business MCAT Key data
    - Support Business MCAT override logic in audit processing
*/

DO $$
BEGIN
  -- Add business_mcat_key column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'raw_audit_data' AND column_name = 'business_mcat_key'
  ) THEN
    ALTER TABLE raw_audit_data ADD COLUMN business_mcat_key integer DEFAULT 0;
  END IF;
END $$;