// src/games/controller.ts
import { JsonController, Get, Param, Body, Patch, NotFoundError, Post, HttpCode } from 'routing-controllers'
import Game from './entity'

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  } //end of getRandomNumber: use this to generate a random integer, define the maximum in the parameter

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }//end of @Get

    //------Step 2------
    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }//end of @Get

    //------Step 3------
    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        console.log(game)
        let colors = ['red','green','blue','magenta','yellow']
        game.color= colors[getRandomNumber(colors.length)]
        game.board='[]'
        return game.save()
    }//end of @Post

    //------Step 4------
    @Patch('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

        return Game.merge(game, update).save()
    }//end of @Put


}