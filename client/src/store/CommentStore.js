import {makeAutoObservable} from "mobx";

export default class CommentStore {
    constructor() {
        this._comments = []
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setComments (comments) {
        this._comments = comments
    }


    get totalCount() {
        return this._totalCount
    }

    get comments () {
        return this._comments
    }

}