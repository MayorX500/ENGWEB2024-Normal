# Teste Engenharia Web 2024
Aluno
- Pedro Miguel Rodrigues Gomes
- A93294

## Exercício 1
### 1.1 Setup
#### Analisa o dataset fornecido
O dataset fornecido é um ficheiro CSV com 38279 linhas e 11 colunas. Para uma utilização mais fácil, o dataset foi convertido para um ficheiro JSON.

Existia um bloco aleatório de texto no meio do ficheiro CSV que foi removido na conversão para JSON.

#### Introduz as alterações que achares necessárias no dataset
Alterar o campo `idcontrato` para `_id` para facilitar a utilização do dataset no MongoDB.

#### Adiciona o dataset ao MongoDB
```bash
mongoimport -d contratos -c contratos --file=contratos.json --jsonArray
```

### 1.2 Queries
Especifica queries em MongoDB para responder às seguintes questões:
- Quantos registos estão na base de dados;
```json
contratos> db.contratos.countDocuments()
36377
```

- Quantos registos de contratos têm o tipo de procedimento com valor "Ajuste Direto Regime Geral"?
```json
contratos> db.contratos.countDocuments({ tipoprocedimento: "Ajuste Direto Regime Geral" })
17067
```

- Qual a lista de entidades comunicantes (ordenada alfabeticamente e sem repetições)?
```json
contratos> db.contratos.aggregate([{$group: {_id: "$entidade_comunicante"}},{$sort: { _id: 1 } },{$project: {_id: 0,entidade_comunicante: "$_id"}}])
[
  { entidade_comunicante: 'A ARCIAL - Associação para Recuperação de Cidadãos Inadaptados de Oliveira do Hospital'
  },
  { entidade_comunicante: 'A Oficina Centro de Artes e Mesteres Tradicionais de Guimarães, CIPRL'
  },
  { entidade_comunicante: 'A. D. A. M. - Águas do Alto Minho, S. A.' },
  { entidade_comunicante: 'ABIMOTA - Associação Nacional das Indústrias de Duas Rodas, Ferragens, Mobiliário e Afins'
  },
  { entidade_comunicante: 'ABMG - Águas do Baixo Mondego e Gândara, E. I. M., S. A.'
  },
  { entidade_comunicante: 'AC, Águas de Coimbra, E. M.' },
  { entidade_comunicante: 'ACA - Associação Casa da Arquitectura' },
  { entidade_comunicante: 'ACAPORAMA - Associação de Casas do Povo da Região Autonoma da Madeira'
  },
  { entidade_comunicante: 'ACISO - Associação Empresarial Ourém - Fátima'
  },
  { entidade_comunicante: 'ACLEM - Arte, Cultura e Lazer, Empresa Municipal, E. M.'
  },
  { entidade_comunicante: 'ACPMR - Associação Cluster Portugal Mineral Resources'
  },
  { entidade_comunicante: 'AD ELO Associação de Desenvolvimento Local da Bairrada e Mondego'
  },
  { entidade_comunicante: 'ADAE - Associação de Desenvolvimento da Alta Estremadura'
  },
  { entidade_comunicante: 'ADC - Águas da Covilhã, E. M.' },
  { entidade_comunicante: 'ADD - Associação de Desenvolvimento do Dão'
  },
  { entidade_comunicante: 'ADEMINHO - Associação para o Desenvolvimento do Ensino Profissional do Alto Minho Interior'
  },
  { entidade_comunicante: 'ADENE - Agência para a Energia' },
  { entidade_comunicante: 'ADEPTOLIVA - Associação para o Desenvolvimento do Ensino Profissional dos Concelhos de Tábua, Oliveira do Hospital e Arganil'
  },
  { entidade_comunicante: 'ADER-AL - Associação para o Desenvolvimento do Espaço Rural do Norte do Alentejo'
  },
  { entidade_comunicante: 'ADICE - Associação para o Desenvolvimento Integrado da Cidade de Ermesinde'
  }
]
(...)

```
*Como a lista de entidades comunicantes é muito extensa, não é possível apresentar a lista completa. Existem { total_entidades: 2220 } entidades comunicantes.*

- Qual a distribuição de contratos por tipo de procedimento (quantos contratos tem cada tipo de procedimento)?
```json
contratos> db.contratos.aggregate([{$group: {_id: "$tipoprocedimento",count: { $sum: 1 }}},{$sort: { count: -1 }}])
[
  { _id: 'Ajuste Direto Regime Geral', count: 17067 },
  { _id: 'Consulta Prévia', count: 8000 },
  { _id: 'Concurso público', count: 5300 },
  { _id: 'Ao abrigo de acordo-quadro (art.º 259.º)', count: 4678 },
  { _id: 'Ao abrigo de acordo-quadro (art.º 258.º)', count: 995 },
  { _id: 'Contratação excluída II', count: 144 },
  { _id: 'Consulta Prévia Simplificada', count: 96 },
  { _id: 'Concurso limitado por prévia qualificação', count: 53 },
  { _id: 'Setores especiais – isenção parte II', count: 39 },
  { _id: 'Concurso público simplificado', count: 3 },
  { _id: 'Procedimento de negociação', count: 1 },
  {
    _id: 'Consulta prévia ao abrigo do artigo 7º da Lei n.º 30/2021, de 21.05',
    count: 1
  }
]
```

- Qual o montante global por entidade comunicante (somatório dos contratos associados a uma entidade)?
```json
contratos> db.contratos.aggregate([{$addFields: {precoContratualConverted: {$convert: {input: "$precoContratual",to: "double",onError: 0,onNull: 0}}}},{$group: {_id: "$entidade_comunicante",totalAmount: { $sum: "$precoContratualConverted" }}},{$sort: { totalAmount: -1 }}])
[
  { _id: 'Infraestruturas de Portugal', totalAmount: 200703573 },
  {
    _id: 'Unidade Local de Saúde de Santa Maria, E. P. E.',
    totalAmount: 54651152
  },
  { _id: 'Autoridade Tributária e Aduaneira', totalAmount: 34420020 },
  { _id: 'Estado Maior da Força Aérea', totalAmount: 24458614 },
  {
    _id: 'Secretaria-Geral do Ministério da Administração Interna',
    totalAmount: 17238403
  },
  {
    _id: 'Unidade Local de Saúde de Gaia/Espinho, E. P. E.',
    totalAmount: 16026149
  },
  { _id: 'Município de Sintra', totalAmount: 15080933 },
  {
    _id: 'Ministério da Defesa Nacional - Marinha',
    totalAmount: 14873803
  },
  {
    _id: 'Unidade Local de Saúde do Alto Minho, E. P. E.',
    totalAmount: 14640831
  },
  {
    _id: 'Instituto Português de Oncologia de Lisboa Francisco Gentil, E. P. E.',
    totalAmount: 13292568
  },
  {
    _id: 'Unidade Local de Saúde do Algarve, E. P. E.',
    totalAmount: 12751351
  },
  {
    _id: 'Hospital Professor Doutor Fernando Fonseca, E. P. E.',
    totalAmount: 12497407
  },
  { _id: 'Município de Lisboa', totalAmount: 11492123 },
  { _id: 'Município de Coimbra', totalAmount: 11162879 },
  {
    _id: 'Direção Regional das Obras Públicas e Transportes Terrestres',
    totalAmount: 10311052
  },
  {
    _id: 'Centro Hospitalar e Universitário de Coimbra, E. P. E.',
    totalAmount: 10290497
  },
  {
    _id: 'Centro Hospitalar Universitário Lisboa Central, E. P. E.',
    totalAmount: 10088256
  },
  {
    _id: 'Hospital do Espírito Santo de Évora, EPE',
    totalAmount: 9683938
  },
  { _id: 'BANCO DE PORTUGAL', totalAmount: 9474196 },
  {
    _id: 'Unidade Local de Saúde de São João, E. P. E.',
    totalAmount: 9004360
  }
]
Type "it" for more
```

### 1.3 API de dados

- [x] `GET /contratos`: devolve uma lista com todos os registos;
- [x] `GET /contratos/:id`: devolve o registo com identificador id (corresponde ao idcontrato);
- [x] `GET /contratos?entidade=EEEE`: devolve a lista dos contratos correspondentes à entidade
EEEE;
- [x] `GET /contratos?tipo=AAA`: devolve a lista dos contratos com tipo de procedimento igual a AAA;
- [x] `GET /contratos/entidades`: devolve a lista de entidades comunicantes ordenada
alfabeticamente e sem repetições;
- [x] `GET /contratos/tipos`: devolve a lista dos tipos de procedimento ordenada alfabeticamente e
sem repetições;
- [x] `POST /contratos`: acrescenta um registo novo à BD;
- [x] `DELETE /contratos/:id`: elimina da BD o registo com o identificador id;
- [x] `PUT /contratos/:id`: altera o registo com o identificador id.

## Exercício 2
### 2.1 Frontend
- [x] Página principal `http://localhost:16001/`
    - [x] Cabeçalho com metainformação à escolha;
    - [x] Tabela com a lista de `contratos`, um por linha, com os campos: idcontrato, objectoContrato, dataCelebracaoContrato, precoContratual,NIPC_entidade_comunicante, entidade_comunicante;
        - [x] O campo idcontrato deverá ser um link para a página do contrato com esse identificador;
        - [x] O campo NIPC_entidade_comunicante deverá ser um link para a página dessa entidade.
- [x] Página de contrato `http://localhost:16001/:idcontrato`
    - [x] Todos os campos do contrato;
    - [x] Link para voltar à página principal.
- [x] Página de entidade `http://localhost:16001/entidades/:nipc`
    - [x] Identificador e nome da entidade;
    - [x] Tabela com a lista de contratos dessa entidade;
    - [x] Somatório do valor dos contratos;
    - [x] Link para voltar à página principal.



## Como executar

### 1. MongoDB

Isto irá iniciar um container Docker com o MongoDB e importar o dataset fornecido para a base de dados.

A porta para aceder ao MongoDB é a 5000.

```bash
# Na pasta ex1 do projeto executar
docker-compose up -d

```

### 2. Backend

Isto irá iniciar a API na porta 16000.

```bash
# Na pasta ex1 do projeto executar
cd dataAPI
npm install
npm start

```

### 3. Frontend

Isto irá iniciar o frontend na porta 16001.

```bash
# Na pasta ex2 do projeto executar
cd dataFrontend
npm install
npm start

```
