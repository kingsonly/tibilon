import AppModal from "./AppModal";

export default function DocumentsCard(props) {
  const { modalIsOpen, setIsOpen, id } = props;
  const [title, setTitle] = useState("");

  return (
    <div>
      <AppModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        project={id}
        title={"I dey try something"}
      >
        <div className="bg-red-700 h-96 w-40">

        </div>
      </AppModal>
    </div>
  );
}
