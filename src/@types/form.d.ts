type FormField = {
  label: string;
  disabled: boolean;
  error: boolean;
  errorMessage?: string;
};

export type CustomForm = {
  numOfFogNodes: FormField;
  numOfUsersPerFogNode: FormField;
  numOfTaskPerUser: FormField;
  numOfMiners: FormField;
  numberOfEachMinerNeighbours: FormField;
  numOfTXperBlock: FormField;
  puzzleDifficulty: FormField;
  poetBlockTime: FormField;
  maxEnduserPayment: FormField;
  minersInitialWalletValue: FormField;
  miningAward: FormField;
  delayBetweenFogNodes: FormField;
  delayBetweenEndUsers: FormField;
  aiAssistedMining: FormField;
  gossipActivated: FormField;
  automaticPoAMinersAuthorization: FormField;
  parallelPoWmining: FormField;
  asymmetricKeyLength: FormField;
  numOfDPoSdelegates: FormField;
  storPlc: FormField;
};
