

CREATE TABLE birds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scientific_name VARCHAR(255) NOT NULL,
  common_name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(512),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

