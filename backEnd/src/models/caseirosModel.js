// src/models/boloModel.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); // Assumindo que você inicializa o prisma aqui

export const findAll = async () => {
    // Nota: O model 'aluno' deve ser alterado para 'boloCaseiro'
    return await prisma.boloCaseiro.findMany({
        orderBy: { nome: 'asc' },
        // Removi 'include' pois os bolos não têm 'fotos' e 'mensagens' no model BoloCaseiro
    });
};


export const findById = async (id) => {
    return await prisma.boloCaseiro.findUnique({
        where: { id: parseInt(id) },
    });
};


export const searchByName = async (nome) => {
    return await prisma.boloCaseiro.findMany({
        where: {
            nome: {
                contains: nome,
                mode: 'insensitive', // Pesquisa sem diferenciar maiúsculas/minúsculas
            },
        },
        orderBy: { nome: 'asc' },
    });
};

// Se você precisar de findById com disponibilidade
export const updateDisponibilidade = async (id, disponivel) => {
    return await prisma.boloCaseiro.update({
        where: { id: parseInt(id) },
        data: { disponivel: disponivel },
    });
};