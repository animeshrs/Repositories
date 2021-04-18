/** @format */

import { createContext, useContext } from "react";
/** @format */

import ActivityStore from "./acitivityStore";

interface Store {
	activityStore: ActivityStore;
}

export const store: Store = {
	activityStore: new ActivityStore(),
};
export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
