
INSERT INTO empresa (cnpj, razao_social) VALUES
('12345678000190', 'TechSolucoes Brasil Ltda'),
('98765432000110', 'Comercio e Logistica Nordeste SA');


INSERT INTO funcionario (id_empresa, cpf, nome, nascimento) VALUES
(1, '11122233344', 'Ana Clara Silva', '1995-04-12'),
(1, '55566677788', 'Lucas Mendes Costa', '1990-09-23'),
(2, '99988877766', 'Mariana Oliveira Santos', '1998-11-05');


INSERT INTO endereco (id_funcionario, cep, rua, numero, complemento) VALUES
(1, '49036-000', 'Avenida Santos Dumont', '1250', 'Apto 302'),
(2, '49020-100', 'Rua Jorge Amado', '450', 'Casa'),
(3, '49010-050', 'Avenida Ivo do Prado', '88', 'Bloco B, Sala 10');


INSERT INTO contatos (id_funcionario, telefone) VALUES
(1, '(79) 99911-2233'),
(1, '(79) 3211-4455'), -- Ana possui 2 telefones para testar relação 1:N
(2, '(79) 98822-3344'),
(3, '(79) 99133-4455');


INSERT INTO solicitacao (id_funcionario, status, tipo, data_de_inicio, data_de_fim) VALUES
(1, 'Aprovada', 'Ferias', '2026-12-01', '2026-12-15'),
(2, 'Pendente', 'Abono de Falta / Atestado', '2026-11-20', '2026-11-21'),
(3, 'Em Analise', 'Troca de Escala', '2026-11-28', '2026-11-28');


INSERT INTO escala (tipo, entrada, saida) VALUES
('Comercial Segunda a Sexta', '08:00:00', '17:00:00'),
('Turno Tarde/Noite', '13:00:00', '22:00:00'),
('Escala 12x36 Diurna', '07:00:00', '19:00:00');


INSERT INTO ponto (id_funcionario, id_escala, data, chegada, saida, intervalos) VALUES
(1, 1, '2026-11-24', '07:58:00', '17:02:00', '01:00:00'),
(2, 2, '2026-11-24', '13:05:00', '22:00:00', '01:00:00'),
(3, 3, '2026-11-24', '06:55:00', '19:05:00', '01:00:00');


INSERT INTO beneficios (tipo) VALUES
('Vale Alimentacao'),
('Plano de Saude'),
('Vale Transporte');


INSERT INTO tem_beneficio (id_funcionario, id_beneficios) VALUES
(1, 1), -- Ana tem Vale Alimentacao
(1, 2), -- Ana tem Plano de Saude
(2, 1), -- Lucas tem Vale Alimentacao
(2, 3), -- Lucas tem Vale Transporte
(3, 2); -- Mariana tem Plano de Saude


INSERT INTO segue_escala (id_funcionario, id_escala) VALUES
(1, 1),
(2, 2),
(3, 3);
