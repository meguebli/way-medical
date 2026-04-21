create schema if not exists app authorization way_medical_app;

create extension if not exists "uuid-ossp";

alter database way_medical set search_path to app, public;

