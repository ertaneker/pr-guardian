-- This is an old migration, not the one for the phone field
-- Migration: 20260101_init

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT
);
