/** @format */

import { createContext, useContext } from "react";
/** @format */

import ActivityStore from "./acitivityStore";
import CommonStore from "./commonStore";

interface Store {
	activityStore: ActivityStore;
	commonStore: CommonStore;
}

export const store: Store = {
	activityStore: new ActivityStore(),
	commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
	return useContext(StoreContext);
}
