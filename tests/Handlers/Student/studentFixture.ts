import { Student } from "../../../src/entities/Student";
import { CourseTypes } from "../../../src/enums/CourseTypes";


export const studentFixture: Student = {
    num_usp: '123456',
    nomeCompleto: 'John Doe',
    email: 'john.doe@example.com',
    dataNascimento: new Date('1990-01-01'),
    rg: '123456789',
    localNascimento: 'City, State',
    nacionalidade: 'Brazilian',
    curso: CourseTypes.MASTER,
    orientador: 'mentor123',
    linkLattes: "",
    dataMatricula: new Date('1990-01-01'),
    dataAprovacaoExameQualificacao: new Date('1990-01-01'),
    dataAprovacaoExameProficiencia: new Date('1990-01-01'),
    dataLimiteDepositoTrabalhoFinal: new Date('1990-01-01'),
    disciplinasCursadasAprovadas: [],
    disciplinasCursadasReprovadas: []
};

export const studentFixture2: Student = {
    num_usp: '12345656',
    nomeCompleto: 'John Doe',
    email: 'john.doe@example.com',
    dataNascimento: new Date('1990-01-01'),
    rg: '123456789',
    localNascimento: 'City, State',
    nacionalidade: 'Brazilian',
    curso: CourseTypes.MASTER,
    orientador: 'mentor1234',
    linkLattes: "",
    dataMatricula: new Date('1990-01-01'),
    dataAprovacaoExameQualificacao: new Date('1990-01-01'),
    dataAprovacaoExameProficiencia: new Date('1990-01-01'),
    dataLimiteDepositoTrabalhoFinal: new Date('1990-01-01'),
    disciplinasCursadasAprovadas: [],
    disciplinasCursadasReprovadas: []
};

export const studentFixture3: Student = {
    num_usp: '1234563',
    nomeCompleto: 'John Doe',
    email: 'john.doe@example.com',
    dataNascimento: new Date('1990-01-01'),
    rg: '123456789',
    localNascimento: 'City, State',
    nacionalidade: 'Brazilian',
    curso: CourseTypes.MASTER,
    orientador: 'mentor123',
    linkLattes: "",
    dataMatricula: new Date('1990-01-01'),
    dataAprovacaoExameQualificacao: new Date('1990-01-01'),
    dataAprovacaoExameProficiencia: new Date('1990-01-01'),
    dataLimiteDepositoTrabalhoFinal: new Date('1990-01-01'),
    disciplinasCursadasAprovadas: [],
    disciplinasCursadasReprovadas: []
};