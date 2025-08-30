-- Script PostgreSQL Completo para Imóveis SA
-- Execute este arquivo para criar todas as tabelas e inserir dados

-- 1. Criar tabela consultores
\echo 'Criando tabela consultores...'
\i 01_consultores.sql

-- 2. Criar tabela clientes
\echo 'Criando tabela clientes...'
\i 02_clientes.sql

-- 3. Criar tabela imoveis
\echo 'Criando tabela imoveis...'
\i 03_imoveis.sql

-- 4. Criar tabela visitas
\echo 'Criando tabela visitas...'
\i 04_visitas.sql

-- 5. Criar tabela imagens
\echo 'Criando tabela imagens...'
\i 05_imagens.sql

-- 6. Criar tabela favoritos
\echo 'Criando tabela favoritos...'
\i 06_favoritos.sql

\echo 'Setup completo! Todas as tabelas foram criadas e populadas.'
