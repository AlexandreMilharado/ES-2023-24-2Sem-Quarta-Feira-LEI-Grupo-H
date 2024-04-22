# Software-Engineering

Aplicação de suporte à gestão de horários.

## Autores

### Grupo: Quarta-Feira-LEI-Grupo-H

- Alexandre Milharado | 105946 | [@AlexandreMilharado](https://github.com/AlexandreMilharado)
- André Martins&emsp;&emsp;&emsp; | 104850 | [@AndreOD](https://github.com/AndreOD)
- João Fajardo&emsp;&emsp;&emsp; &ensp; | 104694 | [@TretasPt](https://github.com/TretasPt)
- Oleg Polischuk&emsp;&emsp; &ensp; | 104966 | [@olpol29](https://github.com/olpol29)
- Salvador Palma&emsp;&emsp; &ensp;| 104991 | [@salvador-palma](https://github.com/salvador-palma)

## Funcionalidades

- [x] Carregar horario a partir de .csv [1]
- [x] Mostrar e navegar o horário [2]
- [ ] Mostrar e navegar no cadastro de salas do Iscte [3]
- [ ] Gravar o Horário [4]
- [ ] Sugestão de horario de substituição [5]
- [ ] Sistema de Alocação de Aulas para UCs [6]
- [ ] Visualização e Personalização de Sugestões de Slots [7]
- [ ] Visualização Gráfica de Conflitos de Horários [8]
- [ ] Ocupação de Salas com Heatmaps Personalizáveis [9]

## Rodar Servidores

### Rodar Servidor back-end

A partir do root do projeto ./ES-2023-24-2Sem-Quarta-Feira-LEI-Grupo-H

``` bat
cd .\backend\
npm start
```

### Rodar Servidor front-end

A partir do root do projeto ./ES-2023-24-2Sem-Quarta-Feira-LEI-Grupo-H

``` bat
cd .\front-end\
npm run dev
```

### Rodar Servidor HTTP de para testes

//TODO REMOVER E ADICIONAR OS FICHEIROS
A partir do root do projeto ./ES-2023-24-2Sem-Quarta-Feira-LEI-Grupo-H

``` bat
cd .\front-end\others
python3 -m http.server -b 127.0.0.42 8080
```

Irá iniciar um servidor HTTP para poder testar o upload de fixeiros por url.
Escreva "<http://127.0.0.42:8080/>" para listar os ficheiros na diretoria.

## Abrir Docs (Windows)

A partir do root do projeto ./ES-2023-24-2Sem-Quarta-Feira-LEI-Grupo-H

``` bat
cd .\front-end\docs\
start index.html
```

## Visualizar testes numa tabela

A partir do root do projeto ./ES-2023-24-2Sem-Quarta-Feira-LEI-Grupo-H

``` bat
cd .\front-end\
npm run coverage
```

## Visualizar testes com UI

A partir do root do projeto ./ES-2023-24-2Sem-Quarta-Feira-LEI-Grupo-H

``` bat
cd .\front-end\
npm run ui
```

## Stack utilizada

**Front-end:** HTML, CSS, Javascript, Tabulator, Axios, Jsdoc, Vite, Vitest.

**Back-end:** Nodemon, Express, Cors, Axios.

## Screenshots

Página Inicial/Upload do .CSV:
![Ecrã principal](/readmeFiles/uploadcsv.png)

Tabela com o Horário importado:
![Tabela de Horários](/readmeFiles/tabela.png)

## Problemas Conhecidos

Neste momento não existem erros conhecidos, caso encontre algum contacte: [Quarta-Feira-LEI-Grupo-H-DEV-TEAM](mailto:acmoz@iscte-iul.pt?subject=[GitHub]%20Problema%20Encontrado).
