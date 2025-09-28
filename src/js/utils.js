export const generateGuid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};

export const isMediumViewport = () => {
  return window.matchMedia('screen and (min-width: 989px)').matches;
};

export const LOCATION_URL =
  window.location.hostname === 'localhost' ? 'https://opaklopa.local' : window.location.origin;

export const CLIENT_KEY = 'ck_b5ce331ad8086c636824ea4df29041c022f11e6d';
export const CLIENT_SECRET = 'cs_10fe17734ccba8999013d43506414e2eeb52fc30';
// // WINDOWS & Staging
// export const CLIENT_KEY =
//   window.location.hostname === "localhost"
//     ? "ck_cfe851f3c4f3142d065752d2d3b5240ac828790a"
//     : "ck_68d74fd3eef100d46c01ebaadc1b80536b11f9ac";
// export const CLIENT_SECRET =
//   window.location.hostname === "localhost"
//     ? "cs_4ff18d20cc3a93798108c1140d12b7cbf2b57c25"
//     : "cs_3ecd61fcbbbebff07b25a90ab95eeed3e13e60ea";

// MAC & Staging
// export const CLIENT_KEY =
//   window.location.hostname === 'localhost'
//     ? 'ck_31a7018c89c49979f770d069307290261d208e6c'
//     : 'ck_506490f44eaf3fb0c6f9944e6aa8368bfa3d69cd';
// export const CLIENT_SECRET =
//   window.location.hostname === 'localhost'
//     ? 'cs_8425551d8bc5adea70e65466093cf8fc12943ffa'
//     : 'cs_baa8bc04d415ee27f40fa32c7613436f8e804a3e';
