import { HTMLElementAttribute } from "../interfaces/HTMLElementAttribute";

export function createElement(tag: string, parent: HTMLElement, classes?: Array<string>, attributes?: Array<HTMLElementAttribute>): HTMLElement {
    const element = document.createElement(tag);
    parent.appendChild(element);

    if (classes)
        element.classList.add(...classes);

    if (attributes)
        attributes.forEach(attribute => {
            element.setAttribute(attribute.tag, attribute.value);
        });

    return element;
}