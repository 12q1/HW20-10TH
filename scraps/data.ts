// src/games/data.ts
//temporary database just to get the ball rolling


//---------Step 1.1----------
//Create a games table with model using TypeORM. A game should have an id, a name, a color and board field. 
//Both the name and color fields are text fields, the board field is of type json.

export interface Game {
    id: number,
    name: string,
    color: string,
    board: string,    
}

interface GameDatabase{
    [id:number]: Game
}

//colors: red, blue, green, yellow, magenta
const gamesById: GameDatabase ={
    1: {
        id: 1,
        name: "Game One",
        color: "red",
        board: "placeholder someJSONstring"
    },
    2: {
        id: 2,
        name: "Game Two",
        color: "green",
        board: "placeholer someJSONstring"
    },
    3: {
        id: 3,
        name: "Game Three",
        color: "blue",
        board: "placeholer someJSONstring"
    }
}

export default gamesById