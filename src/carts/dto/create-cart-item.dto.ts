// create-cart-item.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({ type: 'number' })
  userId: number;

  @ApiProperty({ type: 'number' })
  productId: number;

  @ApiProperty({ type: 'number' })
  quantity: number;
}
