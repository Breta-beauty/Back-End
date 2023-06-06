import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './modules/authn/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
<<<<<<< HEAD
import { ProfileModule } from './modules/profile/profile.module';
=======
import { EmailModule } from './modules/email/email.module';
import * as Joi from '@hapi/joi';
>>>>>>> c6c0fbff7f61914cb89a487d16b92f3077b36f4d

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      csrfPrevention: false,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          extensions: {
            code: error.extensions.code,
            originalError: error.extensions.originalError,
          },
        };
        return graphQLFormattedError;
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
      })
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
<<<<<<< HEAD
    ProfileModule,
=======
    EmailModule,
>>>>>>> c6c0fbff7f61914cb89a487d16b92f3077b36f4d
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
