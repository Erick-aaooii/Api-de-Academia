import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export const createAluno = async (req: Request, res: Response) => {
  try {
    const { tiposTreinoIds, ...alunoFields } = req.body;

    const newAluno = await prisma.aluno.create({
      data: {
        ...alunoFields,
        dataNascimento: new Date(alunoFields.dataNascimento),
        tiposTreino: {
          create: tiposTreinoIds.map((treinoId: number) => ({
            tipodeTreinoId: treinoId
          })),
        },
      },
      include: { tiposTreino: true }
    });

    res.status(201).json(newAluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar aluno", details: error });
  }
};

export const getAlunoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const aluno = await prisma.aluno.findUnique({
      where: { id },
      include: { tiposTreino: true }
    });

    if (!aluno) {
      res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno", details: error });
  }
};

export const getAllAlunos = async (_req: Request, res: Response) => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: { tiposTreino: true }
    });

    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos", details: error });
  }
};

export const updateAluno = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { email, ...updateData } = req.body;

    const aluno = await prisma.aluno.findUnique({
      where: { id }
    });

    if (!aluno) {
      res.status(404).json({ error: "Aluno não encontrado" });
    }

    if (aluno?.email !== email) {
      res.status(400).json({ error: "Email não corresponde ao aluno" });
    }

    const updatedAluno = await prisma.aluno.update({
      where: { id },
      data: updateData
    });

    res.status(200).json(updatedAluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno", details: error });
  }
};

export const deleteAluno = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { email } = req.body;

    const aluno = await prisma.aluno.findUnique({
      where: { id }
    });

    if (!aluno) {
      res.status(404).json({ error: "Aluno não encontrado" });
    }

    if (aluno?.email !== email) {
      res.status(400).json({ error: "Email não corresponde ao aluno" });
    }

    await prisma.aluno.delete({
      where: { id }
    });

    res.status(200).json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar aluno", details: error });
  }
};

export const getAlunoByEmail = async (req: Request, res: Response) => {
    try {
      const email = String(req.params.email);
  
      const aluno = await prisma.aluno.findUnique({
        where: { email },
        include: { tiposTreino: true }
      });
  
      if (!aluno) {
        res.status(404).json({ error: "Aluno não encontrado pelo email" });
      }
  
      res.status(200).json(aluno);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar aluno por email", details: error });
    }
  };
  
  export const getAlunosPorNome = async (req: Request, res: Response) => {
    try {
      const nome = String(req.query.nome);
  
      const alunos = await prisma.aluno.findMany({
        where: {
          nome: {
            contains: nome,
          }
        },
        include: { tiposTreino: true }
      });
  
      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar alunos por nome", details: error });
    }
  };
  
  export const getAlunosPaginados = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const alunos = await prisma.aluno.findMany({
        skip,
        take: limit,
        include: { tiposTreino: true }
      });
  
      res.status(200).json(alunos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar alunos paginados", details: error });
    }
  };