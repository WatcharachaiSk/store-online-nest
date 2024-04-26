import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './users/role/role.module';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FOLDERPATH } from './constant/folder-path';
import { ImgsModule } from './imgs/imgs.module';


config(); // loads environment variables from .env file
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', FOLDERPATH.Public), // Specify the root path for static files
      serveRoot: '/public', // Serve static files for '/api' route
    }),
    RoleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ImgsModule,
    // MailModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
