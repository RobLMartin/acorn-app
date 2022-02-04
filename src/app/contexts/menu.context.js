import React, { useContext, useState, useEffect } from "react";
import firestore, {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  limit,
} from "../firebase";
import { useAuth } from "./auth.context";
import { useSnackbar } from "./snackbar.context";

const MenuContext = React.createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { showSnackbar } = useSnackbar();
  const menuRef = collection(firestore, "menu");

  useEffect(() => getMenu(), []);

  const getMenu = async () => {
    setLoading(true);
    const menuQuery = query(
      menuRef,
      where("userId", "==", currentUser && currentUser.uid),
      limit(1)
    );

    const menuSnapshot = await getDocs(menuQuery);

    const fetchedMenu = menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMenu(fetchedMenu[0]);
    setLoading(false);
  };

  const saveMenu = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(firestore, "menu", menu.id), menu);
      showSnackbar("Successfully saved your menu.", "success");
    } catch (e) {
      showSnackbar(
        "Something went wrong and we couldn't save the menu.",
        "error"
      );
    }
    setLoading(false);
  };

  const newSection = (name) => {
    const id = `section-${menu.sectionOrder.length + 1}`;
    const section = {
      [id]: {
        title: name,
        items: [],
      },
    };

    console.log(section);
    setMenu({
      ...menu,
      sectionDetails: { ...menu.sectionDetails, ...section },
      sectionOrder: [id, ...menu.sectionOrder],
    });
  };

  const value = {
    menu,
    updateMenu: setMenu,
    saveMenu,
    isLoading: loading,
    newSection,
  };

  return (
    <MenuContext.Provider value={value}>
      {menu && children}
    </MenuContext.Provider>
  );
}
