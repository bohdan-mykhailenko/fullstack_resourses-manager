CREATE TABLE bird_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bird_id UUID NOT NULL REFERENCES birds(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    parent_id UUID REFERENCES bird_comments(id) ON DELETE CASCADE
);

CREATE INDEX idx_bird_comments_bird_id ON bird_comments(bird_id);
CREATE INDEX idx_bird_comments_user_id ON bird_comments(user_id);