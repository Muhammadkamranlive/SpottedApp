// redirection-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectionStateService {
  private redirected: boolean = false;

  setRedirected(state: boolean) {
    this.redirected = state;
  }

  hasRedirected(): boolean {
    return this.redirected;
  }
}
