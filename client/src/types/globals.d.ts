declare const process: {
  env: Record<string, string | undefined>;
};

declare module 'react' {
  export type ReactNode = any;
  export type ButtonHTMLAttributes<T> = Record<string, any>;
  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(context: any): T;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useState<T>(initialState: T): [T, (value: T | ((previousState: T) => T)) => void];
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next' {
  export type Metadata = Record<string, unknown>;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}
