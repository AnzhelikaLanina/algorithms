/// <reference types="cypress" />
import {
    changingColor,
    defaultColor,
    circles,
    container,
    inputQueue,
    buttonAddQueue,
    buttonDeleteQueue,
    buttonResetQueue
} from '../constants/constants';
describe("Проверка корректного выполнения действий на странице Очередь", function () {
    beforeEach(function () {
        cy.visit("/queue");
    });

    it("Кнопка добавления недоступна, когда в инпуте пусто", function () {
        if (cy.get(inputQueue).should("have.value", "")) {
            cy.get(buttonAddQueue).should("be.disabled");
        }
    });

    it("Элемент добавляется корректно", function () {
        cy.get(buttonDeleteQueue).as("deleteButton");
        cy.get("@deleteButton").should("be.disabled");

        cy.get(buttonResetQueue).as("resetButton");
        cy.get("@resetButton").should("be.disabled");

        cy.get(inputQueue).as("input")
        cy.get("@input")
            .type("1")
            .should("have.value", "1");

        cy.get(buttonAddQueue).as("addButton");
        cy.get("@addButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get(circles).as("circles");
        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "1");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "1");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get(container).as("container");
        cy.get("@container").then((circle) => {
            cy.wrap(circle[0])
                .invoke("text")
                .should("include", "head", "tail");
        });

        cy.get("@addButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get("@deleteButton").should("be.enabled");
        cy.get("@resetButton").should("be.enabled");

        cy.get("@input")
            .type("3")
            .should("have.value", "3");

        cy.get("@addButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get("@deleteButton").should("be.disabled");
        cy.get("@resetButton").should("be.disabled");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[1]).should("have.text", "3");
            cy.wrap(circle[1])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[1]).should("have.text", "3");
            cy.wrap(circle[1])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get("@container").then((circle) => {
            cy.wrap(circle[0])
                .invoke("text")
                .should("include", "head");
            cy.wrap(circle[1])
                .invoke("text")
                .should("include", "tail");
        });

        cy.get("@addButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get("@deleteButton").should("be.enabled");
        cy.get("@resetButton").should("be.enabled");
    });

    it("Элемент удаляется корректно", function () {
        cy.get(buttonDeleteQueue).as("deleteButton");
        cy.get("@deleteButton").should("be.disabled");

        cy.get(buttonResetQueue).as("resetButton");
        cy.get("@resetButton").should("be.disabled");

        cy.get(inputQueue).as("input");
        cy.get("@input").type("1");

        cy.get(buttonAddQueue).as("addButton");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get("@input").type("3");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get(circles).as("circles");
        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "1");
            cy.wrap(circle[1]).should("have.text", "3");
        });

        cy.get(container).as("container");
        cy.get("@container").then((circle) => {
            cy.wrap(circle[0])
                .invoke("text")
                .should("include", "head");
            cy.wrap(circle[1])
                .invoke("text")
                .should("include", "tail");
        });

        cy.get('@deleteButton').should("be.enabled");
        cy.get('@resetButton').should("be.enabled");

        cy.get("@deleteButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addButton').should("be.disabled");
        cy.get("@resetButton").should("be.disabled");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "");
            cy.wrap(circle[1]).should("have.text", "3");
        });

        cy.get("@container").then((circle) => {
            cy.wrap(circle[1])
                .invoke("text")
                .should("include", "head", "tail");
        });

        cy.get("@deleteButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));
        cy.get("@resetButton").should("be.enabled");

        cy.wait(500);

        cy.get("@deleteButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get("@resetButton").should("be.disabled");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "");
            cy.wrap(circle[1]).should("have.text", "");
        });

        cy.get("@deleteButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));
    });


    it("Кнопка очистки очереди работает корректно", function () {
        cy.get(buttonResetQueue).as("resetButton");
        cy.get("@resetButton").should("be.disabled");
        cy.get(inputQueue).as("input");
        cy.get("@input").type("1");

        cy.get(buttonAddQueue).as("addButton");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get("@input").type("3");
        cy.get("@addButton").click();

        cy.wait(500);

        cy.get(circles).as("circles");
        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "1");
            cy.wrap(circle[1]).should("have.text", "3");
        });

        cy.get('@resetButton').should("be.enabled");
        cy.get("@resetButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get(circles).as("circles");
        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "");
            cy.wrap(circle[1]).should("have.text", "");
        });

        cy.get('@resetButton')
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));
    });
})

export {};