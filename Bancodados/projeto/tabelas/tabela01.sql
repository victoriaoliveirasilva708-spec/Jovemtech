
CREATE TABLE empresa (
    id_empresa SERIAL PRIMARY KEY,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    razao_social VARCHAR(150) NOT NULL UNIQUE
);


CREATE TABLE funcionario (
    id_funcionario SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    nascimento DATE NOT NULL,
    CONSTRAINT fk_funcionario_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa) ON DELETE CASCADE
);

//adicionei tabela endereço 
CREATE TABLE endereco (
    id_endereco SERIAL PRIMARY KEY,
    id_funcionario INT NOT NULL,
    cep VARCHAR(9),
    rua VARCHAR(150),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    CONSTRAINT fk_endereco_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario) ON DELETE CASCADE
);

//adicionei tabela telefone
CREATE TABLE contatos (
    id_contatos SERIAL PRIMARY KEY,
    id_funcionario INT NOT NULL,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT fk_contatos_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario) ON DELETE CASCADE
);


CREATE TABLE solicitacao (
    id_solicitacao SERIAL PRIMARY KEY,
    id_funcionario INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pendente',
    tipo VARCHAR(100) NOT NULL,
    data_de_inicio DATE NOT NULL,
    data_de_fim DATE NOT NULL,
    CONSTRAINT fk_solicitacao_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario) ON DELETE CASCADE
);


CREATE TABLE escala (
    id_escala SERIAL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    entrada TIME NOT NULL,
    saida TIME NOT NULL
);


CREATE TABLE ponto (
    id_ponto SERIAL PRIMARY KEY,
    id_funcionario INT NOT NULL,
    id_escala INT NOT NULL,
    data DATE NOT NULL,
    chegada TIME,
    saida TIME,
    intervalos TIME,
    CONSTRAINT fk_ponto_funcionario FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario) ON DELETE CASCADE,
    CONSTRAINT fk_ponto_escala FOREIGN KEY (id_escala) REFERENCES escala (id_escala) ON DELETE RESTRICT
);


CREATE TABLE beneficios (
    id_beneficios SERIAL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL
);


CREATE TABLE tem_beneficio (
    id_funcionario INT NOT NULL,
    id_beneficios INT NOT NULL,
    PRIMARY KEY (id_funcionario, id_beneficios),
    CONSTRAINT fk_tem_beneficio_func FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario) ON DELETE CASCADE,
    CONSTRAINT fk_tem_beneficio_ben FOREIGN KEY (id_beneficios) REFERENCES beneficios (id_beneficios) ON DELETE CASCADE
);


CREATE TABLE segue_escala (
    id_funcionario INT NOT NULL,
    id_escala INT NOT NULL,
    PRIMARY KEY (id_funcionario, id_escala),
    CONSTRAINT fk_segue_escala_func FOREIGN KEY (id_funcionario) REFERENCES funcionario (id_funcionario) ON DELETE CASCADE,
    CONSTRAINT fk_segue_escala_esc FOREIGN KEY (id_escala) REFERENCES escala (id_escala) ON DELETE CASCADE
);

