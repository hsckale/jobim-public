import { createElement } from "../../helpers/createElement";
import { db, storage } from "../../../sdks/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Album } from "../../interfaces/album";
import { Frame } from "../frame";
import { GenreString } from "../../enums/genreString";
import { ref, getDownloadURL } from "firebase/storage";
import { formatDuration } from "../../helpers/formatduration";
import { player } from "../player";

/**
 * Essa classe será utilizada para criar, renderizar e controlar a tela "ALBUM"
 */
export class AlbumFrame extends Frame {
    private albumId: string;

    /**
     * Método utilizado para renderizar o Frame na tela
     */
    public override render(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            super.render(); // Limpa a tela

            this.container.classList.add('album__frame__screen');

            // Acessar o banco de dados, com o ID que recebemos do construtor
            // e baixar os dados do álbum para renderizarmos a tela com estes dados
            const docRef = doc(db, 'albums', this.albumId);
            try {
                const albumDoc = await getDoc(docRef);

                if (!albumDoc.exists())
                    reject('ID inválido');

                const data = albumDoc.data() as Album;

                // Construa a tela do Album

                // Cabeçalho
                const header = createElement('header', this.container, ['album__header']);

                // Capa do album
                const cover = createElement('img', header, ['album__cover']) as HTMLImageElement;
                cover.src = './assets/images/coverPlaceHolder.png'; // Atribui a imagem de placeholder ao elemento de imagem

                const coverRef = ref(storage, `albums/${this.albumId}/cover.jpg`); // Cria uma referência do storage da imagem de capa
                getDownloadURL(coverRef).then(url => cover.src = url); // Obtém o URL da imagem e atribuir ao elemento de imagem

                // Div dados do album
                const headerDiv = createElement('div', header);

                // Titulo do album
                const title = createElement('h1', headerDiv);
                title.textContent = data.title;

                // Artista do album
                const artistName = createElement('p', headerDiv);
                artistName.textContent = data.artist.name;

                // Gênero album
                const genreElement = createElement('p', headerDiv);
                genreElement.textContent = GenreString[data.genre];

                // Data de lançamento
                const releaseDate = createElement('p', headerDiv);
                releaseDate.textContent = data.releaseDate.toDate().toLocaleDateString(); // Atribui a data de lançamento formatada de acordo com o idioma do dispositivo do usuário

                // Container de faixas
                const tracksContainer = createElement('table', this.container, ['tracks__table']); // Cria uma tabela

                const tracksTableHeader = createElement('tr', tracksContainer) as HTMLTableRowElement; // Linha do cabeçalho

                const trackTitleHeader = createElement('th', tracksTableHeader); // Célula Título
                trackTitleHeader.textContent = 'Título';

                const trackDurationHeader = createElement('th', tracksTableHeader); // Célula Duração
                trackDurationHeader.textContent = 'Duração';

                data.tracks.forEach((track, index) => { // Para cada track do álbum
                    const itemRow = createElement('tr', tracksContainer) as HTMLTableRowElement; // Cria uma linha na tabela

                    itemRow.addEventListener('click', async () => {
                        const trackRef = ref(storage, `albums/${this.albumId}/${index}.wav`); // Cria uma referência do storage do arquivo da música
                        const url = await getDownloadURL(trackRef); // Obtém o URL da música e atribui ao player
                        player.setSource(url);
                        player.play();
                    });

                    const trackTitle = createElement('td', itemRow); // Célula do título da faixa
                    trackTitle.textContent = track.title;

                    const trackDuration = createElement('td', itemRow); // Célula da duração da faixa
                    trackDuration.textContent = formatDuration(track.duration); // Atribui o texto formatado de acordo com os segundos de duração da track
                });

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    constructor(container: HTMLElement, albumId: string) {
        super(container); // Chama o construtor da superclasse

        this.albumId = albumId;
    }
};