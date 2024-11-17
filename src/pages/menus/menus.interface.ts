
export type IMenuChildren = {
    label: string;
    icon?: string;
    title: string;
}

export type IMenus = {
    id?: number;
    _id?: string;
    name: string;
    icon?: string;
    children: { label: string, icon?: string, title: string }[];
}

