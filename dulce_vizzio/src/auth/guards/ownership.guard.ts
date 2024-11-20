import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from '../../orders/orders.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly ordersService: OrdersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const orderId = request.params.id;

    const order = await this.ordersService.getOrderById(orderId);

    if (!order) {
      throw new NotFoundException(`Orden con id ${orderId} no encontrada`);
    }

    if (order.user.id !== String(userId)) {
      throw new UnauthorizedException('No tienes permiso para ver esta orden');
    }

    return true;
  }
}
