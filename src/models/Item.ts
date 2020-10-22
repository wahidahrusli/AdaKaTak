export interface Item {
    id: number;
    name: string;
    storeName: string;
    stock: Stock;
}

export interface Stock {
    status: string;
    time: string;
}