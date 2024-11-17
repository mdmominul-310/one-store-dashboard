/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, Button, TextField, Typography, createFilterOptions } from "@mui/material";
import { useForm, SubmitHandler, Controller, useFieldArray, } from "react-hook-form";
import DynamicMeaida from "./dynamic-meadia";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../store/services/productsApiSlice";
import UseCustomToast from "../../hooks/UseCustomToast";
import VariantsPricing, { IAttribute } from "./variants-pricing";
import { useGetCategoryQuery } from "../../store/services/categoryApiSlice";
import dataResolver from "../../utils/data-resolver";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import TinyMceHtmlBuilder from "../../component/ui/tiny-mce-html-builder";

const filter = createFilterOptions<{ title: string; label: string }>();

type Inputs = {
    title: string,
    categories: { title: string, label: string }[],
    description: string,
    size: { title: string, label: string }[],
    colors: { title: string, label: string }[],
    stock: {
        variant: string,
        quantity: string
        salePrice: string,
        regularPrice: string
        sku: string
    }[],
    tags: { title: string, label: string }[],
    regularPrice: string,
    salePrice: string,
    images: string[],
    attributes: IAttribute[]


};



const EditProducts = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        getValues
    } = useForm<Inputs>({
        defaultValues: {
            title: "",
            categories: [],
            description: "",
            size: [],
            colors: [{ title: "", label: "" }],
            stock: [
                {
                    variant: "",
                    quantity: "",
                    salePrice: "",
                    regularPrice: "",
                    sku: ""
                }
            ],
            tags: [],
            regularPrice: "",
            salePrice: "",
            images: ["e"],
            attributes: [
                {
                    name: "Color",
                    enable: false,
                    values: [
                        { label: "Red", title: "Red" },
                    ]
                },
                {
                    name: "Universal",
                    enable: true,
                    values: [
                        { label: "Universal", title: "Universal" }
                    ]
                }
            ]
        }
    });
    const { fields, append, remove } = useFieldArray({
        name: "images" as never,
        control
    });
    const id = useParams<{ id: string }>().id;
    // const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { data: allCategories } = useGetCategoryQuery({});
    const { data, isLoading } = useGetSingleProductQuery(id);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.images.pop();
        UseCustomToast(updateProduct({ id, data }), "Adding Product");
    }
    const categories = dataResolver.resolveCatalogAutoComplete(allCategories?.data || []);

    // console.log(data)
    useEffect(() => {
        if (data?.data && !isLoading) {
            setValue("title", data.data.title);
            setValue("description", data.data.description);
            setValue("categories", data.data.categories);
            setValue("tags", data.data.tags);
            setValue("images", data.data.images);
            setValue("stock", data.data.stock);
            setValue("attributes", data.data.attributes);
            append({
                images: 'e'
            })
        }
    }
        , [append, data, isLoading, setValue])

    if (isLoading) {
        return <Typography variant="h6" sx={{ color: 'red' }}>...loading</Typography>
    }






    return (
        <Box>
            <Typography variant="h6" fontWeight={600}>Edit Product</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField placeholder="Product title"
                            fullWidth
                            label="Product Title*"
                            variant="outlined"
                            size="small"
                            {...register("title", { required: true })} error={errors.title ? true : false}
                        />
                        <Controller
                            name="categories"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    multiple
                                    value={getValues("categories") || []}
                                    fullWidth
                                    size="small"
                                    onChange={(_event, value) => setValue("categories", value as { title: string, label: string }[])}
                                    options={categories || []}
                                    getOptionLabel={(option) => option.label}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title;
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Categories" error={errors.categories ? true : false} size="small" />}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={600}>Product Images</Typography>
                        <DynamicMeaida
                            fields={fields}
                            append={append}
                            remove={remove}
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                        />
                    </Box>
                    <Box>
                        {/* <TextField
                            placeholder="Product Description*"
                            fullWidth size="small"
                            label="Product Description*"
                            multiline minRows={4}
                            {...register("description", { required: true })}
                            error={errors.description ? true : false}
                        /> */}
                        <TinyMceHtmlBuilder
                            register={register}
                            setValue={setValue}
                            getValue={getValues}
                        />
                    </Box>
                    <Box>
                        <Controller
                            name="tags"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    multiple
                                    filterOptions={(options: Array<{ title: string; label: string; }>, params: { inputValue: any; getOptionLabel: (option: { title: string; label: string; }) => string; }) => {
                                        const filtered = filter(options, params);
                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.title);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                label: inputValue,
                                                title: inputValue,
                                            });
                                        }
                                        return filtered as Array<{ title: string; label: string; }>; // Specify the return type as an array of objects with the properties 'title' and 'label'
                                    }}

                                    value={getValues("tags") || []}
                                    fullWidth
                                    size="small"
                                    onChange={(_event, value) => setValue("tags", value as { title: string, label: string }[])}
                                    options={[]}
                                    getOptionLabel={(option) => option.label}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.title === value.title;
                                    }}

                                    renderInput={(params) => <TextField {...params} label="tags" error={errors.tags ? true : false} size="small" />}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                        <VariantsPricing
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}

                        />
                    </Box>

                    <Box>
                        <Button variant="contained" color="primary" fullWidth type="submit">Save Product</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default EditProducts;