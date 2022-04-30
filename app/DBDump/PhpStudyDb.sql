PGDMP                         z            PhpStudy    13.6 (Debian 13.6-1.pgdg110+1)    14.2 C               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    PhpStudy    DATABASE     ^   CREATE DATABASE "PhpStudy" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
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
    theory text
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
       public          postgres    false    212                       0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    213            �            1259    16560    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
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
       public         heap    postgres    false            �            1259    16558    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    215                       0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    214            Z           2604    16441    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            [           2604    16563    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215                       0    16390    Courses 
   TABLE DATA           P   COPY public."Courses" (id_course, name, id_difficulty, description) FROM stdin;
    public          postgres    false    200   �T                 0    16395    DifficultyCourses 
   TABLE DATA           B   COPY public."DifficultyCourses" (id_difficulty, name) FROM stdin;
    public          postgres    false    202   �U                 0    16400    ProgressCourses 
   TABLE DATA           `   COPY public."ProgressCourses" (id_progress_course, id_user, id_course, is_complete) FROM stdin;
    public          postgres    false    204   �U                 0    16406    ProgressTasks 
   TABLE DATA           Z   COPY public."ProgressTasks" (id_progress_task, id_user, id_task, is_complete) FROM stdin;
    public          postgres    false    206   V                 0    16412    Tasks 
   TABLE DATA           [   COPY public."Tasks" (id_task, name, php_code, level_number, id_course, theory) FROM stdin;
    public          postgres    false    208   SV       
          0    16420    Users 
   TABLE DATA           x   COPY public."Users" ("idUser", password, first_name, last_name, middle_name, created_at, email, updated_at) FROM stdin;
    public          postgres    false    210   �`                 0    16428 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    212   �b                 0    16560    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, created_at, updated_at) FROM stdin;
    public          postgres    false    215   c                  0    0    Courses_idCourse_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Courses_idCourse_seq"', 6, true);
          public          postgres    false    201                       0    0    Difficulty_idDifficulty_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Difficulty_idDifficulty_seq"', 6, true);
          public          postgres    false    203                       0    0 #   ProgressCourse_idProgressCourse_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."ProgressCourse_idProgressCourse_seq"', 2, true);
          public          postgres    false    205                       0    0     ProgressTasks_idProgressTask_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."ProgressTasks_idProgressTask_seq"', 8, true);
          public          postgres    false    207                       0    0    Tasks_idTask_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Tasks_idTask_seq"', 8, true);
          public          postgres    false    209                       0    0    Users_idUser_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Users_idUser_seq"', 61, true);
          public          postgres    false    211                       0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);
          public          postgres    false    213                       0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 49, true);
          public          postgres    false    214            ]           2606    16444    Courses Courses_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id_course);
 B   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT "Courses_pkey";
       public            postgres    false    200            a           2606    16446 !   DifficultyCourses Difficulty_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."DifficultyCourses"
    ADD CONSTRAINT "Difficulty_pkey" PRIMARY KEY (id_difficulty);
 O   ALTER TABLE ONLY public."DifficultyCourses" DROP CONSTRAINT "Difficulty_pkey";
       public            postgres    false    202            e           2606    16448 #   ProgressCourses ProgressCourse_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public."ProgressCourses"
    ADD CONSTRAINT "ProgressCourse_pkey" PRIMARY KEY (id_progress_course);
 Q   ALTER TABLE ONLY public."ProgressCourses" DROP CONSTRAINT "ProgressCourse_pkey";
       public            postgres    false    204            g           2606    16450     ProgressTasks ProgressTasks_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."ProgressTasks"
    ADD CONSTRAINT "ProgressTasks_pkey" PRIMARY KEY (id_progress_task);
 N   ALTER TABLE ONLY public."ProgressTasks" DROP CONSTRAINT "ProgressTasks_pkey";
       public            postgres    false    206            i           2606    16452    Tasks Tasks_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (id_task);
 >   ALTER TABLE ONLY public."Tasks" DROP CONSTRAINT "Tasks_pkey";
       public            postgres    false    208            k           2606    16454    Users Users_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("idUser");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    210            m           2606    16456    Users email 
   CONSTRAINT     I   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT email UNIQUE (email);
 7   ALTER TABLE ONLY public."Users" DROP CONSTRAINT email;
       public            postgres    false    210            o           2606    16458    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    212            c           2606    16460    DifficultyCourses name 
   CONSTRAINT     S   ALTER TABLE ONLY public."DifficultyCourses"
    ADD CONSTRAINT name UNIQUE (name);
 B   ALTER TABLE ONLY public."DifficultyCourses" DROP CONSTRAINT name;
       public            postgres    false    202            _           2606    16576    Courses name_unique 
   CONSTRAINT     P   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT name_unique UNIQUE (name);
 ?   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT name_unique;
       public            postgres    false    200            q           2606    16568 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            postgres    false    215            s           2606    16571 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            postgres    false    215            t           1259    16569 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            postgres    false    215    215            {           2620    16468    Users addUserTrigger    TRIGGER     |   CREATE TRIGGER "addUserTrigger" AFTER INSERT ON public."Users" FOR EACH ROW EXECUTE FUNCTION public."addUserTriggerFunc"();
 1   DROP TRIGGER "addUserTrigger" ON public."Users";
       public          postgres    false    216    210            |           2620    16469    Users deleteUser    TRIGGER     o   CREATE TRIGGER "deleteUser" AFTER DELETE ON public."Users" FOR EACH ROW EXECUTE FUNCTION public."deleteMsg"();
 -   DROP TRIGGER "deleteUser" ON public."Users";
       public          postgres    false    210    217            }           2620    16470    Users updateTrigger    TRIGGER     r   CREATE TRIGGER "updateTrigger" AFTER UPDATE ON public."Users" FOR EACH ROW EXECUTE FUNCTION public."updateMsg"();
 0   DROP TRIGGER "updateTrigger" ON public."Users";
       public          postgres    false    220    210            v           2606    16471    ProgressCourses idCourse    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProgressCourses"
    ADD CONSTRAINT "idCourse" FOREIGN KEY (id_course) REFERENCES public."Courses"(id_course);
 F   ALTER TABLE ONLY public."ProgressCourses" DROP CONSTRAINT "idCourse";
       public          postgres    false    204    200    2909            z           2606    16476    Tasks idCourse    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "idCourse" FOREIGN KEY (id_course) REFERENCES public."Courses"(id_course) NOT VALID;
 <   ALTER TABLE ONLY public."Tasks" DROP CONSTRAINT "idCourse";
       public          postgres    false    200    2909    208            u           2606    16481    Courses idDifficulty    FK CONSTRAINT     �   ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "idDifficulty" FOREIGN KEY (id_difficulty) REFERENCES public."DifficultyCourses"(id_difficulty) NOT VALID;
 B   ALTER TABLE ONLY public."Courses" DROP CONSTRAINT "idDifficulty";
       public          postgres    false    2913    202    200            x           2606    16486    ProgressTasks idTask    FK CONSTRAINT     ~   ALTER TABLE ONLY public."ProgressTasks"
    ADD CONSTRAINT "idTask" FOREIGN KEY (id_task) REFERENCES public."Tasks"(id_task);
 B   ALTER TABLE ONLY public."ProgressTasks" DROP CONSTRAINT "idTask";
       public          postgres    false    206    2921    208            y           2606    16491    ProgressTasks idUser    FK CONSTRAINT        ALTER TABLE ONLY public."ProgressTasks"
    ADD CONSTRAINT "idUser" FOREIGN KEY (id_user) REFERENCES public."Users"("idUser");
 B   ALTER TABLE ONLY public."ProgressTasks" DROP CONSTRAINT "idUser";
       public          postgres    false    210    2923    206            w           2606    16496    ProgressCourses idUser    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProgressCourses"
    ADD CONSTRAINT "idUser" FOREIGN KEY (id_user) REFERENCES public."Users"("idUser");
 D   ALTER TABLE ONLY public."ProgressCourses" DROP CONSTRAINT "idUser";
       public          postgres    false    210    2923    204                �   x��;�@Dc�{ 5R�`�<���*����H��(��|��s#{v50�L����`�0�WY�
8��ٶ�m<��Q���5Uk���M��X��'��<��:4�3����tl��d��|��U_%�0���ʲ�D+�7�u��]��8�(��dc��ke�с�1���4W� %N�'Ys�+��'!J@�1sJ�0����p�5��Ţ�����_����1w��_�            x�3�tM,��2��MM�,������ =p-            x�3�45�4�,�21L��=... +{         5   x��� 0�7S��a:F�W�R%)O�	��B�1d�E�q��F��U���	         �
  x��Y[o�~�~ń  )^ӡdم��}*�n�AvX�M�ܢ(�Tlǐ"5F����h��PW�xY����s�sfwf�T� -G��ٙs��w.�T���+�{����;0iۤo� mۑ�ڱTj��YZk�j��by��T�[���G��&vl�c�O����^�f�=�-�u� ���ׄ���J��H�ځ������y'=4$�]~F+�CWo�o�v�����֛-�z+���=�>P��(�;|'�eڒޢ�lB�]aM�aql{�~z����x��0+�V�[�'�@�=�D.��t��6��O�:�Gw��1�^7�z0$�i�1�ˏ!˄�A�"C��q�w��c��h����ȼ�ۋl��s��}ZwNF��crȄ�x%v+kBN��I�@|H���O���C�-�1�HB/���t�>ר�	�s��"�2U>�Ë�/���.��x�t����;�1u�ͯU�o���0յ�v;9v�G�0�cp�Q���v�9�D�j�D��	xl��p��9
/��`��_ڝ�̲T����,s���;w��x~�,P����8��_�! 5��S�OfV8z���-�9�T�d��͑1b�qD?L�Ma�9)^�C:��^r�u8�i�!�5T]<st������lY �M����
Ǫ����z�>���ޫ��+���l�a�Tj���ol�PL?\��Rd�E�~d�����gRup��G>�3�VLvg�*�$v�~�ؑ���)�c���hc0�>�N�戬�E �lL��}�:W7�V���
`��d��*�Gd�e���	���@E3���$�@�{�ɡ�!`��o`���J������+y%�/?=AP81���R��-أl؃ �ɥ�����4��Ɂ̚�������%҃QU��!��%y.n��,�q5��a��G��d!8 >y͡��J��J$ț�K�:@r.��1TR��K~@o�� ߠ,7xݓpm�Xqg-��(V��e�Z�r�8�VjO7�=ۢhr�<�9��~�1?�3	��WY��ڞ�.�����g�K<�
�������z�֚B�թ 0�#=rx�ڠX�������@�`RW����҇JCʃբK��������5��c��9�'�sX0� J_J��Oʎ���7��O��+��,�6I�����4pq�֢�{�e̝;�Y¡'rq�*�d)����a��ie�a���t�	¶gTF�r�CiW��"�4Y�+'�؆ȧZ#�+����}M��ե��;x@�Q� �C�a�̨��Z���s��ɶ��X���}�0#��-a���S�0wn�	�Ao2*!7Y���_�J8]T0��妆��N�9S@2��q��d)���]���S5�aG�\3̣�����B�������mwJ��pp��[�Z�eJD�^��Ŭ�!��9e4�L2tn$�@0�;�[�U~��̀�Bp�B� *�%��lV�F�fXw�H��ICV?�d��!k4�L���� �K�f�������C�KM�_��,^�*� ���Q��΀�)���Q������*�ē뵑�*Ϋ!��Ж�?��]4�y��52���}&H��ۛ��s�>�X���|�J�J���܍��#��l����;��������يBe���I!�x�	4�8�A'[*'tՖAh�T�ye��S���s���|W��]T%#L v��휑9�h�z�X�Ӏ  zA����6U�;ըP���A�ko�B[ҽQ�pW�E�ֿ��F����iA�	:�UM5��d-:���$e�� �Wd٘&����Rk	o�dp-��0(!�ʁ��mp.v������Ȥ�o#+��;��ULX�2�H�������Z]CJl�	�g��݋W/���z��Nff����x}msw��o��3�!��5CH5�z��-�5�+�eD)0�tDvɣ�uf:0�Cz���A�B���e<���x%�s����nU�:6�C���8�I{��2�7�g58IF�W���]�Ot��(�$���[�g�P�f�p�b&�}8~�c�fT3%UJ�?�1�Z�夔�6H��纫�=���2%�6���������f˼\F��!D�ax�?81�w�N!��78���o�߹�w<5����T>y�z����2/�7[��rc�.Mmgw}{72�~��|swq��ek��f�;мC��Ҧ>ХA�
��M�=�����A��/Ii���F�<�j���Pƞ��N9��8e��>lX��T�2'����D&�$k�
Bⷂ^�-u,צ��!R��˟M��}�(Y{g��yV����f��eW(jI�Dԥ��l,u�����r���F͍Φ4k����_<���K4��$�Pq��0jQ:�=�{�&� 2��eɲ�r��f���8�a-!���r�b�����W�kv�$sF8}�.�'���lɿg�r��G9҅��Z�y�5fcuvX���$Q"1�'�S�(v�������8�%�$��N��=�-�b¾��cOT�!�0y�Ϻ�eá���ABO�x��+���MZ��PN�p/�P�jr�2@7���C�(;m�}Kv�φ�:���u�'(�/ ,�N�dR�r{��@hC���o �Iο�Y� g�Hlw�����ŵj}�Y����/4���      
   �  x���Ɏ�@�<���b*��U&-A��l(d����%�����,���9��ٜ���<Q߹Kn����\�L|4����0XjAgQ�C#��R�s�����;������fy�&��F�*������Aߊ�%��3!�V�����|MB�U�ȷ'�4��W�x��LO{��7����)R�8�Jy4J�}�Ec󳼡�Tݲ5[\C��&U/�H$���x��6��g6��F�MW �ӊor��C��C&<�6�%��	xv4�M����:��Ϳ��������N�����I;��D<
�ɭދ�ܓY�yy�+���laچ`���,j7�{���V"��
L}�:m���Y�W�5[�	�t�����po��fF[&�ӞR����5y]hD!�U�>}�6��a_(8M��ʕ;�7��50�#ꛦ(�=��         C   x�3�420��74�74�7 ����Ē���Ԣ���Ĝ������������< �����i����� e��         &  x�u�;N1��z��-�ى�t :*��q�+��b�+�����|�:ݝ��z����s]?�cb��|�z��)�ȭD-��W4���mhk�]���}T�܋U�+��:=o��S��N@�,K���Ľ�9�Q.F�*B�̀L�@��c�0y�>P��%��ms��S����_����=�i^ �ڜ�I/$�����#,s-lZ0\	5�A"���m�^5K���5�FBX��wڜh�T.�������	H�c��3�p��V8I%�"T�NJ�^���y�����     