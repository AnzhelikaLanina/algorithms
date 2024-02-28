/// <reference types="cypress" />
import {
    changingColor,
    defaultColor,
    circles,
    inputStack,
    buttonDeleteStack,
    buttonResetStack,
    buttonAddStack
} from '../constants/constants';
describe("Проверка корректного выполнения действий на странице Стек", function () {
    beforeEach(function () {
        cy.visit("/stack");
    });

    it("Кнопка добавления недоступна, когда в инпуте пусто", function () {
        if (cy.get(inputStack).should("have.value", "")) {
            cy.get(buttonAddStack).should("be.disabled");
        }
    });

    it("Элемент добавляется корректно", function () {
        cy.get(buttonDeleteStack).as("deleteButton");
        cy.get("@deleteButton").should("be.disabled");

        cy.get(buttonResetStack).as("resetButton");
        cy.get("@resetButton").should("be.disabled");

        cy.get(inputStack).as("input");
        cy.get("@input")
            .type("1")
            .should("have.value", "1");

        cy.get(buttonAddStack).as("addButton");
        cy.get("@addButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get(circles).as("circles");
        cy.get("@circles")
            .should("have.length", 1)
            .then((circle) => {
                cy.wrap(circle[0])
                    .invoke("attr", "class")
                    .then((classList) => expect(classList).contains(changingColor));
                cy.wrap(circle[0]).should("have.text", "1");
            });

        cy.wait(500);

        cy.get("@circles")
            .should("have.length", 1)
            .then((circle) => {
                cy.wrap(circle[0])
                    .invoke("attr", "class")
                    .then((classList) => expect(classList).contains(defaultColor));
                cy.wrap(circle[0]).should("have.text", "1");
            });

        cy.get("@addButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get("@deleteButton").should("be.enabled");
        cy.get("@resetButton").should("be.enabled");

        cy.get('@input')
            .type("3")
            .should("have.value", "3");

        cy.get("@addButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get("@deleteButton").should("be.disabled");
        cy.get("@resetButton").should("be.disabled");

        cy.get("@circles")
            .should("have.length", 2)
            .then((circle) => {
                cy.wrap(circle[1])
                    .invoke("attr", "class")
                    .then((classList) => expect(classList).contains(changingColor));
                cy.wrap(circle[1]).should("have.text", "3");
            })

        cy.wait(500);

        cy.get("@circles")
            .should("have.length", 2)
            .then((circle) => {
                cy.wrap(circle[1])
                    .invoke("attr", "class")
                    .then((classList) => expect(classList).contains(defaultColor));
                cy.wrap(circle[1]).should("have.text", "3");
            })

        cy.get("@addButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get("@deleteButton").should("be.enabled");
        cy.get("@resetButton").should("be.enabled");
    });

    it("Элемент удаляется корректно", function () {
        cy.get(buttonDeleteStack).as("deleteButton");
        cy.get("@deleteButton").should("be.disabled");

        cy.get(buttonResetStack).as("resetButton");
        cy.get("@resetButton").should("be.disabled");

        cy.get(inputStack).as("input");
        cy.get("@input").type("1");

        cy.get(buttonAddStack).as("addButton");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get("@input").type("3");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get('@deleteButton').should("be.enabled");
        cy.get("@resetButton").should("be.enabled");

        cy.get("@deleteButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addButton').should("be.disabled");
        cy.get("@resetButton").should("be.disabled");

        cy.get(circles).as("circles");
        cy.get("@circles")
            .should("have.length", 2)
            .then((circle) => {
                cy.wrap(circle[1])
                    .invoke("attr", "class")
                    .then((classList) => expect(classList).contains(changingColor));
            })
        cy.get("@circles").should("have.length", 1);

        cy.get('@deleteButton')
            .should("be.enabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get("@resetButton").should("be.enabled");

        cy.wait(500);

        cy.get("@deleteButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addButton').should("be.disabled");
        cy.get("@resetButton").should("be.disabled");

        cy.get("@circles")
            .should("have.length", 1)
            .then((circle) => {
                cy.wrap(circle[0])
                    .invoke("attr", "class")
                    .then((classList) => expect(classList).contains(changingColor));
            })
        cy.get("@circles").should("have.length", 0);

        cy.get('@deleteButton')
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));
    });

    it("Кнопка очистки стека работает корректно", function () {
        cy.get(buttonResetStack).as("resetButton");
        cy.get("@resetButton").should("be.disabled");

        cy.get(inputStack).as("input");
        cy.get("@input").type("1");

        cy.get(buttonAddStack).as("addButton");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get("@input").type("3");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get('@resetButton').should("be.enabled");
        cy.get("@resetButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get(circles).as("circles");
        cy.get("@circles").should("have.length", 0);

        cy.get('@resetButton')
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));
    });
})

export {};