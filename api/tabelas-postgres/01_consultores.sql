-- Script PostgreSQL para tabela consultores
-- Removido USE websiteInfo; (PostgreSQL usa conexão direta)

CREATE TABLE IF NOT EXISTS consultores (
  consultorId SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  consultor_email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  cpf VARCHAR(50) NOT NULL,
  telefone VARCHAR(25) NOT NULL,
  tipo VARCHAR(25) NOT NULL,
  sobre VARCHAR(500) NOT NULL,
  whatsApp VARCHAR(25),
  foto VARCHAR(255)
);

INSERT INTO consultores (nome, consultor_email, senha, cpf, telefone, tipo, sobre, whatsApp, foto) 
VALUES ('Roberto', 'ralves@gmail.com', '123456', '85923791256', '1135694523', 'consultor', 'Especialista em marketing de conteúdo, com paixão por storytelling e criação de conteúdo de alta qualidade.', '11953486834', 'imagens/foto1.jpg');

INSERT INTO consultores (nome, consultor_email, senha, cpf, telefone, tipo, sobre, whatsApp, foto)
VALUES ('Jose', 'esoj@gmail.com', 'senha123', '12345678987', '1125459687', 'consultor', 'Especialista em transformação digital, auxiliando empresas a otimizarem seus processos e adotarem novas tecnologias', '11948695738', 'imagens/foto2.jpg');

INSERT INTO consultores (nome, consultor_email, senha, cpf, telefone, tipo, sobre, whatsApp, foto)
VALUES ('Alana', 'anala@gmail.com', '543210', '76814682347', '1145897563', 'consultor', 'Especialista em gestão de talentos, auxiliando empresas a atrair, desenvolver e reter os melhores profissionais. ', '11967896547', 'imagens/foto3.jpg');

INSERT INTO consultores (nome, consultor_email, senha, cpf, telefone, tipo, sobre, whatsApp, foto)
VALUES ('Milton', 'notlim@gmail.com', '987654', '98765432146', '1136548978', 'consultor', 'Especialista em gestão de riscos, auxiliando empresas a identificar e mitigar riscos em suas operações.', '11936547826', 'imagens/foto4.jpg');

INSERT INTO consultores (nome, consultor_email, senha, cpf, telefone, tipo, sobre, whatsApp, foto)
VALUES ('Larissa', 'assiral@gmail.com', '658743', '874563218794', '2145632675', 'consultor', 'Consultora de recursos humanos com foco em desenvolvimento de pessoas e cultura organizacional. Possui experiência em recrutamento, seleção, treinamento e avaliação de desempenho.', '21985867432', 'imagens/foto5.jpg');
