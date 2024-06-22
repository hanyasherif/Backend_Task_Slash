// cart.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';
import { CreateCartItemDto } from './create-cart-item.dto'; // Import DTO


export class CartDto {
  @ApiProperty({ type: 'number' })
  id: number;

  @ApiProperty({ type: [CreateCartItemDto] })
  CartItem: CartItem[];

  @ApiProperty({ type: 'number' })
  userId: number;
}
