export enum TokenStatusEnum {
  INIT,
  ACTIVATED,
  POOL_FILLED,
  DEPLOYED,
}

export enum TokenTypeEnum {
  TOKEN_404,
  TOKEN_20,
}

export enum TransactionActivityEnum {
  BUY,
  SELL,
  CREATE,
  POOL_FILLED,
  CREATE_TOKEN_20,
  POOL_DEPLOY,
}

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum NFT_EVENTS {
  GENERATE_IMAGE = 'generate-image',
}

export enum SOCKET_EVENTS {
  CREATE_TOKEN = 'create-token',
  JOIN_ROOM = 'join-room',
  NEW_COMMENT = 'new-comment',
}

export enum COMMON_EVENTS {
  NEW_COMMENT = 'new-comment',
}

export enum NetworkTypeEnum {
  ALEO = 0,
  SUI = 1,
  VENOM = 2,
  SEI = 3,
  BASE,
  STARKNET,
  ZKSYNC = 6,
  SCROLL = 7,
  SOLANA = 8,
}

export enum SaleStatusEnum {
  MINTED = -1,
  LISTING,
  CANCEL,
  SOLD_OUT,
  STAKE,
  BURNED,
}

export enum OfferSaleStatusEnum {
  ACCEPTED,
  NOT_ACCEPTED,
  CANCEL,
}

export enum SaleTypeEnum {
  FIX_PRICE,
  ENGLISH_AUCTION,
}

export enum CollectionActivityTypeEnum {
  LISTING,
  CANCEL,
  UPDATE,
  OFFER,
  CANCEL_OFFER,
  ACCEPT_OFFER,
  COMPLETE,
  TRANSFER,
  MINT,
  COLLECTION_OFFER,
  ACCEPT_COLLECTION_OFFER,
  CANCEL_COLLECTION_OFFER,
  STAKED,
  UNSTAKE,
  CREATE_POOL,
  REMOVE_POOL,
  EventSwapNFTInPair,
  EventSwapSpecificNFTOutPair,
  EventSpotPriceUpdate,
  EventDeltaUpdate,
  EventFeeUpdate,
  EventNFTWithdrawal,
  EventTokenWithdrawal,
  EventNFTDeposit,
  EventTokenDeposit,
  EventPairUpgraded,
  EventSwapAnyNFTOutPair,
  EventNewERC404Collection,
  AddLiquidityPool404,
  NFTTransfer,
  NFTBurn,
  EventSwap404,
  RemoveLiquidity,
  EVENT_BURNED,
}

export enum CollectionActivitySearchTypeEnum {
  COLLECTION,
  NFT,
  USER,
}

export enum GenerateImageModelEnum {
  ChainGPT = 'ChainGPT',
  RealMimic = 'RealMimic',
  Animatrix = 'Animatrix',
  PixelMaster = 'PixelMaster',
  ThreeDImageForge = 'ThreeDImageForge',
  DrawDreamer = 'DrawDreamer',
  'DrawDreamerV2’' = 'DrawDreamerV2’',
  AnimeVerse = 'AnimeVerse',
  RealVision = 'RealVision',
  FantasyVerse = 'FantasyVerse',
  VisionaryForge = 'VisionaryForge',
}
