import * as Yup from "yup";

export const createInventoryValidator = Yup.object({
    inventory_name: Yup.string().required().max(75),
    inventory_category: Yup.string().required().max(75),
    inventory_desc: Yup.string().nullable().max(255),
    inventory_merk: Yup.string().nullable().max(75),
    inventory_color: Yup.string().nullable().max(16),
    inventory_room: Yup.string().required().max(36),
    inventory_storage: Yup.string().nullable().max(36),
    inventory_rack: Yup.string().nullable().max(36),
    inventory_price: Yup.number().required().min(0).max(999999999),
    inventory_image: Yup.string().nullable().max(500),
    inventory_unit: Yup.string().required().max(36),
    inventory_vol: Yup.number().required().min(0).max(999999),
    inventory_capacity_unit: Yup.string().nullable().max(36),
    inventory_capacity_vol: Yup.number().nullable().min(0).max(999999),
    is_favorite: Yup.boolean().required(),
});

export type TRequestCreateInventoryBody = Yup.InferType<typeof createInventoryValidator>;
