export const baseUrl = process.env.REACT_APP_API_URL;
export const imageBaseUrl = 'https://api.tibilon.skillzserver.com/public'




export const createPropertyUrl = `${baseUrl}/property`;
export const getPropertiesUrl = `${baseUrl}/property`;
export const getPropertyDetailsUrl = `${baseUrl}/property/show`;
export const deletePropertyDetailsUrl = `${baseUrl}/property/destroy`;
export const editPropertyDetailsUrl = `${baseUrl}/property/update`;
export const addAmenityToPropertyUrl = `${baseUrl}/property/addamenity`;
export const makePropertyPaymentyUrl = `${baseUrl}/property/addpayment`;

//CLIENT
export const getClientsUrl = `${baseUrl}/client`;


export const getEmployeesUrl = `${baseUrl}/user`;

export const getAffiliatesUrl = `${baseUrl}/affiliate`;

export const deleteAmenityFromPropertyUrl = `${baseUrl}/property/deleteamenity`;


export const getAllPaymentsUrl = `${baseUrl}/property/allpayment`;
export const getViewPaymentUrl = `${baseUrl}/property/viewpayment`;



