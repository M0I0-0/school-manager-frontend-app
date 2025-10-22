const Mapper = {
  ResponseToObject: (response) => {
    return {
      IdSatCoinCatalog: !!response.IdSatCoinCatalog ? response.IdSatCoinCatalog : "",
      CodeSatCoinCatalog: !!response.CodeSatCoinCatalog ? response.CodeSatCoinCatalog : "",
      Description: !!response.Description ? response.Description : "",
      Decimals: !!response.Decimals ? response.Decimals : 0,
    };
  },
  CreateToObject: (request) => {
    return {
      CodeSatCoinCatalog: !!request.CodeSatCoinCatalog ? request.CodeSatCoinCatalog : "",
      Description: !!request.Description ? request.Description : "",
      Decimals: !!request.Decimals ? request.Decimals : 0,
    };
  },
  UpdateToObject: (request) => {
    return {
      IdSatCoinCatalog: !!request.IdSatCoinCatalog ? request.IdSatCoinCatalog : "",
      CodeSatCoinCatalog: !!request.CodeSatCoinCatalog ? request.CodeSatCoinCatalog : "",
      Description: !!request.Description ? request.Description : "",
      Decimals: !!request.Decimals ? request.Decimals : 0,
    };
  },
};

export default Mapper;
