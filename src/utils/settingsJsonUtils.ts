import { SimulationParameters } from "../@types/simulation";

export function getSimulationSettingsJSON(state: SimulationParameters) {
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
