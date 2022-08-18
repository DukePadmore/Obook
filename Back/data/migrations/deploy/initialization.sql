-- Deploy o-book:initialization to pg

BEGIN;

CREATE DOMAIN mail AS TEXT
    CHECK(
        VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
    )
;

CREATE DOMAIN french_zipcode AS TEXT
    CHECK(
        VALUE ~ '^0[1-9]\d{3}$' -- code postaux metropole de 01 a 09
        OR VALUE ~ '^20[1-2]\d{2}$|^20300$' -- code postaux de la Corse
        OR VALUE ~ '^[13-8]\d{4}$' -- code postaux les plus génériques
        OR VALUE ~ '^9[0-6]\d{3}$' -- code postaux metropole commencant par 9
        OR VALUE ~ '^97[1-6]\d{2}$' -- code postaux DOM
        OR VALUE ~ '^98[4678]\d{2}$' -- code postaux TOM
        OR VALUE ~ '^9{5}$' -- code postal de la poste'
    )
;

CREATE TABLE "tag" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT DEFAULT NULL,
    "lastname" TEXT DEFAULT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "email" mail NOT NULL,
    "zipcode" french_zipcode DEFAULT NULL,
    "localisation" TEXT DEFAULT NULL,
    "biography" TEXT DEFAULT NULL,
    "profile_picture" TEXT DEFAULT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE "book" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "google_api_id" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE "library" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "book_id" INT NOT NULL REFERENCES "book"("id"),
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE "loan" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "status" TEXT NOT NULL,
    "loan_date" TIMESTAMPTZ DEFAULT NULL, 
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "library_id" INT NOT NULL REFERENCES "library"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE "user_has_tag" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT NULL
);

COMMIT;
