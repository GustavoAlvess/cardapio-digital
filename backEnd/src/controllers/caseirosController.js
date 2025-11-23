
import * as caseirosModel from '../models/caseirosModel.js'; 


export const listarTodos = async (req, res) => {
    try {
        // Chama a função do Model que busca todos os registros (disponíveis e indisponíveis)
        const bolos = await caseirosModel.findAll();
        const total = bolos.length;

        if (total === 0) {
            return res.status(404).json({
                total,
                mensagem: "Não há bolos cadastrados.",
                bolos: [],
            });
        }

        // Retorna a lista completa para o frontend do administrador (JSON)
        return res.status(200).json({
            total,
            mensagem: "Lista completa de bolos para administração",
            bolos,
        });

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
            status: 500,
        });
    }
};


export const listarUm = async (req, res) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    try {
        const bolo = await caseirosModel.findById(id);

        if (!bolo) {
            return res.status(404).json({
                mensagem: `Bolo com ID ${id} não encontrado.`,
                bolo: null,
            });
        }

        return res.status(200).json({
            mensagem: "Bolo encontrado",
            bolo,
        });
    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
            status: 500,
        });
    }
};


export const pesquisarPorNome = async (req, res) => {
    const { nome } = req.query;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ error: 'O termo de pesquisa "nome" é obrigatório.' });
    }

    try {
        const bolos = await caseirosModel.searchByName(nome);
        const total = bolos.length;

        if (total === 0) {
            return res.status(404).json({
                total,
                mensagem: `Nenhum bolo encontrado com o nome contendo: "${nome}".`,
                bolos,
            });
        }

        return res.status(200).json({
            total,
            mensagem: `Lista de bolos encontrados para "${nome}"`,
            bolos,
        });

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
            status: 500,
        });
    }
};

export const atualizarDisponibilidade = async (req, res) => {
    const { id } = req.params;
    const { disponivel } = req.body;

    if (isNaN(parseInt(id)) || typeof disponivel !== 'boolean') {
        return res.status(400).json({ error: 'ID inválido ou status "disponivel" obrigatório e booleano.' });
    }

    try {
        const boloAtualizado = await caseirosModel.updateDisponibilidade(id, disponivel);
        
        return res.status(200).json({
            mensagem: `Disponibilidade do bolo ${id} atualizada.`,
            bolo: boloAtualizado,
        });
        
    } catch (error) {
        // P2025 é o erro do Prisma para registro não encontrado
        if (error.code === 'P2025') { 
            return res.status(404).json({ error: `Bolo com ID ${id} não encontrado.` });
        }
        return res.status(500).json({ 
            erro: "Erro interno de servidor", 
            detalhes: error.message 
        });
    }
};
