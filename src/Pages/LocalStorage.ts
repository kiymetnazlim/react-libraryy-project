import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    // Başlangıç değerini kontrol et ve localStorage'dan oku
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("LocalStorage Hatası:", error);
            return initialValue;
        }
    });

    // Değer güncellendiğinde localStorage'a kaydet
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("LocalStorage Güncelleme Hatası:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
