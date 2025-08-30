-- Script PostgreSQL para tabela favoritos
-- Removido USE websiteInfo; (PostgreSQL usa conexão direta)
-- INT convertido para INTEGER

CREATE TABLE IF NOT EXISTS favoritos (
    clienteID INTEGER,
    imovelID INTEGER,
    PRIMARY KEY (clienteID, imovelID),
    FOREIGN KEY (clienteID) REFERENCES clientes(clienteId) ON DELETE CASCADE,
    FOREIGN KEY (imovelID) REFERENCES imoveis(imoveisID) ON DELETE CASCADE
);
