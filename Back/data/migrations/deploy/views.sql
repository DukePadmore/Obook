-- Deploy o-book:views to pg

BEGIN;

CREATE VIEW "user_library_details" AS
SELECT
    "tag"."id" as tagId,
    "tag"."label",
    "user"."id" as userId,
    "user"."username",
    "user"."zipcode",
    "user"."localisation",
    "user"."biography",
    "user"."profile_picture",
    "library"."id" as libraryId,
    "library"."is_available",
    "book"."id" as bookId,
    "book"."google_api_id"
FROM "tag"
JOIN "user_has_tag" ON "user_has_tag"."tag_id" = "tag"."id"
JOIN "user" ON "user"."id" = "user_has_tag"."user_id"
JOIN "library" ON "library"."user_id" = "user"."id"
JOIN "book" ON "book"."id" = "library"."book_id"
;

CREATE VIEW "book_in_library" AS
SELECT
    "user"."id" as userId,
    "user"."username",
    "user"."zipcode",
    "user"."localisation",
    "user"."profile_picture",
    "library"."id" as libraryId
FROM "user"
JOIN "library" ON "library"."user_id" = "user"."id"
JOIN "book" ON "book"."id" = "library"."book_id"
;

CREATE VIEW "profile_informations" AS 
SELECT 
    "id",
    "firstname",
    "lastname",
    "username",
    "email",
    "zipcode",
    "localisation",
    "tel",
    "biography",
    "profile_picture"
FROM "user";

CREATE VIEW "contact_informations" AS 
SELECT 
    "id",
    "username",
    "email",
    "zipcode",
    "tel"
FROM "user";


COMMIT;
