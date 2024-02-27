/// <reference types="cypress" />
describe("Проверка работающего приложения и переходов по страницам", function () {
  it("Приложение поднимается", function () {
    cy.visit("/");
  });

  beforeEach(function () {
    cy.visit("/");
  });

  it('Открывается страница по умолчанию', function() {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it('Открывается страница recursion', function() {
    cy.get('[data-test="recursion"]').click();
    cy.contains('Строка');
  });

  it('Открывается страница fibonacci', function() {
    cy.get('[data-test="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('Открывается страница sorting', function() {
    cy.get('[data-test="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('Открывается страница stack', function() {
    cy.get('[data-test="stack"]').click();
    cy.contains('Стек');
  });

  it('Открывается страница queue', function() {
    cy.get('[data-test="queue"]').click();
    cy.contains('Очередь');
  });

  it('Открывается страница list', function() {
    cy.get('[data-test="list"]').click();
    cy.contains('Связный список');
  });

});

export {};
