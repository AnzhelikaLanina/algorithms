import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

it("Элемент без буквы рендерится без ошибок", () => {
    const circle = renderer.create(<Circle letter="" />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент с буквами рендерится без ошибок", () => {
    const circle = renderer.create(<Circle letter="буквы" />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент с head рендерится без ошибок", () => {
    const circle = renderer.create(<Circle head="head" />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент с tail рендерится без ошибок", () => {
    const circle = renderer.create(<Circle tail="tail" />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент с элементом в tail рендерится без ошибок", () => {
    const circle = renderer.create(<Circle tail={<Circle letter="tail" />} />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент с индексом рендерится без ошибок", () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент с пропом isSmall рендерится без ошибок", () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент в состоянии default рендерится без ошибок", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент в состоянии changing рендерится без ошибок", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
});

it("Элемент в состоянии modified рендерится без ошибок", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
});