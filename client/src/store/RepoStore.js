import {makeAutoObservable} from "mobx";

export default class RepoStore {
    constructor() {
        this._repos = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    setRepos (repos) {
        this._repos = repos
    }


    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    get repos () {
        return this._repos
    }

}