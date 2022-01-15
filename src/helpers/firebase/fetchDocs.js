import { getDoc, getDocs } from "firebase/firestore";

export const fetchDocs = async (query) => {
  const { type } = query;

  switch (type) {
    case "collection":
      const data = [];
      const querySnatshop = await getDocs(query);
      querySnatshop.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return data;

    case "document":
      const doc = await getDoc(query);

      return doc.data();

    default:
      throw Error("Query error: cannot read type of " + type);
  }
};
