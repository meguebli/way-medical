create table if not exists refresh_tokens (
  id bigserial primary key,
  token_hash varchar(128) not null unique,
  user_id bigint not null references users(id),
  expires_at timestamp with time zone not null,
  revoked boolean not null default false,
  created_at timestamp with time zone not null default current_timestamp,
  revoked_at timestamp with time zone
);

create index if not exists idx_refresh_tokens_user_id on refresh_tokens(user_id);
