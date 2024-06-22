import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  status: string;
}
