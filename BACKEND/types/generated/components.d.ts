import type { Schema, Struct } from '@strapi/strapi';

export interface CommonDeliveryAddress extends Struct.ComponentSchema {
  collectionName: 'components_common_delivery_addresses';
  info: {
    displayName: 'deliveryAddress';
    icon: 'pinMap';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Uganda'>;
    street: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.delivery-address': CommonDeliveryAddress;
    }
  }
}
