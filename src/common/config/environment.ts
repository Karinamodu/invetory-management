import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from "@nestjs/mongoose";

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): MongooseModuleOptions{
        // const routingId = configService.get('MONGODB_URI')
        // .searchParams.get("options");
        configService.get('MONGODB_URI')
        // .searchParams.delete("options");
        return{
            uri: configService.get('MONGODB_URI'),
           
        }
    }
    
}

export const typeOrmConfigAsync: MongooseModuleAsyncOptions = {
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), //  MongoDB URI from environment variables
      }),
    inject: [ConfigService]
};