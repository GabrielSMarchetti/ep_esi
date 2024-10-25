import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { CourseTypes } from '../enums/CourseTypes';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    numeroUSP: string;

    @Column()
    relatorioSemestralDeclara: string;

    @Column()
    dataAtualizacaoLattes: string;

    @Column({
        type: "enum",
        enum: ['Aprovado', 'Aprovado com ressalvas', 'Insatisfatório', 'Não se aplica (é o meu primeiro relatório)']
    })
    resultadoUltimoRelatorio: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Não se aplica (é o meu primeiro relatório)';

    @Column()
    disciplinasAprovacoes: number;

    @Column()
    disciplinasReprovacoes: number;

    @Column()
    disciplinasReprovacoesDesdeInicio: number;

    @Column({
        type: "enum",
        enum: ['Aprovado', 'Reprovado', 'Não']
    })
    exameProficienciaIdiomas: 'Aprovado' | 'Reprovado' | 'Não';

    @Column({
        type: "enum",
        enum: ['Aprovado', 'Reprovado', 'Não']
    })
    exameQualificacao: 'Aprovado' | 'Reprovado' | 'Não';

    @Column()
    prazoQualificacao: string;

    @Column()
    prazoDissertacao: string;

    @Column()
    artigosFaseEscrita: number;

    @Column()
    artigosSubmetidos: number;

    @Column()
    artigosAceitosPublicados: number;

    @Column({
        type: "enum",
        enum: ['Adequado', 'Adequado Com Ressalvas', 'Insatisfatório']
    })
    professorParecer: string;

    @Column()
    professorComentario: string;

    @Column({
        type: "enum",
        enum: ['Adequado', 'Adequado Com Ressalvas', 'Insatisfatório']
    })
    coordenadorParecer: string;

    @Column()
    coordenadorComentario: string;

    @CreateDateColumn()
    creationDate?: Date;

    constructor(
        numeroUSP: string,
        relatorioSemestralDeclara: string,
        dataAtualizacaoLattes: string,
        resultadoUltimoRelatorio: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Não se aplica (é o meu primeiro relatório)',
        disciplinasAprovacoes: number,
        disciplinasReprovacoes: number,
        disciplinasReprovacoesDesdeInicio: number,
        exameProficienciaIdiomas: 'Aprovado' | 'Reprovado' | 'Não',
        exameQualificacao: 'Aprovado' | 'Reprovado' | 'Não',
        prazoQualificacao: string,
        prazoDissertacao: string,
        artigosFaseEscrita: number,
        artigosSubmetidos: number,
        artigosAceitosPublicados: number,
        professorParecer: string,
        professorComentario: string,
        coordenadorParecer: string,
        coordenadorComentario: string,
    ) {
        this.numeroUSP = numeroUSP;
        this.relatorioSemestralDeclara = relatorioSemestralDeclara;
        this.dataAtualizacaoLattes = dataAtualizacaoLattes;
        this.resultadoUltimoRelatorio = resultadoUltimoRelatorio;

        this.disciplinasAprovacoes = disciplinasAprovacoes;
        this.disciplinasReprovacoes = disciplinasReprovacoes;
        this.disciplinasReprovacoesDesdeInicio = disciplinasReprovacoesDesdeInicio;

        this.exameProficienciaIdiomas = exameProficienciaIdiomas;
        this.exameQualificacao = exameQualificacao;

        this.prazoQualificacao = prazoQualificacao;
        this.prazoDissertacao = prazoDissertacao;

        this.artigosFaseEscrita = artigosFaseEscrita;
        this.artigosSubmetidos = artigosSubmetidos;
        this.artigosAceitosPublicados = artigosAceitosPublicados;

        this.professorParecer = professorParecer;
        this.professorComentario = professorComentario;

        this.coordenadorParecer = coordenadorParecer;
        this.coordenadorComentario = coordenadorComentario;
    }
}