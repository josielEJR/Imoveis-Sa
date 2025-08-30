// Configuração da API baseada no ambiente
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://imoveis-sa.onrender.com/api'  // Produção
    : 'http://localhost:3001/api';            // Desenvolvimento

// URLs da API
export const API_URLS = {
    // Base
    BASE: API_BASE_URL,
    
    // Consultores
    CONSULTORES: `${API_BASE_URL}/consultores`,
    CONSULTORES_BUSCA: `${API_BASE_URL}/consultores/busca`,
    CONSULTORES_BUSCAR_ID: `${API_BASE_URL}/consultores/buscarconsultorid`,
    CONSULTORES_IMAGEM: `${API_BASE_URL}/consultores/imagensconsultores`,
    
    // Clientes
    CLIENTES: `${API_BASE_URL}/clientes`,
    CLIENTES_LOGIN: `${API_BASE_URL}/clientes/login`,
    CLIENTES_CADASTRAR: `${API_BASE_URL}/clientes/cadastrar`,
    CLIENTES_BUSCA: `${API_BASE_URL}/clientes/busca`,
    CLIENTES_IMAGEM: `${API_BASE_URL}/clientes/imagensclientes`,
    
    // Imóveis
    IMOVEIS: `${API_BASE_URL}/imoveis`,
    IMOVEIS_BUSCA: `${API_BASE_URL}/imoveis/busca`,
    IMOVEIS_ADICIONAR: `${API_BASE_URL}/imoveis/adicionar`,
    IMOVEIS_BUSCAR_ID: `${API_BASE_URL}/imoveis/buscarimovelid`,
    IMOVEIS_ORDENAR_QUALIDADE: `${API_BASE_URL}/imoveis/ordenarimovelqualidade`,
    IMOVEIS_CIDADES: `${API_BASE_URL}/imoveis/cidades`,
    IMOVEIS_CIDADES_VENDA: `${API_BASE_URL}/imoveis/cidadesvenda`,
    IMOVEIS_CIDADES_ALUGUEL: `${API_BASE_URL}/imoveis/cidadesaluguel`,
    IMOVEIS_VENDA: `${API_BASE_URL}/imoveis/venda`,
    IMOVEIS_ALUGUEL: `${API_BASE_URL}/imoveis/aluguel`,
    IMOVEIS_POR_CONSULTOR: `${API_BASE_URL}/imoveis/porConsultor`,
    IMOVEIS_IMAGEM: `${API_BASE_URL}/imoveis/imagensimovel`,
    IMOVEIS_FAVORITOS: `${API_BASE_URL}/imoveis/favoritos`,
    IMOVEIS_ADICIONAR_FAVORITO: `${API_BASE_URL}/imoveis/adicionarimovelfavorito`,
    IMOVEIS_REMOVER_FAVORITO: `${API_BASE_URL}/imoveis/removerimovelfavorito`,
    
    // Visitas
    VISITAS: `${API_BASE_URL}/visita/visitas`,
    VISITAS_GET_CONSULTORES: `${API_BASE_URL}/visita/getconsultores`,
    VISITAS_AGENDAR: `${API_BASE_URL}/visita/agendarvisita`,
    
    // Health Check
    HEALTH: `${API_BASE_URL}/health`,
};

// Função helper para construir URLs com parâmetros
export const buildUrl = (baseUrl, params = {}) => {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
};

export default API_URLS;
