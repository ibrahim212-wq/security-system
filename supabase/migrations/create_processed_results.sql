-- Create processed_results table for persistent storage
-- Stores all confirmed and rejected results permanently

CREATE TABLE IF NOT EXISTS processed_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id TEXT UNIQUE NOT NULL,
  person_name TEXT NOT NULL,
  person_id TEXT NOT NULL,
  age TEXT NOT NULL,
  legal_case TEXT NOT NULL,
  score NUMERIC NOT NULL,
  node_id TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  server_timestamp TEXT,
  status TEXT NOT NULL CHECK (status IN ('confirmed', 'rejected')),
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_processed_results_user_id ON processed_results(user_id);
CREATE INDEX IF NOT EXISTS idx_processed_results_status ON processed_results(status);
CREATE INDEX IF NOT EXISTS idx_processed_results_timestamp ON processed_results(timestamp DESC);

-- Enable Row Level Security
ALTER TABLE processed_results ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own processed results
CREATE POLICY "Users can view own processed results"
  ON processed_results FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can insert their own processed results
CREATE POLICY "Users can insert own processed results"
  ON processed_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own processed results
CREATE POLICY "Users can update own processed results"
  ON processed_results FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy: Users can delete their own processed results (optional, based on requirements)
-- Note: Per requirements, results should NOT be deleted once stored
-- This policy is commented out to prevent accidental deletion
-- CREATE POLICY "Users can delete own processed results"
--   ON processed_results FOR DELETE
--   USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_processed_results_updated_at
  BEFORE UPDATE ON processed_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
