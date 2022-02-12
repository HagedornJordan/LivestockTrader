import ToolCard from "./toolCard";

const AnimalCard = (props) => {
  return (
    <a href={"/animals/" + props.animal.id}>
      <div className="grow-0 shrink-1 w-80 h-90 border border-gray-400 rounded shadow-xl p-0 overflow-hidden">
        <div className="w-full h-60 ">
          <img className="w-full h-full" src={props.animal.image}></img>
        </div>
        <h2> {props.animal.title} </h2>
        <p> {props.animal.description}</p>
      </div>
    </a>
  );
};
export default AnimalCard;
