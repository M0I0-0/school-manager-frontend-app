
const Mapper = {
    ResponseToObject: (response) => {
        return {
            IdClient: !!response.IdClient ? response.IdClient : "",
            Name: !!response.Name ? response.Name : "",
            LastName: !!response.LastName ? response.LastName : "",
            Code: !!response.Code ? response.Code : "",
            Protocol: !!response.Protocol ? response.Protocol : "",
            ServerAdress: !!response.ServerAdress ? response.ServerAdress : "",
            ServerPoint: !!response.ServerPoint ? response.ServerPoint : 0,
            MaximumRequests: !!response.MaximumRequests ? response.MaximumRequests : 0,
            UsedRequest: !!response.UsedRequest ? response.UsedRequest : 0,
        }
    },

    CreateToObject: (request) => {
        return {
            Name: !!request.Name ? request.Name : "",
            LastName: !!request.LastName ? request.LastName : "",
            Code: !!request.Code ? request.Code : "",
            Protocol: !!request.Protocol ? request.Protocol : "",
            ServerAdress: !!request.ServerAdress ? request.ServerAdress : "",
            ServerPoint: !!request.ServerPoint ? request.ServerPoint : 0,
            MaximumRequests: !!request.MaximumRequests ? request.MaximumRequests : 0,
            UsedRequest: !!request.UsedRequest ? request.UsedRequest : 0,
        }
    },

    UpdateToObject: (request) => {
        return {
            IdClient: !!request.IdClient ? request.IdClient : "",
            Name: !!request.Name ? request.Name : "",
            LastName: !!request.LastName ? request.LastName : "",
            Code: !!request.Code ? request.Code : "",
            Protocol: !!request.Protocol ? request.Protocol : "",
            ServerAdress: !!request.ServerAdress ? request.ServerAdress : "",
            ServerPoint: !!request.ServerPoint ? request.ServerPoint : 0,
            MaximumRequests: !!request.MaximumRequests ? request.MaximumRequests : 0,
            UsedRequest: !!request.UsedRequest ? request.UsedRequest : 0,
        }
    }
}

export default Mapper;