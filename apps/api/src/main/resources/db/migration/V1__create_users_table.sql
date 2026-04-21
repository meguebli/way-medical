create table if not exists users (
  id bigserial primary key,
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  email varchar(150) not null unique,
  password_hash varchar(255) not null,
  role varchar(30) not null,
  enabled boolean not null default true,
  created_at timestamp with time zone not null default current_timestamp,
  updated_at timestamp with time zone not null default current_timestamp
);

