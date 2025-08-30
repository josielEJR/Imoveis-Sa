-- Script PostgreSQL para tabela visitas
-- Removido USE websiteInfo; (PostgreSQL usa conexão direta)
-- DATETIME convertido para TIMESTAMP

CREATE TABLE IF NOT EXISTS visitas (
    visitaId SERIAL PRIMARY KEY,
    clienteId INTEGER NULL,
    imoveisID INTEGER NOT NULL,
    consultorId INTEGER NOT NULL,
    data_visita TIMESTAMP NOT NULL,
    comentario VARCHAR(250) NULL,
    FOREIGN KEY (clienteId) REFERENCES clientes(clienteId),
    FOREIGN KEY (imoveisID) REFERENCES imoveis(imoveisID),
    FOREIGN KEY (consultorId) REFERENCES consultores(consultorId)
);
