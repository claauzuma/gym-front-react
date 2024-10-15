
  /* eslint-disable-next-line react/prop-types */
const ModalAddMember = ({ onClose, onMember, onParticularClass }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-4/5 sm:w-1/3">
          <h2 className="text-xl mb-4">Selecciona una opción</h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={onMember}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Miembro
            </button>
            <button
              onClick={onParticularClass}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Clase particular
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  };