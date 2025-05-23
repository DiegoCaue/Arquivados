import { useState } from "react";
import Header from "../../components/header";
import LeftPanel from "../../components/left-panel";
import NotesList from "../../components/notes-list";
import Note from "../../components/note";
import NoteOptions from "../../components/note-options";
import "./styles.css";

function Notes() {
  // Estado para filtrar por tag
  const [tag, setTag] = useState('');
  // Estado para nota selecionada (objeto ou null)
  const [nota, setNota] = useState(null);
  // Estado para exibir somente notas arquivadas
  const [somenteArquivadas, setSomenteArquivadas] = useState(false);
  // Valor que muda sempre que precisamos recarregar a lista
  const [atualizarLista, setAtualizarLista] = useState(0);

  return (
    <>
      <div className="page__container">
        {/* Painel lateral com filtros de tag e notas arquivadas */}
        <LeftPanel 
          enviarTag={tag => setTag(tag)} 
          listarSomenteArquivadas={arquivadas => setSomenteArquivadas(arquivadas)}
        />

        <div className="page__content">
          {/* Cabeçalho com menu de usuário */}
          <Header/>

          <div className="page__content__main">
            {/* Lista de notas, recebe callbacks e flags */}
            <NotesList 
              enviarNota={nota => setNota(nota)} 
              tagSelecionada={tag} 
              somenteArquivadas={somenteArquivadas} 
              atualizarLista={atualizarLista}
            />

            {/* Componente de exibição/edição de nota selecionada */}
            <Note 
              notaSelecionada={nota}
              aoFecharANota={() => {
                setNota(null);
                // força recarga da lista
                setAtualizarLista(atualizarLista + 1);
              }}
            />

            {/* Opções (Arquivar/Deletar) só aparecem se há nota selecionada */}
            {nota && (
              <NoteOptions 
                notaSelecionada={nota}
                aoFecharANota={() => {
                  setNota(null);
                  setAtualizarLista(atualizarLista + 1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
