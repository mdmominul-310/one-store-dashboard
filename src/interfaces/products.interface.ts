
export type IAttribute = {
    name: string;
    enable?: boolean;
    values: Array<{ label: string; title: string }>;
}
export interface IProducts {
    _id: string;
    id?: string;
    title: string;
    description: string;
    regularPrice: number;
    salePrice: number;
    images: string[];
    categories: {
        title: string;
        label: string;
    }[]
    tags: {
        title: string;
        label: string;
    }[],
    sku: string;
    stock: {
        variant: string,
        quantity: string
        salePrice: string,
        regularPrice: string
        sku: string
    }[],
    attributes: IAttribute[];
    isFeatured: boolean;
    slug: string;
    size: {
        title: string;
        label: string;
    }[]
    colors: {
        title: string;
        label: string;
    }[]
}


