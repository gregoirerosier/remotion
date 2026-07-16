import React from 'react';
import {Composition} from 'remotion';
import {PackOpening, type PackOpeningProps} from './PackOpening';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition<PackOpeningProps>
      id="BeyondTattooPack"
      component={PackOpening}
      durationInFrames={600}
      fps={60}
      width={1080}
      height={1920}
      defaultProps={{
        title: 'ANUBIS',
        subtitle: 'FREE STENCIL DROP',
        website: 'beyondimagination.co.technology',
        primary: '#8A2EFF',
        stencilFile: 'stencil.jpg'
      }}
    />
  );
};
