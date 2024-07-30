import type { FavoritePokemon } from "@interfaces/favorite-pokemon"
import { createSignal, Show, type Component } from "solid-js"


interface Props {
    pokemon: FavoritePokemon
}


export const FavoritePokemonCard: Component<Props> = (props) => {

    const [isVisible, setIsVisible] = createSignal(true)

    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemon.id}.png `


    const deleteFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]") as FavoritePokemon[];

        const newFavorites = favorites.filter(p => p.id !== props.pokemon.id)

        localStorage.setItem("favorites", JSON.stringify(newFavorites))
        setIsVisible(false)
    }


    return (
        <Show when={isVisible()}>
            <div class="flex flex-col items-center justify-center">
                <a href={`/pokemons/${props.pokemon.name}`}>
                    <img
                        src={imageSrc} alt={props.pokemon.name}
                        width={96}
                        height={96}
                        // la animacion al reves no se puede porque es generado del lado del cliente estas imagenes, pero de aca para el listado si
                        // debemos saber a que pantalla vamos, al reves el navegador no sabe a donde va porque no se genera la pantalla
                        style={`view-transition-name: ${props.pokemon.name}-image`}
                        />
                    <p class="capitalize">#{props.pokemon.id} {props.pokemon.name}</p>
                </a>

                <button onClick={deleteFavorite} class="text-red-400">Borrar</button>
            </div>
        </Show>
    )
}