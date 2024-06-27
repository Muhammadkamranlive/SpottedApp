// src/types/typewriter-effect.d.ts

declare module 'typewriter-effect/dist/core' {
  interface TypewriterOptions {
    strings?: string[];
    cursor?: string;
    delay?: number;
    pauseFor?: number;
    loop?: boolean;
    autoStart?: boolean;
    deleteSpeed?: number;
  }

  class Typewriter {
    callFunction(arg0: () => void) {
      throw new Error('Method not implemented.');
    }
    constructor(container: HTMLElement, options?: TypewriterOptions);
    typeString(text: string): Typewriter;
    pauseFor(duration: number): Typewriter;
    deleteAll(speed?: number): Typewriter;
    start(): void;
  }

  export default Typewriter;
}
