import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._groups = [];
    this._records = [];
    this._info = [];
    this._selectedGroup = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 8;
    this._orderBy = "";
    this._order = "";
    makeAutoObservable(this);
  }

  setGroups(groups) {
    this._groups = groups;
  }

  setOrderBy(orderBy) {
    this._orderBy = orderBy;
  }

  setOrderBy(order) {
    this._order = order;
  }

  setInfo(info) {
    this._info = info;
  }

  setRecords(records) {
    this._records = records;
  }

  setSelectedGroup(group) {
    this._selectedGroup = group;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  setPriceRange(priceRange) {
    this._priceRange = priceRange;
  }

  get groups() {
    return this._groups;
  }

  get records() {
    return this._records;
  }

  get selectedGroup() {
    return this._selectedGroup;
  }

  get info() {
    return this._info;
  }

  get orderBy() {
    return this._orderBy;
  }

  get order() {
    return this._order;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }

  get priceRange() {
    return this._priceRange;
  }
}
