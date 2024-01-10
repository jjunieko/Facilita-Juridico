PGDMP         8        
         |            postgres    15.5    15.5     v           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            w           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            x           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            y           1262    5    postgres    DATABASE        CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE postgres;
                postgres    false            z           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3449                        2615    16397    pgagent    SCHEMA        CREATE SCHEMA pgagent;
    DROP SCHEMA pgagent;
                postgres    false            {           0    0    SCHEMA pgagent    COMMENT     6   COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';
                   postgres    false    8                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            |           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2                        3079    16398    pgagent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;
    DROP EXTENSION pgagent;
                   false    8            }           0    0    EXTENSION pgagent    COMMENT     >   COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';
                        false    3            �            1259    524601    clientes    TABLE     �   CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    telefone character varying(20) NOT NULL,
    coordenada_x numeric,
    coordenada_y numeric
);
    DROP TABLE public.clientes;
       public         heap    postgres    false            �            1259    524600    clientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.clientes_id_seq;
       public          postgres    false    237            ~           0    0    clientes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;
          public          postgres    false    236            �           2604    524604    clientes id    DEFAULT     j   ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);
 :   ALTER TABLE public.clientes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    237    237            �          0    16399    pga_jobagent 
   TABLE DATA           I   COPY pgagent.pga_jobagent (jagpid, jaglogintime, jagstation) FROM stdin;
    pgagent          postgres    false    221   t       �          0    16408    pga_jobclass 
   TABLE DATA           7   COPY pgagent.pga_jobclass (jclid, jclname) FROM stdin;
    pgagent          postgres    false    223   �       �          0    16418    pga_job 
   TABLE DATA           �   COPY pgagent.pga_job (jobid, jobjclid, jobname, jobdesc, jobhostagent, jobenabled, jobcreated, jobchanged, jobagentid, jobnextrun, joblastrun) FROM stdin;
    pgagent          postgres    false    225   �       �          0    16466    pga_schedule 
   TABLE DATA           �   COPY pgagent.pga_schedule (jscid, jscjobid, jscname, jscdesc, jscenabled, jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths) FROM stdin;
    pgagent          postgres    false    229   �       �          0    16494    pga_exception 
   TABLE DATA           J   COPY pgagent.pga_exception (jexid, jexscid, jexdate, jextime) FROM stdin;
    pgagent          postgres    false    231          �          0    16508 
   pga_joblog 
   TABLE DATA           X   COPY pgagent.pga_joblog (jlgid, jlgjobid, jlgstatus, jlgstart, jlgduration) FROM stdin;
    pgagent          postgres    false    233   4       �          0    16442    pga_jobstep 
   TABLE DATA           �   COPY pgagent.pga_jobstep (jstid, jstjobid, jstname, jstdesc, jstenabled, jstkind, jstcode, jstconnstr, jstdbname, jstonerror, jscnextrun) FROM stdin;
    pgagent          postgres    false    227   Q       �          0    16524    pga_jobsteplog 
   TABLE DATA           |   COPY pgagent.pga_jobsteplog (jslid, jsljlgid, jsljstid, jslstatus, jslresult, jslstart, jslduration, jsloutput) FROM stdin;
    pgagent          postgres    false    235   n       s          0    524601    clientes 
   TABLE DATA           Y   COPY public.clientes (id, nome, email, telefone, coordenada_x, coordenada_y) FROM stdin;
    public          postgres    false    237   �                  0    0    clientes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.clientes_id_seq', 15, true);
          public          postgres    false    236            �           2606    524606    clientes clientes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_pkey;
       public            postgres    false    237            �   <   x��456�4202�50�54P04�21�2��35�400�50�t��OJ���,).����� ��      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      s   �   x�m��
�@E��/1�;��d�����f#A#�����&>@����1�y�76K��v��"d� ��(���&���Q	�)Mp�h.c�(��Wxf4%/%2�hi�C��m�������k&���Ddu>�H��Cw����Z`-5{R��;�s�	��<�     