type ICatalog = {
    _id?: string,
    name: string,
    description?: string,
}
type IAutoComplete = {
    title: string,
    label: string,
}
class DataResolver {
    constructor() {

    }

    resolveCatalogAutoComplete(data: ICatalog[]): IAutoComplete[] {
        return data?.map((item) => {
            return {
                title: item.name,
                label: item.name
            }
        })
    }

    toLocalISOString(date: Date) {
        const pad = (num: number) => (num < 10 ? '0' + num : num);

        const year = date?.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }





}

const dataResolver = new DataResolver();
export default dataResolver;