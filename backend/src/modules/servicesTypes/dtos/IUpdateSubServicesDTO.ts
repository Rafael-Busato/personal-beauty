/* eslint-disable camelcase */
export default interface IUpdateSubServicesDTO {
  sub_service: {
    id: string;
    sub_services: string;
    active: boolean;
    created_at: Date;
    update_at: Date;
  };
}
