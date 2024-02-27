/// <reference types="cypress" />
describe("Проверка корректного выполнения действий на странице Строка", function () {
  const defaultColor = "circle_default";
  const changingColor = "circle_changing";
  const modifiedColor = "circle_modified";

  beforeEach(function () {
    cy.visit("/recursion");
  });

  it("Кнопка добавления недоступна, когда в инпуте пусто", function () {
    if (cy.get('[data-test="input-string"]').should("have.value", "")) {
      cy.get('[data-test="button-string"]').should("be.disabled");
    }
  });

  it("Разворот строки корректен", function () {
    cy.get('[data-test="input-string"]')
        .type("строка")
        .should("have.value", "строка");

    cy.get('[data-test="button-string"]').as("button");
    cy.get("@button")
        .click()
        .should("be.disabled")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contain("loader"));

    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles")
        .should("have.length", 6)
        .then((circle) => {
          cy.wrap(circle[0])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[0]).should("have.text", "с");

          cy.wrap(circle[1])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(defaultColor));
          cy.wrap(circle[1]).should("have.text", "т");

          cy.wrap(circle[2])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(defaultColor));
          cy.wrap(circle[2]).should("have.text", "р");

          cy.wrap(circle[3])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(defaultColor));
          cy.wrap(circle[3]).should("have.text", "о");

          cy.wrap(circle[4])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(defaultColor));
          cy.wrap(circle[4]).should("have.text", "к");

          cy.wrap(circle[5])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[5]).should("have.text", "а");
        });

    cy.get("@circles")
        .should("have.length", 6)
        .then((circle) => {
          cy.wrap(circle[0])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[0]).should("have.text", "а");

          cy.wrap(circle[1])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[1]).should("have.text", "т");

          cy.wrap(circle[2])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(defaultColor));
          cy.wrap(circle[2]).should("have.text", "р");

          cy.wrap(circle[3])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(defaultColor));
          cy.wrap(circle[3]).should("have.text", "о");

          cy.wrap(circle[4])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[4]).should("have.text", "к");

          cy.wrap(circle[5])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[5]).should("have.text", "с");
        });

    cy.get("@circles")
        .should("have.length", 6)
        .then((circle) => {
          cy.wrap(circle[0])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[0]).should("have.text", "а");

          cy.wrap(circle[1])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[1]).should("have.text", "к");

          cy.wrap(circle[2])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[2]).should("have.text", "р");

          cy.wrap(circle[3])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[3]).should("have.text", "о");

          cy.wrap(circle[4])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[4]).should("have.text", "т");

          cy.wrap(circle[5])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[5]).should("have.text", "с");
        });

    cy.get("@circles")
        .should("have.length", 6)
        .then((circle) => {
          cy.wrap(circle[0])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[0]).should("have.text", "а");

          cy.wrap(circle[1])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[1]).should("have.text", "к");

          cy.wrap(circle[2])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(changingColor));
          cy.wrap(circle[2]).should("have.text", "о");

          cy.wrap(circle[3])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[3]).should("have.text", "р");

          cy.wrap(circle[4])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[4]).should("have.text", "т");

          cy.wrap(circle[5])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[5]).should("have.text", "с");
        });

    cy.get("@circles")
        .should("have.length", 6)
        .then((circle) => {
          cy.wrap(circle[0])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[0]).should("have.text", "а");

          cy.wrap(circle[1])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[1]).should("have.text", "к");

          cy.wrap(circle[2])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[2]).should("have.text", "о");

          cy.wrap(circle[3])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[3]).should("have.text", "р");

          cy.wrap(circle[4])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[4]).should("have.text", "т");

          cy.wrap(circle[5])
              .invoke("attr", "class")
              .then((classList) => expect(classList).contains(modifiedColor));
          cy.wrap(circle[5]).should("have.text", "с");
        });

    cy.get("@button")
        .should("be.enabled")
        .invoke("attr", "class")
        .then((classList) => expect(classList).not.contain("loader"));
  });
})

export {};