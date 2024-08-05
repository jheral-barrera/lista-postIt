import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Tarea } from "./Tarea";

const KEY = "PostItApp.tareas";

export function Lista() {
  const [tareas, setTareas] = useState([]);

  const tituloRef = useRef();
  const descripcionRef = useRef();
  const checkRef = useRef();

  useEffect(() => {
    const devolverTareas = JSON.parse(localStorage.getItem(KEY))
    console.log('recuperar', devolverTareas);

    if (devolverTareas) {
      setTareas(devolverTareas);
    }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(tareas))
    localStorage.setItem(KEY, JSON.stringify(tareas));
  }, [tareas]);

  const ingresarTarea = () => {
    const titulo = tituloRef.current.value;
    const descripcion = descripcionRef.current.value;
    const importante = checkRef.current.checked;
    const id = uuid();

    if (titulo === "") return alert("Ingresa un titulo al post it");

    setTareas((tareasPrev) => {
      const nuevaTarea = {
        id: id,
        titulo: titulo,
        descripcion: descripcion,
        importante: importante,
      };
      return [...tareasPrev, nuevaTarea];
    });

    tituloRef.current.value = "";
    descripcionRef.current.value = "";
    checkRef.current.checked = false;
  };

  const eliminarTareas = (id) => {
    const tareaBorrada = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareaBorrada);
  };

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
          <input
            className="form-check-input check mt-3"
            type="checkbox"
            ref={checkRef}
          />
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
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4 p-5">
        {tareas.map((tarea) => (
          <Tarea tarea={tarea} key={tarea.id} eliminarTareas={eliminarTareas} />
        ))}
      </div>
    </div>
  );
}