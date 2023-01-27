import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ['http://localhost:4200', 'https://boring-design-app.herokuapp.com'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	});
	app.use(cookieParser());
  await app.listen(4020);
}
bootstrap().then(() => {
  console.log('Started');
});
