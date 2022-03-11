/* eslint-disable prettier/prettier */
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'

export const calculateAgeMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const age = getAge(ctx.source.dob);
  await next();
  return age;
};

const getAge = (dateOfBirth, dateToCalculate = new Date()) => {
    const dob = new Date(dateOfBirth).getTime();
    const dateToCompare = new Date(dateToCalculate).getTime();
    const age = (dateToCompare - dob) / (365 * 24 * 60 * 60 * 1000);
    return Math.floor(age);
};