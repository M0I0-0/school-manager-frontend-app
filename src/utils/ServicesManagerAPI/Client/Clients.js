import ServicesManagerAPI from "../ServicesManagerAPI."


export const client = {
    get: async (data) => await ServicesManagerAPI.get(`/v2/client/client/${data.CurrentPage}/${data.PerPager}`),
    create: async (data) => await ServicesManagerAPI.post("/v2/client/client/create", data),
    update: async (data) => await ServicesManagerAPI.put("v2/client/client/update", data),
    find: async (data) => await ServicesManagerAPI.post("/v2/client/client/find", data),
}