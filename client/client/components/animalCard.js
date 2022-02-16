import ToolCard from "./toolCard";
import Image from "next/image";

const AnimalCard = props => {
  return (
    <a href={"/animals/" + props.animal.id}>
      <div className="grow-0 shrink-1 w-80 h-90 border border-gray-400 rounded shadow-xl p-0 overflow-hidden">
        <div className="w-full h-60 relative">
          <Image
            layout="fill"
            quality={100}
            objectFit="cover"
            src={
              process.env.NEXT_PUBLIC_API_BASE.toString() +
              "/animalImage/" +
              props.animal.id +
              "/0"
            }
          />
        </div>
        <h2>
          {" "}{props.animal.title}{" "}
        </h2>
        <p>
          {" "}{props.animal.description}
        </p>
      </div>
    </a>
  );
};
export default AnimalCard;
