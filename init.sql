--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    user_id integer
);


--
-- Name: cart_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.cart ALTER COLUMN cart_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cart_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart_item (
    product_id integer NOT NULL,
    cart_id integer NOT NULL,
    quantity integer DEFAULT 1
);


--
-- Name: order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."order" (
    order_id integer NOT NULL,
    user_id integer,
    total integer,
    status text
);


--
-- Name: order_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_item (
    order_item_id integer NOT NULL,
    order_id integer,
    quantity integer,
    price integer,
    product_id integer
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(255),
    price money,
    description text,
    category character varying(50)
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    first_name character varying(40),
    last_name character varying(40)
);


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."user" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart (cart_id, user_id) FROM stdin;
20	14
\.


--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart_item (product_id, cart_id, quantity) FROM stdin;
4	20	1
3	20	2
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."order" (order_id, user_id, total, status) FROM stdin;
\.


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_item (order_item_id, order_id, quantity, price, product_id) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (product_id, name, price, description, category) FROM stdin;
1	Gran Espress	$8.88	Light and flavorful blend with cocoa and black pepper for an intense expereince	Dark Roast
2	Planalto	$8.99	Brazillian roast with rich and velvety body, with hints of fruits and nuts	Dark Roast
3	Danche	$8.88	Ethopian hand-harvested blend densely packed with vibrant fruit notes	Medium Roast
4	Piccollo	$10.88	Smooth blend featuring notes of toasted almond and dried cherry	Medium Roast
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (user_id, email, password, first_name, last_name) FROM stdin;
14	james.phelps1995@live.com	$2b$10$liZcr9SVz1qNP/JjZNWSs.XAenOUGUPUTewaNG9ggCHNJjd/ZHFPO	Jamie	Phelps
\.


--
-- Name: cart_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cart_cart_id_seq', 20, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_user_id_seq', 16, true);


--
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (product_id, cart_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);


--
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (order_item_id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: cart_item cart_item_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.cart(cart_id);


--
-- Name: cart_item cart_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: order_item fk_forproducts; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk_forproducts FOREIGN KEY (product_id) REFERENCES public.products(product_id);


--
-- Name: order_item order_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES public."order"(order_id);


--
-- Name: cart user_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: order user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT user_id FOREIGN KEY (order_id) REFERENCES public."user"(user_id);


--
-- PostgreSQL database dump complete
--

