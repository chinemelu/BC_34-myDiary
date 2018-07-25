CREATE TABLE users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  img_url varchar(255),
  twitter varchar(255),
  facebook varchar(255),
  bio text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);