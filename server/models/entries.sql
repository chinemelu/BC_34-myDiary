
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE entries (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  userid NOT NULL DEFAULT uuid_generate_v4(),
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL UNIQUE,
  privacy VARCHAR(255) NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
  FOREIGN KEY(userid) REFERENCES users(id)
);
