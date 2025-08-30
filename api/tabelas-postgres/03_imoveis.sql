-- Script PostgreSQL para tabela imoveis
-- Removido USE websiteInfo; (PostgreSQL usa conexão direta)
-- ENUM convertido para CHECK constraints

CREATE TABLE IF NOT EXISTS imoveis (
    imoveisID SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    cep VARCHAR(15) NOT NULL,
    quartos INTEGER NOT NULL, 
    banheiros INTEGER NOT NULL,
    descricao TEXT NOT NULL,
    preco_venda DECIMAL(10, 2) DEFAULT 0,
    preco_aluguel DECIMAL(10, 2) DEFAULT 0,
    tamanho DECIMAL(10, 2) DEFAULT 0,
    qualidade DECIMAL(3, 1) CHECK (qualidade <= 5.0),
    disponibilidade VARCHAR(20) NOT NULL CHECK (disponibilidade IN ('venda', 'aluguel', 'venda_e_aluguel')),
    consultorId INTEGER,
    FOREIGN KEY (consultorId) REFERENCES consultores (consultorId),
    condominio DECIMAL(10, 2) DEFAULT 0,
    iptu DECIMAL(5, 2) DEFAULT 0,
    seguro_incendio DECIMAL(5, 2) DEFAULT 0,
    taxa_de_servicos DECIMAL(5, 2) DEFAULT 0,
    vagas INTEGER NOT NULL,
    mobiliado VARCHAR(20) DEFAULT NULL CHECK (mobiliado IN ('mobiliado')),
    maps VARCHAR(1000) DEFAULT NULL,
    video VARCHAR(1000) NOT NULL,
    foto VARCHAR (255),
    itens VARCHAR(255)
);

INSERT INTO imoveis (consultorId, tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, tamanho, qualidade, disponibilidade, condominio, iptu, seguro_incendio, taxa_de_servicos, vagas, maps, video, foto, itens ) 
VALUES 
(1, 'Casa', 'Rua das Flores', '123', 'Centro', 'São Paulo', '01000-000', 4, 3,
'Casa incrível com 4 quartos e 3 banheiros. Espaçosa e bem iluminada. Localizada no coração da cidade.', 
500000.00, 250, 3.5, 'venda', 300, 90, 30, 60, 2, 'https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d3657.1590192474555!2d-46.340128532241266!3d-23.562731617974467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e0!4m0!4m3!3m2!1d-23.5592945!2d-46.3328061!5e0!3m2!1spt-BR!2sbr!4v1725302541785!5m2!1spt-BR!2sbr', 'https://www.youtube.com/embed/5XgVHGP5K_g?si=VVUnIlcNflDtIaMW', 'imagens-imovel/foto1.jpg', 'Chuveiro a gás, Cortinas e persianas instaladas, Piso de madeira, Varanda gourmet com churrasqueira, Teto rebaixado com iluminação embutida');

INSERT INTO imoveis (consultorId, tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, tamanho, qualidade, disponibilidade, condominio, iptu, seguro_incendio, taxa_de_servicos, vagas, mobiliado, maps, video, foto, itens) 
VALUES 
(2, 'Apartamento', 'Avenida Atlântica', '456', 'Copacabana', 'Rio de Janeiro', '22000-000', 3, 2,
'Espetacular apartamento de frente para o mar, com 3 quartos e 2 banheiros. Totalmente mobiliado e decorado.', 
800000.00, 10000, 350, 5.0, 'venda_e_aluguel', 400, 80, 25, 50, 1, 'mobiliado', 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d4451.82232517453!2d-43.293543288293385!3d-23.009272541456514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x9bd0d7d7ab187b%3A0x95e9369b0e1ddb4b!2sR.%20Prof.%20J%C3%BAlio%20Lohman%2C%2016%20-%20Jo%C3%A1%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022611-170!3m2!1d-23.0092775!2d-43.290963!5e1!3m2!1spt-BR!2sbr!4v1725304278918!5m2!1spt-BR!2sbr', 'https://www.youtube.com/embed/_vF0LgFTuE0?si=MkM7-wpCJKgqmCDi', 'imagens-imovel/foto2.jpg', 'Box, Armários no quarto, Armários nos banheiros, Armários na cozinha, Ar condicionado, Fogão incluso,Geladeira inclusa, Quartos e corredores com portas amplas');

INSERT INTO imoveis (consultorId, tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_aluguel, tamanho, qualidade, disponibilidade, condominio, iptu, seguro_incendio, taxa_de_servicos, vagas, maps, video, foto, itens) 
VALUES 
(3, 'Casa', 'Rua das Palmeiras', '789', 'Barra da Tijuca', 'Rio de Janeiro', '23000-000', 3, 2,
'Casa charmosa com 3 quartos e 2 banheiros. Área externa com jardim e churrasqueira.', 
8000, 100, 3.0, 'aluguel', 250, 75, 35, 55, 1, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.100782349669!2d-46.6873121!3d-23.5648236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce579e4d026025%3A0x310b7e05dbaf0a81!2sR.%20Sebasti%C3%A3o%20Velho%2C%2057%20-%20Pinheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005418-040!5e0!3m2!1spt-BR!2sbr!4v1721154054284!5m2!1spt-BR!2sbr', 'https://www.youtube.com/embed/vrLSiAbdXb4?si=dYojFsyFHVA5Ei3l', 'imagens-imovel/foto3.jpg', 'Aquecimento central, Janela com isolamento acústico, Painéis solares instalados, Piscina privativa, Closet planejado');

INSERT INTO imoveis (consultorId, tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_aluguel, tamanho, qualidade, disponibilidade, condominio, iptu, seguro_incendio, taxa_de_servicos, vagas, mobiliado, maps, video, foto, itens) 
VALUES 
(4, 'Apartamento', 'Rua dos Girassóis', '101', 'Pinheiros', 'São Paulo', '05000-000', 2, 1,
'Apartamento aconchegante com 2 quartos e 1 banheiro. Próximo a mercados e restaurantes.', 
2000.00, 90, 4.0, 'aluguel', 333, 55, 45, 65, 1, 'mobiliado', 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d7314.98652973859!2d-46.69133518296786!3d-23.55072147965415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x94ce579411951ee7%3A0xb6ee558733936640!2sR.%20Abegoaria%20-%20Jardim%20das%20Bandeiras%2C%20S%C3%A3o%20Paulo%20-%20SP!3m2!1spt-BR!2sbr!4v1725302922157!5m2!1spt-BR!2sbr', 'https://www.youtube.com/embed/rRQIbucaMyw?si=XI-ByDNivsnQNo92', 'imagens-imovel/foto4.jpg', 'Chuveiro a gás, Cortinas e persianas instaladas, Piso de madeira, Varanda gourmet com churrasqueira, Teto rebaixado com iluminação embutida');

INSERT INTO imoveis (consultorId, tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, tamanho, qualidade, disponibilidade, condominio, iptu, seguro_incendio, taxa_de_servicos, vagas, mobiliado, maps, video, foto, itens) 
VALUES 
(5, 'Casa', 'Rua das Acácias', '456', 'Botafogo', 'Rio de Janeiro', '21000-000', 5, 4,
'Casa espaçosa e confortável com 5 quartos e 4 banheiros. Área externa com piscina e churrasqueira.', 
700000.00, NULL, 300, 5.0, 'venda', 425, 33, 47, 85, 4, 'mobiliado', 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d4452.788554922014!2d-43.474786988294206!3d-22.979971740405585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x9bdd77b0273f43%3A0x3281323ed4ae368b!2sR.%20Bela%20Floresta%2C%20555%20-%20Vargem%20Pequena%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022783-500!3m2!1d-22.979976699999998!2d-43.4722067!5e1!3m2!1spt-BR!2sbr!4v1725304180143!5m2!1spt-BR!2sbr', 'https://www.youtube.com/embed/ldv2b0JYonk?si=XNZCxZdCRqGQkfEy', 'imagens-imovel/foto5.jpg', 'Box, Armários no quarto, Armários nos banheiros, Armários na cozinha, Ar condicionado, Fogão incluso,Geladeira inclusa, Quartos e corredores com portas amplas');

INSERT INTO imoveis (consultorId, tipo, endereco, numero, bairro, cidade, cep, quartos, banheiros, descricao, preco_venda, preco_aluguel, tamanho, qualidade, disponibilidade, condominio, iptu, seguro_incendio, taxa_de_servicos, vagas, mobiliado, maps, video, foto, itens) 
VALUES 
(3, 'Apartamento', 'Avenida Paulista', '789', 'Bela Vista', 'São Paulo', '01300-000', 1, 1,
'Ótimo apartamento de 1 quarto e 1 banheiro. Próximo ao metrô e comércios.', 
400000.00, 15000, 200, 4.5, 'venda_e_aluguel', 450, 44, 26, 68, 2, 'mobiliado', 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d58512.963475181925!2d-46.62357668338298!3d-23.56628067521757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x94ce5ea7b7131133%3A0xf21e5fa75e44b58f!2sR.%20Natal%2C%20821%20-%20Vila%20Bertioga%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003186-030!3m2!1d-23.5663648!2d-46.5822913!5e0!3m2!1spt-BR!2sbr!4v1725302994827!5m2!1spt-BR!2sbr', 'https://www.youtube.com/embed/Qq4uTVvxb8s?si=9dRUuPvBq8PWlVRO', 'imagens-imovel/foto6.jpg',  'Aquecimento central, Janela com isolamento acústico, Painéis solares instalados, Piscina privativa, Closet planejado');
