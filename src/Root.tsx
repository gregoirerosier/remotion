import React from 'react';
import {Composition} from 'remotion';
import {DailyStencilPack, type DailyStencilPackProps} from './DailyStencilPack';

export const RemotionRoot: React.FC = () => (
  <Composition<DailyStencilPackProps>
    id="DailyStencilPack"
    component={DailyStencilPack}
    width={1080}
    height={1920}
    fps={60}
    durationInFrames={600}
    defaultProps={{
      title: 'BIBLICAL REALISM',
      collection: 'DIVINE REALISM',
      dropNumber: '01',
      releaseDate: 'JULY 17, 2026',
      website: 'beyondimagination.co.technology',
      stencilFile: 'stencil.png',
      primary: '#8A2EFF',
      accent: '#E6C36A',
    }}
  />
);
