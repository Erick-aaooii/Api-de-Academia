import { PrismaClient } from "../../../generated/prisma";
import { CreateAlunoDto } from "../../../models/Aluno";

const prisma = new PrismaClient();

export const createAluno = async(data: CreateAlunoDto) => {
    const { tiposTreinoIds, ...alunoFields } = data;
  
    const newAluno = await prisma.aluno.create({
      data: {
        ...alunoFields,
        dataNascimento: new Date(alunoFields.dataNascimento),
        tiposTreino: {
          create: tiposTreinoIds.map((treinoId) => ({
            tipodeTreinoId: treinoId
          })),
        },
      },
      include: {
        tiposTreino: true
      }
    });
  
    return newAluno;
  }

  export const deleteAluno = async (id: number, email: string) => {
    const aluno = await prisma.aluno.findUnique({
      where: { id: id }
    });
  
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
  
    if (aluno.email !== email) {
      throw new Error('Email não corresponde ao aluno');
    }
  
  const deletedAluno = await prisma.aluno.delete({
      where: {
        id: id,
        email: email
      }
    });
    
    return deletedAluno;
  }

  const updateAluno = async (id: number, email: string, updateData: Partial<CreateAlunoDto>) => {
    const aluno = await prisma.aluno.findUnique({
      where: { id }
    });
  
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
  
    if (aluno.email !== email) {
      throw new Error('Email não corresponde ao aluno');
    }
  
    const updatedAluno = await prisma.aluno.update({
      where: { id },
      data: updateData
    });
  
    return updatedAluno;
  }

  export const getAluno = async (id: number) => {
    const aluno = await prisma.aluno.findUnique({
      where: { id }
    });
  
    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }
  
    return aluno;
  }
  
  export const getAllAlunos = async () => {
    const alunos = await prisma.aluno.findMany({
      include: { tiposTreino: true }
    });
    return alunos;
  };
  
  export const getAlunoByEmail = async (email: string) => {
    const aluno = await prisma.aluno.findUnique({
      where: { email },
      include: { tiposTreino: true }
    });
  
    if (!aluno) {
      throw new Error('Aluno não encontrado pelo email');
    }
  
    return aluno;
  };
  
  export const getAlunosPorNome = async (nome: string) => {
    const alunos = await prisma.aluno.findMany({
      where: {
        nome: {
          contains: nome,
        }
      },
      include: { tiposTreino: true }
    });
  
    return alunos;
  };
  
  export const getAlunosPaginados = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
  
    const alunos = await prisma.aluno.findMany({
      skip,
      take: limit,
      include: { tiposTreino: true }
    });
  
    return alunos;
  };
  