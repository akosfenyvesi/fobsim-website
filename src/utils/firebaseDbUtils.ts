import { ref, remove } from "firebase/database";
import { db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";

// export const fetchEntriesFromPath = async (path: string) => {
//   const userRef = ref(db, path);

//   try {
//     const snapshot = await get(userRef);
//     const fetchedData: any[] = snapshot.val();
//     if (fetchedData) {
//       const simulationsArray: SimulationDto[] = Object.entries(fetchedData).map(
//         ([id, simulation]) => ({
//           id: parseInt(id, 10),
//           ...simulation,
//         })
//       );

//       return simulationsArray;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

export const deleteEntry = (path: string) => {
  const fileRef = storageRef(storage, `${path}/temporaryfiles.zip`);
  deleteObject(fileRef).catch((error) => {
    console.log("Error deleting files:", error);
  });

  const entryRef = getDbRef(path);
  remove(entryRef).catch((error) => {
    console.log("Error deleting entry:", error);
  });
};
export const getDbRef = (path: string) => {
  return ref(db, path);
};

export const download = () => {
  const fileref = storageRef(
    storage,
    "fobsim/users/6s7NSke5K6UgBD4eXxFgeZ5Supk1/1711964306719/temporaryfiles.zip"
  );

  getDownloadURL(fileref).then((url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "temporaryfiles.zip";
    link.click();
  });
};
