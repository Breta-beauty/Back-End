import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/authn/auth.module';
import { EmailModule } from './modules/email/email.module';
import { SalonModule } from './modules/salon/salon.module';
import { RatingModule } from './modules/rating/rating.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AddressModule } from './modules/address/address.module';
import { ServicesModule } from './modules/services/services.module';
import { DatabaseModule } from './modules/database/database.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

import { AppController } from './app.controller';

import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import * as Joi from '@hapi/joi';

import { join } from 'path';
import { ClientModule } from './modules/client/client.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { RoleModule } from './modules/role/role.module';

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
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    ProfileModule,
    EmailModule,
    SalonModule,
    ServicesModule,
    AppointmentModule,
    RatingModule,
    AddressModule,
    PaymentsModule,
    NotificationsModule,
    ClientModule,
    EmployeesModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
