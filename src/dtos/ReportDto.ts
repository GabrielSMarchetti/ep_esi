export interface ReportDto {
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
  
}
  