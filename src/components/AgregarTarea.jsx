import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";

export function AgregarTarea() {
  const [tareas, setTareas] = useState([]);

  const tituloRef = useRef();
  const descripcionRef = useRef();
  const checkRef = useRef();

  const ingresarTarea = () => {
    // se obtiene el valor de los campos y generamos un id único
    const titulo = tituloRef.current.value;
    const descripcion = descripcionRef.current.value;
    const importante = checkRef.current.checked;
    const id = uuid();
    // no retorna nada en caso de estar la tarea vacía
    if (titulo === "") {
      return alert("Ingresa una descripción");
    } else {
      // creamos la nueva tarea agregándoles los valores de input
      setTareas((tareasPrev) => {
        //recorremos el array de tareas
        const nuevaTarea = {
          id: id,
          titulo: titulo,
          descripcion: descripcion,
          importante: importante,
        };
        // le agregamos la nueva tarea al array
        return [...tareasPrev, nuevaTarea];
      });
      // borrar el texto de los input al agregar una tarea
      tituloRef.current.value = null;
      descripcionRef.current.value = null;
      checkRef.current.checked = null;
    }
  };

    const eliminarTareas = (id) => {
        const tareaBorrada = tareas.filter( (tarea) => tarea.id !== id ) 
        return setTareas(tareaBorrada)
    }

  return (
    <div className="d-grid gap-2 w-100 ">
      <div className="row shadow p-3 px-5 ">
        <div className="col col-12">
          <h1 className="text-center text-dark ">ᓚᘏᗢ POST IT</h1>
        </div>
        <div className="col col-md-3 col-sm-12 col-12 mt-1">
          <label>titulo</label>
          <input
            ref={tituloRef}
            className="form-control"
            type="text"
            placeholder="Comprar pan, Jugar..."
          />
        </div>
        <div className="col col-md-4 col-sm-12 col-12 mt-1">
          <label>Descripcion</label>
          <input
            ref={descripcionRef}
            className="form-control"
            type="text"
            placeholder="En la tienda, Jugar Mario Bros..."
          />
        </div>
        <div className="col col-md-2 col-sm-12 col-12 mt-1 justify-content-center align-self-center ">
          <input className="form-check-input check mt-3" type="checkbox" />
          <label className="labelCheck text-dark fs-6">Importante!</label>
        </div>
        <div className="col col-md-3 col-sm-12 col-12 mt-1 justify-content-center align-self-center mt-4">
          <button
            onClick={ingresarTarea}
            className="btn btn-dark form-control"
            type="button"
          >
            AGREGAR TAREA
          </button>
        </div>
      </div>
    </div>
  );
}
