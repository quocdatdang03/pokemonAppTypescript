import { TiTimesOutline } from "react-icons/ti";
import { Detail } from "./PokemonsList";

interface Props {
    name: string;
    id: number;
    image: string;
    showView: Detail;
    setShowView: React.Dispatch<React.SetStateAction<Detail>>;

    // phải hoặc undefinded vì nó báo :  Type 'undefined' is not assignable to type 'PokemonDetail[]
    // abilitie : có thể là undefined nên mới thêm như vậy
    abilities:
        | {
              ability: {
                  name: string;
              };
          }[]
        | undefined;
}

const PokemonItem: React.FC<Props> = (props) => {
    const { name, id, image, showView, setShowView, abilities } = props;

    // handle close view item :
    const handleCloseViewItem = () => {
        setShowView({ id: 0, isShow: false });
    };
    console.log(showView);
    return (
        <div>
            {showView.id === id && showView.isShow === true ? (
                <div className="w-full min-h-screen h-screen">
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[270px] h-[300px] bg-[#f4f1de] rounded-xl overflow-hidden">
                        <div className="bg-gradient-to-b from-[#f4f1de] to-[#f3cd91] flex flex-col p-[10px]">
                            <button
                                className="self-end p-[5px]"
                                onClick={handleCloseViewItem}
                            >
                                <TiTimesOutline size={"24px"} />
                            </button>
                            <div className="flex items-center justify-center">
                                <img src={image} alt={name} />
                                <h2 className="pokemon-name text-[24px]">
                                    {name}
                                </h2>
                            </div>
                        </div>
                        <div className=" p-[10px]">
                            <p className="text-[24px] font-bold">Abilities:</p>
                            <ul>
                                {abilities?.map((item, index) => {
                                    return (
                                        <li
                                            className="mr-[10px] list-disc list-inside"
                                            key={index}
                                        >
                                            {item.ability.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                showView.isShow === false && (
                    <div
                        key={id}
                        className="bg-[#f4f1de] rounded-xl px-[16px] cursor-pointer"
                    >
                        <h2 className="pokemon-name">{name}</h2>
                        <img
                            src={image}
                            alt={name}
                            className="w-[100px] h-[100px] object-cover"
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default PokemonItem;
