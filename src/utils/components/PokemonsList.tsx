import { useState } from "react";

import { Pokemon, PokemonDetail } from "../../interface";
import PokemonItem from "./PokemonItem";

interface Props {
    pokemons: PokemonDetail[];
}

export interface Detail {
    id: number;
    isShow: boolean;
}

const PokemonList: React.FC<Props> = (props) => {
    const { pokemons } = props;
    const [showView, setShowView] = useState<Detail>({ id: 0, isShow: false });

    // handle show view item
    const handleShowViewItem = (id: number) => {
        if (showView.isShow === false) {
            setShowView({ id: id, isShow: true });
        }
    };

    return (
        <div className="w-full grid grid-cols-8 gap-[32px] mt-[50px]">
            {pokemons.map((item: PokemonDetail) => {
                return (
                    <div
                        onClick={() => handleShowViewItem(item.id)}
                        key={item.id}
                    >
                        <PokemonItem
                            name={item.name}
                            image={item.sprites.front_default}
                            id={item.id}
                            showView={showView}
                            setShowView={setShowView}
                            abilities={item.abilities}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonList;
