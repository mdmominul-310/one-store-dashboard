
export type ICarts = {
    id: string,
    title: string,
    price: number
    regularPrice: number
    image: string,
    qty: number,
    selected?: boolean,
    attributes?: { [key: string]: string; }[]
}

export type IOrders = {
    _id?: string;
    id?: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    deliveryArea: string;
    note: string;
    products: ICarts[];
    status: string;
    total: string;
    deliveryCharge: string;
    createdAt: string;
    updatedAt: string;
    date: string;
}

export type IOrderStock = {
    variant: string
    quantity: string
    salePrice: 'string'
    regularPrice: string
    sku: string
    _id: string

}

export type IVarinatProducts = {
    product: {
        stock: {
            variant: string
            quantity: string
            salePrice: 'string'
            regularPrice: string
            sku: string
            _id: string
        }[]
        _id: string
        title: string
        description: string,
        images: string[]
    }
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export type IOrderProducts = {
    title: string;
    stock: {
        variant: string
        quantity: string
        salePrice: 'string'
        regularPrice: string
        sku: string
        _id: string
    }[]
    _id: string
    description: string,
    images: string[]
}