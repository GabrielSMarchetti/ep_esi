import { Entity, Column, PrimaryColumn } from 'typeorm';
import { CourseTypes } from '../enums/CourseTypes';

@Entity()
export class Student {
    
    @PrimaryColumn({ unique: true })
    numeroUSP: string;

    @Column()
    nomeCompleto: string;

    @Column()
    email: string;

    @Column()
    dataNascimento: Date;

    @Column()
    rg: string;

    @Column()
    localNascimento: string;

    @Column()
    nacionalidade: string;

    @Column()
    curso: CourseTypes;

    @Column()
    orientador: string;

    @Column()
    linkLattes: string;

    @Column()
    dataMatricula: Date;

    @Column({ nullable: true })
    dataAprovacaoExameQualificacao: Date;

    @Column({ nullable: true })
    dataAprovacaoExameProficiencia: Date;

    @Column()
    dataLimiteDepositoTrabalhoFinal: Date;

    @Column("simple-array")
    disciplinasCursadasAprovadas: string[];

    @Column("simple-array")
    disciplinasCursadasReprovadas: string[];

    constructor(
    numeroUSP: string, nomeCompleto: string,
    email: string, dataNascimento: Date,
    rg: string, localNascimento: string,
    nacionalidade: string, curso: CourseTypes,
    orientador: string, linkLattes: string,
    dataMatricula: Date, dataAprovacaoExameQualificacao: Date,
    dataAprovacaoExameProficiencia: Date, dataLimiteDepositoTrabalhoFinal: Date,
    disciplinasCursadasAprovadas: string[], disciplinasCursadasReprovadas: string[]) {
        this.numeroUSP = numeroUSP;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.rg = rg;
        this.localNascimento = localNascimento;
        this.nacionalidade = nacionalidade;
        this.curso = curso;
        this.orientador = orientador;
        this.linkLattes = linkLattes;
        this.dataMatricula = dataMatricula;
        this.dataAprovacaoExameQualificacao = dataAprovacaoExameQualificacao;
        this.dataAprovacaoExameProficiencia = dataAprovacaoExameProficiencia;
        this.dataLimiteDepositoTrabalhoFinal = dataLimiteDepositoTrabalhoFinal;
        this.disciplinasCursadasAprovadas = disciplinasCursadasAprovadas;
        this.disciplinasCursadasReprovadas = disciplinasCursadasReprovadas;
    }
}