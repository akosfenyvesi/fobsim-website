import { SimulationParameters } from "../@types/simulation";

interface ConversionDictionary {
  [key: string]: string;
}

export function toSimulationSettingsJSON(state: SimulationParameters) {
  const settings = {
    function: state.bcFunction,
    placement: state.bcPlacement,
    consensus_algorithm: state.bcConsensus,
    ai_assisted_mining: state.aiAssistedMining ? "y" : "n",
    NumOfFogNodes: Number(state.numOfFogNodes),
    num_of_users_per_fog_node: Number(state.numOfUsersPerFogNode),
    NumOfTaskPerUser: Number(state.numOfTaskPerUser),
    NumOfMiners: Number(state.numOfMiners),
    number_of_each_miner_neighbours: Number(state.numberOfEachMinerNeighbours),
    numOfTXperBlock: Number(state.numOfTXperBlock),
    puzzle_difficulty: Number(state.puzzleDifficulty),
    poet_block_time: Number(state.poetBlockTime),
    Max_enduser_payment: Number(state.maxEnduserPayment),
    miners_initial_wallet_value: Number(state.minersInitialWalletValue),
    mining_award: Number(state.miningAward),
    delay_between_fog_nodes: Number(state.delayBetweenFogNodes),
    delay_between_end_users: Number(state.delayBetweenEndUsers),
    Gossip_Activated: state.gossipActivated,
    "Automatic_PoA_miners_authorization?":
      state.automaticPoAMinersAuthorization,
    "Parallel_PoW_mining?": state.parallelPoWmining,
    Asymmetric_key_length: Number(state.asymmetricKeyLength),
    Num_of_DPoS_delegates: Number(state.numOfDPoSdelegates),
    "STOR_PLC(0=in the Fog,1=in the BC)": Number(state.storPlc),
  };

  return JSON.stringify(settings, null, 2);
}

export function fromSimulationSettingsJSON(
  json: string
): SimulationParameters | null {
  if (!json) return null;
  const settings = JSON.parse(json);
  return {
    time: Date.now(),
    bcFunction: settings.function,
    bcPlacement: settings.placement,
    bcConsensus: settings.consensus_algorithm,
    aiAssistedMining: settings.ai_assisted_mining === "y",
    numOfFogNodes: settings.NumOfFogNodes,
    numOfUsersPerFogNode: settings.num_of_users_per_fog_node,
    numOfTaskPerUser: settings.NumOfTaskPerUser,
    numOfMiners: settings.NumOfMiners,
    numberOfEachMinerNeighbours: settings.number_of_each_miner_neighbours,
    numOfTXperBlock: settings.numOfTXperBlock,
    puzzleDifficulty: settings.puzzle_difficulty,
    poetBlockTime: settings.poet_block_time,
    maxEnduserPayment: settings.Max_enduser_payment,
    minersInitialWalletValue: settings.miners_initial_wallet_value,
    miningAward: settings.mining_award,
    delayBetweenFogNodes: settings.delay_between_fog_nodes,
    delayBetweenEndUsers: settings.delay_between_end_users,
    gossipActivated: settings.Gossip_Activated,
    automaticPoAMinersAuthorization:
      settings["Automatic_PoA_miners_authorization?"],
    parallelPoWmining: settings["Parallel_PoW_mining?"],
    asymmetricKeyLength: settings.Asymmetric_key_length,
    numOfDPoSdelegates: settings.Num_of_DPoS_delegates,
    storPlc: settings["STOR_PLC(0=in the Fog,1=in the BC)"],
  };
}

export function convertSringToFobSimFormat(
  parameterName: string
): string | undefined {
  const conversionDict: ConversionDictionary = {
    numOfFogNodes: "NumOfFogNodes",
    numOfUsersPerFogNode: "num_of_users_per_fog_node",
    numOfTaskPerUser: "NumOfTaskPerUser",
    numOfMiners: "NumOfMiners",
    numberOfEachMinerNeighbours: "number_of_each_miner_neighbours",
    numOfTXperBlock: "numOfTXperBlock",
    puzzleDifficulty: "puzzle_difficulty",
    poetBlockTime: "poet_block_time",
    maxEnduserPayment: "Max_enduser_payment",
    minersInitialWalletValue: "miners_initial_wallet_value",
    miningAward: "mining_award",
    delayBetweenFogNodes: "delay_between_fog_nodes",
    delayBetweenEndUsers: "delay_between_end_users",
    asymmetricKeyLength: "Asymmetric_key_length",
    numOfDPoSdelegates: "Num_of_DPoS_delegates",
  };

  return conversionDict[parameterName];
}

export function convertStringFromFobSimFormat(
  parameterName: string
): string | undefined {
  const conversionDict: ConversionDictionary = {
    NumOfFogNodes: "numOfFogNodes",
    num_of_users_per_fog_node: "numOfUsersPerFogNode",
    NumOfTaskPerUser: "numOfTaskPerUser",
    NumOfMiners: "numOfMiners",
    number_of_each_miner_neighbours: "numberOfEachMinerNeighbours",
    numOfTXperBlock: "numOfTXperBlock",
    puzzle_difficulty: "puzzleDifficulty",
    poet_block_time: "poetBlockTime",
    Max_enduser_payment: "maxEnduserPayment",
    miners_initial_wallet_value: "minersInitialWalletValue",
    mining_award: "miningAward",
    delay_between_fog_nodes: "delayBetweenFogNodes",
    delay_between_end_users: "delayBetweenEndUsers",
    Asymmetric_key_length: "asymmetricKeyLength",
    Num_of_DPoS_delegates: "numOfDPoSdelegates",
  };

  return conversionDict[parameterName];
}

export function mapFobSimIdToLabel(parameterName: string) {
  const conversionDict: ConversionDictionary = {
    numOfFogNodes: "Number of fog nodes",
    numOfUsersPerFogNode: "Number of users per fog node",
    numOfTaskPerUser: "Number of users per fog node",
    numOfMiners: "Number of miners",
    numberOfEachMinerNeighbours: "Number of each miner's neighbours",
    numOfTXperBlock: "Number of transactions per block",
    puzzleDifficulty: "Puzzle difficulty",
    poetBlockTime: "Poet block time",
    maxEnduserPayment: "Max enduser payment",
    minersInitialWalletValue: "Miners' initial wallet value",
    miningAward: "Mining award",
    delayBetweenFogNodes: "Delay between fog nodes",
    delayBetweenEndUsers: "Delay between endusers",
    asymmetricKeyLength: "Asymmetric key length",
    numOfDPoSdelegates: "Number of DPoS delegates",
    storPlc: "Stor plc",
  };

  return conversionDict[parameterName];
}
