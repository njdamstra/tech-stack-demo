import { atom } from 'nanostores';

export type SessionState = {
  loading: boolean;
  jwt?: string;
  user?: any; // you can tighten this using Appwrite Models if you want
};

export const session$ = atom<SessionState>({ loading: true });

export function setSession(partial: Partial<SessionState>) {
  session$.set({ ...session$.get(), ...partial });
}

