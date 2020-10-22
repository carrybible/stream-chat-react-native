import { useContext, useEffect } from 'react';

import { ChatContext } from '../../../../context';

export const useChannelMuted = ({ setChannels }) => {
  const { client } = useContext(ChatContext);

  useEffect(() => {
    const handleEvent = (e) => {
      setChannels((channels) => {
        const muteChannels = e.me.channel_mutes.map((m) => m.channel.cid);
        const newChannel = channels.map((c) => {
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
