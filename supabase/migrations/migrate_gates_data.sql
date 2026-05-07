-- Migration script to migrate existing gate data from user metadata to gates table
-- This ensures backward compatibility by converting single-email gate assignments to array format

-- Step 1: Create a temporary table to hold user-gate mappings
CREATE TEMP TABLE IF NOT EXISTS user_gate_mapping AS
SELECT 
  id as user_id,
  email,
  user_metadata->>'gate_number' as gate_number,
  user_metadata->>'mall_name' as mall_name
FROM auth.users
WHERE user_metadata->>'gate_number' IS NOT NULL
  AND user_metadata->>'gate_number' != '';

-- Step 2: Insert unique gates into the gates table
-- Each gate_number will be created with its associated email(s)
INSERT INTO gates (gate_number, mall_name, emails)
SELECT 
  DISTINCT ON (gate_number) 
  gate_number,
  COALESCE(mall_name, 'Unknown Mall') as mall_name,
  ARRAY_AGG(DISTINCT email) as emails
FROM user_gate_mapping
WHERE gate_number IS NOT NULL
  AND gate_number != ''
GROUP BY gate_number, mall_name
ON CONFLICT (gate_number) 
DO UPDATE SET 
  emails = COALESCE(gates.emails || EXCLUDED.emails, EXCLUDED.emails),
  mall_name = COALESCE(EXCLUDED.mall_name, gates.mall_name),
  updated_at = NOW();

-- Step 3: Add a back-reference to the gates table in user metadata
-- This maintains backward compatibility for existing code
UPDATE auth.users
SET user_metadata = user_metadata || jsonb_build_object(
  'gate_id', (
    SELECT id FROM gates 
    WHERE gate_number = user_metadata->>'gate_number' 
    LIMIT 1
  )
)
WHERE user_metadata->>'gate_number' IS NOT NULL
  AND user_metadata->>'gate_number' != ''
  AND EXISTS (
    SELECT 1 FROM gates 
    WHERE gate_number = user_metadata->>'gate_number'
  );

-- Step 4: Create a function to check if a user has access to a gate
CREATE OR REPLACE FUNCTION check_gate_access(user_email TEXT, gate_num TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM gates 
    WHERE gate_number = gate_num 
    AND emails @> ARRAY[user_email]
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION check_gate_access TO authenticated;

-- Clean up
DROP TABLE IF EXISTS user_gate_mapping;
