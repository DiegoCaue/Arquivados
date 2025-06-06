import { faBoxArchive, faHouse, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./style.css";

function LeftPanel({ enviarTag, listarSomenteArquivadas }) {
  // Lista de tags vindas do servidor
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Carrega tags ao montar componente
    getTags();
  }, []);

  const getTags = async () => {
    const response = await fetch('http://localhost:3000/tags');
    const data = await response.json();
    setTags(data);
  }

  // Função para mostrar todas as notas (sem filtro)
  const aoListarTodasAsNotas = () => {
    enviarTag(null);
    listarSomenteArquivadas(false);
  }

  return (
    <nav className="left-panel">
      {/* Logo da aplicação */}
      <img className="logo" src="assets/logo.svg" alt="Logo da aplicação." />

      <div className="buttons-container">
        <button onClick={aoListarTodasAsNotas}>
          <FontAwesomeIcon icon={faHouse} className="icon" />
          All Notes
        </button>

        <button onClick={() => listarSomenteArquivadas(true)}>
          <FontAwesomeIcon icon={faBoxArchive} className="icon" />
          Archived Notes
        </button>
      </div>

      <div className="tags-container">
        <span className="tag">Tags</span>
        {/* Botões para cada tag */}
        {tags.map(tag => (
          <button key={tag.id} onClick={() => enviarTag(tag.name)}>
            <FontAwesomeIcon icon={faTag} className="icon" />
            {tag.name}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default LeftPanel;
