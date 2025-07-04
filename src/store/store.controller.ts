import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StoreService } from './services/store.service';
import { CreateStoreDto } from './dto/create-store.dto/create-store.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { User, UserRole } from '../users/user.entity';

@Controller('store')
// @UseGuards(RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  create(
    @Body() createStoreDto: CreateStoreDto,
    @CurrentUser() user: User
  ) {
    return this.storeService.create(createStoreDto, user);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll(@CurrentUser() user: User) {
    return this.storeService.findAll(user);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: User
  ) {
    return this.storeService.findOne(+id, user);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateStoreDto: Partial<CreateStoreDto>,
    @CurrentUser() user: User
  ) {
    return this.storeService.update(+id, updateStoreDto, user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(
    @Param('id') id: string,
    @CurrentUser() user: User
  ) {
    return this.storeService.remove(+id, user);
  }
}
