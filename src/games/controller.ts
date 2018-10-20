// src/games/controller.ts
import { JsonController, Get, Param, Body, Patch, NotFoundError, Post, HttpCode, BadRequestError } from 'routing-controllers'
import Game from './entity'


const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    //------Step 2------
    //create a GET /games endpoint that returns all the games
    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }//end of @Get

    //------Step 3------
    //Add an endpoint POST /games for which the only input is a name.
    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        return game.save()
    }//end of @Post

    //------Step 4------
    //Add an endpoint PATCH /games/:id that allows to overwrite one or more fields of the game.
    @Patch('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        //(not for id)
        if(update.id)throw new BadRequestError('changing the game ID is not allowed')
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

    //------Step 5------
    //Validate that the color is one of these colors.
        if(update.color && !update.color.match(/^(red|green|blue|yellow|magenta)$/)) throw new BadRequestError('color validation check failed')

    //------Step 7------
    //Make sure only 1 move is made per request.
        if(update.board && moves(JSON.parse(update.board),game.board)>1) throw new BadRequestError('move count exceeds 1')
        return Game.merge(game, update).save()
    }//end of @Patch

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }//end of @Get
}