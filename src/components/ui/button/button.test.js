import {Button} from './button';
import renderer from "react-test-renderer";

it("Кнопка c текстом рендерится без ошибок", () => {
    const button = renderer.create(<Button text="Кнопка с текстом" />).toJSON();
    expect(button).toMatchSnapshot();
});

it("Кнопка без текста рендерится без ошибок", () => {
    const button = renderer.create(<Button text="" />).toJSON();
    expect(button).toMatchSnapshot();
});

it("Заблокированная кнопка рендерится без ошибок", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
});

it("Кнопка c индикацией загрузки рендерится без ошибок", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
});