export interface productDetails {
    campaignProductId: number;
    productName: string;
    price: string;
    compareAtPrice: string;
    image: string;
}

export interface FormData {
    phoneNumber: string;
    emailAddress: string;
    firstName: string;
    lastName: string;

    address1: string;
    address2?: string; // Optional field
    city: string;
    country: string;
    state: string;
    postalCode: string;

    sameAddress: boolean;

    billShipSame: boolean; 
    billingFirstName: string;
    billingLastName: string;
    billingAddress1: string;
    billingAddress2?: string; // Optional field
    billingCity: string;
    billingCountry: string;
    billingState: string;
    billingPostalCode: string;

    shippingMethod: string;

    shippingId: string;
    productId: string;
    productQty: number;

    discountCode: string;

    paymentMethod: string;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;

    cavv: string;
    xid: string;
    eci: string;
    version: string;
    acsTransId: string;
    status: string;
}