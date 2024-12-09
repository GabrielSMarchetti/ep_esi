import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { CourseTypes } from '../enums/CourseTypes';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    num_usp: string;

    @Column()
    dataAtualizacaoLattes: string;

    @Column()
    resultadoUltimoRelatorio: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Não se aplica (é o meu primeiro relatório)';

    @Column()
    disciplinasAprovacoes: number;

    @Column()
    disciplinasReprovacoes: number;

    @Column()
    disciplinasReprovacoesDesdeInicio: number;

    @Column()
    exameProficienciaIdiomas: 'Aprovado' | 'Reprovado' | 'Não';

    @Column()
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

    @Column()
    atividadesAcademicas: string;

    @Column()   
    resumoAtividadesPesquisa: string;

    @Column()
    declaracaoAdicional: string;

    @Column()
    dificuldadeApoio: 'Sim' | 'Não';

    @Column()
    professorParecer: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Sem parecer';

    @Column()
    professorComentario: string;

    @Column()
    coordenadorParecer: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Sem parecer';

    @Column()
    coordenadorComentario: string;

    @CreateDateColumn()
    creationDate?: Date;

    constructor(
        num_usp: string,
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
        atividadesAcademicas: string,
        resumoAtividadesPesquisa: string,
        declaracaoAdicional: string,
        dificuldadeApoio: 'Sim' | 'Não',
        professorParecer?: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Sem parecer',
        professorComentario?: string,
        coordenadorParecer?: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Sem parecer',
        coordenadorComentario?: string,
    ) {
        this.num_usp = num_usp;
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
        this.atividadesAcademicas = atividadesAcademicas;
        this.resumoAtividadesPesquisa = resumoAtividadesPesquisa;
        this.declaracaoAdicional = declaracaoAdicional;
        this.dificuldadeApoio = dificuldadeApoio;
        this.professorParecer = professorParecer ?? 'Sem parecer';
        this.professorComentario = professorComentario ?? 'Sem comentário';
        this.coordenadorParecer = coordenadorParecer ?? 'Sem parecer';
        this.coordenadorComentario = coordenadorComentario ?? 'Sem comentário';
    }
}