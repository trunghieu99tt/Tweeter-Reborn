export enum ELocalStorageKey {
  AccessToken = 'accessToken',
}

export enum EMedia {
  Image = 'image',
  Video = 'video',
}

export enum EViewMode {
  Block = 'block',
  Flex = 'flex',
  Grid = 'grid',
  None = 'none',
}

export enum EFormType {
  View = 'view',
  Update = 'update',
  Create = 'create',
  Delete = 'delete',
  Report = 'report',
}

export enum EUpdateType {
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export const MASONRY_CONFIG_BREAKPOINTS = {
  default: 3,
  700: 2,
  500: 1,
};

export enum APP_DISPATCH_ACTIONS {
  SET_SOCKET = 'SET_SOCKET',
  SET_LOADING = 'SET_LOADING',
  SET_MODAL = 'SET_MODAL',
}

export const TYPE_MAPPER = {
  image: EMedia.Image,
  video: EMedia.Video,
};
