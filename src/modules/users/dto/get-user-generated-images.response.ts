import { Expose } from 'class-transformer';

export class GetUserGeneratedImageResponse {
  @Expose({ name: 'id' })
  id: number;

  @Expose({ name: 'wallet_address' })
  walletAddress: string;

  @Expose({ name: 'prompt' })
  prompt: string;

  @Expose({ name: 'image_urls' })
  imageUrls: string[];

  @Expose({ name: 'quantity' })
  quantity: string;

  @Expose({ name: 'created_at' })
  createdAt: string;
}
