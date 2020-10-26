/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';

import { useChatContext } from '../../../../contexts/chatContext/ChatContext';

export const useChannelMuted = ({ setChannels }: { setChannels: any }) => {
  const { client } = useChatContext();

  useEffect(() => {
    const handleEvent = (e: any) => {
      setChannels((channels: any) => {
        const muteChannels = e.me.channel_mutes.map((m: any) => m.channel.cid);
        const newChannel = channels.map((c: any) => {
          c.muted = muteChannels.includes(c.cid);
          return c;
        });
        // channels.forEach((c, idx) => {
        //   channels[idx].muted = muteChannels.includes(c.cid);
        // });
        return [...newChannel];
      });
    };

    client.on('notification.channel_mutes_updated', handleEvent);
    return () => client.off('notification.channel_mutes_updated', handleEvent);
  }, []);
};
