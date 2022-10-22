import { Pokemon } from "../../interface";

interface Props {
    pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = (props) => {
    const { pokemons } = props;
    return (
        <div className="w-full grid grid-cols-8 gap-[32px] mt-[50px]">
            {pokemons.map((item: Pokemon) => {
                return (
                    <div
                        key={item.id}
                        className="bg-[#f4f1de] rounded-xl px-[16px] cursor-pointer"
                    >
                        <h2 className="text-[18.4px] font-medium text-center mt-[8px]">
                            {item.name}
                        </h2>
                        <img
                            src={item.sprites.front_default}
                            alt={item.name}
                            className="w-[100px] h-[100px] object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonList;
