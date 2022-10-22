import { request } from "./utils/request";
import { Pokemon } from "./interface";

import { useEffect, useState } from "react";

interface Pokemons {
    name: string;
    url: string;
}

const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    // get api :
    useEffect(() => {
        const pokeApi = async () => {
            const res = await request.get("", {
                params: {
                    limit: 20,
                    offset: 20,
                },
            });
            // setPokemons(res.data.results);
            res.data.results.forEach(async (item: Pokemons) => {
                const resP = await request.get(`${item.name}`);
                // setPokemons(resP.data); ==> đoạn nãy khi dùng map sẽ sai vif kết quả sẽ là 1 object mà ta dùng map
                // làm như sau : cho callBack trả về một array , sử dụng toán tử rest ... để giải những tk nhận được object nhận được trc đó vào mảng
                setPokemons((poke) => [...poke, resP.data]);
            });
        };
        pokeApi();
    }, []);
    console.log(pokemons);
    return (
        <div className="bg-[#3d405b]">
            <div className="my-[16px mx-[32px] min-h-screen">
                <div className="max-w-[1200px] mx-[auto]">
                    <h1 className="text-center text-[#81b29a] tracking-widest">
                        Pokemon
                    </h1>
                    <div className="w-full grid grid-cols-8 gap-[32px]">
                        {pokemons.map((item: Pokemon) => {
                            return (
                                <div
                                    key={item.id}
                                    className="bg-[#f4f1de] rounded-xl px-[16px]"
                                >
                                    <h2 className="text-[18.4px] font-medium text-center mt-[8px]">
                                        {item.name}
                                    </h2>
                                    <img
                                        src={item.sprites.front_default}
                                        alt={item.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
