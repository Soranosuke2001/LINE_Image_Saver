import * as crypto from 'crypto';

function generateRandomText(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomText = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters[randomIndex];
  }
  return randomText;
}

export function generateSha256Token(): string {
  const data = generateRandomText(20)
  return crypto.createHash('sha256').update(data).digest('hex');
}
