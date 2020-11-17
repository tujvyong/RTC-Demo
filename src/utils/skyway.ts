import Peer from 'skyway-js';

export const initPeer = (): Promise<Peer> => {
  return new Promise((resolve, reject) => {
    const peer = new Peer({
      key: process.env.REAXT_APP_SKYWAY_KEY ?? '',
      debug: 2,
      config: {
        iceTransportPolicy: "relay",
      },
    });

    peer.once("open", () => {
      peer.removeListener("error", reject);
      resolve(peer);
    });
    // for onOpen error
    peer.once("error", reject);
  });
};
