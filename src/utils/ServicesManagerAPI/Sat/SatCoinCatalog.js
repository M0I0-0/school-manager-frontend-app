import ServicesManagerAPI from "../ServicesManagerAPI.";

export const satCoinCatalog = {
  find: async (data) => await ServicesManagerAPI.post("/v1/sat/satcoincatalog/find", data),
  get: async (data) =>
    await ServicesManagerAPI.get(`/v1/sat/satcoincatalog/${data.CurrentPage}/${data.PerPager}`),
};
