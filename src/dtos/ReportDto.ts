export class ReportDto {
    relatorioSemestralDeclara: string;
    dataAtualizacaoLattes: string;
    resultadoUltimoRelatorio: 'Aprovado' | 'Aprovado com ressalvas' | 'Insatisfatório' | 'Não se aplica (é o meu primeiro relatório)';
    
    disciplinasAprovacoes: number;
    disciplinasReprovacoes: number;
    disciplinasReprovacoesDesdeInicio: number;
  
    exameProficienciaIdiomas: 'Aprovado' | 'Reprovado' | 'Não';
    exameQualificacao: 'Aprovado' | 'Reprovado' | 'Não';
  
    prazoQualificacao: string;
    prazoDissertacao: string;
  
    artigosFaseEscrita: number;
    artigosSubmetidos: number;
    artigosAceitosPublicados: number;
  
    atividadesAcademicas: string;
    resumoAtividadesPesquisa: string;
    declaracaoAdicional: string;
    dificuldadeApoio: 'Sim' | 'Não';
  
    constructor(
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
      atividadesAcademicas: string,
      resumoAtividadesPesquisa: string,
      declaracaoAdicional: string,
      dificuldadeApoio: 'Sim' | 'Não'
    ) {
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
  
      this.atividadesAcademicas = atividadesAcademicas;
      this.resumoAtividadesPesquisa = resumoAtividadesPesquisa;
      this.declaracaoAdicional = declaracaoAdicional;
      this.dificuldadeApoio = dificuldadeApoio;
    }
  }
  