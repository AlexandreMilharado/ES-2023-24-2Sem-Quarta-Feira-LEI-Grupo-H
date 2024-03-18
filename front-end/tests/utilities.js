export function stringToHTMLElement(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.firstChild;
}

export function getTestFile() {
  return new File(
    [
      `Curso;Unidade Curricular;Turno;Turma;Inscritos no turno;Dia da semana;Hora início da aula;Hora fim da aula;Data da aula;Características da sala pedida para a aula;Sala atribuída à aula
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Sex;13:00:00;14:30:00;02/12/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;28/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;21/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;14/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;07/11/2022;Sala Aulas Mestrado;AA2.25
LG, LGIL;Microeconomia;L5004T04;GiA2, GiA1;59;Seg;11:00:00;12:30:00;26/09/2022;Anfiteatro aulas;C5.07
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;25/11/2022;Não necessita de sala;
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;18/11/2022;Não necessita de sala;
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;11/11/2022;Não necessita de sala;
LIGE, LIGE-PL;Marketing para as Tecnologias;01769PL03;IGE-PL-C2, IGE-PL-C1;21;Ter;18:00:00;19:30:00;20/09/2022;Sala de Aulas normal;1E06
LIGE, LIGE-PL;Marketing para as Tecnologias;01769PL03;IGE-PL-C2, IGE-PL-C1;21;Ter;18:00:00;19:30:00;13/09/2022;Sala de Aulas normal;1E06
DATMC;Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects);03953OT02;DATMC1;2;Qua;18:00:00;19:00:00;02/11/2022;Sala/anfiteatro aulas;C2.02
`,
    ],
    "test"
  );
}
