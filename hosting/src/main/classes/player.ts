import { formatDuration } from "../helpers/formatduration";

/**
 * Classe de instancia unica para gerenciar o player
 */
class Player {
    private duration: number;
    private elapsedTime: number;
    private elements: {
        elapsedTime: HTMLParagraphElement
        slider: HTMLInputElement,
        duration: HTMLParagraphElement,
        buttons: {
            shuffle: HTMLButtonElement,
            backward: HTMLButtonElement,
            play: HTMLButtonElement,
            forward: HTMLButtonElement,
            repeat: HTMLButtonElement
        },
        player: HTMLAudioElement;
    };

    /**
     * Metodo para atualizar os dados do player conforme os metadados do arquivo (duracao)
     * @param duration Duracao da musica
     */
    private setDuration(duration: number): void {
        this.duration = duration; // Salva a duracao nas propriedades da classe
        this.elements.duration.textContent = formatDuration(duration); // Atualiza o texto do elemento de duracao com a duracao formatada atraves da funcao auxiliar
    }

    private updateRangeBackgroundPosition(): void {
        const percent: number = Math.floor(parseInt(this.elements.slider.value) / parseInt(this.elements.slider.max) * 100);
        this.elements.slider.style.background = `linear-gradient(to right, #bbff00 0%, #bbff00 ${percent}%, #9e9e9e 0%, #9e9e9e 100%)`;
    }

    /**
     * Metodo para atualizar o source do player (referenciar o arquivo de audio)
     * @param path Caminho para o arquivo
     */
    public setSource(path: string): void {
        this.elements.player.src = path;
    }

    public play(): void {
        this.elements.player.play();
    }

    constructor() {
        // Recupera os elementos no HTML e armazena nas propriedade desta classe para utilizarmos posteriormente
        this.elements = {
            duration: document.getElementById('player__duration') as HTMLParagraphElement,
            elapsedTime: document.getElementById('player__elapsed-time') as HTMLParagraphElement,
            slider: document.getElementById('player__slider') as HTMLInputElement,
            player: document.getElementById('audio__element') as HTMLAudioElement,
            buttons: {
                shuffle: document.getElementById('player__shuffle__button') as HTMLButtonElement,
                backward: document.getElementById('player__backward__button') as HTMLButtonElement,
                play: document.getElementById('player__play__button') as HTMLButtonElement,
                forward: document.getElementById('player__forward__button') as HTMLButtonElement,
                repeat: document.getElementById('player__repeat__button') as HTMLButtonElement
            }
        };

        // Evento: Musica carregada - Recebe os metadados (duracao) do arquivo
        this.elements.player.addEventListener('loadedmetadata', () => {
            this.setDuration(this.elements.player.duration); // Recupera a duração do arquivo e armazena na propriedade da classe

            this.elements.slider.max = this.duration.toString(); // Define a quantidade máxima de posições do slider para a duração do arquivo
            this.elements.slider.value = '0'; // Define a posição atual do slider para o inicio
        });

        // Atribui o evento do botão de 'PLAY' para iniciar a reproducao do audio
        // Isto é feito aqui, pois o evento PAUSE não será chamado na construção da classe
        // Entao precisamos definir inicialmente uma vez a funcao do botao play para reproduzir a musica
        this.elements.buttons.play.addEventListener('click', () => {
            this.elements.player.play();
        });

        // Evento: Musica inicia reproducao
        this.elements.player.addEventListener('play', () => {
            this.elements.buttons.play.classList.add('playing'); // Remove o botao de play e mostra pause
            this.elements.buttons.play.addEventListener('click', () => {
                this.elements.player.pause(); // Altera a função do botão para pausar invés de dar play
            });
        });

        // Evento: Musica para a reproducao (seja por pausar ou por finalizar)
        this.elements.player.addEventListener('pause', () => {
            this.elements.buttons.play.classList.remove('playing'); // Exibir o botão play e remover o pause
            this.elements.buttons.play.addEventListener('click', () => {
                this.elements.player.play(); // Altera a função do botão para reproduzir invés de pausar
            });
        });

        // Evento: O tempo atual da musica foi atualizado (reproducao em andamento)
        this.elements.player.addEventListener('timeupdate', () => {
            this.elapsedTime = Math.floor(this.elements.player.currentTime); // Transforma a duracao em inteiro e armazena nas propriedades da classe
            this.elements.slider.value = this.elapsedTime.toString(); // Atualiza a posicao atual do slider para corresponder ao tempo atual da reproducao
            this.updateRangeBackgroundPosition();
            this.elements.elapsedTime.textContent = formatDuration(this.elapsedTime); // Atualiza o texto do elemento de tempo decorrido com o tempo atual da reproducao
        });

        // Evento: O usuário está alterando a posição do slider
        this.elements.slider.addEventListener('input', () => {
            this.updateRangeBackgroundPosition();
        });

        // Evento: O usuario alterou a posicao do slider
        this.elements.slider.addEventListener('change', () => {
            this.elements.player.currentTime = parseInt(this.elements.slider.value); // Define o tempo da reproducao para o selecionado com o slider
        });
    }
};

const player = new Player(); // Instancia a classe em um objeto

export { player }; // Exporta a instancia