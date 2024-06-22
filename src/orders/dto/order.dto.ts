import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  orderDate: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  userId: number; // Assuming userId is part of the order details
}
