--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: labber
--

INSERT INTO public.options (id, question_id, content, is_correct) VALUES (1, 1, 'Black Mountain', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (2, 2, 'Lynn Peak', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (3, 2, 'The Needles', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (4, 3, 'Cypress Mountain', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (5, 3, 'Grouse Mountain', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (6, 3, 'Mount Seymour', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (7, 4, 'Cypress Group', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (8, 4, 'Squamish Cluster', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (9, 4, 'Fannin Range', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (10, 4, 'Lions Area', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (11, 1, 'Mount Fromme', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (12, 1, 'Grouse Mountain', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (13, 1, 'Mount Strachan', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (14, 2, 'Crown Mountain', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (15, 2, 'Mount Burwell', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (16, 5, '5', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (17, 5, '2', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (18, 6, 'Flat-head screwdriver bits as they are not used any more', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (19, 5, '1', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (20, 6, 'Typically the right-most bit in a binary word', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (21, 7, '5 bits', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (22, 7, '6 bits', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (23, 7, '7 bits', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (24, 8, '1024', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (25, 8, '128', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (26, 8, '256', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (27, 8, '64', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (28, 6, 'Typically the center bit in a binary (in an even-length word there are two LSBs)', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (29, 6, 'Typically the left-most bit in a binary word', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (30, 9, 'const', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (31, 11, 'Laravel', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (32, 11, 'jQuery', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (33, 12, '.join()', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (34, 12, '.push()', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (35, 12, '.serialize()', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (36, 12, '.some()', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (37, 10, 'The JS V8 engine', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (38, 9, 'delete', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (41, 10, 'ASP', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (39, 10, 'Node.js', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (40, 10, 'ECMAScript 2015', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (42, 9, 'serial', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (44, 13, 'Integers in node.js can store fractional numbers while integers in the browser are always whole numbers.', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (43, 13, 'Node.js can access the filesystem, browserscript cannot', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (45, 13, 'Browserscript can talk to a database backend directly while Node.js needs to use a database driver', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (46, 9, 'for', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (47, 11, 'React', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (48, 14, 'Dude Chilling Park', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (49, 15, 'Alexandria Ocasio-Cortez', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (50, 15, 'Kennedy Stewart', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (51, 16, 'on the downtown East side', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (52, 16, 'in North Vancouver', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (53, 16, 'in Stanley Park', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (54, 17, 'Lions Gate Bridge', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (55, 17, 'Second Narrows Bridge', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (56, 17, 'Port Mann Bridge', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (57, 18, '$1,230,200', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (58, 18, '$1,050,500', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (59, 18, '$995,400', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (60, 14, 'Graham Park', true);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (61, 14, 'New Brighton Park', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (62, 16, 'on the downtown West side', false);
INSERT INTO public.options (id, question_id, content, is_correct) VALUES (63, 15, 'Gregor Robertson', false);


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.options_id_seq', 63, true);


--
-- PostgreSQL database dump complete
--

