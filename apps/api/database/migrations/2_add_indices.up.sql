CREATE INDEX idx_shelter_feedbacks_shelter_id ON shelter_feedbacks(shelter_id);
CREATE INDEX idx_shelter_feedbacks_user_id ON shelter_feedbacks(user_id);

CREATE INDEX idx_shelter_ratings_shelter_id ON shelter_ratings(shelter_id);
CREATE INDEX idx_shelter_ratings_user_id ON shelter_ratings(user_id);