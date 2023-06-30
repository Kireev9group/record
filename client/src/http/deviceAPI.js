import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createGroup = async (group) => {
  const { data } = await $authHost.post("api/group", {
    group,
  });
  return data;
};

export const fetchGroup = async () => {
  const { data } = await $host.get("api/group");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/record", device);
  return data;
};

export const fetchDevice = async (groupId, page, limit, orderBy, order) => {
  const { data } = await $host.get("api/record", {
    params: { groupId, page, limit, order, orderBy },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/record/" + id, {
    params: {
      include: "info", // указываем, что нужно включить связанные записи устройства
    },
  });
  return data;
};
