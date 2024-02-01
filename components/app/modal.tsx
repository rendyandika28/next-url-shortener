type AppModalType = {
  children: React.ReactNode
  id: string
}

const AppModal = ({ children, id }: AppModalType) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-h-[80vh] overflow-scroll">
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AppModal;
