CREATE TABLE empresa (
    id_empresa INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    razao_social VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE funcionario (
    id_funcionario INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresa(id_empresa) ON DELETE CASCADE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    nascimento DATE NOT NULL
);

CREATE TABLE solicitacao (
    id_solicitacao INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_funcionario INT NOT NULL REFERENCES funcionario(id_funcionario) ON DELETE CASCADE,
    estatus VARCHAR(30) NOT NULL DEFAULT 'Pendente',
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE beneficios (
    id_beneficios INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE escala (
    id_escala INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    entrada TIME NOT NULL,
    saida TIME NOT NULL
);

CREATE TABLE ponto (
    id_ponto INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_funcionario INT NOT NULL REFERENCES funcionario(id_funcionario) ON DELETE CASCADE,
    id_escala INT NOT NULL REFERENCES escala(id_escala),
    data_ponto DATE NOT NULL,
    chegada TIME NOT NULL,
    intervalos VARCHAR(50),
    saida TIME
);

CREATE TABLE possui (
    id_funcionario INT NOT NULL REFERENCES funcionario(id_funcionario) ON DELETE CASCADE,
    id_beneficios INT NOT NULL REFERENCES beneficios(id_beneficios) ON DELETE CASCADE,
    PRIMARY KEY (id_funcionario, id_beneficios)
);
