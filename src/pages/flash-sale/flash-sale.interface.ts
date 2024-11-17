
export type IFlashSale = {
    title: string;
    _id?: string;
    id?: string;
    description?: string;
    banner?: string;
    startDate: Date;
    endDate: Date;
    status?: boolean;
    products: Array<string>;
    discount: number;
    featured?: boolean;
}


