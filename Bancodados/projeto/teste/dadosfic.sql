//Nomes das empresas
INSERT INTO empresa (cnpj, razao_social) VALUES
('45.123.890/0001-55', 'Tech Nordeste Inovacoes LTDA'),
('77.888.999/0001-01', ' Express Brasil S.A.');

//IDS de 4 funcionarios 
INSERT INTO funcionario (id_empresa, cpf, nome, endereco, nascimento) VALUES
(1, '222.333.444-55', 'Lucas Oliveira', 'Av. Beira Mar, 1020', '1993-08-12'),
(2, '333.444.555-66', 'Fernanda Lima', 'Rua Sao Cristovao, 89', '1996-11-30'),
(3, '444.555.666-77', 'Rafael Santos', 'Rua da Praia, 310', '1988-02-19'),
(3, '666.777.888-99', 'Juliana Mendes', 'Av. Hermes Fontes, 550', '2000-07-04'),
(4, '777.888.999-00', 'Pedro Henrique', 'Rua Laranjeiras, 142', '1991-12-25');

// Novas escalas
INSERT INTO escala (tipo, entrada, saida) VALUES
('Comercial 09h-18h', '09:00:00', '18:00:00'),
('Turno Noturno 22h-06h', '22:00:00', '06:00:00'),
('Meio Periodo Manha 08h-12h', '08:00:00', '12:00:00');

//Beneficios 
INSERT INTO beneficios (tipo) VALUES 
('Vale Transporte'), 
('Auxilio Creche'), 
('Gympass');

INSERT INTO possui (id_funcionario, id_beneficios) VALUES 
(3, 1), (3, 3),
(4, 2), (4, 5),
(5, 1), (5, 3),
(6, 2), (6, 4), (6, 5),
(7, 1), (7, 2),
(8, 3);

//Pontos
INSERT INTO ponto (id_funcionario, id_escala, data_ponto, chegada, intervalos, saida) VALUES
(3, 1, '2026-11-20', '08:15:00', '12:00 - 13:00', '17:00:00'),
(4, 3, '2026-11-20', '08:59:00', '13:00 - 14:00', '18:30:00'),
(5, 5, '2026-11-20', '07:55:00', 'Sem intervalo', '12:02:00'),
(6, 3, '2026-11-21', '09:00:00', '12:30 - 13:30', '18:00:00'),
(7, 4, '2026-11-21', '21:55:00', '02:00 - 03:00', '06:10:00'),
(8, 2, '2026-11-21', '07:05:00', '12:00 - 13:00', '19:00:00'),
(1, 1, '2026-11-21', '08:00:00', '12:00 - 13:00', '17:45:00');

//Solicitações 
INSERT INTO solicitacao (id_funcionario, estatus, data_inicio, data_fim, tipo) VALUES
(3, 'Aprovada', '2026-11-18', '2026-11-19', 'Atestado Medico'),
(4, 'Pendente', '2026-11-28', '2026-11-28', 'Folga Banco de Horas'),
(5, 'Recusada', '2026-12-20', '2026-12-30', 'Ferias'),
(6, 'Aprovada', '2026-11-21', '2026-11-21', 'Abono Atraso'),
(7, 'Pendente', '2026-12-05', '2026-12-06', 'Troca de Escala'),
(8, 'Aprovada', '2026-11-15', '2026-11-17', 'Atestado Medico');
