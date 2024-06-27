import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  async shareContent(options: { title?: string; text?: string; url?: string; files?: string[] }) {
    try {
      // Check if Capacitor Share API can be used
      const canShare = await Share.canShare();
      if (canShare.value) {
        // Use Capacitor Share API
        await Share.share({
          title: options.title,
          text: options.text,
          url: options.url,
          files: options.files,
          dialogTitle: 'Share with buddies'  // This option is only supported on Android
        });
      } else if (navigator.share) {
        // Fallback to Web Share API if available
        await navigator.share({
          title: options.title,
          text: options.text,
          url: options.url
        });
      } else {
        // Fallback method when Web Share API is not supported
        this.fallbackShare(options);
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  }

  fallbackShare(options: { title?: string; text?: string; url?: string }) {
    // Fallback logic to handle when Web Share API is not supported
    const shareText = `${options.title ? options.title + '\n' : ''}${options.text ? options.text + '\n' : ''}${options.url ? options.url : ''}`;
    this.copyToClipboard(shareText);
    alert('Web Share API not supported. The content has been copied to your clipboard.');
  }

  copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (error) {
      console.error('Unable to copy to clipboard', error);
    }
    document.body.removeChild(textarea);
  }
}
