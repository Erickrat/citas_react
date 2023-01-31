import { useState, useEffect } from "react";
import { Error } from "./Error";

export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setError(true);
            return;

        }

        setError(false)
        // Objeto de Paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if(paciente.id) {
            // Editando el Registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

            setPacientes(pacientesActualizados)
            setPaciente({})

        } else {
            // Nuevo registro
            objetoPaciente.id = generarId();
            console.log(objetoPaciente)
            setPacientes([...pacientes, objetoPaciente]);
        }

        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setSintomas("");


    }


    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-2xl text-center">Seguimiento de pacientes</h2>
            <p className="text-xl mt-5 mb-6 text-center">Añade pacientes y {" "}
                <span className="text-indigo-600">Adminístralos</span>
            </p>
            <form className=" bg-white shadow-md rounded-lg py-6 px-5 mb-7"
                onSubmit={handleSubmit}>
                {error && <Error />}
                <div className="mb-5">

                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre de la Mascota</label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md hover:border-gray-300"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}>
                    </input>
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre del Propietario</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md hover:border-gray-300"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}>
                    </input>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@ejemplo.com"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md hover:border-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha</label>
                    <input
                        id="fecha"
                        type="date"
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md hover:border-gray-300"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}>
                    </input>
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
                    <textarea
                        id="sintomas"
                        type="text"
                        placeholder="Describa los síntomas..."
                        className=" border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md hover:border-gray-300"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}>
                    </textarea>
                </div>
                <input
                    type="submit"
                    value={ Object.keys(paciente).length > 0 ? "Editar paciente" : "Agregar paciente"}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800">

                </input>
            </form>
        </div>
    )
}
