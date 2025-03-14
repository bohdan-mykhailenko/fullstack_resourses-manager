CREATE INDEX idx_bird_comments_bird_id ON bird_comments(bird_id);
CREATE INDEX idx_bird_comments_user_id ON bird_comments(user_id);

CREATE INDEX idx_bird_likes_bird_id ON bird_likes(bird_id);
CREATE INDEX idx_bird_likes_user_id ON bird_likes(user_id);