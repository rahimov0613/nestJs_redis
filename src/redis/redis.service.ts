import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis'; // ❌ `* as Redis` emas, balki `Redis` deb yozamiz

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis({
      // 🔥 Bu yerda endi xatolik bo‘lmaydi
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });

    this.client.on('connect', () => {
      console.log('✅ Redisga ulandi');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis xatosi:', err);
    });
  }

  async set(key: string, value: any, expire?: number) {
    if (expire) {
      return this.client.set(key, JSON.stringify(value));
    }
    return this.client.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async delete(key: string) {
    return this.client.del(key);
  }
  async setUserStep(userId: number, step: string): Promise<void> {
    await this.client.set(`user:${userId}:step`, step);
  }

  // Foydalanuvchi holatini olish
  async getUserStep(userId: number): Promise<string | null> {
    return await this.client.get(`user:${userId}:step`);
  }

  // Foydalanuvchi qo‘shimcha ma'lumotlarini saqlash
  async setUserData(userId: number, data: any): Promise<void> {
    await this.client.set(`user:${userId}:data`, JSON.stringify(data));
  }

  // Foydalanuvchi qo‘shimcha ma'lumotlarini olish
  async getUserData(userId: number): Promise<any | null> {
    const data = await this.client.get(`user:${userId}:data`);
    return data ? JSON.parse(data) : null;
  }
}
