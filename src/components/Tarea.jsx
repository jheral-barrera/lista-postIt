export function Tarea({ tarea, eliminarTareas }) {
  // array que contiene los diferentes postIt
  const postIt = ["postIt1", "postIt2", "postIt3", "postIt4"];
  const postItImportante = ["postItImportante1", "postItImportante2"];

  // se crea la función para generar un numero random
  const numeroAleatorio = (numeroMax) => Math.floor(Math.random() * numeroMax);

  // destructuracion de objeto en el array tarea
  const { id, titulo, descripcion, importante } = tarea;

  return (
    <div className="col">
      {/* if tereneario para asignarle las clases ocupando el numero aleatorio */}
      <div
        className={
          importante
            ? postItImportante[numeroAleatorio(postItImportante.length)]
            : postIt[numeroAleatorio(postIt.length)]
        }
      >
      <div onClick={() => eliminarTareas(id)} className="postBorrarIcono">
          x
        </div>
        {titulo}
        <div className="descripcion">{descripcion}</div>
      </div>
    </div>
  );
}
