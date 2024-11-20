import { MigrationInterface, QueryRunner } from 'typeorm';
import * as data from '../utils/archivo.json';

export class Migrations1724280658762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = new Set<string>();
    for (const element of data) {
      categories.add(element.category);
    }

    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO categories (name) 
         VALUES ($1) 
         ON CONFLICT (name) 
         DO NOTHING`,
        [category],
      );
    }

    for (const element of data) {
      const categoryResult = await queryRunner.query(
        `SELECT id FROM categories WHERE name = $1`,
        [element.category],
      );
      const categoryId = categoryResult[0]?.id;

      if (categoryId) {
        await queryRunner.query(
          `INSERT INTO products (name, description, price, stock, imgUrl, categoryId) 
           VALUES ($1, $2, $3, $4, $5, $6) 
           ON CONFLICT (name) 
           DO UPDATE SET description = EXCLUDED.description, price = EXCLUDED.price, imgUrl = EXCLUDED.imgUrl, stock = EXCLUDED.stock`,
          [
            element.name,
            element.description,
            element.price,
            element.stock,
            element.imgUrl,
            categoryId,
          ],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Primero verificar si hay productos que están en órdenes
    const ordersWithProducts = await queryRunner.query(
      `SELECT DISTINCT productId FROM order_details_products`,
    );

    if (ordersWithProducts.length > 0) {
      throw new Error(
        'No se puede reiniciar los datos, algunos productos están involucrados en órdenes.',
      );
    }

    // Eliminar productos y categorías
    for (const element of data) {
      await queryRunner.query(`DELETE FROM products WHERE name = $1`, [
        element.name,
      ]);
    }

    for (const element of data) {
      await queryRunner.query(`DELETE FROM categories WHERE name = $1`, [
        element.category,
      ]);
    }
  }
}
