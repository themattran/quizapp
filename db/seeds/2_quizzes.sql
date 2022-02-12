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
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: labber
--

INSERT INTO public.quizzes (id, name, user_id, is_public) VALUES (1, 'Vancouver Mountains', 1, true);
INSERT INTO public.quizzes (id, name, user_id, is_public) VALUES (2, 'Binary Numbers', 1, true);
INSERT INTO public.quizzes (id, name, user_id, is_public) VALUES (3, 'Javascript', 1, true);
INSERT INTO public.quizzes (id, name, user_id, is_public) VALUES (4, 'City of Vancouver', 2, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

