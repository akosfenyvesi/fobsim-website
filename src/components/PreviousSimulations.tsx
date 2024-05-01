import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { SimulationDto } from "../@types/simulation";
import EnhancedTable from "./table/components/EnhancedTable";
import { getDbRef } from "../utils/firebaseDbUtils";
import { onValue } from "firebase/database";
import { fromSimulationSettingsJSON } from "../utils/settingsJsonUtils";

export const PreviousSimulations = () => {
  const { currentUser } = useAuthContext();
  const [simulations, setSimulations] = useState<SimulationDto[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const path = `/fobsim/users/${currentUser.uid}`;
    const dbRef = getDbRef(path);

    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data: any[] = snapshot.val();
        const simulationsArray: SimulationDto[] = Object.entries(data)
          .map(([id, simulation]) => {
            const settings = fromSimulationSettingsJSON(simulation.settings);
            return settings
              ? {
                  id: parseInt(id, 10),
                  temp: Object.values(simulation.temp),
                  files: simulation.files,
                  elapsedTime: simulation.results.elapsedTime,
                  extraSimulations: simulation.extraSimulations
                    ? JSON.parse(simulation.extraSimulations)
                    : undefined,
                  settings,
                }
              : null;
          })
          .filter(
            (simulation): simulation is SimulationDto => simulation !== null
          );
        setSimulations(simulationsArray);
      }
    });
  }, [currentUser]);

  return <EnhancedTable simulations={simulations} />;
};

export default PreviousSimulations;
