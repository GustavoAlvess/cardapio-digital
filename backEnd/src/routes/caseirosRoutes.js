// src/routes/boloRoutes.js

import { Router } from "express";
// Importe o novo nome do controller
import * as caseirosController from './../controllers/caseirosController.js'

const router = Router();

// -----------------------------------------------------
// ROTAS DE BUSCA E PESQUISA
// -----------------------------------------------------

// Rota de Pesquisa por Nome (Deve vir antes do /:id para evitar conflito)
// Ex: GET /caseiross/search?nome=cenoura
router.get("/", caseirosController.pesquisarPorNome);
router.get("/:id", caseirosController.listarUm);
router.put("/:id/disponibilidade", caseirosController.atualizarDisponibilidade); 
router.get("/", caseirosController.listarTodos);
//router.post("/", boloController.criarBolo); // Adapte o nome da função
//router.delete("/:id", boloController.apagarBolo); // Adapte o nome da função
//router.put("/:id", boloController.atualizarBolo); // Adapte o nome da função

export default router;