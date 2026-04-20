import ApiResponse from '../handlers/response.js';

export const registerCtrl = (req, res) => {
    const response = new ApiResponse(res);

    response.ok("te amo pipe!", { user: "pipe" })
}

export const loginCtrl = (req, res) => {

}

export const logoutCtrl = (req, res) => {

}