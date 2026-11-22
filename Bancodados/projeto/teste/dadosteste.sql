//Dados da empresa 
INSERT INTO empresa (cnpj, razao_social) VALUES
('12.345.678/0001-44', 'Atha Solutions LTDA'),
('98.765.432/0001-77', 'BVB Central S.A.');

//Funcionarios
INSERT INTO funcionario (id_empresa, cpf, nome, endereco, nascimento) VALUES
(1, '111.232.333-44', 'Marta Silva', 'Rua das Flores, 123', '1997-05-15'),
(1, '555.666.747-88', 'Adriano Souza', 'Av. Brasil, 450', '1991-10-20'),
(2, '999.288.777-66', 'Viviane Costa', 'Rua Nova, 78', '1998-03-17');

//escalas
INSERT INTO escala (tipo, entrada, saida) VALUES
('Comercial 08h-17h', '08:00:00', '17:00:00'),
('Turno 12x36 Diurno', '07:00:00', '19:00:00'); 

//Beneficios e vincular aos Funcionários
INSERT INTO beneficios (tipo) VALUES ('Vale Alimentacao'), ('Plano de Saude');
INSERT INTO possui (id_funcionario, id_beneficios) VALUES (1, 1), (1, 2), (2, 1);

// Registros de Ponto
INSERT INTO ponto (id_funcionario, id_escala, data_ponto, chegada, intervalos, saida) VALUES
(1, 1, '2026-11-20', '07:58:00', '12:00 - 13:00', '17:02:00'),
(2, 2, '2026-11-20', '06:55:00', '12:00 - 13:00', '19:05:00');

// Solicitações
INSERT INTO solicitacao (id_funcionario, estatus, data_inicio, data_fim, tipo) VALUES
(1, 'Aprovada', '2026-12-01', '2026-12-15', 'Ferias'),
(2, 'Pendente', '2026-11-25', '2026-11-25', 'Troca de Escala');