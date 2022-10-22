import { request } from "./utils/request";
import { Pokemon } from "./interface";

import { useEffect, useState } from "react";
import PokemonList from "./utils/components/PokemonsList";
import { SpinnerCircular, SpinnerCircularFixed } from "spinners-react";

interface Pokemons {
    name: string;
    url: string;
}

const App: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingNext, setLoadingNext] = useState<boolean>(false);
    // get api :
    useEffect(() => {
        const pokeApi = async () => {
            setLoading(true);
            const res = await request.get("", {
                params: {
                    limit: 20,
                    offset: 20,
                },
            });
            setNextUrl(res.data.next);
            // setPokemons(res.data.results);
            res.data.results.forEach(async (item: Pokemons) => {
                const resP = await request.get(`${item.name}`);
                // setPokemons(resP.data); ==> đoạn nãy khi dùng map sẽ sai vif kết quả sẽ là 1 object mà ta dùng map
                // làm như sau : cho callBack trả về một array , sử dụng toán tử rest ... để giải những tk nhận được object nhận được trc đó vào mảng
                setPokemons((poke) => [...poke, resP.data]);
                setLoading(false);
            });
        };
        pokeApi();
    }, []);
    console.log(pokemons);

    // handle Load more :
    const handleLoadMore = () => {
        setLoadingNext(true);
        const pokeNextApi = async () => {
            const res = await request.get(nextUrl);
            // sau khi nhận nextURL thì tiếp tục setNextUrl tiếp để lấy url các item tiếp theo phía sau nó mỗi lần click loadmore
            setNextUrl(res.data.next);
            res.data.results.forEach(async (item: Pokemons) => {
                const resP = await request.get(`${item.name}`);
                setPokemons((poke) => [...poke, resP.data]);
                setLoadingNext(false);
            });
        };

        setTimeout(() => {
            pokeNextApi();
        }, 1000);
    };

    return (
        <div className="bg-[#3d405b]">
            <div className="my-[16px mx-[32px] min-h-screen">
                <div className="max-w-[1200px] mx-[auto] flex flex-col">
                    <h1 className="text-center text-[#81b29a] tracking-widest">
                        Pokemon
                    </h1>

                    {loading ? (
                        <div className=" w-full h-full flex items-center justify-center">
                            <SpinnerCircular
                                enabled={true}
                                size={80}
                                thickness={150}
                            />
                        </div>
                    ) : (
                        <PokemonList pokemons={pokemons} />
                    )}
                    {loadingNext ? (
                        <div className="mx-auto mt-[20px]">
                            <SpinnerCircularFixed
                                enabled={true}
                                size={50}
                                thickness={150}
                            />
                        </div>
                    ) : (
                        <button
                            className="text-[20px] bg-[#74a88e] font-medium rounded-[16px] px-[20px] py-[5px] text-white mt-[20px] mx-[auto]"
                            onClick={handleLoadMore}
                        >
                            Load more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
