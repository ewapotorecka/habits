export class HabitStorage<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  updateStorage(data: T) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  getHabitFromStorage() {
    const savedItem = localStorage.getItem(this.key);
    return savedItem ? JSON.parse(savedItem) : null;
  }
}
