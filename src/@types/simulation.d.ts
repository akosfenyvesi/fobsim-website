export type SimulationResult = {
  message: string;
};

export type Simulation = {
  timestamp: number;
  isRunning: boolean;
};

export type SimulationParameters = {
  time: number; // todo!
  elapsedTime?: number;
  bcFunction: string;
  bcPlacement: string;
  bcConsensus: string;
  aiAssistedMining: boolean;
  numOfFogNodes: number;
  numOfUsersPerFogNode: number;
  numOfTaskPerUser: number;
  numOfMiners: number;
  numberOfEachMinerNeighbours: number;
  numOfTXperBlock: number;
  puzzleDifficulty: number;
  poetBlockTime: number;
  maxEnduserPayment: number;
  minersInitialWalletValue: number;
  miningAward: number;
  delayBetweenFogNodes: number;
  delayBetweenEndUsers: number;
  gossipActivated: boolean;
  automaticPoAMinersAuthorization: boolean;
  parallelPoWmining: boolean;
  asymmetricKeyLength: number;
  numOfDPoSdelegates: number;
  storPlc: number;
};

export type FilesDto = {
  temporaryfiles: string;
};

export type ExtraSimulations = {
  name: string;
  inputs: number[];
};

export type SimulationDto = {
  id: number;
  files: FilesDto;
  settings: SimulationParameters;
  elapsedTime: number[];
  extraSimulations: ExtraSimulations;
  temp: SimulationResult[];
};

interface ExtraSimulations {
  name: string;
  inputs: number[];
}
