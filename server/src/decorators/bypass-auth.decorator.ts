import { Reflector } from '@nestjs/core';

const BaseIsPublic = Reflector.createDecorator<boolean>();

export const IsPublic = (value = true) => BaseIsPublic(value);
