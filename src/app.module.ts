import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { default as config } from '../configs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, UsersModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('db');
        const userString = dbConfig.user && dbConfig.pass ? `${dbConfig.user}:${dbConfig.pass}@` : '';
        const authSource = dbConfig.authSource ? `?authSource=${dbConfig.authSource}&w=1` : '';
        const uri = `mongodb://${userString}${dbConfig.host}:${dbConfig.port || '27017'}/${dbConfig.database}${authSource}`;
        return { uri };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}