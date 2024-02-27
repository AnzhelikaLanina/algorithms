/// <reference types="cypress" />
describe("Проверка корректного выполнения действий на странице Фибоначчи", function() {
    const array = [1, 1, 2, 3, 5, 8];
    beforeEach(function () {
        cy.visit("/fibonacci");
    });

    it("Кнопка добавления недоступна, когда в инпуте пусто", function () {
        if (cy.get('[data-test="input-fib"]').should("have.value", "")) {
            cy.get('[data-test="button-fib"]').should("be.disabled");
        }
    });

    it("Вывод последовательности Фибоначчи корректен", function () {
        cy.get('[data-test="input-fib"]')
            .type("5")
            .should("have.value", "5");

        cy.get('[data-test="button-fib"]').as("button");
        cy.get("@button")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get("[class^=circle_circle]").as("circles");
        cy.get("@circles")
            .then((circle) => {
                cy.wrap(circle[0]).contains(array[0]);
                cy.wrap(circle[1]).contains(array[1]);
                cy.wrap(circle[2]).contains(array[2]);
                cy.wrap(circle[3]).contains(array[3]);
                cy.wrap(circle[4]).contains(array[4]);
                cy.wrap(circle[5]).contains(array[5]);
            });
        cy.get("@circles").should("have.length", array.length);

        cy.get("@button")
            .should("be.enabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));
    })
});

export {};