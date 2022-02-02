DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question_string TEXT NOT NULL, 
  correct_option_id REFERENCES options(id) ON DELETE CASCADE,
);

