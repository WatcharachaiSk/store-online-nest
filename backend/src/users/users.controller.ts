import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {

  }

  // @Get('/:id')
  // findById(@Param('id') id: string) {
  //   return this.userService.findById(+id);
  // }

  @Post('')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  
  @UseGuards(AuthGuard)
  @Get('')
  find() {
    return this.userService.find();
  }
}
