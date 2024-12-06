export class Frame {
    protected container: HTMLElement;

    public async render(): Promise<void> {
        this.container.innerHTML = ''; // Limpa a tela
        this.container.classList.value = '';
    }

    constructor(container: HTMLElement) {
        this.container = container;
    }
};