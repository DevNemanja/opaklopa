export const generateGuid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const isMediumViewport = () => {
  return window.matchMedia('screen and (min-width: 989px)').matches;
};

export const LOCATION_URL =
  window.location.hostname === 'localhost'
    ? 'https://opaklopa.local'
    : window.location.origin;

// WINDOWS & Staging
// export const CLIENT_KEY =
//   window.location.hostname === 'localhost'
//     ? 'ck_47fc00cf4013b0019059255c037ec51d6f916797'
//     : 'ck_506490f44eaf3fb0c6f9944e6aa8368bfa3d69cd';
// export const CLIENT_SECRET =
//   window.location.hostname === 'localhost'
//     ? 'cs_95133a72259ada71c449a10bb254eab7bb30ce38'
//     : 'cs_baa8bc04d415ee27f40fa32c7613436f8e804a3e';

// MAC & Staging
export const CLIENT_KEY =
  window.location.hostname === 'localhost'
    ? 'ck_31a7018c89c49979f770d069307290261d208e6c'
    : 'ck_506490f44eaf3fb0c6f9944e6aa8368bfa3d69cd';
export const CLIENT_SECRET =
  window.location.hostname === 'localhost'
    ? 'cs_8425551d8bc5adea70e65466093cf8fc12943ffa'
    : 'cs_baa8bc04d415ee27f40fa32c7613436f8e804a3e';
