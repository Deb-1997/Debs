/*
  # Add AI Prompt Column to Audit Sessions

  ## Overview
  This migration adds a column to store the custom AI prompt used for each audit session.

  ## Changes
  1. Add `ai_prompt` column to `audit_sessions` table
     - Type: text
     - Nullable: true (for backward compatibility)
     - Description: Stores the custom AI prompt provided by the user for the audit

  ## Purpose
  This allows users to customize the AI analysis instructions for different audit scenarios
  and provides a record of what prompt was used for each audit session.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'audit_sessions' AND column_name = 'ai_prompt'
  ) THEN
    ALTER TABLE audit_sessions ADD COLUMN ai_prompt text;
  END IF;
END $$;