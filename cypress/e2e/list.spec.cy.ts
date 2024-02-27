/// <reference types="cypress" />
describe("Проверка корректного выполнения действий на странице Очередь", function () {
    const defaultColor = "circle_default";
    const changingColor = "circle_changing";
    const modifiedColor = "circle_modified";

    beforeEach(function () {
        cy.visit("/list");
    });

    it("Кнопки добавления недоступны, когда в инпуте пусто", function () {
        if (cy.get('[data-test="input-list"]').should("have.value", "")) {
            cy.get('[data-test="button-add-head"]').should("be.disabled");
            cy.get('[data-test="button-add-tail"]').should("be.disabled");
            cy.get('[data-test="button-add-index-list"]').should("be.disabled");
        }
    });

    it("Отрисовка дефолтного списка корректна", function () {
        cy.get("[class^=circle_content]").as("container");
        cy.get("@container")
            .should("have.length", 4)
            .then((circle) => {
            cy.wrap(circle[0])
                .invoke("text")
                .should("include", "head");
            cy.wrap(circle[3])
                .invoke("text")
                .should("include", "tail");
        });
        cy.get('[data-test="button-delete-head"]').should("be.enabled");
        cy.get('[data-test="button-delete-tail"]').should("be.enabled");
        cy.get('[data-test="button-delete-index-list"]').should("be.enabled");
    });

    it("Элемент добавляется в head корректно", function () {
        cy.get('[data-test="button-add-head"]').as("addHeadButton");
        cy.get('[data-test="button-add-tail"]').as("addTailButton");
        cy.get('[data-test="button-delete-head"]').as("deleteHeadButton");
        cy.get('[data-test="button-delete-tail"]').as("deleteTailButton");
        cy.get('[data-test="button-add-index-list"]').as("addIndexButton");
        cy.get('[data-test="button-delete-index-list"]').as("deleteIndexButton");
        cy.get("[class^=circle_circle]").as("circles");

        cy.get('[data-test="input-list"]').as("input")
        cy.get("@input")
            .type("1")
            .should("have.value", "1");

        cy.get("@addHeadButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addTailButton').should("be.disabled");
        cy.get('@deleteHeadButton').should("be.disabled");
        cy.get('@deleteTailButton').should("be.disabled");
        cy.get('@addIndexButton').should("be.disabled");
        cy.get('@deleteIndexButton').should("be.disabled");

        cy.get('[data-test="element-list"]').then((circle) => {
            cy.wrap(circle[0])
                .find("[class*=circle_small]")
                .should("have.text", "1")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "1");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(modifiedColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "1");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get("[class^=circle_content]").then((circle) => {
            cy.wrap(circle[0])
                .invoke("text")
                .should("include", "head");
        });

        cy.get("@addHeadButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get('@deleteHeadButton').should("be.enabled");
        cy.get('@deleteTailButton').should("be.enabled");
        cy.get('@deleteIndexButton').should("be.enabled");
    });

    it("Элемент добавляется в tail корректно", function () {
        cy.get('[data-test="button-add-head"]').as("addHeadButton");
        cy.get('[data-test="button-add-tail"]').as("addTailButton");
        cy.get('[data-test="button-delete-head"]').as("deleteHeadButton");
        cy.get('[data-test="button-delete-tail"]').as("deleteTailButton");
        cy.get('[data-test="button-add-index-list"]').as("addIndexButton");
        cy.get('[data-test="button-delete-index-list"]').as("deleteIndexButton");
        cy.get("[class^=circle_circle]").as("circles");

        cy.get('[data-test="input-list"]').as("input")
        cy.get("@input")
            .type("3")
            .should("have.value", "3");

        cy.get("@addTailButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addHeadButton').should("be.disabled");
        cy.get('@deleteHeadButton').should("be.disabled");
        cy.get('@deleteTailButton').should("be.disabled");
        cy.get('@addIndexButton').should("be.disabled");
        cy.get('@deleteIndexButton').should("be.disabled");

        cy.get('[data-test="element-list"]').then((circle) => {
            cy.wrap(circle[3])
                .find("[class*=circle_small]")
                .should("have.text", "3")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[3])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(1000);

        cy.get("[class^=circle_circle]").as("circles");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[4]).should("have.text", "3");
            cy.wrap(circle[4])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(modifiedColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[4]).should("have.text", "3");
            cy.wrap(circle[4])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get("[class^=circle_content]").then((circle) => {
            cy.wrap(circle[4])
                .invoke("text")
                .should("include", "tail");
        });

        cy.get("@addTailButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get('@deleteHeadButton').should("be.enabled");
        cy.get('@deleteTailButton').should("be.enabled");
        cy.get('@deleteIndexButton').should("be.enabled");
    });

    it("Элемент добавляется по индексу корректно", function () {
        cy.get('[data-test="button-add-head"]').as("addHeadButton");
        cy.get('[data-test="button-add-tail"]').as("addTailButton");
        cy.get('[data-test="button-delete-head"]').as("deleteHeadButton");
        cy.get('[data-test="button-delete-tail"]').as("deleteTailButton");
        cy.get('[data-test="button-add-index-list"]').as("addIndexButton");
        cy.get('[data-test="button-delete-index-list"]').as("deleteIndexButton");
        cy.get("[class^=circle_circle]").as("circles");

        cy.get('[data-test="input-list"]').as("input")
        cy.get("@input")
            .type("3")
            .should("have.value", "3");

        cy.get('[data-test="input-index-list"]').as("inputIndex")
        cy.get("@inputIndex")
            .type("2")
            .should("have.value", "2");

        cy.get("@addIndexButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addHeadButton').should("be.disabled");
        cy.get('@deleteHeadButton').should("be.disabled");
        cy.get('@deleteTailButton').should("be.disabled");
        cy.get('@addTailButton').should("be.disabled");
        cy.get('@deleteIndexButton').should("be.disabled");

        cy.get('[data-test="element-list"]').then((circle) => {
            cy.wrap(circle[2])
                .find("[class*=circle_small]")
                .should("have.text", "3")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("[class^=circle_circle]").as("circles");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2]).should("have.text", "3");
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(modifiedColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2]).should("have.text", "3");
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get("@addIndexButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get('@deleteHeadButton').should("be.enabled");
        cy.get('@deleteTailButton').should("be.enabled");
        cy.get('@deleteIndexButton').should("be.enabled");
    });

    it("Элемент удаляется из head корректно", function () {
        cy.get('[data-test="button-add-head"]').as("addHeadButton");
        cy.get('[data-test="button-add-tail"]').as("addTailButton");
        cy.get('[data-test="button-delete-head"]').as("deleteHeadButton");
        cy.get('[data-test="button-delete-tail"]').as("deleteTailButton");
        cy.get('[data-test="button-add-index-list"]').as("addIndexButton");
        cy.get('[data-test="button-delete-index-list"]').as("deleteIndexButton");
        cy.get("[class^=circle_circle]").as("circles");

        cy.get("@deleteHeadButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addTailButton').should("be.disabled");
        cy.get('@addHeadButton').should("be.disabled");
        cy.get('@deleteTailButton').should("be.disabled");
        cy.get('@addIndexButton').should("be.disabled");
        cy.get('@deleteIndexButton').should("be.disabled");

        cy.get('[data-test="element-list"]').then((circle) => {
            cy.wrap(circle[0])
                .find("[class*=circle_small]")
                .should("have.text", "2")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(500);

        cy.get("[class^=circle_circle]").as("circles");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "34");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(modifiedColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[0]).should("have.text", "34");
            cy.wrap(circle[0])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get("[class^=circle_content]").then((circle) => {
            cy.wrap(circle[0])
                .invoke("text")
                .should("include", "head");
        });

        cy.get("@deleteHeadButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get('@deleteHeadButton').should("be.enabled");
        cy.get('@deleteTailButton').should("be.enabled");
        cy.get('@deleteIndexButton').should("be.enabled");
    });

    it("Элемент удаляется из tail корректно", function () {
        cy.get('[data-test="button-add-head"]').as("addHeadButton");
        cy.get('[data-test="button-add-tail"]').as("addTailButton");
        cy.get('[data-test="button-delete-head"]').as("deleteHeadButton");
        cy.get('[data-test="button-delete-tail"]').as("deleteTailButton");
        cy.get('[data-test="button-add-index-list"]').as("addIndexButton");
        cy.get('[data-test="button-delete-index-list"]').as("deleteIndexButton");
        cy.get("[class^=circle_circle]").as("circles");

        cy.get("@deleteTailButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addTailButton').should("be.disabled");
        cy.get('@addHeadButton').should("be.disabled");
        cy.get('@deleteHeadButton').should("be.disabled");
        cy.get('@addIndexButton').should("be.disabled");
        cy.get('@deleteIndexButton').should("be.disabled");

        cy.get('[data-test="element-list"]').then((circle) => {
            cy.wrap(circle[3])
                .find("[class*=circle_small]")
                .should("have.text", "1")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[3]).should("have.text", "");
            cy.wrap(circle[3])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(500);

        cy.get("[class^=circle_circle]").as("circles");

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2]).should("have.text", "8");
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(modifiedColor));
        });

        cy.wait(500);

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2]).should("have.text", "8");
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.get("[class^=circle_content]").then((circle) => {
            cy.wrap(circle[2])
                .invoke("text")
                .should("include", "tail");
        });

        cy.get("@deleteTailButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get('@deleteHeadButton').should("be.enabled");
        cy.get('@deleteTailButton').should("be.enabled");
        cy.get('@deleteIndexButton').should("be.enabled");
    });

    it("Элемент удаляется по индексу корректно", function () {
        cy.get('[data-test="button-add-head"]').as("addHeadButton");
        cy.get('[data-test="button-add-tail"]').as("addTailButton");
        cy.get('[data-test="button-delete-head"]').as("deleteHeadButton");
        cy.get('[data-test="button-delete-tail"]').as("deleteTailButton");
        cy.get('[data-test="button-add-index-list"]').as("addIndexButton");
        cy.get('[data-test="button-delete-index-list"]').as("deleteIndexButton");
        cy.get("[class^=circle_circle]").as("circles");

        cy.get('[data-test="input-index-list"]').as("inputIndex")
        cy.get("@inputIndex")
            .type("2")
            .should("have.value", "2");

        cy.get("@deleteIndexButton")
            .click()
            .should("be.disabled")
            .invoke("attr", "class")
            .then((classList) => expect(classList).contain("loader"));

        cy.get('@addHeadButton').should("be.disabled");
        cy.get('@deleteHeadButton').should("be.disabled");
        cy.get('@deleteTailButton').should("be.disabled");
        cy.get('@addTailButton').should("be.disabled");
        cy.get('@addIndexButton').should("be.disabled");

        cy.wait(500);

        cy.get('[data-test="element-list"]').then((circle) => {
            cy.wrap(circle[2])
                .find("[class*=circle_small]")
                .should("have.text", "8")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.wait(500);

        cy.get("[class^=circle_circle]").as("circles");
        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2]).should("have.text", "1");
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(defaultColor));
        });

        cy.wait(500);

        cy.get("@deleteIndexButton")
            .invoke("attr", "class")
            .then((classList) => expect(classList).not.contain("loader"));

        cy.get('@deleteHeadButton').should("be.enabled");
        cy.get('@deleteTailButton').should("be.enabled");
        cy.get('@deleteIndexButton').should("be.enabled");
    });

});

export {};