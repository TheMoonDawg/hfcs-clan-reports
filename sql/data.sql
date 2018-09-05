INSERT INTO ninja
    (ninja_id, display_name)
VALUES
    (1, 'Achronos'),
    (282, 'stosh'),
    (1774, 'Duardo'),
    (2336, 'Lord Revan'),
    (2526, 'dmg04'),
    (8011, 'Deej'),
    (22704, 'Cozmo'),
    (17956, 'Cortana V'),
    (5828411, 'Siffow'),
    (5872880, 'BNGHelp0'),
    (5872883, 'BNGHelp1'),
    (8305888, 'BNGHelp2'),
    (8306078, 'BNGHelp3'),
    (8306295, 'BNGHelp4'),
    (10813992, 'BNGHelp5'),
    (11947219, 'BNGHelp6'),
    (11947299, 'BNGHelp7'),
    (11953952, 'BNGHelp8'),
    (108762, 'MoonDawg'),
    (17925, 'FoMan123'),
    (1127, 'dmbfan09'),
    (2311, 'Shacker'),
    (3352, 'irishfreak'),
    (4878, 'Spawn'),
    (6004, 'Atsumi'),
    (7024, 'Butane'),
    (29347, 'DMHCook'),
    (31152, 'onyx spartan'),
    (51262, 'bobcast'),
    (60418, 'ZER0COOL'),
    (68974, 'dazarobbo'),
    (76974, 'Old Papa Rich'),
    (83901, 'Froggie'),
    (95799, 'Plain Ben'),
    (218625, 'Index'),
    (328524, 'Phoenix1710'),
    (398983, 'Takedown'),
    (446470, 'machinimagames'),
    (924570, 'Needless'),
    (964968, 'Makeshyft'),
    (1093770, 'Seraphim Crypto'),
    (1292876, 'Fuzzle'),
    (2985263, 'BaghdadBean'),
    (3537380, 'Commander Scurvy'),
    (4864368, 'Ecto1italia'),
    (5666728, 'Dimitrios4'),
    (5696684, 'Psyperactive81'),
    (8878733, 'truexadir'),
    (5651783, 'Pobreloko');

-- Transfer data from old table
INSERT INTO report
    (clan_id, clan_name, clan_motto, clan_mission_statement, notes, ninja_id, judgment, report_date)
SELECT r.clanid, r.clanname, r.clanmotto, r.clanmissionstatement, r.notes, n.ninja_id, r.judgment, r.reportdate
FROM reports r
    LEFT JOIN ninja n ON n.display_name = r.ninja;

-- Update regions for ninjas
-- German
UPDATE ninja
SET region = 'German'
WHERE ninja_id = 1093770 OR ninja_id = 1292876;

-- Spanish
UPDATE ninja
SET region = 'Spanish'
WHERE ninja_id = 5696684 OR ninja_id = 5651783;

-- French
UPDATE ninja
SET region = 'French'
WHERE ninja_id = 5666728;

-- Italian
UPDATE ninja
SET region = 'Italian'
WHERE ninja_id = 4864368 OR ninja_id = 924570;

-- Portuguese
UPDATE ninja
SET region = 'Portuguese'
WHERE ninja_id = 8878733;

-- Update regions for existing reports
UPDATE report r
SET region = n.region
FROM ninja n
WHERE n.ninja_id = r.ninja_id;
