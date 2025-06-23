import { Router } from "express";
import {
    createAluno,
    deleteAluno,
    getAllAlunos,
    getAlunoByEmail,
    getAlunoById,
    getAlunosPaginados,
    getAlunosPorNome,
    updateAluno,
  } from "../controllers/AlunoControllers";
  

const route = Router();

route.post("/", createAluno);
route.get("/", getAllAlunos);
route.get("/search", getAlunosPorNome);
route.get("/pagination", getAlunosPaginados);
route.get("/email/:email", getAlunoByEmail);
route.get("/:id", getAlunoById);
route.put("/:id", updateAluno);
route.delete("/:id", deleteAluno);

export default route;