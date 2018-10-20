// src/games/controller.ts
import { JsonController, Get, Param, Body, Patch, NotFoundError, Post, HttpCode, BadRequestError } from 'routing-controllers'
import Game from './entity'

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
        return game.save()
    }//end of @Post

    //------Step 4------
    @Patch('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) { 
        if(update.id)throw new BadRequestError('changing the game ID is not allowed')
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

    //------Step 5------
        if(update.color && !update.color.match(/^(red|green|blue|yellow|magenta)$/)) throw new BadRequestError('color validation check failed')
        console.log (update.color)
        return Game.merge(game, update).save()
    }//end of @Put


}