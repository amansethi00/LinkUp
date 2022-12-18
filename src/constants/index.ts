import { faker } from '@faker-js/faker';

export const assets = [
  {
    id: faker.datatype.uuid(),
    url: faker.image.imageUrl(),
    title: faker.datatype.string(),
    status: faker.datatype.boolean(),
  },
  {
    id: faker.datatype.uuid(),
    url: faker.image.imageUrl(),
    title: faker.datatype.string(),
    status: faker.datatype.boolean(),
  },
  {
    id: faker.datatype.uuid(),
    url: faker.image.imageUrl(),
    title: faker.datatype.string(),
    status: faker.datatype.boolean(),
  },
  {
    id: faker.datatype.uuid(),
    url: faker.image.imageUrl(),
    title: faker.datatype.string(),
    status: faker.datatype.boolean(),
  },
];

export const initialValues = {
  isDarkMode: false,
  userData: {},
};
