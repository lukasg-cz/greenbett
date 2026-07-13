import type { Signal } from '@/types';
import { getSportEmoji } from '@/lib/utils';

export async function sendSignalToTelegram(signal: Signal): Promise<void> {
  const emoji = getSportEmoji(signal.sport);
  const message = `
${emoji} <b>NOVÝ SIGNÁL — GREENBETT</b>

<b>Zápas:</b> ${signal.matchHome} vs ${signal.matchAway}
<b>Liga:</b> ${signal.league}
<b>Trh:</b> ${signal.market}
<b>Kurz:</b> ${signal.odds}
<b>Confidence:</b> ${signal.confidence}/10
<b>Unit size:</b> ${signal.unitSize}U
`.trim();

  console.log('[Telegram Bot] Signal notification:', message);

  // TODO: Uncomment when TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID are set
  /*
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHANNEL_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials not configured');
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telegram API error: ${error}`);
  }
  */
}
