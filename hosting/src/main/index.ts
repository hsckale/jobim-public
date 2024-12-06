import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
import { auth } from "../sdks/firebase"
// import { db } from "../sdks/firebase";
import { AlbumFrame } from "./classes/frames/albumFrame";

const elements = {
    username: document.getElementById('username'),
    frameContainer: document.getElementById('screen__container')
};

// Evento que eh executado quando o estado de autenticacao do usuario muda
// De nao autenticado para autenticado e vice e versa
onAuthStateChanged(auth, async user => {
    if (user) { // O usuario esta autenticado
        try {
            // Temporariamente desativado
            // const docRef = doc(db, 'users', user.uid); // Faz uma referencia ao documento do usuario no db
            // const userDoc = await getDoc(docRef); // Baixa o documento do usuario
            // const data = userDoc.data(); // Recupera os dados do documento do usuario

            // elements.username.textContent = data.name; // Atualiza o elemento username para o nome do usuario

        } catch (error) {
            console.error(error);
        }
    } // else // O usuario nao esta autenticado
    // window.location.href = 'index.html'; // Redireciona para a tela de login
});

// Em implementação
(async function renderScreen() {
    const params = new URLSearchParams(window.location.search);
    const queryFrame = params.get('t');

    switch (queryFrame) {
        case 'album':
            const queryId = params.get('id');
            if (queryId === null)
                return window.alert('ID não informado');

            try {
                const frame = new AlbumFrame(elements.frameContainer, queryId);
                await frame.render();

                // continua
            } catch (error) {
                // erro vem pra cá
                return window.alert(error);
            }
            break;
        default:
            break;
    }
})();