import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const time = `${date.getHours()}:${date.getMinutes()}: ${date.getSeconds()}`;

  console.log(
    `Se ejecutó el método ${req.method}, en la URL ${req.url}, el día ${day}/${month}/${year} a las ${time}`,
  );
  next();
}
