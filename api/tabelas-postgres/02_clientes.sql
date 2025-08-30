-- Script PostgreSQL para tabela clientes
-- Removido USE websiteInfo; (PostgreSQL usa conexão direta)

CREATE TABLE IF NOT EXISTS clientes (
  clienteId SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  cpf VARCHAR(50) NOT NULL,
  celular VARCHAR(25) NOT NULL,
  comentario VARCHAR(500),
  foto_perfil VARCHAR(255)
);

INSERT INTO clientes (nome, email, senha, cpf, celular, comentario, foto_perfil ) 
VALUES ('James', 'teste@gmail.com', '456713', '85674231856', '11953578434', 'A corretora foi IMPECÁVEL! Super atenciosa e verdadeira! Estava total a disposição para que conseguíssemos conquistar nossa casinha!', 'imagens/foto1.jpg');

INSERT INTO clientes (nome, email, senha, cpf, celular, comentario, foto_perfil ) 
VALUES ('Lara', 'teste02@gmail.com', '987654', '96854713264', '17963145278', 'Experiência impecável com a corretora! Ela me acompanhou de perto em cada etapa da compra, desde a busca pelo imóvel ideal até a assinatura do contrato. Sua atenção e profissionalismo foram fundamentais para a realização do meu sonho', 'imagens/foto2.jpg');

INSERT INTO clientes (nome, email, senha, cpf, celular, comentario, foto_perfil ) 
VALUES ('Oscar', 'teste06@gmail.com', '654321', '78956321406', '21915748953', 'Encontrei na corretora a parceira ideal para a compra do meu imóvel! Ela me deu total segurança e tranquilidade durante todo o processo, com um atendimento impecável e um conhecimento profundo do mercado imobiliário. Sou muito grato por sua ajuda!', 'imagens/foto3.jpg');
