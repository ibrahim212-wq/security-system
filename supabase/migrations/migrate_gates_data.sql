-- Migration script to migrate existing gate data to open access model
-- This removes email restrictions and allows any authenticated user to access any gate

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
-- Each gate_number will be created without email restrictions
-- created_by is set to the first user who created/registered the gate
INSERT INTO gates (gate_number, mall_name, created_by, status)
SELECT 
  DISTINCT ON (gate_number) 
  gate_number,
  COALESCE(mall_name, 'Unknown Mall') as mall_name,
  user_id as created_by,
  'active' as status
FROM user_gate_mapping
WHERE gate_number IS NOT NULL
  AND gate_number != ''
ON CONFLICT (gate_number) 
DO UPDATE SET 
  mall_name = COALESCE(EXCLUDED.mall_name, gates.mall_name),
  status = COALESCE(gates.status, 'active'),
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

-- Step 4: Create a function to check if a gate exists and is active
CREATE OR REPLACE FUNCTION check_gate_access(gate_num TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM gates 
    WHERE gate_number = gate_num 
    AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION check_gate_access TO authenticated;

-- Clean up
DROP TABLE IF EXISTS user_gate_mapping;
