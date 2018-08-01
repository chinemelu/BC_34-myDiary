import db from './db';

const generateUUIDExtension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';

const generateUserTable = `CREATE TABLE users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  img_url varchar(255),
  twitter varchar(255),
  facebook varchar(255),
  bio text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);`;

const generateEntryTable = `CREATE TABLE entries (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  userid uuid DEFAULT uuid_generate_v4(),
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL UNIQUE,
  privacy VARCHAR(255) NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY(userid) REFERENCES users(id)
);`;

const generatedQuery = `${generateUUIDExtension} ${generateUserTable}  ${generateUUIDExtension} ${generateEntryTable}`;

db(generatedQuery, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log(res);
  }
});
