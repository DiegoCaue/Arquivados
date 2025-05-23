import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function NotesList({ enviarNota, tagSelecionada, somenteArquivadas, atualizarLista }) {
  // Estado que guarda o array de notas vindas do servidor
  const [notes, setNotes] = useState([]);

  // useEffect para carregar as notas ao montar o componente
  useEffect(() => { 
    getNotes(); 
  }, []);  // executa apenas uma vez, ao montar

  // Recarrega as notas sempre que a tag selecionada mudar
  useEffect(() => { 
    getNotes(); 
  }, [tagSelecionada]);

  // Recarrega as notas sempre que o filtro de arquivadas mudar
  useEffect(() => { 
    getNotes(); 
  }, [somenteArquivadas]);

  // Recarrega as notas sempre que a flag de atualização mudar
  useEffect(() => { 
    getNotes(); 
  }, [atualizarLista]);

  // Função que busca todas as notas e aplica os filtros de tag e arquivamento
  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes');
      let data = await response.json();

      // Filtra por tag, se houver uma selecionada
      if (tagSelecionada) {
        data = data.filter(note =>
          note.tags.map(t => t.trim()).includes(tagSelecionada)
        );
      }
      // Filtra somente as notas arquivadas, se solicitado
      if (somenteArquivadas) {
        data = data.filter(note => note.archived === true);
      }

      // Atualiza o estado com as notas filtradas
      setNotes(data);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      toast.error("Não foi possível carregar as notas.");
    }
  }

  // Função para criar uma nova nota vazia e recarregar a lista
  const onCreateNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "1",                          // ID fixo de usuário por enquanto
          title: "Nova anotação",               // Título padrão
          description: "Escreva aqui sua descrição", // Descrição padrão
          tags: [],                             // Sem tags iniciais
          image: "assets/sample.png",           // Imagem padrão
          date: new Date().toISOString()        // Data atual em ISO
        })
      });

      if (response.ok) {
        // Notifica sucesso e recarrega as notas
        toast.success("Anotação criada com sucesso!");
        await getNotes();
      } else {
        // Notifica erro se não retornar 2xx
        toast.error("Erro ao criar uma nota, tente novamente");
      }
    } catch (error) {
      console.error("Erro ao criar nota:", error);
      toast.error("Erro de rede ao criar a nota.");
    }
  }

  return (
    <div className="page__content__main__notes">
      {/* Botão para criar uma nova nota */}
      <button className="btn__primary" onClick={onCreateNote}>
        + Create New Note
      </button>

      <div className="notes__list">
        {/* Gera um card para cada nota disponível */}
        {notes.map(note => (
          <div
            className="note__item"
            key={note.id}
            onClick={() => enviarNota(note)}  // Ao clicar, seleciona a nota para edição/exibição
          >
            {/* Miniatura da imagem da nota */}
            <div
              className="image"
              style={{ backgroundImage: `url('${note.image}')` }}
            ></div>
            <div className="texts">
              {/* Título da nota */}
              <p className="title">{note.title}</p>
              {/* Lista de tags da nota */}
              <div className="tags">
                {note.tags.map(tag => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {/* Data de edição formatada */}
              <p className="date">
                {new Date(note.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
