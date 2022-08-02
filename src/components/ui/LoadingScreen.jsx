export default function LoadingScreen({ home }) {
  return (
    <div
      className={`ui__container-loading d-flex justify-content-center align-items-center ${
        home && "bg-primary"
      }`}
    >
      <i className="fab fa-10x fa-react fa-spin" />
    </div>
  );
}
