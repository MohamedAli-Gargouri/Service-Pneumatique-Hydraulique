import { Waveform } from '@uiball/loaders';
import React from 'react';
export default function LoginCard() {
  return (
    <div className={`h-screen w-screen flex flex-col justify-center items-center gap-11 `}>
      <Waveform size={40} lineWeight={3.5} speed={1} color="red" />
    </div>
  );
}
