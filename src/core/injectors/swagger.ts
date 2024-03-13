import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function InjectSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Test Locus API')
    .setVersion('1.0')
    .addSecurity('authorization', {
      type: 'apiKey',
      description: 'API Authorization',
      name: 'authorization',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
}
