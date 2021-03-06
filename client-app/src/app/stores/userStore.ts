/** @format */

import { UserFormValues } from "./../models/user";
import { runInAction } from "mobx";
import { makeAutoObservable } from "mobx";
import { User } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "../..";

export default class UserStore {
	user: User | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get isLoggedIn() {
		return !!this.user;
	}

	login = async (userCreds: UserFormValues) => {
		try {
			const user = await agent.Account.login(userCreds);
			store.commonStore.setToken(user.token);
			runInAction(() => (this.user = user));
			history.push("/activities");
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem("jwt");
		this.user = null;
		history.push("/");
	};

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			runInAction(() => {
				this.user = user;
			});
		} catch (error) {
			console.log(error);
		}
	};

	register = async (userCreds: UserFormValues) => {
		try {
			const user = await agent.Account.register(userCreds);
			store.commonStore.setToken(user.token);
			runInAction(() => (this.user = user));
			history.push("/activities");
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};

	setImage = (image: string) => {
		if (this.user) this.user.image = image;
	};
}
