export interface Pokemon {
    name: string;
    id: number;
    sprites: {
        front_default: string;
    };
}

export interface PokemonDetail extends Pokemon {
    // abilities : là một mảng chứa object
    // phải cho abilities là thuộc tính không bắt buộc "?" vì nó chỉ có khi showView lên
    abilities?: {
        ability: {
            name: string;
        };
    }[];
}
