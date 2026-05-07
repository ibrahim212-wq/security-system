-- Create gates table for open shared access model
-- Any authenticated user can access any gate without ownership restrictions

CREATE TABLE IF NOT EXISTS gates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gate_number TEXT NOT NULL UNIQUE,
  mall_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gates_gate_number ON gates(gate_number);
CREATE INDEX IF NOT EXISTS idx_gates_status ON gates(status);

-- Enable Row Level Security
ALTER TABLE gates ENABLE ROW LEVEL SECURITY;

-- Create policy: Authenticated users can view all gates
CREATE POLICY "Authenticated users can view gates"
  ON gates FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Create policy: Authenticated users can insert gates
CREATE POLICY "Authenticated users can insert gates"
  ON gates FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy: Authenticated users can update gates
CREATE POLICY "Authenticated users can update gates"
  ON gates FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_gates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_gates_updated_at
  BEFORE UPDATE ON gates
  FOR EACH ROW
  EXECUTE FUNCTION update_gates_updated_at();
