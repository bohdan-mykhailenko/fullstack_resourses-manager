CREATE TABLE bird_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bird_id UUID NOT NULL REFERENCES birds(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(bird_id, user_id)
);

CREATE INDEX idx_bird_likes_bird_id ON bird_likes(bird_id);
CREATE INDEX idx_bird_likes_user_id ON bird_likes(user_id);