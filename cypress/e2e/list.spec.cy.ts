/// <reference types="cypress" />
import {
    modifiedColor,
    changingColor,
    defaultColor,
    circles,
    container,
    inputList,
    inputIndexList,
    buttonAddHead,
    buttonAddTail,
    buttonAddIndex,
    buttonDeleteHead,
    buttonDeleteTail,
    buttonDeleteIndex,
    elementList,
    circleSmall
} from '../constants/constants';
describe("Проверка корректного выполнения действий на странице Очередь", function () {
    beforeEach(function () {
        cy.visit("/list");
    });

    it("Кнопки добавления недоступны, когда в инпуте пусто", function () {
        if (cy.get(inputList).should("have.value", "")) {
            cy.get(buttonAddHead).should("be.disabled");
            cy.get(buttonAddTail).should("be.disabled");
            cy.get(buttonAddIndex).should("be.disabled");
        }
    });

    it("Отрисовка дефолтного списка корректна", function () {
        cy.get(container).as("container");
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
        cy.get(buttonDeleteHead).should("be.enabled");
        cy.get(buttonDeleteTail).should("be.enabled");
        cy.get(buttonDeleteIndex).should("be.enabled");
    });

    it("Элемент добавляется в head корректно", function () {
        cy.get(buttonAddHead).as("addHeadButton");
        cy.get(buttonAddTail).as("addTailButton");
        cy.get(buttonDeleteHead).as("deleteHeadButton");
        cy.get(buttonDeleteTail).as("deleteTailButton");
        cy.get(buttonAddIndex).as("addIndexButton");
        cy.get(buttonDeleteIndex).as("deleteIndexButton");
        cy.get(circles).as("circles");

        cy.get(inputList).as("input")
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

        cy.get(elementList).then((circle) => {
            cy.wrap(circle[0])
                .find(circleSmall)
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

        cy.get(container).then((circle) => {
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
        cy.get(buttonAddHead).as("addHeadButton");
        cy.get(buttonAddTail).as("addTailButton");
        cy.get(buttonDeleteHead).as("deleteHeadButton");
        cy.get(buttonDeleteTail).as("deleteTailButton");
        cy.get(buttonAddIndex).as("addIndexButton");
        cy.get(buttonDeleteIndex).as("deleteIndexButton");
        cy.get(circles).as("circles");

        cy.get(inputList).as("input")
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

        cy.get(elementList).then((circle) => {
            cy.wrap(circle[3])
                .find(circleSmall)
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

        cy.get(circles).as("circles");

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

        cy.get(container).then((circle) => {
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
        cy.get(buttonAddHead).as("addHeadButton");
        cy.get(buttonAddTail).as("addTailButton");
        cy.get(buttonDeleteHead).as("deleteHeadButton");
        cy.get(buttonDeleteTail).as("deleteTailButton");
        cy.get(buttonAddIndex).as("addIndexButton");
        cy.get(buttonDeleteIndex).as("deleteIndexButton");
        cy.get(circles).as("circles");

        cy.get(inputList).as("input")
        cy.get("@input")
            .type("3")
            .should("have.value", "3");

        cy.get(inputIndexList).as("inputIndex")
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

        cy.get(elementList).then((circle) => {
            cy.wrap(circle[2])
                .find(circleSmall)
                .should("have.text", "3")
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get("@circles").then((circle) => {
            cy.wrap(circle[2])
                .invoke("attr", "class")
                .then((classList) => expect(classList).contains(changingColor));
        });

        cy.get(circles).as("circles");

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
        cy.get(buttonAddHead).as("addHeadButton");
        cy.get(buttonAddTail).as("addTailButton");
        cy.get(buttonDeleteHead).as("deleteHeadButton");
        cy.get(buttonDeleteTail).as("deleteTailButton");
        cy.get(buttonAddIndex).as("addIndexButton");
        cy.get(buttonDeleteIndex).as("deleteIndexButton");
        cy.get(circles).as("circles");

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

        cy.get(elementList).then((circle) => {
            cy.wrap(circle[0])
                .find(circleSmall)
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

        cy.get(circles).as("circles");

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

        cy.get(container).then((circle) => {
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
        cy.get(buttonAddHead).as("addHeadButton");
        cy.get(buttonAddTail).as("addTailButton");
        cy.get(buttonDeleteHead).as("deleteHeadButton");
        cy.get(buttonDeleteTail).as("deleteTailButton");
        cy.get(buttonAddIndex).as("addIndexButton");
        cy.get(buttonDeleteIndex).as("deleteIndexButton");
        cy.get(circles).as("circles");

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

        cy.get(elementList).then((circle) => {
            cy.wrap(circle[3])
                .find(circleSmall)
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

        cy.get(circles).as("circles");

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

        cy.get(container).then((circle) => {
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
        cy.get(buttonAddHead).as("addHeadButton");
        cy.get(buttonAddTail).as("addTailButton");
        cy.get(buttonDeleteHead).as("deleteHeadButton");
        cy.get(buttonDeleteTail).as("deleteTailButton");
        cy.get(buttonAddIndex).as("addIndexButton");
        cy.get(buttonDeleteIndex).as("deleteIndexButton");
        cy.get(circles).as("circles");

        cy.get(inputIndexList).as("inputIndex")
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

        cy.get(elementList).then((circle) => {
            cy.wrap(circle[2])
                .find(circleSmall)
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

        cy.get(circles).as("circles");
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