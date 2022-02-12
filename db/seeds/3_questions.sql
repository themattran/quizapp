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
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: labber
--

INSERT INTO public.questions (id, quiz_id, question_string) VALUES (1, 1, 'Which mountain is the highest?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (2, 1, 'Which mountain does not belong to the Cathedral/Lynn range?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (3, 1, 'Which mountain has the largest ski resort?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (4, 1, 'Which is not a mountain range in southwestern BC?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (5, 2, 'How many digits/states does the binary system use?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (6, 2, 'What''s the least significant bit (LSB)?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (7, 2, 'Two represent 24 hours on a binary clock, the hour display needs at least...');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (8, 2, 'The most-significant bit in a 7-bit binary word is worth (in decimal)...');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (9, 3, 'Which is not a Javascript keyword?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (11, 3, 'Which is not a Javascript framework?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (10, 3, 'ES6 is also known as');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (12, 3, 'Which function is not defined on a Javascript array?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (13, 3, 'What is a major difference between Node.js and the Javascript environment in the browser?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (14, 4, 'Which is not a park in Vancouver?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (15, 4, 'In 2018, Vancouver elected as their mayor');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (16, 4, 'Canada Place is...');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (17, 4, 'Which is not a bridge in Vancouver?');
INSERT INTO public.questions (id, quiz_id, question_string) VALUES (18, 4, 'At the end of 2021, the benchmark price for all homes in Metro Vancouver was');


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.questions_id_seq', 18, true);


--
-- PostgreSQL database dump complete
--

