// src/games/controller.ts
import { JsonController, Get, Param, Body, Post, Put } from 'routing-controllers'
import gamesById, { Game } from './data'

type GameList = { games: Game[] }

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ): Game {
        return gamesById[id]
    } //end of @Get

    //------Step 2-------
    //create a GET /games endpoint that returns all the games (with envelope!)

    @Get('/games')
    allGames(): GameList {
        return {
            games: Object.keys(gamesById).map(key => gamesById[key])
        }
    }//end of @Get 

    //------Step 3------
    //Add an endpoint POST /games for which the only input is a name.
    @Post('/games')
    createGame(
        @Body() body: Game
    ): Game {
        console.log('receiving new game content:', body)
        return body
    }
    //------Step 4------
    @Put('/games/:id')
    updateGame(
        @Param('id') id: number,
        @Body() body: Partial<Game>
    ): Game {
        console.log(`Incoming PUT body param:`, body)
        return gamesById[id]
    }

}