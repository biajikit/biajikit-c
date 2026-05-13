// 获取数据
export function getStorage<T = unknown>(name: string, isSession?: boolean): T {
    const storage = isSession ? sessionStorage.getItem(name) : localStorage.getItem(name);
    const data = storage ?? "";

    try {
        return JSON.parse(data) as T;
    } catch {
        return data as unknown as T;
    }
}

// 存储数据
export function setStorage(name: string, data: unknown, isSession?: boolean): void {
    const saveData = JSON.stringify(data);
    const storage = isSession ? sessionStorage : localStorage;
    storage.setItem(name, saveData);
}

// 删除数据
export function deleteStorage(name: string, isSession?: boolean): void {
    const storage = isSession ? sessionStorage : localStorage;
    storage.removeItem(name);
}

// 清空数据
export function clearStorage(isSession?: boolean): void {
    const storage = isSession ? sessionStorage : localStorage;
    storage.clear();
}