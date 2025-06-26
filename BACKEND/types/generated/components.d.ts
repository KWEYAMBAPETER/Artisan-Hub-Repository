import type { Attribute, Schema } from '@strapi/strapi';

export interface CommonDeliveryAddress extends Schema.Component {
  collectionName: 'components_common_delivery_addresses';
  info: {
    displayName: 'deliveryAddress';
    icon: 'pinMap';
  };
  attributes: {
    city: Attribute.String & Attribute.Required;
    country: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Uganda'>;
    street: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.delivery-address': CommonDeliveryAddress;
    }
  }
}
