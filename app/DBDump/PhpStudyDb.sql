PGDMP     ,    $                z            PhpStudy    13.6 (Debian 13.6-1.pgdg110+1)    14.2 F               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    PhpStudy    DATABASE     ^   CREATE DATABASE "PhpStudy" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE "PhpStudy";
                postgres    false            �            1255    16385    addUserTriggerFunc()    FUNCTION     C  CREATE FUNCTION public."addUserTriggerFunc"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
idUser int = (select "idUser"
FROM "Users" ORDER BY "idUser" DESC LIMIT 1);
str1 text = (select "email"
FROM "Users" ORDER BY "email" DESC LIMIT 1);
begin
raise notice 'User added! %: %', idUser,str1;
return new;
end;
$$;
 -   DROP FUNCTION public."addUserTriggerFunc"();
       public          postgres    false            �            1255    16386    deleteMsg()    FUNCTION     �   CREATE FUNCTION public."deleteMsg"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
raise notice 'Delete success!';
return new;
end;
$$;
 $   DROP FUNCTION public."deleteMsg"();
       public          postgres    false            �            1255    16387 2   insertDefaultUser(character, character, character) 	   PROCEDURE     I  CREATE PROCEDURE public."insertDefaultUser"(login character DEFAULT 'testUser'::bpchar, password character DEFAULT 'password'::bpchar, email character DEFAULT 'testUserEmail@test.ru'::bpchar)
    LANGUAGE sql
    AS $$
insert into "Users" ("login", "password", "email", "registerDate") 
values(login, password, email, NOW())
$$;
 a   DROP PROCEDURE public."insertDefaultUser"(login character, password character, email character);
       public          postgres    false            �            1255    16388 +   trimconcat(character, character, character)    FUNCTION       CREATE FUNCTION public.trimconcat(str1 character DEFAULT ''::bpchar, str2 character DEFAULT ''::bpchar, str3 character DEFAULT ''::bpchar) RETURNS character
    LANGUAGE plpgsql
    AS $$
declare
begin
RETURN trim(concat(trim(str1), str2, trim(str3)));
end;
$$;
 Q   DROP FUNCTION public.trimconcat(str1 character, str2 character, str3 character);
       public          postgres    false            �            1255    16389    updateMsg()    FUNCTION     �   CREATE FUNCTION public."updateMsg"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
raise notice 'Update success!';
end;
$$;
 $   DROP FUNCTION public."updateMsg"();
       public          postgres    false            �            1259    16390    Courses    TABLE     �   CREATE TABLE public."Courses" (
    id_course integer NOT NULL,
    name character varying(200) NOT NULL,
    id_difficulty integer NOT NULL,
    description character(500)
);
    DROP TABLE public."Courses";
       public         heap    postgres    false            �            1259    16393    Courses_idCourse_seq    SEQUENCE     �   ALTER TABLE public."Courses" ALTER COLUMN id_course ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Courses_idCourse_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �            1259    16395    DifficultyCourses    TABLE     z   CREATE TABLE public."DifficultyCourses" (
    id_difficulty integer NOT NULL,
    name character varying(200) NOT NULL
);
 '   DROP TABLE public."DifficultyCourses";
       public         heap    postgres    false            �            1259    16398    Difficulty_idDifficulty_seq    SEQUENCE     �   ALTER TABLE public."DifficultyCourses" ALTER COLUMN id_difficulty ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Difficulty_idDifficulty_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    16400    ProgressCourses    TABLE     �   CREATE TABLE public."ProgressCourses" (
    id_progress_course integer NOT NULL,
    id_user integer NOT NULL,
    id_course integer NOT NULL,
    is_complete boolean DEFAULT false NOT NULL
);
 %   DROP TABLE public."ProgressCourses";
       public         heap    postgres    false            �            1259    16404 #   ProgressCourse_idProgressCourse_seq    SEQUENCE     �   ALTER TABLE public."ProgressCourses" ALTER COLUMN id_progress_course ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ProgressCourse_idProgressCourse_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    204            �            1259    16406    ProgressTasks    TABLE     �   CREATE TABLE public."ProgressTasks" (
    id_progress_task integer NOT NULL,
    id_user integer NOT NULL,
    id_task integer NOT NULL,
    is_complete boolean DEFAULT false NOT NULL
);
 #   DROP TABLE public."ProgressTasks";
       public         heap    postgres    false            �            1259    16410     ProgressTasks_idProgressTask_seq    SEQUENCE     �   ALTER TABLE public."ProgressTasks" ALTER COLUMN id_progress_task ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ProgressTasks_idProgressTask_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �            1259    16412    Tasks    TABLE     �   CREATE TABLE public."Tasks" (
    id_task integer NOT NULL,
    name character varying(500) NOT NULL,
    php_code text NOT NULL,
    level_number integer NOT NULL,
    id_course integer NOT NULL,
    theory text NOT NULL
);
    DROP TABLE public."Tasks";
       public         heap    postgres    false            �            1259    16418    Tasks_idTask_seq    SEQUENCE     �   ALTER TABLE public."Tasks" ALTER COLUMN id_task ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Tasks_idTask_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    208            �            1259    16420    Users    TABLE     7  CREATE TABLE public."Users" (
    "idUser" integer NOT NULL,
    password character varying(100) NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    middle_name character varying(100),
    created_at date,
    email character varying(200) NOT NULL,
    updated_at date
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16426    Users_idUser_seq    SEQUENCE     �   ALTER TABLE public."Users" ALTER COLUMN "idUser" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_idUser_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    16428 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    16431    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    212                       0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    213            �            1259    16839    password_resets    TABLE     �   CREATE TABLE public.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone NOT NULL
);
 #   DROP TABLE public.password_resets;
       public         heap    postgres    false            �            1259    16819    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap    postgres    false            �            1259    16817    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    215                       0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    214            _           2604    16441    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            `           2604    16822    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                      0    16390    Courses 
   TABLE DATA           P   COPY public."Courses" (id_course, name, id_difficulty, description) FROM stdin;
    public          postgres    false    200   X                 0    16395    DifficultyCourses 
   TABLE DATA           B   COPY public."DifficultyCourses" (id_difficulty, name) FROM stdin;
    public          postgres    false    202   Y       
          0    16400    ProgressCourses 
   TABLE DATA           `   COPY public."ProgressCourses" (id_progress_course, id_user, id_course, is_complete) FROM stdin;
    public          postgres    false    204   0Y                 0    16406    ProgressTasks 
   TABLE DATA           Z   COPY public."ProgressTasks" (id_progress_task, id_user, id_task, is_complete) FROM stdin;
    public          postgres    false    206   MY                 0    16412    Tasks 
   TABLE DATA           [   COPY public."Tasks" (id_task, name, php_code, level_number, id_course, theory) FROM stdin;
    public          postgres    false    208   jY                 0    16420    Users 
   TABLE DATA           x   COPY public."Users" ("idUser", password, first_name, last_name, middle_name, created_at, email, updated_at) FROM stdin;
    public          postgres    false    210   Ni                 0    16428 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    212   �k                 0    16839    password_resets 
   TABLE DATA           C   COPY public.password_resets (email, token, created_at) FROM stdin;
    public          postgres    false    216   	l                 0    16819    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
    public          postgres    false    215   �l                  0    0    Courses_idCourse_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Courses_idCourse_seq"', 6, true);
          public          postgres    false    201                        0    0    Difficulty_idDifficulty_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Difficulty_idDifficulty_seq"', 6, true);
          public          postgres    false    203            !           0    0 #   ProgressCourse_idProgressCourse_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."ProgressCourse_idProgressCourse_seq"', 7, true);
          public          postgres    false    205            "           0    0     ProgressTasks_idProgressTask_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."ProgressTasks_idProgressTask_seq"', 20, true);
          public          postgres    false    207            #           0    0    Tasks_idTask_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Tasks_idTask_seq"', 10, true);
          public          postgres    false    209            $           0    0    Users_idUser_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Users_idUser_seq"', 86, true);
          public          postgres    false    211            %           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);
          public          postgres    false    213            &           0    0    personal_access_tokens_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 6, true);
          public          postgres    false    214            b           2606    16444    Courses Courses_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id_course);
 B   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT "Courses_pkey";
       public            postgres    false    200            f           2606    16446 !   DifficultyCourses Difficulty_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."DifficultyCourses"
    ADD CONSTRAINT "Difficulty_pkey" PRIMARY KEY (id_difficulty);
 O   ALTER TABLE ONLY public."DifficultyCourses" DROP CONSTRAINT "Difficulty_pkey";
       public            postgres    false    202            j           2606    16448 #   ProgressCourses ProgressCourse_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public."ProgressCourses"
    ADD CONSTRAINT "ProgressCourse_pkey" PRIMARY KEY (id_progress_course);
 Q   ALTER TABLE ONLY public."ProgressCourses" DROP CONSTRAINT "ProgressCourse_pkey";
       public            postgres    false    204            l           2606    16450     ProgressTasks ProgressTasks_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."ProgressTasks"
    ADD CONSTRAINT "ProgressTasks_pkey" PRIMARY KEY (id_progress_task);
 N   ALTER TABLE ONLY public."ProgressTasks" DROP CONSTRAINT "ProgressTasks_pkey";
       public            postgres    false    206            n           2606    16452    Tasks Tasks_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (id_task);
 >   ALTER TABLE ONLY public."Tasks" DROP CONSTRAINT "Tasks_pkey";
       public            postgres    false    208            p           2606    16454    Users Users_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("idUser");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    210            r           2606    16456    Users email 
   CONSTRAINT     I   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT email UNIQUE (email);
 7   ALTER TABLE ONLY public."Users" DROP CONSTRAINT email;
       public            postgres    false    210            t           2606    16458    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    212            h           2606    16460    DifficultyCourses name 
   CONSTRAINT     S   ALTER TABLE ONLY public."DifficultyCourses"
    ADD CONSTRAINT name UNIQUE (name);
 B   ALTER TABLE ONLY public."DifficultyCourses" DROP CONSTRAINT name;
       public            postgres    false    202            d           2606    16576    Courses name_unique 
   CONSTRAINT     P   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT name_unique UNIQUE (name);
 ?   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT name_unique;
       public            postgres    false    200            v           2606    16827 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            postgres    false    215            x           2606    16830 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            postgres    false    215            z           1259    16845    password_resets_email_index    INDEX     X   CREATE INDEX password_resets_email_index ON public.password_resets USING btree (email);
 /   DROP INDEX public.password_resets_email_index;
       public            postgres    false    216            {           1259    16846    password_resets_token_index    INDEX     X   CREATE INDEX password_resets_token_index ON public.password_resets USING btree (token);
 /   DROP INDEX public.password_resets_token_index;
       public            postgres    false    216            y           1259    16828 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            postgres    false    215    215            �           2620    16468    Users addUserTrigger    TRIGGER     |   CREATE TRIGGER "addUserTrigger" AFTER INSERT ON public."Users" FOR EACH ROW EXECUTE FUNCTION public."addUserTriggerFunc"();
 1   DROP TRIGGER "addUserTrigger" ON public."Users";
       public          postgres    false    217    210            �           2620    16469    Users deleteUser    TRIGGER     o   CREATE TRIGGER "deleteUser" AFTER DELETE ON public."Users" FOR EACH ROW EXECUTE FUNCTION public."deleteMsg"();
 -   DROP TRIGGER "deleteUser" ON public."Users";
       public          postgres    false    210    218            }           2606    16471    ProgressCourses idCourse    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProgressCourses"
    ADD CONSTRAINT "idCourse" FOREIGN KEY (id_course) REFERENCES public."Courses"(id_course);
 F   ALTER TABLE ONLY public."ProgressCourses" DROP CONSTRAINT "idCourse";
       public          postgres    false    2914    204    200            �           2606    16476    Tasks idCourse    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "idCourse" FOREIGN KEY (id_course) REFERENCES public."Courses"(id_course) NOT VALID;
 <   ALTER TABLE ONLY public."Tasks" DROP CONSTRAINT "idCourse";
       public          postgres    false    2914    208    200            |           2606    16481    Courses idDifficulty    FK CONSTRAINT     �   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "idDifficulty" FOREIGN KEY (id_difficulty) REFERENCES public."DifficultyCourses"(id_difficulty) NOT VALID;
 B   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT "idDifficulty";
       public          postgres    false    200    202    2918                       2606    16486    ProgressTasks idTask    FK CONSTRAINT     ~   ALTER TABLE ONLY public."ProgressTasks"
    ADD CONSTRAINT "idTask" FOREIGN KEY (id_task) REFERENCES public."Tasks"(id_task);
 B   ALTER TABLE ONLY public."ProgressTasks" DROP CONSTRAINT "idTask";
       public          postgres    false    206    2926    208            �           2606    16491    ProgressTasks idUser    FK CONSTRAINT        ALTER TABLE ONLY public."ProgressTasks"
    ADD CONSTRAINT "idUser" FOREIGN KEY (id_user) REFERENCES public."Users"("idUser");
 B   ALTER TABLE ONLY public."ProgressTasks" DROP CONSTRAINT "idUser";
       public          postgres    false    206    210    2928            ~           2606    16496    ProgressCourses idUser    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProgressCourses"
    ADD CONSTRAINT "idUser" FOREIGN KEY (id_user) REFERENCES public."Users"("idUser");
 D   ALTER TABLE ONLY public."ProgressCourses" DROP CONSTRAINT "idUser";
       public          postgres    false    2928    210    204               �   x��;�@Dc�{ 5R�`�<���*����H��(��|��s#{v50�L����`�0�WY�
8��ٶ�m<��Q���5Uk���M��X��'��<��:4�3����tl��d��|��U_%�0���ʲ�D+�7�u��]��8�(��dc��ke�с�1���4W� %N�'Ys�+��'!J@�1sJ�0����p�5��Ţ�����_����1w��_�            x�3�tM,��2��MM�,������ =p-      
      x������ � �            x������ � �         �  x��Z[o�~�~�	!@R�b,9JR)v�>5/Aޣ<Ȏb�)C��Q�o�b%A�i#)�>�$�ES��/����|3綻�� -P6��s�3g�o��F�}~���N�-���o��)�������|���+暙_ZnOޠ/W��7�7&?+��Gy�Mq���� OM~N�e�	I�i �>�_#�~h�Q�?��m��O�}����nq`H����L�]���>;4z���.�����M����ا�x���=%��O2j�KCR/z�F4�9�t��ӼW�O�'�-]4P���K����
G�և�;Љ|�h�%=Poq���"�u̯�t�C^z��?ҋ�O�y����X�,14�3?�r��b+�������UbfgXS?x�������IF4��[u%�驝���34:%�Ί�-�1���:u�zޚ�k�M۳��N���U�TL���o�޾��^���7oo����C�bu�M-5��T��v�Mu���8���v}��`4&1�w�x��N�âD�f�Dh�
3���Ɲ�yԼ0�5+�|���,K+�p&�Z}��]}�=?����@I}�`�/�j��GX��Y�1�@��s���O�O���y#5�G��4Y��+�Cv@3>�z_����s�k�k	��E#jr��K2dɐjVz�}�F�����᰼��АԲ����lM\m���v�l���d�ޝ��[��.$f>1o%���\�h����Rs'�@{��)�k+%���*�d����������O�3`/���JQ�xtB5d]�l�@c���:h^̵,���uXS uCV#8օ�1����:�s1���}1�d%�'ŗP \<�o���y��XQS`�X���|�9_eW������܉���j*U��;{�W��HL`�&W|p �z��yx��33O�`�*��Z,K�<�T��D��E7��s�!�ӮH�6 {�]�Ms >N"H�G���uɉ�w�p@PE8HH.�[�#bxG��U��끄KuP�m��5ߚ _�����v���Znc�����y{;���|����1��ц�6�6�O�^D0;�f��-	�+��#��O$��w���� �1���^��)P� �%f��&b <80�sk��UG9Œ��-���2-V�?h��Џ)(������AI�},�����v,4�A�3���f�����5��ʒ��w��������rۘ7�0�f���ŜU�q!�T���r�~c���N2�p�a�3��U&xp�5�V�P�l��#	l�S��ԅ4��T�E�T=�͆= t� .0�pV3X�*�67��5�3���X���}�f6D0�CB�=A�����b7R�d��ܤ}N# ~��p�`0#�塺����s����q�6��d)��@/�b�t�V1��`q�1��\�Fx`s!YAvƫ�����nM���RA���aʔ�l=?��,X!\Ю爭�D3I�^I�@�;
S�E~�Ud@x�M����	#*���*�Y���3���?����L���c����2����Q�?<r�Q(��6��D�P�� ���Yeşb/�B�1찆�yK���l]k"M|v�j�X��{����G��$�ǞW�����3�D���\�3=Ӛx+��Օ������"j?j51o&f�#��Ǵk��ey����[�����P.s:�@
��Ï��Ed�ХbBWu��|H�-��}Kj��-<��c���[�O�J�P�Y�f+��xD�(�<��v�2Y�0T�A��]�l5�AÃ�렊BCҳ�x�]	j��_�F`�}�i@��D�墆�+���c�"I6�	yF��4��~W�5�
n^�p!�U 0��9� o_��d�_a��!;�h�R����佭�M��&*,C)z�Ms�:������"�l��	�wx��K�����O5cp�̌X���O�m�������|�ٸFa�6�,�p]�nE�FT��#���:[ԁ�i��'��=:B��"��Ch�i�d��g�O��Iݢfu����Pf'��2��%��v3�V����P���W_��z�H�+��`��x�Kj�<ǉ�8�+�+3��a�Ϡ>$s��1l������&F�|΃��mf����e�u/Ǣ�T	����fTHVGJ��en.�j��ؽM�(�ç����qvgJ���s�{���)Z����'��7��6����Z{�}����Lnm�ln'����m�,�O7�>^ns�3Ti(i�5m�Xcsr�uO f�3��Q>JR)�E�>1�j��Z)!<��gX�S�gc���ۃ1�?�,��3z2e&�v�W� B��N[�X�l�Rq�DH(WX��)�=��K�㠫נ�P�;,�U��vŢV$�"���YɆ³�m���G�RP�{΍̦Rk�co�	�_*<�*��7=WU��>�,�Z��Nz���s��zH�9 �ͥ���$�8��U�$��Vb�bfȚ]�@�7c�6#��pƕ�O[�y���ʱ��U��Z�;�8�o��9`%`�$���GJG2����fGg���K�$u�L��-;��SMM����bc�a�ޗ=��Ɇ��]k$���c�6��
�Ii���p.i���ɩK٬e��A�,�n�K�%[����V���R�:w�Ek��	�)�@� ���lh�������/����$�NO�$f���R�51w�c���� �h-���f%Y9�}���ڸ����e>��і8G��٢�}��;�\;����M,Wn��w�B/o��X_�i\��Z�~�Ƙ�ҧ���^��?�۷׶f���Rg�?n��׶|�%
�cG��u�W�R,.���L�ecuءE=~{+��km���T�X5��B�ɻ�+M�^�L�<=��^�^���z�ӕ�T�*Z�R�Ї�o�x'`��KC�=~{f�26��»�S�ѳ���t�1�h�-�^ ���$��g8~�Za1ӦSo�R�|2&8��U	�m�'����0�s��ѕ�dU�t��G���[�dCAkvL3�4�՚ť!߭N-�VP6��)�V����s��`���źK�}�qV�<�d�Y�=�1ʐm����Lu(�g|��u/��V�K�&2�D���a�[z4h9*(���&>u�!�B���r�UC��*��(�����;L�.N��D�9�
�ݣZ��b����'4�3t�q��#pK�Go���홐�_|�7&΄��-$�A��]=�/%A�hy��������k��C�(�KX4F��T����,G8i�MԩzR,��4�z��X�)��e�~�S�@�R�Um�7*Ф�E1q���f�ڴ�ڱ�Ɉ�����m;�]�R����%�Z+ؕ
�%u� �a�Tƒ̑f���N���Cڟ@>��ǰ �� iq9�HS�Ck��C��\ڙE�����ج5�kK�r�@�ߘ#C8G�p'����Qt�5H�#�"�6��N�+���t���4N�x:�W&,7q� s�i�#�O���((�g����A�6�@�&�A������U��Q�F�Sw&~\]��H���t�U�`�2�}�R<))���wU*��գ1KV|���%)�'�:���V�k՘jh�A��j�R�c�>vB��|A���Z*1T�j.��X��7% R��Rl���$|�q�]htIi���>m��� `�g��Vc����LST�����EVoBq�p(q%��r3.J�L�4'J�j�'��(�kY�k�@��9� v�u�|K���kdpI�Dg���ZB1�f�⍊X�O�M��lP��c������j�B�%@� �^�/�kQC'��A��C�@���!K�`H��u[i��W���F��/J�D=[a�qi�~����q�k;�?��&����敃iL��
��ZR�K@����V�2�M�B�#X�Ke�_���@u�p�z�B�W5Gc>H�8U����կpU�p�ݙ���K>!vW�Dlr3�)ӞE�_�
v$��Bub�?��퀬�۞XnMLL�N�         >  x���ݎ�P�k}��]���w��R����H��|	��!�u��OҾQӦ4ۮ����L&�e��p��	vO�~
N\l��j�	MBx���6%#D��\��x6��yt�i�_+9��
�>��3�Gy�&5�4���L��
^�I2j_���9a��gC?k�rt�0ݣb���ͪ�*�L�Su���1G�	G-�Wz�<f3��h�����)�M-�jyn��P���$�/����%��'�49=f�����V*�]�K똽2(�I��+k��������v녻�{�`{�V��H���}��;ׂ�G�׹�lb`G�_�hʴbh�]m�U#m�5jP.��������3L�`�?�/�,vT���^;��V����R!��P
c!V@��=�h����o���l����X��^��Gm`�X�u�kv;8��MK���~��T?�/�"㛻��߆[N�p^�i�nQ�"�ܠ��60��3���G���7}w�����þ�K�KG�Cp�����q+��L�y�ZzO%�5��6	�&�~��ʥ��4��:"�,��wX�cz��M�Q���'.3�         ]   x�=�1
�0F�9�4�E���k&�JS����[��MA"�`��_��L�����Z������w���W� fp�pL)�R���64s�����)I!�         z   x�����,I4204M�/�,�/sH�M���K���T1�T14PIO�M,��	��L��t�JJ�)/u�vL3wɉ,�M�,uKO�+˪LK��/�(�4202�50�54Q04�26�24����� ��#2            x������ � �     